require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database/init');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const atmRoutes = require('./routes/atm');
const transactionRoutes = require('./routes/transactions');
const dashboardRoutes = require('./routes/dashboard');
const transferRoutes = require('./routes/transfers');
const cardRoutes = require('./routes/cards');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/atms', atmRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
