import jwt from 'jsonwebtoken';
import Otp from '../../../shared/models/otp.model.js';
import User from '../../../shared/models/user.model.js';
import AppError from '../../../shared/utils/appError.js';
import { generateOtp } from '../../../shared/utils/generateOtp.js';
import { sendEmail } from '../../../shared/utils/sendEmail.js';

export const checkEmailAndGenerateOtp = async (req, res, next) => {
  if (!req.body || !req.body.email) {
    throw new AppError('Provide "email" in body', 400);
  }
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError('User not found with the email you provided', 404);
    }
    if (!user.isVerified) {
      throw new AppError(
        'You are not verified or linked with email to go through this process',
        400
      );
    }

    let otpExistWithThisEmail = await Otp.findOne({ email });
    const otp = generateOtp();

    if (!otpExistWithThisEmail) {
      await Otp.create({ email, otp, retryCount: 1 });
      await sendEmail({
        to: email,
        subject: 'Otp verification code',
        html: `
            <p>Your forgot password password otp verification code is</p>
            <span>${otp}</span>`,
      });
    } else {
      if (Date.now() - otpExistWithThisEmail.updatedAt > 10 * 60 * 1000) {
        await otpExistWithThisEmail.deleteOne();
        throw new AppError(
          'Your OTP has expired. Please request a new one.',
          400
        );
      }

      if (otpExistWithThisEmail.updatedAt > Date.now() - 2 * 60 * 1000) {
        throw new AppError(
          'You must wait 2 minutes before requesting another OTP.',
          429
        );
      }

      if (
        otpExistWithThisEmail.lockedUntil &&
        otpExistWithThisEmail.lockedUntil > Date.now()
      ) {
        const timeLeft = (
          (otpExistWithThisEmail.lockedUntil - Date.now()) /
          (60 * 1000)
        ).toFixed(0);
        throw new AppError(
          `Too many attempts. Try again in ${timeLeft} minutes`,
          429
        );
      }

      await Otp.findOneAndUpdate(
        { email },
        { otp, retryCount: otpExistWithThisEmail.retryCount + 1 }
      );
    }

    return res.status(200).json({ message: 'OTP has been sent to your email' });
  } catch (error) {
    next(error);
  }
};

export const verifyOtpAndReturnTempToken = async (req, res, next) => {
  if (!req.body.email || !req.body.otp) {
    throw new AppError('Provide both "email" and "otp" in body', 400);
  }
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError('User not found with the email you provided', 404);
    }
    const otpExists = await Otp.findOne({ email });

    if (!otpExists) {
      throw new AppError('Otp expired or Not requested', 404);
    }

    if (otpExists.lockedUntil && otpExists.lockedUntil > Date.now()) {
      const minutesLeft = (
        (otpExists.lockedUntil - Date.now()) /
        60000
      ).toFixed(0);
      throw new AppError(
        `Account locked due to failed attempts. Try again in ${minutesLeft} minutes.`,
        429
      );
    }

    const verifiedOtp = await otpExists.compareOtp(otp);
    if (!verifiedOtp) {
      otpExists.retryCount += 1;

      if (otpExists.retryCount >= 3) {
        otpExists.lockedUntil = Date.now() + 60 * 60 * 1000;
      }
      await otpExists.save();
      throw new AppError('Incorrect OTP. Please try again.', 400);
    }

    await otpExists.deleteOne();

    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.TEMP_TOKEN_SECRET,
      { expiresIn: process.env.TEMP_TOKEN_EXPIRY }
    );

    user.resetPasswordToken = resetToken;
    await user.save();

    res.status(200).json({
      message: 'OTP verified. You can now reset your password.',
      resetToken,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  if (!req.body.resetToken || !req.body.newPassword) {
    throw new AppError(
      'Provide both "resetToken" and "newPassword" in body',
      400
    );
  }

  if (req.body.newPassword.length <= 6) {
    throw new AppError('New Password must be minimum 6 characters long', 400);
  }

  const { resetToken, newPassword } = req.body;

  try {
    const verifiedToken = jwt.verify(resetToken, process.env.TEMP_TOKEN_SECRET);

    const user = await User.findById(verifiedToken.userId).select('+password');

    if (!user) {
      throw new AppError(
        'This token is no longer valid or the user no longer exists.',
        404
      );
    }
    if (user.resetPasswordToken !== resetToken) {
      throw new AppError('Invalid or mismatched token.', 400);
    }

    user.resetPasswordToken = undefined;
    user.password = newPassword;
    await user.save();

    res
      .status(200)
      .json({ message: 'Your password has been reset successfully.' });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new AppError('Invalid reset Token', 400);
    } else if (error.name === 'TokenExpiredError') {
      throw new AppError('Reset Token expired', 400);
    } else {
      next(error);
    }
  }
};
