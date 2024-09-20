const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  const result = await User.find({});
  res.json(result);
});

router.get("/users", async (req, res) => {
  const result = await User.find({});
  res.json(result);
});

module.exports = router;