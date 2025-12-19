// src/routes/orderRoutes.js
const router = require("express").Router();
const orderController = require("../controllers/orderController");

// Create order from reserved accessories
router.post("/", orderController.createOrderFromCart);

// Best sellers by type/style (must be before /:orderID)
router.get("/best-sellers-by-type", orderController.getBestSellersByType);

// Orders listing
router.get("/", orderController.getAllOrders);

// Orders by customer
router.get("/customer/:customerID", orderController.getOrdersByCustomer);

// Order details
router.get("/:orderID", orderController.getOrderDetails);

router.patch("/:orderID/complete", orderController.completeOrder);


module.exports = router;