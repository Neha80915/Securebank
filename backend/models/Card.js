const db = require('../database/init');

class Card {
  static async create(userId, cardType, cardNumber, expiry) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO cards (user_id, card_type, card_number, expiry) VALUES (?, ?, ?, ?)',
        [userId, cardType, cardNumber, expiry],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, userId, cardType, cardNumber, expiry });
        }
      );
    });
  }

  static async findByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM cards WHERE user_id = ?', [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM cards WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static async update(id, fields) {
    const updates = Object.keys(fields).map(key => `${key} = ?`).join(', ');
    const values = Object.values(fields);
    values.push(id);

    return new Promise((resolve, reject) => {
      db.run(`UPDATE cards SET ${updates} WHERE id = ?`, values, function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM cards WHERE id = ?', [id], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }
}

module.exports = Card;
