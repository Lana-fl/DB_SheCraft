// src/app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const customerRoutes = require("./routes/customerRoutes");
const { requestLogger } = require("./middleware"); // optional but nice

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger); // logs every request

// Routes
app.use("/api/customers", customerRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Jewelry API is running 💍" });
});

module.exports = app;
