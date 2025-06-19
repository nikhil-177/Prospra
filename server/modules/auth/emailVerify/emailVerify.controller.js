import Otp from '../../../shared/models/otp.model.js';
import User from '../../../shared/models/user.model.js';

export const verifyEmailWithOtpCode = async (req, res, next) => {
  try {
    if (!req.body || !req.body.otp) {
      throw new AppError('Please provide the OTP sent to your email.', 400);
    }

    const { username } = req.user;
    const { otp } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (user.isVerified) {
      throw new AppError('Your email is already verified.', 400);
    }

    const otpDoc = await Otp.findOne({ email: user.email });

    if (!otpDoc) {
      throw new AppError(
        'OTP expired or not found. Please request a new one.',
        404
      );
    }

    // Check if locked due to repeated failures
    if (otpDoc.lockedUntil && otpDoc.lockedUntil > Date.now()) {
      const minutesLeft = (otpDoc.lockedUntil - Date.now()) / 60000;
      throw new AppError(
        `Too many failed attempts. Try again in ${minutesLeft} minutes.`,
        429
      );
    }

    const isMatch = await otpDoc.compareOtp(otp);
    if (!isMatch) {
      otpDoc.retryCount += 1;

      if (otpDoc.retryCount >= 3) {
        otpDoc.lockedUntil = Date.now() + 60 * 60 * 1000;
      }

      await otpDoc.save();
      throw new AppError('Invalid OTP. Please try again.', 400);
    }

    user.isVerified = true;
    await user.save();

    await otpDoc.deleteOne();

    return res.status(200).json({
      message: 'Your email has been successfully verified!',
    });
  } catch (error) {
    next(error);
  }
};
