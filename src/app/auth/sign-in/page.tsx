"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import AuthLayout from "@/components/auth/auth-layout"
import SignInForm from "@/components/auth/sign-in-form"
import { useAuth } from "@/components/auth/auth-provider"
import type { SignInFormData } from "@/lib/validations/auth"

export default function SignInPage() {
  const router = useRouter()
  const { signIn } = useAuth()

  const handleSignIn = async (data: SignInFormData) => {
    try {
      console.log("Sign in attempt:", data)
      
      // Use Supabase authentication via our auth provider
      const { error } = await signIn(data.email, data.password)
      
      if (error) {
        throw new Error(error)
      }
      
      // Success! User will be automatically redirected by middleware
      // to protected pages, but we can also manually redirect
      router.push("/dashboard")
      
    } catch (error) {
      // Re-throw error so SignInForm can display it
      throw error
    }
  }

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to your account to continue"
    >
      <div className="space-y-6">
        <SignInForm onSubmit={handleSignIn} />
        
        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-neutral-400">
            Don&apos;t have an account?{" "}
            <Link 
              href="/auth/sign-up" 
              className="text-white hover:text-neutral-300 underline transition-colors"
            >
              Create one here
            </Link>
          </p>
        </div>

        {/* Forgot Password Link */}
        <div className="text-center">
          <Link 
            href="/auth/forgot-password" 
            className="text-sm text-neutral-400 hover:text-neutral-300 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}