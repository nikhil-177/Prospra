import User from '../../../shared/models/user.model.js';
import AppError from '../../../shared/utils/appError.js';
import jwt from 'jsonwebtoken';
import { sendCookiesAndRecieveToken } from '../utils/sendCookiesAndToken.js';

export const refreshingTheTokens = async (req, res, next) => {
  // check if token provided
  if (!req.cookies.refreshToken) {
    throw new AppError('cookies: Refresh token not provided', 400);
  }

  // token
  const token = req.cookies.refreshToken;

  try {
    // verify token
    const verifiedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // find user with verifiedToken's payload
    const user = await User.findOne({ username: verifiedToken.username }).select('+refreshToken');

    // it user not found
    if (!user) {
      throw new AppError('User not found with the token you provided', 404);
    }

    // if token not eaual to token we saved in database
    if (user.refreshToken !== token) {
      throw new AppError('Token malformed', 400);
    }

    // generate tokens and send cookies
    const { accessToken, refreshToken } = sendCookiesAndRecieveToken(
      user.username,
      user.activeRole,
      res
    );

    // save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // final response
    return res
      .status(200)
      .json({ message: 'Tokens refetched successfully', accessToken });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new AppError('Invalid refresh Token', 400);
    } else if (error.name === 'TokenExpiredError') {
      throw new AppError('Refresh Token expired', 400);
    } else {
      next(error);
    }
  }
};
