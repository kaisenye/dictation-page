"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import AuthLayout from "@/components/auth/auth-layout"
import SignUpForm from "@/components/auth/sign-up-form"
import { useAuth } from "@/components/auth/auth-provider"
import type { SignUpFormData } from "@/lib/validations/auth"

export default function SignUpPage() {
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      console.log("Sign up attempt:", data)
      
      // Use Supabase authentication via our auth provider
      // Note: confirmPassword is handled by client-side validation, 
      // we don't need to send it to Supabase
      const { error } = await signUp(data.email, data.password, data.name)
      
      if (error) {
        throw new Error(error)
      }
      
      // Success! User account created
      // Supabase might require email verification, so redirect appropriately
      router.push("/dashboard")
      
    } catch (error) {
      // Re-throw error so SignUpForm can display it
      throw error
    }
  }

  return (
    <AuthLayout 
      title="Create your account" 
      subtitle="Join us and start your journey"
    >
      <div className="space-y-6">
        <SignUpForm onSubmit={handleSignUp} />
        
        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-neutral-400">
            Already have an account?{" "}
            <Link 
              href="/auth/sign-in" 
              className="text-white hover:text-neutral-300 underline transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center">
          <p className="text-xs text-neutral-400">
            By creating an account, you agree to our{" "}
            <Link 
              href="/terms" 
              className="underline hover:text-neutral-300 transition-colors"
            >
              Terms of Service
            </Link>
            {" "}and{" "}
            <Link 
              href="/privacy" 
              className="underline hover:text-neutral-300 transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}