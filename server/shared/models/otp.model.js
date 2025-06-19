import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    retryCount: {
      type: Number,
      default: 1,
    },
    lockedUntil: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

OtpSchema.index({ lockedUntil: 1 }, { expireAfterSeconds: 0 });

// Pre-save hook to hash OTP if modified
OtpSchema.pre('save', async function (next) {
  if (!this.isModified('otp')) return next();
  const salt = await bcrypt.genSalt(10);
  this.otp = await bcrypt.hash(this.otp, salt);
  next();
});

// Instance method to compare OTP
OtpSchema.methods.compareOtp = async function (candidateOtp) {
  return await bcrypt.compare(candidateOtp, this.otp);
};

const Otp = mongoose.model('Otp', OtpSchema);

export default Otp;
