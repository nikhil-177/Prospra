import cookieParser from 'cookie-parser';
import express from 'express';
import authRoutes from './modules/auth/routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.log(`Error occurred : ${err}`);
  res
    .status(err.statusCode || 500)
    .json({
      message: err.message || 'Something went wrong, Try again later',
      errors: err.errors || undefined,
    });
});

export default app;
