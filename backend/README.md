# SecureBank Backend

A Node.js + Express backend for the SecureBank ATM management system.

## Features

- User authentication with card number and PIN
- JWT-based authorization
- User profile and balance management
- Deposit and withdrawal operations
- Transaction history
- Debit and credit card management

## Tech Stack

- Node.js
- Express.js
- SQLite (for simplicity, can be switched to MySQL)
- JWT for authentication
- bcrypt for PIN hashing
- CORS enabled

## Project Structure (MVC)

```
backend/
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── atmController.js
│   └── transactionController.js
├── models/
│   ├── User.js
│   ├── Transaction.js
│   └── Card.js
├── routes/
│   ├── auth.js
│   ├── user.js
│   ├── atm.js
│   └── transactions.js
├── middleware/
│   └── auth.js
├── database/
│   ├── init.js
│   └── seed.js
├── .env
├── package.json
├── server.js
└── README.md
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  card_number TEXT UNIQUE NOT NULL,
  pin TEXT NOT NULL,
  balance REAL DEFAULT 0.0
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  amount REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

### Cards Table
```sql
CREATE TABLE cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  card_type TEXT NOT NULL,
  card_number TEXT UNIQUE NOT NULL,
  expiry TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## API Routes

- `POST /api/auth/login` - Login with card number and PIN
- `GET /api/user/profile` - Get user profile (protected)
- `GET /api/user/balance` - Get user balance (protected)
- `POST /api/atm/deposit` - Deposit money (protected)
- `POST /api/atm/withdraw` - Withdraw money (protected)
- `GET /api/transactions` - Get transaction history (protected)

## Installation

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables in `.env`:
   ```
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   DB_PATH=./database/securebank.db
   ```

4. Initialize the database:
   ```
   node database/init.js
   ```

5. Seed the database with dummy data:
   ```
   npm run seed
   ```

## Running the Backend

### Development Mode
```
npm run dev
```

### Production Mode
```
npm start
```

The server will run on `http://localhost:5000` by default.

## Dummy Data

The seed script creates:
- 2 users: John Doe (card: 1234567890123456, PIN: 1234) and Jane Smith (card: 9876543210987654, PIN: 5678)
- Sample transactions
- Sample cards

## Connecting to Frontend

1. Ensure the frontend is running (typically on `http://localhost:3000` for React apps).

2. Update the frontend API base URL to point to the backend:
   ```
   const API_BASE_URL = 'http://localhost:5000/api';
   ```

3. Use the following endpoints in your frontend:
   - Login: `POST /api/auth/login` with `{ cardNumber, pin }`
   - Store the returned JWT token in localStorage or secure storage
   - Include the token in Authorization header for protected routes: `Authorization: Bearer <token>`

4. Example API calls:
   ```javascript
   // Login
   const response = await fetch('http://localhost:5000/api/auth/login', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ cardNumber: '1234567890123456', pin: '1234' })
   });
   const { token } = await response.json();

   // Get balance (protected)
   const balanceResponse = await fetch('http://localhost:5000/api/user/balance', {
     headers: { 'Authorization': `Bearer ${token}` }
   });
   const { balance } = await balanceResponse.json();
   ```

## Security Notes

- PINs are hashed using bcrypt
- JWT tokens expire in 1 hour
- CORS is enabled for cross-origin requests
- All sensitive routes are protected with authentication middleware

## Switching to MySQL

To use MySQL instead of SQLite:

1. Install MySQL and create a database
2. Update `.env` with MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=securebank
   ```
3. Modify `database/init.js` to use mysql2 instead of sqlite3
4. Update all model files to use MySQL queries
