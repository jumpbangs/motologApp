import { z } from 'zod/v4';

// const AUS_PHONE_REGEX = /^(\+?61|0)[2-478]( ?|-?\d){8}$/;

/**
 * Validation Schema for SignUp
 *
 * @property {string} email - Must be a valid email
 * @property {string} password - Must be at least 6 characters.
 * @property {string} repeat_pass - Must match 'password'
 *
 */
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

/**
 *  Validation Schema for Reset Password
 *
 *  @property {string} email - Must be a valid email
 *  @property {string} currentPass - Current user's password
 *  @property {string} newPassword - Change password must be different from current password
 *
 */
export const ResetPasswordSchema = z
  .object({
    email: z.email('Invalid email'),
    currentPass: z.string().min(6, 'Password must be at least 6 characters'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .refine(data => data.currentPass !== data.newPassword, {
    path: ['newPassword'],
    message: 'New password must be different from current password',
  });

/**
 *  Validation Schema for Login
 *
 *  @property {string} email - Must be a valid email
 *  @property {string} password - Password must be 6 characters long
 *
 */
export const LoginInSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password are at 6 characters long'),
});

/**
 *  Validation Schema for Forget password
 *
 *  @property {string} email - Must be a valid email
 *
 */
export const ForgetPasswordSchema = z.object({
  email: z.email('Invalid email'),
});

/**
 *  Validation Schema fro Updating User Details
 *
 *  @property {string} fullName - User's full name
 *  @property {string} street - Street name
 *  @property {string} city - City name (suburb)
 *  @property {string} postCode - 4 digit post-code
 */
export const UpdateUserSchema = z.object({
  fullName: z.string().min(3, 'Name should at least be 3 characters').or(z.literal('')).optional(),
  street: z
    .string()
    .min(3, 'Street must be at least 3 characters long')
    .or(z.literal(''))
    .optional(),
  city: z.string().min(3, 'City must be at least 3 characters long').or(z.literal('')).optional(),
  postCode: z
    .string()
    .regex(/^\d{4}$/, 'Postcode must be 4 digits')
    .or(z.literal(''))
    .optional(),
});

/**
 *  Validation schema when adding Log details
 *
 *  @property {string} location
 *  @property {string} brand
 *  @property {number} rate
 *  @property {number} total_kms_covered
 *  @property {number} total_fuel_liters
 *  @property {boolean} discount_used
 *
 */
export const LogSchema = z.object({
  location: z.string().min(3, 'Name should at least be 3 characters').or(z.literal('')).optional(),
  brand: z.string().min(2, 'Name should at least be 2 characters').or(z.literal('')).optional(),
  rate: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Enter a valid number (max 2 decimals)')
    .transform(Number),
  total_kms_covered: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Enter a valid number (max 2 decimals)')
    .transform(Number),
  total_fuel_liters: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Enter a valid number (max 2 decimals)')
    .transform(Number),
  discount_used: z.boolean(),
});
