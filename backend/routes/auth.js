const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  // Implement user signup logic (manual & OAuth)
});

// Login
router.post("/login", async (req, res) => {
  // Implement login logic
});

// Logout
router.get("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out" });
});

module.exports = router;

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      req.user = decoded;
      next();
    });
  };
  
