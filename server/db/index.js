const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/cohort-tools-api";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
