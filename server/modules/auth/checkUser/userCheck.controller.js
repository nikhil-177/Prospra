import User from '../../../shared/models/user.model.js';
import AppError from '../../../shared/utils/appError.js';

export const checkIfExists = async (req, res, next) => {
  if (!req.query.value) {
    throw new AppError('Provide "value" as a query parameter', 400);
  }
  const value = req.query.value;
  try {
    const user = await User.findOne({
      $or: [{ username: value }, { email: value }],
    });

    res.status(200).json({ exists: !!user });
  } catch (error) {
    next(erroor);
  }
};
