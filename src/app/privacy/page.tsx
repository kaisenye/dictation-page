import Navbar from '@/components/Navbar'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-36 pb-16 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        <div className="space-y-4 text-neutral-300">
          <p>Romo values your privacy. The app is designed to keep your data local to your device.</p>
          <p>We do not collect personal data via the app. If future features require data processing, we’ll disclose it clearly and request consent.</p>
          <p>Contact us if you have questions about privacy.</p>
        </div>
      </div>
    </div>
  )
}

