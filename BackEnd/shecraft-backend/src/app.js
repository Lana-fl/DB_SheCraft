// src/app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const customerRoutes = require("./routes/customerRoute");
const { requestLogger } = require("./middleware"); // optional but nice

const authRoutes = require("./routes/authRoutes");

// >>> ADD THIS LINE <<<
const orderRoute = require("./routes/OrderRoute");   // <-- ADDED

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger); // logs every request

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);

// >>> ADD THIS LINE <<<
app.use("/api/orders", orderRoute);                  // <-- ADDED

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Jewelry API is running 💍" });
});

module.exports = app;
