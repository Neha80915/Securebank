const db = require('../database/init');

class Account {
  static async create(userId, accountType, balance = 0) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO accounts (user_id, account_type, balance) VALUES (?, ?, ?)',
        [userId, accountType, balance],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, userId, accountType, balance });
        }
      );
    });
  }

  static async findByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM accounts WHERE user_id = ?', [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM accounts WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async updateBalance(id, balance) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE accounts SET balance = ? WHERE id = ?', [balance, id], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }
}

module.exports = Account;
