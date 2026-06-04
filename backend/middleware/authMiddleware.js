// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Inject the user object (minus the password hash) into the request context
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Security check failed: Token validation corrupted' });
    }
  }
  if (!token) return res.status(401).json({ message: 'Authorization rejected: Access token token missing' });
};

// Multi-Tenant Gatekeeper Filter Engine
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access Denied: Role [${req.user.role}] unauthorized for this pipeline.` });
    }
    next();
  };
};