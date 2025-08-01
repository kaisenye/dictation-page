import Link from 'next/link'
import { FaRegCircle } from 'react-icons/fa6'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[350px] px-4 py-4">
      <div className="flex items-center justify-center space-x-8 bg-black/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
        <Link
          href="/"
          className="flex items-center justify-center text-white hover:text-gray-300 transition-colors text-sm font-medium"
        >
          <FaRegCircle className="size-full mt-[2px]" />
        </Link>
        <Link href="/about" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
          About
        </Link>
        <Link href="/features" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
          Features
        </Link>
        <Link href="/pricing" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
          Pricing
        </Link>
      </div>
    </nav>
  )
}
