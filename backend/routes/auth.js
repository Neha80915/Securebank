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
// Temporary seed route
router.post('/seed', async (req, res) => {
  const db = require('../database/init');
  
  db.run('UPDATE users SET balance=50000 WHERE card_number=?', 
    ['1234567890123456']);
  
  db.run('UPDATE accounts SET balance=50000 WHERE user_id=1');
  
  db.run('INSERT OR IGNORE INTO cards (user_id,card_type,card_number,expiry) VALUES(?,?,?,?)',
    [1,'debit','1234567890123456','12/26']);
    
  res.json({ message: 'Seeded successfully!' });
});
module.exports = router;