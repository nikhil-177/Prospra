import AppError from '../utils/appError.js';
import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    throw new AppError('headers : Provide access token', 401);
  }
  if (!req.headers.authorization.startsWith('Bearer ')) {
    throw new AppError('headers : Invalid authorization format', 401);
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = verifiedToken;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new AppError('Invalid access Token', 401);
    } else if (error.name === 'TokenExpiredError') {
      throw new AppError('Access Token expired', 401);
    } else {
      next(error);
    }
  }
};
