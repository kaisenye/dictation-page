'use client'

import { useState } from 'react'
import AuthLayout from '@/components/auth/auth-layout'
import SignInForm from '@/components/auth/sign-in-form'
import SignUpForm from '@/components/auth/sign-up-form'
import { Button } from '@/components/ui/button'
import type { SignInFormData, SignUpFormData } from '@/lib/validations/auth'

export default function TestPage() {
  const [currentForm, setCurrentForm] = useState<'signin' | 'signup'>('signin')

  const handleSignIn = async (data: SignInFormData) => {
    console.log('Sign in data:', data)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (data.email === 'error@test.com') {
      throw new Error('Invalid credentials')
    }

    alert(`Sign in successful! Email: ${data.email}`)
  }

  const handleSignUp = async (data: SignUpFormData) => {
    console.log('Sign up data:', data)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (data.email === 'taken@test.com') {
      throw new Error('Email already exists')
    }

    alert(`Account created! Welcome ${data.name}!`)
  }

  return (
    <AuthLayout
      title={currentForm === 'signin' ? 'Sign In Test' : 'Sign Up Test'}
      subtitle="Testing our auth form components"
    >
      <div className="space-y-4">
        {/* Form Toggle */}
        <div className="flex gap-2 p-1 bg-neutral-800 rounded-lg">
          <Button
            variant={currentForm === 'signin' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentForm('signin')}
            className="flex-1"
          >
            Sign In
          </Button>
          <Button
            variant={currentForm === 'signup' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentForm('signup')}
            className="flex-1"
          >
            Sign Up
          </Button>
        </div>

        {/* Forms */}
        {currentForm === 'signin' ? <SignInForm onSubmit={handleSignIn} /> : <SignUpForm onSubmit={handleSignUp} />}
      </div>
    </AuthLayout>
  )
}
