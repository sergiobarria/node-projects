require('dotenv').config();
require('express-async-errors');
const express = require('express');
const colors = require('colors');
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

// Import security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

// Import routers
const authRouter = require('./routes/authRoutes');
const jobsRouter = require('./routes/jobsRoutes');

const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
  })
);

app.get('/', (req, res) => {
  res.send('jobs api');
});
// mount routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // Connect DB
    connectDB(process.env.MONGO_URI);
    // Run server
    app.listen(
      port,
      console.log(`Server is listening on port ${port}...`.yellow.bold)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
