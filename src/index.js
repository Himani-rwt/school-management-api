const express = require("express");
require("dotenv").config();

const schoolRoutes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "School Management API is running 🚀",
    endpoints: {
      addSchool: "POST /addSchool",
      listSchools: "GET /listSchools?latitude=<lat>&longitude=<lng>",
    },
  });
});

// ─── Routes ───────────────────────────────────
app.use("/", schoolRoutes);

// ─── 404 Handler ──────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// ─── Global Error Handler ─────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ─── Start Server ─────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📌 POST http://localhost:${PORT}/addSchool`);
  console.log(`📌 GET  http://localhost:${PORT}/listSchools?latitude=28.6&longitude=77.2\n`);
});

module.exports = app;
