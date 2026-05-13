const User = require('../models/User');
const Transaction = require('../models/Transaction');
const db = require('../database/init');

const createTransfer = async (req, res) => {
  const { toCard, amount, note } = req.body;
  const senderId = req.user.id;

  // Input validation
  if (!toCard) {
    return res.status(400).json({ message: 'Recipient card number is required' });
  }
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Amount must be greater than 0' });
  }
  if (amount > 100000) {
    return res.status(400).json({ message: 'Transfer limit is ₹1,00,000 per transaction' });
  }

  try {
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({ message: 'Sender not found' });
    }

    // Prevent self-transfer
    if (sender.card_number === toCard) {
      return res.status(400).json({ message: 'Cannot transfer money to your own account' });
    }

    const recipient = await User.findByCardNumber(toCard);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient card number not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Atomic transaction using SQLite
    await new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION', (err) => {
          if (err) return reject(err);
        });

        db.run(
          'UPDATE users SET balance = ? WHERE id = ?',
          [sender.balance - amount, senderId],
          (err) => { if (err) { db.run('ROLLBACK'); return reject(err); } }
        );

        db.run(
          'UPDATE users SET balance = ? WHERE id = ?',
          [recipient.balance + amount, recipient.id],
          (err) => { if (err) { db.run('ROLLBACK'); return reject(err); } }
        );

        db.run(
          'INSERT INTO transactions (user_id, type, amount, note) VALUES (?, ?, ?, ?)',
          [senderId, 'transfer_out', -amount, note || ''],
          (err) => { if (err) { db.run('ROLLBACK'); return reject(err); } }
        );

        db.run(
          'INSERT INTO transactions (user_id, type, amount, note) VALUES (?, ?, ?, ?)',
          [recipient.id, 'transfer_in', amount, note || ''],
          (err) => { if (err) { db.run('ROLLBACK'); return reject(err); } }
        );

        db.run('COMMIT', (err) => {
          if (err) { db.run('ROLLBACK'); return reject(err); }
          resolve();
        });
      });
    });

    res.json({
      message: 'Transfer successful',
      amount,
      to: recipient.name,
    });
  } catch (error) {
    console.error('Transfer error:', error);
    res.status(500).json({ message: 'Transfer failed. Please try again.' });
  }
};

module.exports = { createTransfer };