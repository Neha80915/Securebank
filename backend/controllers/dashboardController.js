const User = require('../models/User');
const Transaction = require('../models/Transaction');

const getSummary = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const recentTransactions = await Transaction.findByUserId(req.user.id, 5);

    res.json({
      totalBalance: user.balance,
      accounts: [
        { id: 1, account_type: 'checking', balance: user.balance },
        { id: 2, account_type: 'savings', balance: 18250 },
      ],
      recentTransactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getSummary };