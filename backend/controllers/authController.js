const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Account = require('../models/Account');

const register = async (req, res) => {
  const { name, cardNumber, pin } = req.body;

  try {
    const existingUser = await User.findByCardNumber(cardNumber);
    if (existingUser) {
      return res.status(400).json({ message: 'Card number already exists' });
    }

    const user = await User.create(name, cardNumber, pin);
    // Create default checking account
    await Account.create(user.id, 'checking', 1000.00); // Sample balance

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { cardNumber, pin } = req.body;

  try {
    const user = await User.findByCardNumber(cardNumber);
    if (!user) {
      return res.status(401).json({ message: 'Invalid card number or PIN' });
    }

    const isPinValid = await bcrypt.compare(pin, user.pin);
    if (!isPinValid) {
      return res.status(401).json({ message: 'Invalid card number or PIN' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const logout = async (req, res) => {
  // For JWT, logout is client-side (remove token)
  res.json({ message: 'Logged out successfully' });
};

const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ id: user.id, name: user.name, cardNumber: user.card_number, balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, logout, me };
