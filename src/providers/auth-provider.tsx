'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

// Define what our auth context will provide
interface AuthContextType {
  user: User | null // Current user or null if not authenticated
  loading: boolean // True while checking authentication status
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  signInWithOAuth: (provider: 'google') => Promise<{ error?: string }>
}

// Create the context with undefined default (will be provided by AuthProvider)
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Custom hook to use auth context with error checking
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Provider component that wraps your app and provides auth state
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session when component mounts
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error getting session:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Cleanup subscription when component unmounts
    return () => subscription.unsubscribe()
  }, [supabase])

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error: error.message }
      }

      return {}
    } catch {
      return { error: 'An unexpected error occurred' }
    } finally {
      setLoading(false)
    }
  }

  // Sign up function
  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name, // Store name in user metadata
          },
        },
      })

      if (error) {
        return { error: error.message }
      }

      return {}
    } catch {
      return { error: 'An unexpected error occurred' }
    } finally {
      setLoading(false)
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true)
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  // OAuth sign-in (e.g., Google)
  const signInWithOAuth = async (provider: 'google') => {
    try {
      setLoading(true)
      const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
        },
      })
      if (error) {
        return { error: error.message }
      }
      return {}
    } catch {
      return { error: 'An unexpected error occurred' }
    } finally {
      setLoading(false)
    }
  }

  // Provide auth state and functions to all child components
  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithOAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
