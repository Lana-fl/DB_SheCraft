// src/middleware.js

// Logs every request (optional)
function requestLogger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}

// Dummy auth middleware placeholder
function protect(req, res, next) {
  // In the future you can check JWT/token here.
  // For now, just allow all requests.
  next();
}

module.exports = {
  requestLogger,
  protect,
};
