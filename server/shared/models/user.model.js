import mongoose from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegex.test(value);
        },
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'This username is already taken, Try a different one'],
    },
    profileImg: {
      type: String,
      validate: {
        validator: function (value) {
          const urlRegex =
            /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
          return urlRegex.test(value);
        },
        message: 'Invalid profile image URL',
      },
    },
    role: {
      type: [String],
      enum: ['client', 'freelancer'],
      default: ['client'],
    },
    activeRole: {
      type: String,
      enum: ['client', 'freelancer'],
      default: 'client',
    },
    provider: { type: [String], enum: ['email', 'google'], default: ['email'] },
    providerId: String,
    refreshToken: { type: String, select: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  return next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
