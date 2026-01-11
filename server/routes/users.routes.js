const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

// ======================
// GET logged-in user (PROTECTED)
// ======================
router.get("/me", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
