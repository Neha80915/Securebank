const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ id: user.id, name: user.name, cardNumber: user.card_number });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProfile, getBalance };
