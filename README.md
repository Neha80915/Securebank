# 🏦 Securebank

> A modern, full-stack secure banking web application built with React, TypeScript, Tailwind CSS, and Node.js.

![GitHub stars](https://img.shields.io/github/stars/Neha80915/Securebank?style=social)
![GitHub forks](https://img.shields.io/github/forks/Neha80915/Securebank?style=social)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)

---

## 📌 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 About

Securebank is a full-stack banking web application that simulates real-world banking features including user authentication, account dashboard, fund transfers, card management, transaction history, ATM locator, and SMS notifications.

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based login & protected routes
- 📊 **Dashboard** — Real-time account balance & overview
- 💸 **Fund Transfer** — Transfer money between accounts
- 💳 **Card Management** — View and manage bank cards
- 📜 **Transaction History** — Full transaction log
- 🗺️ **ATM Locator** — Find nearby ATMs
- 📱 **SMS Notifications** — SMS alerts for transactions
- 📱 **Responsive UI** — Works on mobile & desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | SQLite |
| Auth | JWT (JSON Web Tokens) |
| SMS | Twilio / SMS Module |
| Build Tool | Bun / Vite |
| Icons | Lucide React |

---

## 📁 Project Structure

```
Securebank/
├── src/                        # Frontend source
│   ├── components/             # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── QuickActions.tsx
│   │   ├── ATMLocator.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── ui/                 # Shadcn UI components
│   ├── pages/                  # Page components
│   │   ├── Dashboard.tsx
│   │   ├── LoginPage.tsx
│   │   ├── Cards.tsx
│   │   ├── Transactions.tsx
│   │   ├── TransferPage.tsx
│   │   └── ATMLocator.tsx
│   └── lib/                    # Utilities & API calls
│       ├── api.ts
│       └── utils.ts
├── backend/                    # Backend source
│   ├── controllers/            # Route handlers
│   ├── models/                 # Data models
│   ├── routes/                 # API routes
│   ├── middleware/             # Auth middleware
│   ├── database/               # DB init & seed
│   └── server.js               # Entry point
├── sms/                        # SMS notification module
├── public/                     # Static assets
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Bun (optional but recommended)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Neha80915/Securebank.git
cd Securebank
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env      # Fill in your environment variables
node database/init.js     # Initialize database
node database/seed.js     # Seed test data (optional)
node server.js            # Start backend server
```

Backend runs on: `http://localhost:5000`

### 3. Setup Frontend

```bash
# In the root folder
bun install    # or npm install
bun run dev    # or npm run dev
```

Frontend runs on: `http://localhost:5173`

### 4. Setup SMS Module (optional)

```bash
cd sms
npm install
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` folder based on `.env.example`:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
DB_PATH=./database/securebank.db
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
```

> ⚠️ Never commit your `.env` file. It is already in `.gitignore`.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Get account summary |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get all transactions |
| POST | `/api/transfers` | Make a transfer |

### Cards
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cards` | Get user cards |

### ATM
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/atm` | Get ATM locations |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user` | Get user profile |
| PUT | `/api/user` | Update user profile |

---

## 🧪 Test Credentials

After seeding the database:

```
Email:    test@securebank.com
Password: test123
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 👩‍💻 Author

**Neha** — [@Neha80915](https://github.com/Neha80915)

---

> ⭐ If you found this project helpful, please give it a star!