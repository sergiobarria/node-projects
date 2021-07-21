const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((conn) =>
      console.log(
        `MongoDB Connected: ${conn.connection.host}`.cyan.bold.underline
      )
    )
    .catch((err) =>
      console.log(`Something went wrong connecting to DB: ${err.message}`)
    );
};

module.exports = connectDB;
