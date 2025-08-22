"use client"

import { useAuth } from '@/components/auth/auth-provider'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold">Welcome to Dashboard!</h1>
        
        {user && (
          <div className="space-y-4">
            <p className="text-neutral-300">
              Hello, <span className="text-white font-semibold">{user.user_metadata?.name || user.email}</span>
            </p>
            <p className="text-sm text-neutral-400">
              Email: {user.email}
            </p>
            <p className="text-sm text-neutral-400">
              User ID: {user.id}
            </p>
            
            <Button 
              onClick={handleSignOut}
              className="w-full mt-6"
              variant="outline"
            >
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}