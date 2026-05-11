const express = require('express');
const { deposit, withdraw } = require('../controllers/atmController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/deposit', authenticateToken, deposit);
router.post('/withdraw', authenticateToken, withdraw);

module.exports = router;
