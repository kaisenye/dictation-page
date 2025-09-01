import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Navbar from '@/components/Navbar'
import { FaApple } from 'react-icons/fa'
import { MdOutlineMarkEmailUnread } from 'react-icons/md'

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Content */}
      <div className="container mx-auto px-4 pt-36 pb-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            No Pricing... <span className="text-neutral-400">Yet</span>
          </h1>

          <div className="text-center mb-12">
            <p className="text-base text-gray-300">Try it out first, it&apos;s free!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-xl mx-auto">
            {/* Free Tier */}
            <div className="bg-neutral-900/50 p-8 rounded-lg border border-neutral-800 text-center">
              <h2 className="text-xl font-bold mb-2">Basic</h2>
              <div className="text-3xl font-bold mb-2">$0</div>
              <p className="text-neutral-400 mb-6">Free</p>

              <ul className="flex flex-col align-center justify-center text-center gap-3 mb-8">
                <li className="flex justify-center items-center">Smart Dictation</li>
                <li className="flex justify-center items-center">Privacy Focused</li>
                <li className="flex justify-center items-center">Offline Capable</li>
                <li className="flex justify-center items-center">No Subscription</li>
              </ul>
              <Button variant="default" className="w-full">
                <FaApple className="size-4 mr-0.5" />
                Download Free
              </Button>
            </div>

            {/* Pro Tier */}
            <div className="bg-neutral-900/50 p-8 rounded-lg border border-neutral-800 text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-neutral-800 text-neutral-100 px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2">Agent</h2>
              <div className="text-3xl font-bold mb-2 text-neutral-600">??</div>
              <p className="text-neutral-400 mb-6">Coming Soon</p>

              <ul className="flex flex-col align-center justify-center gap-3 mb-8">
                <li className="flex justify-center items-center text-lime-300 font-bold">AI Agent Mode</li>
                <li className="flex justify-center items-center">Everything in Free</li>
                <li className="flex justify-center items-center">Lifetime Updates</li>
                <li className="flex justify-center items-center">Cancel Anytime</li>
              </ul>

              <div className="space-y-3">
                <Button variant="secondary" className="w-full font-semibold">
                  <MdOutlineMarkEmailUnread className="size-4 mr-0.5 mt-0.5" />
                  Join Waitlist
                </Button>
              </div>
            </div>
          </div>

          <div className="text-sm text-center mt-8 text-neutral-400">
            <p>We make this AI dictation tool free where alternatives cost $10+ per month.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
