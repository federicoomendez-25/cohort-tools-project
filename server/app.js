require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// ======================
// ROUTES
// ======================
const cohortRoutes = require("./routes/cohorts.routes");
const studentRoutes = require("./routes/students.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");

// ======================
// ERROR MIDDLEWARE
// ======================
const {
  notFound,
  errorHandler,
} = require("./middlewares/error.middleware");

const app = express();
const PORT = 5005;

// ======================
// DATABASE CONNECTION
// ======================
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ======================
// MIDDLEWARE
// ======================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());

// ======================
// TEST ROUTE
// ======================
app.get("/api", (req, res) => {
  res.json({ message: "API running 🚀" });
});

// ======================
// API ROUTES
// ======================
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cohorts", cohortRoutes);
app.use("/api/students", studentRoutes);

// ======================
// ERROR HANDLING
// ======================
app.use(notFound);
app.use(errorHandler);

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
