const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const cohortRoutes = require("./routes/cohorts.routes");
const studentRoutes = require("./routes/students.routes");

const app = express();
const PORT = 5005;

// ======================
// DB CONNECTION
// ======================
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB error:", err));

// ======================
// MIDDLEWARE
// ======================
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());

// ======================
// ROUTES
// ======================
app.get("/api", (req, res) => {
  res.json({ message: "API running 🚀" });
});

app.use("/api/cohorts", cohortRoutes);
app.use("/api/students", studentRoutes);

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
