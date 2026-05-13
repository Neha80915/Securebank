const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'securebank.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      card_number TEXT UNIQUE NOT NULL,
      pin TEXT NOT NULL,
      balance REAL DEFAULT 0.0
    )
  `);

  // Transactions table (added note + description)
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      note TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Accounts table
  db.run(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      account_type TEXT NOT NULL,
      balance REAL DEFAULT 0.0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Cards table
  db.run(`
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      card_type TEXT NOT NULL,
      card_number TEXT UNIQUE NOT NULL,
      expiry TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // ATMs table (added available, hours, distance)
  db.run(`
    CREATE TABLE IF NOT EXISTS atms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      latitude REAL,
      longitude REAL,
      available INTEGER DEFAULT 1,
      hours TEXT DEFAULT '24/7',
      distance TEXT,
      services TEXT
    )
  `);

  // Indexes for faster queries
  db.run(`CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_cards_user_id ON cards(user_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id)`);

  // Seed ATM data if empty
  db.get('SELECT COUNT(*) as count FROM atms', (err, row) => {
    if (!err && row.count === 0) {
      const atms = [
        ['SecureBank ATM - Main Street', '123 Main Street, Downtown', 28.6139, 77.2090, 1, '24/7', '0.3 km', 'Cash, Deposit'],
        ['SecureBank ATM - Mall Plaza', '456 Shopping Center Blvd', 28.6200, 77.2150, 1, '8 AM - 10 PM', '1.2 km', 'Cash'],
        ['SecureBank ATM - University', '789 College Avenue', 28.6300, 77.2200, 0, '24/7', '2.5 km', 'Cash, Deposit'],
        ['SecureBank ATM - Airport', 'Terminal 1, Airport Road', 28.5562, 77.1000, 1, '24/7', '5.8 km', 'Cash, Deposit, Exchange'],
      ];
      const stmt = db.prepare(
        'INSERT INTO atms (name, address, latitude, longitude, available, hours, distance, services) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      );
      atms.forEach((atm) => stmt.run(atm));
      stmt.finalize();
      console.log('ATM data seeded.');
    }
  });

  console.log('Database initialized successfully.');
});

module.exports = db;