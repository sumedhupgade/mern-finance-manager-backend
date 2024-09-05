const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;
  console.log(req.body)
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const new_user = new User({ username, email, password: hashedPassword });
  await new_user.save();
  const token = jwt.sign({ id: new_user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  console.log(new_user);
  res.status(200).json({
    token,
    user: {
      id: new_user.id,
      username: new_user.username,
      email: new_user.email,
    },
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
