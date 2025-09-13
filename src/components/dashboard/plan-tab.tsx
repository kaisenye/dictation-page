import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Crown } from 'lucide-react'

export default function PlanTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white mb-2">Plans</h1>
        <p className="text-neutral-400 text-sm">Manage your plans and billing information.</p>
      </div>

      <Card className="bg-neutral-800 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">Current Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <span className="text-white font-medium">Pro Plan</span>
                </div>
                <p className="text-sm text-neutral-400 mt-1">Unlimited Tab completions, extended Agent limits</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">$20</div>
                <div className="text-sm text-neutral-400">per month</div>
              </div>
            </div>
            <div className="pt-4 border-t border-neutral-800">
              <Button variant="outline" className="mr-3">
                Change Plan
              </Button>
              <Button variant="ghost" className="text-red-400 hover:text-red-300">
                Cancel Subscription
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
