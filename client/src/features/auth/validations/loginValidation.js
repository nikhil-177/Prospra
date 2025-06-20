import { z } from 'zod';

export const loginValidator = z.object({
  identifier: z.string().min(1, 'Email or any username is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});
