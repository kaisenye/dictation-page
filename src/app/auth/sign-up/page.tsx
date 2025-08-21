"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import AuthLayout from "@/components/auth/auth-layout"
import SignUpForm from "@/components/auth/sign-up-form"
import type { SignUpFormData } from "@/lib/validations/auth"

export default function SignUpPage() {
  const router = useRouter()

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      // TODO: Replace with actual API call to your backend
      console.log("Sign up attempt:", data)
      
      // Remove confirmPassword before sending to API
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...apiData } = data
      
      // Simulate API call
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Account creation failed")
      }

      // TODO: Store auth tokens (localStorage, cookies, or state management)
      // const result = await response.json()
      // localStorage.setItem("accessToken", result.accessToken)
      
      // Redirect to onboarding, dashboard, or email verification
      router.push("/welcome") // Adjust redirect path as needed
      
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