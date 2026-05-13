const express = require('express');
const { deposit, withdraw, getAtms } = require('../controllers/atmController');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.get('/', authenticateToken, getAtms);
router.post('/deposit', authenticateToken, deposit);
router.post('/withdraw', authenticateToken, withdraw);

module.exports = router;