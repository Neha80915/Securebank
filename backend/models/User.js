const db = require('../database/init');
const bcrypt = require('bcryptjs');

class User {
  static async create(name, cardNumber, pin, balance = 0) {
    const hashedPin = await bcrypt.hash(pin, 10);
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (name, card_number, pin, balance) VALUES (?, ?, ?, ?)',
        [name, cardNumber, hashedPin, balance],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, name, cardNumber, pin: hashedPin, balance });
        }
      );
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async findByCardNumber(cardNumber) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE card_number = ?', [cardNumber], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async updateBalance(id, balance) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE users SET balance = ? WHERE id = ?', [balance, id], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }
}

module.exports = User;
