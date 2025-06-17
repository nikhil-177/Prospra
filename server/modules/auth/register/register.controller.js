import User from '../../../shared/models/user.model.js';
import AppError from '../../../shared/utils/appError.js';
import { sendCookiesAndRecieveToken } from '../utils/sendCookiesAndToken.js';

export const registerUser = async (req, res, next) => {
  const data = req.validatedData;

  try {
    // 🧠 Check if either email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });

    if (existingUser) {
      const isEmailTaken = existingUser.email === data.email;
      const isUsernameTaken = existingUser.username === data.username;

      if (isEmailTaken) {
        throw new AppError(
          'Email you provided is already registered, try a different one or log in with it',
          400
        );
      }

      if (isUsernameTaken) {
        throw new AppError(
          'Username you provided is already taken, try a different one',
          400
        );
      }
    }

    // ✅ Create new user
    const user = await User.create(data);

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
    return res.status(201).json({
      message: 'User registered successfully',
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
