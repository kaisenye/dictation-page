import { z } from 'zod';

// Base field validators - reusable pieces
const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one lowercase letter, one uppercase letter, and one number'
  );

const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(
    /^[a-zA-Z\s'-]+$/,
    'Name can only contain letters, spaces, hyphens, and apostrophes'
  );

// Sign In Form Schema
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'), // Less strict for sign-in
});

// Sign Up Form Schema
export const signUpSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // This error will appear on the confirmPassword field
  });

// API Request Schemas (what we send to backend)
export const signInRequestSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

export const signUpRequestSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Type inference - automatically generate TypeScript types from schemas
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInRequestData = z.infer<typeof signInRequestSchema>;
export type SignUpRequestData = z.infer<typeof signUpRequestSchema>;
