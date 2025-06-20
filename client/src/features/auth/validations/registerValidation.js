import { z } from 'zod';

export const registerValidator = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email({ message: 'Must be a valid email' }),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, { message: 'Password must be at least 6 characters long' }),
  username: z.string({ required_error: 'Username is required' }),
});
