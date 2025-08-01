import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Content */}
      <div className="container mx-auto px-4 pt-36 pb-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Pricing</h1>

          <div className="text-center mb-12">
            <p className="text-base text-gray-300">Simple. One-time purchase.</p>
          </div>

          <div className="max-w-xs mx-auto">
            <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 text-center">
              <div className="text-4xl font-bold mb-2">$29</div>
              <p className="text-gray-400 mb-6">One-time purchase</p>

              {/* <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center justify-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Local AI Assistant
                </li>
                <li className="flex items-center justify-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Voice Dictation
                </li>
                <li className="flex items-center justify-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Privacy Focused
                </li>
                <li className="flex items-center justify-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Offline Capable
                </li>
                <li className="flex items-center justify-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Lifetime Updates
                </li>
                <li className="flex items-center justify-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Mac Optimized
                </li>
              </ul> */}

              <div className="space-y-3">
                <Button variant="default" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-gray-400">
            <p>No subscription fees • No hidden costs</p>
          </div>
        </div>
      </div>
    </div>
  )
}
