import { z } from 'zod/v4';

const REQ_FIELD = 'Field is required';

export const SignUpSchema = z
  .object({
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    repeat_pass: z.string().min(6, 'Please repeat your password'),
  })
  .refine(data => data.password === data.repeat_pass, {
    path: ['repeat_pass'],
    message: 'Passwords do not match',
  });

export const LoginInSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password are at 6 characters long'),
});
