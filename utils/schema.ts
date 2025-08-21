import { z } from 'zod/v4';

const AUS_PHONE_REGEX = /^(\+?61|0)[2-478]( ?|-?\d){8}$/;

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

export const ForgetPasswordSchema = z.object({
  email: z.email('Invalid email'),
});

export const UpdateUserSchema = z.object({
  email: z.email('Invalid email'),
  phone: z.string().regex(AUS_PHONE_REGEX, 'Invalid phone number'),
  fullName: z.string().min(3, 'Name should at least be 3 characters'),
});
