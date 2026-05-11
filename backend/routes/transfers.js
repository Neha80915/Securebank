const express = require('express');
const { createTransfer } = require('../controllers/transferController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, createTransfer);

module.exports = router;
