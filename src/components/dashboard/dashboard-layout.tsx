'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { Button } from '@/components/ui/button'
import { User, CreditCard, Sparkle, LogOut, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import UserTab from './user-tab'
import PlanTab from './plan-tab'
import BillingTab from './billing-tab'

type TabType = 'user' | 'plan' | 'billing'

const tabs = [
  { id: 'user' as TabType, label: 'Overview', icon: User },
  { id: 'plan' as TabType, label: 'Plans', icon: Sparkle },
  { id: 'billing' as TabType, label: 'Billing & Invoices', icon: CreditCard },
]

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState<TabType>('user')
  const router = useRouter()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.replace('/auth/sign-in')
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'user':
        return <UserTab user={user} />
      case 'plan':
        return <PlanTab />
      case 'billing':
        return <BillingTab />
      default:
        return <UserTab user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white pt-6">
      <div className="flex justify-center h-90vh max-w-7xl mx-auto">
        {/* Sidebar */}
        <div className="w-78 bg-neutral-900 flex flex-col mt-4">
          {/* User Info */}
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.user_metadata?.name || 'User'}</p>
                <div className="flex flex-row gap-2 text-sm text-neutral-400 truncate">
                  <div className="text-neutral-400 truncate">Pro Plan</div>
                  <div className="text-neutral-400 truncate">kaisen.ye@usc.edu</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center space-x-4 px-3 py-2.5 text-left rounded-sm transition-colors cursor-pointer hover:bg-neutral-800',
                    activeTab === tab.id
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              )
            })}

            <Button variant="ghost" className="w-full justify-start gap-4 mt-6">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">Contact Us</span>
            </Button>

            <Button variant="destructiveGhost" onClick={handleSignOut} className="w-full justify-start gap-4">
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Log Out</span>
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  )
}
