const Card = require('../models/Card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.findByUserId(req.user.id);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createCard = async (req, res) => {
  const { cardType, cardNumber, expiry } = req.body;

  try {
    const card = await Card.create(req.user.id, cardType, cardNumber, expiry);
    res.status(201).json(card);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      res.status(400).json({ message: 'Card number already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

const updateCard = async (req, res) => {
  const { id } = req.params;
  const { expiry } = req.body;

  try {
    const card = await Card.findById(id);
    if (!card || card.user_id !== req.user.id) {
      return res.status(404).json({ message: 'Card not found' });
    }

    await Card.update(id, { expiry });
    res.json({ message: 'Card updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCard = async (req, res) => {
  const { id } = req.params;

  try {
    const card = await Card.findById(id);
    if (!card || card.user_id !== req.user.id) {
      return res.status(404).json({ message: 'Card not found' });
    }

    await Card.delete(id);
    res.json({ message: 'Card deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCards, createCard, updateCard, deleteCard };
