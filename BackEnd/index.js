// src/index.js
require("dotenv").config();
const app = require("./shecraft-backend/src/app");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
