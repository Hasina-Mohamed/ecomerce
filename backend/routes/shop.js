const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/shopController');

// Get all products
router.get('/products', getProducts);

// Get single product
router.get('/products/:id', getProductById);

module.exports = router;
