import User from '../../../shared/models/user.model.js';
import AppError from '../../../shared/utils/appError.js';
import { sendCookiesAndRecieveToken } from '../utils/sendCookiesAndToken.js';

export const loginUser = async (req, res, next) => {
  const { identifier, password } = req.validatedData;
  try {
    // check if user exists
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select('+password');

    // if user not exists
    if (!user) {
      throw new AppError('No user found with the credential you gave', 404);
    }

    //check password
    const isPasswordCorrect = await user.comparePassword(password);
    
    // if wrong password
    if (!isPasswordCorrect) {
      throw new AppError('No user found with the credential you gave', 404);
    }

    // send cookies and generate token
    const { accessToken, refreshToken } = sendCookiesAndRecieveToken(
      user.username,
      user.activeRole,
      res
    );

    // save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // final response
    return res.status(200).json({
      message: `Welcome Back, ${user.username}`,
      data: {
        email: user.email,
        username: user.username,
        profileImg: user.profileImg,
        isVerified: user.isVerified,
        _id: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        activeRole: user.activeRole,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
