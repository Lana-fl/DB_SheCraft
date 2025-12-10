// src/routes/OrderRoute.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Customer order history
// GET /api/orders/customer/:customerID
router.get("/customer/:customerID", orderController.getOrdersByCustomer);

// Designer order log
// GET /api/orders/designer/:designerID
router.get("/designer/:designerID", orderController.getOrdersByDesigner);

// Single order + items + total
// GET /api/orders/:orderID
router.get("/:orderID", orderController.getOrderDetails);

// Create an order from a cart (checkout)
// POST /api/orders
router.post("/", orderController.createOrderFromCart);

module.exports = router;
