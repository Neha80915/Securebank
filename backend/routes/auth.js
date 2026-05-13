const express = require('express');
const { register, login, logout, me } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.post('/logout', authenticateToken, logout);
router.get('/me', authenticateToken, me);

module.exports = router;