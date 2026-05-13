const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Account = require('../models/Account');
const db = require('../database/init');

// Token blacklist (in-memory - use Redis in production)
const tokenBlacklist = new Set();

const register = async (req, res) => {
  const { name, cardNumber, pin } = req.body;

  if (!name || !cardNumber || !pin) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (cardNumber.replace(/\s/g, '').length !== 16) {
    return res.status(400).json({ message: 'Card number must be 16 digits' });
  }
  if (pin.length < 4 || pin.length > 6) {
    return res.status(400).json({ message: 'PIN must be 4-6 digits' });
  }
  if (!/^\d+$/.test(pin)) {
    return res.status(400).json({ message: 'PIN must contain only digits' });
  }

  try {
    const existingUser = await User.findByCardNumber(cardNumber);
    if (existingUser) {
      return res.status(400).json({ message: 'Card number already registered' });
    }

    const user = await User.create(name, cardNumber, pin, 50000);

    await Account.create(user.id, 'checking', 50000.00);

    db.run(
      'INSERT INTO cards (user_id, card_type, card_number, expiry) VALUES (?, ?, ?, ?)',
      [user.id, 'debit', cardNumber, '12/26']
    );

    res.status(201).json({ message: 'Registration successful. Please login.' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { cardNumber, pin } = req.body;

  if (!cardNumber || !pin) {
    return res.status(400).json({ message: 'Card number and PIN are required' });
  }

  try {
    const user = await User.findByCardNumber(cardNumber);
    if (!user) {
      return res.status(401).json({ message: 'Invalid card number or PIN' });
    }

    const isPinValid = await bcrypt.compare(pin, user.pin);
    if (!isPinValid) {
      return res.status(401).json({ message: 'Invalid card number or PIN' });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        cardNumber: user.card_number,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const logout = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    tokenBlacklist.add(token);
  }
  res.json({ message: 'Logged out successfully' });
};

const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      id: user.id,
      name: user.name,
      cardNumber: user.card_number,
      balance: user.balance,
    });
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, logout, me, tokenBlacklist };