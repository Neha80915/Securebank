const db = require('../database/init');

class Transaction {
  static async create(userId, type, amount) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO transactions (user_id, type, amount) VALUES (?, ?, ?)',
        [userId, type, amount],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, userId, type, amount });
        }
      );
    });
  }

  static async findByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC',
        [userId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
}

module.exports = Transaction;
