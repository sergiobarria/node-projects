require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/Product');
const colors = require('colors');

const products = require('./products.json');

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.create(products);
    console.log('Data imported successfully!'.green.inverse);
  } catch (err) {
    console.error(err);
  }

  process.exit(0);
};

importData();
