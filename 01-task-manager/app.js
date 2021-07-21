const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

const connectDB = require('./db/connectDB');
const { notFound } = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

// Import routes
const tasksRoutes = require('./routes/tasksRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize App
const app = express();

// Middleware
// app.use(express.static('./public'));
app.use(express.json());

// Mounting Routes
app.use('/api/v1/tasks', tasksRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

// Create server
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on port ${PORT}...`.yellow.bold));
