const express = require('express');

// Import Controllers
const {
  getAllProducts,
  getAllProductsStatic,
} = require('../controllers/productsController');

const router = express.Router();

router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);

module.exports = router;
