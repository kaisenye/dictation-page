import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Crown } from 'lucide-react'

export default function BillingTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white mb-2">Billing & Invoices</h1>
        <p className="text-neutral-400 text-sm">Manage your billing information and view invoice history.</p>
      </div>

      <Card className="bg-neutral-800 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center mr-3">
                  <span className="text-xs font-bold text-white">VISA</span>
                </div>
                <div>
                  <div className="text-white">•••• •••• •••• 4242</div>
                  <div className="text-sm text-neutral-400">Expires 12/25</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-neutral-800 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: 'Sep 13, 2025', amount: '$20.00', status: 'Paid' },
              { date: 'Aug 13, 2025', amount: '$20.00', status: 'Paid' },
              { date: 'Jul 13, 2025', amount: '$20.00', status: 'Paid' },
            ].map((invoice, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-neutral-800 last:border-b-0"
              >
                <div>
                  <div className="text-white font-medium">{invoice.date}</div>
                  <div className="text-sm text-neutral-400">Pro Plan - Monthly</div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-white font-medium">{invoice.amount}</span>
                  <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">{invoice.status}</span>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
