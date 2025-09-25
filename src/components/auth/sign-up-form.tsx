'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { InputWithValidation } from '@/components/ui/input-with-validation';
import { Label } from '@/components/ui/label';
import PasswordStrengthIndicator from '@/components/ui/password-strength-indicator';
import { signUpSchema, type SignUpFormData } from '@/lib/validations/auth';

interface SignUpFormProps {
  onSubmit: (data: SignUpFormData) => Promise<void>;
  isLoading?: boolean;
}

export default function SignUpForm({
  onSubmit,
  isLoading = false,
}: SignUpFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onSubmit', // Only validate when form is submitted
  });

  // Watch all fields for validation feedback
  const watchedFields = watch();
  const password = watchedFields.password;
  const name = watchedFields.name;
  const email = watchedFields.email;
  const confirmPassword = watchedFields.confirmPassword;

  // Helper function to check if field is valid
  const isFieldValid = (fieldName: keyof SignUpFormData, value: string) => {
    if (!value) return false;
    try {
      switch (fieldName) {
        case 'name':
          return value.length >= 2 && /^[a-zA-Z\s'-]+$/.test(value);
        case 'email':
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        case 'password':
          return (
            value.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)
          );
        case 'confirmPassword':
          return value === password && value.length > 0;
        default:
          return false;
      }
    } catch {
      return false;
    }
  };

  const onFormSubmit = async (data: SignUpFormData) => {
    try {
      setSubmitError(null);
      await onSubmit(data);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'An error occurred'
      );
    }
  };

  const isFormDisabled = isLoading || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <InputWithValidation
          id="name"
          type="text"
          placeholder="Enter your full name"
          disabled={isFormDisabled}
          isValid={isFieldValid('name', name || '')}
          hasError={!!errors.name}
          showValidationOnlyAfterSubmit={true}
          isSubmitted={isSubmitted}
          value={name || ''}
          {...register('name')}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-sm text-red-400" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <InputWithValidation
          id="email"
          type="email"
          placeholder="Enter your email"
          disabled={isFormDisabled}
          isValid={isFieldValid('email', email || '')}
          hasError={!!errors.email}
          showValidationOnlyAfterSubmit={true}
          isSubmitted={isSubmitted}
          value={email || ''}
          {...register('email')}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-sm text-red-400" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <InputWithValidation
          id="password"
          type="password"
          placeholder="Create a password"
          disabled={isFormDisabled}
          isValid={isFieldValid('password', password || '')}
          hasError={!!errors.password}
          showValidationOnlyAfterSubmit={true}
          isSubmitted={isSubmitted}
          value={password || ''}
          {...register('password')}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="text-sm text-red-400" role="alert">
            {errors.password.message}
          </p>
        )}
        {/* Password Strength Indicator */}
        {!errors.password && (
          <PasswordStrengthIndicator password={password || ''} />
        )}
        {/* Password Requirements Hint - only show if no password entered */}
        {!errors.password && !password && (
          <p className="text-xs text-neutral-400">
            At least 8 characters with uppercase, lowercase, and number
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <InputWithValidation
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          disabled={isFormDisabled}
          isValid={isFieldValid('confirmPassword', confirmPassword || '')}
          hasError={!!errors.confirmPassword}
          showValidationOnlyAfterSubmit={true}
          isSubmitted={isSubmitted}
          value={confirmPassword || ''}
          {...register('confirmPassword')}
          aria-invalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-400" role="alert">
            {errors.confirmPassword.message}
          </p>
        )}
        {/* Real-time password matching indicator */}
        {password && !errors.confirmPassword && (
          <p className="text-xs text-neutral-400">Passwords match ✓</p>
        )}
      </div>

      {/* Submit Error */}
      {submitError && (
        <div className="p-3 bg-red-900/20 border border-red-800 rounded-md">
          <p className="text-sm text-red-400" role="alert">
            {submitError}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isFormDisabled}>
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  );
}
