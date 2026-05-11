const User = require('../models/User');
const Transaction = require('../models/Transaction');

const createTransfer = async (req, res) => {
  const { toCard, amount, note } = req.body;
  const senderId = req.user.id;

  try {
    // Find sender
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({ message: 'Sender not found' });
    }

    // Find recipient by card number
    const recipient = await User.findByCardNumber(toCard);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    // Check if sender has enough balance
    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update balances
    await User.updateBalance(senderId, sender.balance - amount);
    await User.updateBalance(recipient.id, recipient.balance + amount);

    // Create transactions
    await Transaction.create(senderId, 'transfer_out', -amount);
    await Transaction.create(recipient.id, 'transfer_in', amount);

    res.json({ message: 'Transfer successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTransfer };
