const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res,next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user; // Store user data in request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
};

module.exports = authMiddleware;
