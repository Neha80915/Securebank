const User = require('../models/User');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

const getSummary = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const accounts = await Account.findByUserId(req.user.id);
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    const recentTransactions = await Transaction.findByUserId(req.user.id, 5); // Last 5

    res.json({
      totalBalance,
      accounts,
      recentTransactions
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getSummary };
