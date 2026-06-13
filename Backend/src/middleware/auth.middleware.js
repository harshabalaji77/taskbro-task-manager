import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const getTokenFromRequest = (req) => {
  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const protect = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Middleware Auth Error:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export default protect;