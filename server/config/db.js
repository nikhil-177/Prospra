import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Db connected`);
  } catch (error) {
    console.log(`Database connection error : ${error}`);
    process.exit(1);
  }
};
