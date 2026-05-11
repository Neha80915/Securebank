const Transaction = require('../models/Transaction');

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findByUserId(req.user.id);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getTransactions };
