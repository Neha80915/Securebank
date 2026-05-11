const bcrypt = require('bcryptjs');
const db = require('./init');

const seedDatabase = async () => {
  // Hash PINs
  const hashedPin1 = await bcrypt.hash('1234', 10);
  const hashedPin2 = await bcrypt.hash('5678', 10);

  // Insert dummy users
  db.run(
    'INSERT OR IGNORE INTO users (name, card_number, pin, balance) VALUES (?, ?, ?, ?)',
    ['John Doe', '1234567890123456', hashedPin1, 1000.00]
  );

  db.run(
    'INSERT OR IGNORE INTO users (name, card_number, pin, balance) VALUES (?, ?, ?, ?)',
    ['Jane Smith', '9876543210987654', hashedPin2, 500.00]
  );

  // Insert dummy transactions
  db.run(
    'INSERT OR IGNORE INTO transactions (user_id, type, amount) VALUES (?, ?, ?)',
    [1, 'deposit', 500.00]
  );

  db.run(
    'INSERT OR IGNORE INTO transactions (user_id, type, amount) VALUES (?, ?, ?)',
    [1, 'withdraw', 200.00]
  );

  db.run(
    'INSERT OR IGNORE INTO transactions (user_id, type, amount) VALUES (?, ?, ?)',
    [2, 'deposit', 300.00]
  );

  // Insert dummy cards
  db.run(
    'INSERT OR IGNORE INTO cards (user_id, card_type, card_number, expiry) VALUES (?, ?, ?, ?)',
    [1, 'debit', '1234567890123456', '12/25']
  );

  db.run(
    'INSERT OR IGNORE INTO cards (user_id, card_type, card_number, expiry) VALUES (?, ?, ?, ?)',
    [1, 'credit', '6543210987654321', '06/26']
  );

  db.run(
    'INSERT OR IGNORE INTO cards (user_id, card_type, card_number, expiry) VALUES (?, ?, ?, ?)',
    [2, 'debit', '9876543210987654', '09/24']
  );

  console.log('Database seeded successfully.');
};

seedDatabase();
