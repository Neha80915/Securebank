const express = require('express');
const { getCards, createCard, updateCard, deleteCard } = require('../controllers/cardController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, getCards);
router.post('/', authenticateToken, createCard);
router.put('/:id', authenticateToken, updateCard);
router.delete('/:id', authenticateToken, deleteCard);

module.exports = router;
