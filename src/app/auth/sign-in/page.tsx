"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import AuthLayout from "@/components/auth/auth-layout"
import SignInForm from "@/components/auth/sign-in-form"
import type { SignInFormData } from "@/lib/validations/auth"

export default function SignInPage() {
  const router = useRouter()

  const handleSignIn = async (data: SignInFormData) => {
    try {
      // TODO: Replace with actual API call to your backend
      console.log("Sign in attempt:", data)
      
      // Simulate API call
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Sign in failed")
      }

      // TODO: Store auth tokens (localStorage, cookies, or state management)
      // const result = await response.json()
      // localStorage.setItem("accessToken", result.accessToken)
      
      // Redirect to dashboard or home page
      router.push("/dashboard") // Adjust redirect path as needed
      
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