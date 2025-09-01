"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { InputWithValidation } from "@/components/ui/input-with-validation"
import { Label } from "@/components/ui/label"
import { signInSchema, type SignInFormData } from "@/lib/validations/auth"

interface SignInFormProps {
  onSubmit: (data: SignInFormData) => Promise<void>
  isLoading?: boolean
}

export default function SignInForm({ onSubmit, isLoading = false }: SignInFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur", // Validate when user leaves a field
  })

  // Watch fields for validation feedback
  const watchedFields = watch()
  const email = watchedFields.email
  const password = watchedFields.password

  // Helper function to check if field is valid
  const isFieldValid = (fieldName: keyof SignInFormData, value: string) => {
    if (!value) return false
    try {
      switch (fieldName) {
        case "email":
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        case "password":
          return value.length > 0
        default:
          return false
      }
    } catch {
      return false
    }
  }

  const onFormSubmit = async (data: SignInFormData) => {
    try {
      setSubmitError(null)
      await onSubmit(data)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An error occurred")
    }
  }

  const isFormDisabled = isLoading || isSubmitting

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <InputWithValidation
          id="email"
          type="email"
          placeholder="Enter your email"
          disabled={isFormDisabled}
          isValid={isFieldValid("email", email || "")}
          hasError={!!errors.email}
          value={email || ""}
          {...register("email")}
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
          placeholder="Enter your password"
          disabled={isFormDisabled}
          isValid={isFieldValid("password", password || "")}
          hasError={!!errors.password}
          value={password || ""}
          {...register("password")}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="text-sm text-red-400" role="alert">
            {errors.password.message}
          </p>
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
      <Button
        type="submit"
        className="w-full"
        disabled={isFormDisabled}
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  )
}