'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthLayout from '@/components/auth/auth-layout'
import SignInForm from '@/components/auth/sign-in-form'
import { useAuth } from '@/components/auth/auth-provider'
import type { SignInFormData } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import { FaGoogle } from 'react-icons/fa'

export default function SignInPage() {
  const router = useRouter()
  const { signIn, signInWithOAuth, user } = useAuth()

  // If already signed in, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.replace('/dashboard')
    }
  }, [user, router])

  const handleSignIn = async (data: SignInFormData) => {
    try {
      // Use Supabase authentication via our auth provider
      const { error } = await signIn(data.email, data.password)
      if (error) {
        throw new Error(error)
      }
      router.push('/dashboard')
    } catch (error) {
      // Re-throw error so SignInForm can display it
      throw error
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue">
      <div className="space-y-6">
        {/* OAuth Provider Sign-in */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={async () => {
            const { error } = await signInWithOAuth('google')
            if (error) throw new Error(error)
          }}
        >
          <FaGoogle className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>

        <div className="relative flex items-center justify-center">
          <span className="text-xs text-neutral-500 px-2 bg-neutral-900/60">or</span>
          <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-800 -z-10" />
        </div>

        <SignInForm onSubmit={handleSignIn} />

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-neutral-400">
            Don&apos;t have an account?{' '}
            <Link href="/auth/sign-up" className="text-white hover:text-neutral-300 underline transition-colors">
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
