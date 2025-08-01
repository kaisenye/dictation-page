import { Button } from '@/components/ui/button'
import { ArrowDown, Zap } from 'lucide-react'
import { FaApple } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      {/* Video Banner Section - Full Screen */}
      <section className="relative h-full w-full">
        {/* Video Background */}
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/demo.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900"></div>
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          {/* Logo and Title */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Your Digital Companion</h1>
            <p className="font-semibold text-sm md:text-sm lg:text-lg text-neutral-400 max-w-2xl mx-auto">
              local AI assistant, dictation, and a friendly companion.
            </p>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-12">
            <Button variant="secondary" size="sm" className="flex items-center justify-center bg-neutral-50 text-black">
              <FaApple className="w-4 h-4 md:w-5 md:h-5 mr-1" />
              Mac (Apple Silicon)
            </Button>
            <Button variant="secondary" size="sm" className="flex items-center justify-center bg-neutral-50 text-black">
              <FaApple className="w-4 h-4 md:w-5 md:h-5 mr-1" />
              Mac (Intel)
            </Button>
          </div>

          {/* Footer content integrated into main section */}
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-sm font-bold text-white">romo.</span>
            </div>
            <p className="text-xs text-gray-400 mb-1">we value your privacy, so we build locally.</p>
            <p className="text-xs text-gray-500">&copy; 2025 Romo. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
