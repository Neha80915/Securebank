const User = require('../models/User');
const Transaction = require('../models/Transaction');

const deposit = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  if (amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newBalance = user.balance + amount;
    await User.updateBalance(userId, newBalance);
    await Transaction.create(userId, 'deposit', amount);

    res.json({ message: 'Deposit successful', balance: newBalance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const withdraw = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  if (amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
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
    await User.updateBalance(userId, newBalance);
    await Transaction.create(userId, 'withdraw', amount);

    res.json({ message: 'Withdrawal successful', balance: newBalance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { deposit, withdraw };
