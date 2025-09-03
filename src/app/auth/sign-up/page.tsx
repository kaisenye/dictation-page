'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthLayout from '@/components/auth/auth-layout'
import SignUpForm from '@/components/auth/sign-up-form'
import { useAuth } from '@/components/auth/auth-provider'
import type { SignUpFormData } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import { FaGoogle } from 'react-icons/fa'

export default function SignUpPage() {
  const router = useRouter()
  const { signUp, signInWithOAuth, user } = useAuth()

  // If already signed in, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.replace('/dashboard')
    }
  }, [user, router])

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      // Use Supabase authentication via our auth provider
      const { error } = await signUp(data.email, data.password, data.name)

      if (error) {
        const lowered = error.toLowerCase()
        if (
          lowered.includes('already registered') ||
          lowered.includes('already exists') ||
          lowered.includes('user exists')
        ) {
          throw new Error('Email already registered. Please sign in instead.')
        }
        throw new Error(error)
      }
      router.push('/dashboard')
    } catch (error) {
      // Re-throw error so SignUpForm can display it
      throw error
    }
  }

  return (
    <AuthLayout title="Create your account" subtitle="Join us and start your journey">
      <div className="space-y-6">
        {/* OAuth Provider Sign-up */}
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

        <SignUpForm onSubmit={handleSignUp} />

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-neutral-400">
            Already have an account?{' '}
            <Link href="/auth/sign-in" className="text-white hover:text-neutral-300 underline transition-colors">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center">
          <p className="text-xs text-neutral-400">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-neutral-300 transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
