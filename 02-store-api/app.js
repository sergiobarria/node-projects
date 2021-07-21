const express = require('express');
const dotenv = require('dotenv');
require('express-async-errors');
const colors = require('colors');

// Import Database connect
const connectDB = require('./db/connect');

// Import Routes
const productsRoutes = require('./routes/productsRoutes');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// Load env vars
dotenv.config();

// Initialize app
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Mount routes
app.use('/api/v1/products', productsRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// start server
const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(`Server is listening on port ${PORT}...`.yellow.bold)
);
