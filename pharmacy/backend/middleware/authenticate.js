const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization failed: No token provided' });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.userData = { userId: user._id, role: user.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authorization failed: Invalid token' });
  }
};

module.exports = { authenticate };
