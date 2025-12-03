// src/routes/orderRoute.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// IMPORTANT: customer route FIRST
router.get('/customer/:customerID', orderController.getOrdersByCustomer);

// Get one order + items + total
router.get('/:orderID', orderController.getOrderDetails);

// Create an order from a cart (checkout)
router.post('/', orderController.createOrderFromCart);

module.exports = router;
