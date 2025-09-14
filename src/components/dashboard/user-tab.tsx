import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface UserTabProps {
  user: object
}

export default function UserTab({ user }: UserTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white mb-2">Overview</h1>
        <p className="text-neutral-400 text-sm">
          Unlimited Tab completions, extended Agent limits, and access to most features.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-neutral-800 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">Pro Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-300 mb-4">
              Unlimited Tab completions, extended Agent limits, and access to most features.
            </p>
            <Button variant="outline" className="w-full">
              Manage Subscription
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">On-Demand Usage is Off</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-300 mb-4">Go beyond your plan&apos;s included quota with on-demand usage</p>
            <Button variant="outline" className="w-full">
              Enable On-Demand Usage
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-neutral-800 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">Your Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">—</div>
              <p className="text-neutral-400 text-sm">Total Words</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">—</div>
              <p className="text-neutral-400 text-sm">Total Agent Runs</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-neutral-800 rounded-lg">
            <p className="text-xs text-neutral-400">
              We are working on a new analytics system that will be available in the next few weeks.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
