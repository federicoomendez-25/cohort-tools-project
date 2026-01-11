const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

// ======================
// SIGNUP
// ======================
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    const payload = {
      _id: createdUser._id,
      email: createdUser.email,
      name: createdUser.name,
    };

    const authToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || "super-secret-key",
      { algorithm: "HS256", expiresIn: "1d" }
    );

    res.status(201).json({ authToken });
  } catch (error) {
    next(error);
  }
});

// ======================
// LOGIN
// ======================
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    const authToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || "super-secret-key",
      { algorithm: "HS256", expiresIn: "1d" }
    );

    res.json({ authToken });
  } catch (error) {
    next(error);
  }
});

// ======================
// VERIFY TOKEN
// ======================
router.get("/verify", isAuthenticated, (req, res) => {
  res.json(req.payload);
});

module.exports = router;
