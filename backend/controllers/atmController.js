const User = require('../models/User');
const Transaction = require('../models/Transaction');
const db = require('../database/init');

const deposit = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Amount must be greater than 0' });
  }
  if (amount > 100000) {
    return res.status(400).json({ message: 'Maximum deposit limit is ₹1,00,000' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newBalance = user.balance + amount;

    // Atomic operation
    await new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION');
        db.run('UPDATE users SET balance = ? WHERE id = ?', [newBalance, userId],
          (err) => { if (err) { db.run('ROLLBACK'); return reject(err); } });
        db.run('INSERT INTO transactions (user_id, type, amount) VALUES (?, ?, ?)',
          [userId, 'deposit', amount],
          (err) => { if (err) { db.run('ROLLBACK'); return reject(err); } });
        db.run('COMMIT', (err) => {
          if (err) { db.run('ROLLBACK'); return reject(err); }
          resolve();
        });
      });
    });

    res.json({ message: 'Deposit successful', balance: newBalance });
  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const withdraw = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Amount must be greater than 0' });
  }
  if (amount > 50000) {
    return res.status(400).json({ message: 'Maximum withdrawal limit is ₹50,000' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const newBalance = user.balance - amount;

    // Atomic operation
    await new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION');
        db.run('UPDATE users SET balance = ? WHERE id = ?', [newBalance, userId],
          (err) => { if (err) { db.run('ROLLBACK'); return reject(err); } });
        db.run('INSERT INTO transactions (user_id, type, amount) VALUES (?, ?, ?)',
          [userId, 'withdraw', -amount],
          (err) => { if (err) { db.run('ROLLBACK'); return reject(err); } });
        db.run('COMMIT', (err) => {
          if (err) { db.run('ROLLBACK'); return reject(err); }
          resolve();
        });
      });
    });

    res.json({ message: 'Withdrawal successful', balance: newBalance });
  } catch (error) {
    console.error('Withdraw error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAtms = async (req, res) => {
  try {
    const atms = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM atms', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    res.json(atms);
  } catch (error) {
    console.error('Get ATMs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { deposit, withdraw, getAtms };