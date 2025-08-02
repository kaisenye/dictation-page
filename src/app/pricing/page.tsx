import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Navbar from '@/components/Navbar'
import { FaApple } from 'react-icons/fa'
import { RiVipDiamondFill } from 'react-icons/ri'

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Content */}
      <div className="container mx-auto px-4 pt-36 pb-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Buy me a <span className="text-neutral-700">few cups of</span> coffee(s)?
          </h1>

          <div className="text-center mb-12">
            <p className="text-base text-gray-300">well, try it out first, it&apos;s free!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-xl mx-auto">
            {/* Free Tier */}
            <div className="bg-neutral-900/50 p-8 rounded-lg border border-neutral-800 text-center">
              <h2 className="text-xl font-bold mb-2">Free</h2>
              <div className="text-3xl font-bold mb-2">$0</div>
              <p className="text-neutral-400 mb-6">Forever free</p>

              <ul className="flex flex-col align-center justify-center text-center gap-3 mb-8">
                <li className="flex justify-center items-center">Smart Dictation</li>
                <li className="flex justify-center items-center">Privacy Focused</li>
                <li className="flex justify-center items-center">Offline Capable</li>
              </ul>

              <div className="space-y-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <FaApple className="size-4 mr-0.5" />
                      Download Free
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52 bg-black border-neutral-700">
                    <DropdownMenuItem className="text-white hover:bg-neutral-800 cursor-pointer">
                      <FaApple className="size-4 mr-2" />
                      Apple Silicon
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-neutral-800 cursor-pointer">
                      <FaApple className="size-4 mr-2" />
                      Intel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Pro Tier */}
            <div className="bg-neutral-900/50 p-8 rounded-lg border border-neutral-800 text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-neutral-800 text-neutral-100 px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2">Pro</h2>
              <div className="text-3xl font-bold mb-2">$29</div>
              <p className="text-neutral-400 mb-6">One-time purchase</p>

              <ul className="flex flex-col align-center justify-center gap-3 mb-8">
                <li className="flex justify-center items-center">Everything in Free</li>
                <li className="flex justify-center items-center text-indigo-300 font-bold">AI Agent Mode</li>
                <li className="flex justify-center items-center">Lifetime Updates</li>
              </ul>

              <div className="space-y-3">
                <Button variant="default" className="w-full font-semibold">
                  <RiVipDiamondFill className="size-4 mr-0.5 mt-0.5" />
                  Get Pro
                </Button>
              </div>
            </div>
          </div>

          <div className="text-sm text-center mt-8 text-neutral-400">
            <p>No subscription • No hidden costs</p>
          </div>
        </div>
      </div>
    </div>
  )
}
