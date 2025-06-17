import User from '../../../shared/models/user.model.js';

export const generateUniqueUsername = async (fullName) => {
  const baseUsername = fullName.toLowerCase().replace(/\s+/g, '');

  let username = baseUsername;
  let count = 0;

  while (await User.findOne({ username })) {
    count++;
    username = `${baseUsername}${count}`;
  }

  return username;
};
