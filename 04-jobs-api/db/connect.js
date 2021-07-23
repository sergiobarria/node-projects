const mongoose = require('mongoose');

const connectDB = (url) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((conn) =>
      console.log(
        `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
      )
    )
    .catch((err) =>
      console.log(
        `Something went wrong connecting to MongoDB -> ${err.message}`.red
      )
    );
};

module.exports = connectDB;
