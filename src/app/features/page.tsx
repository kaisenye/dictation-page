import Navbar from '@/components/Navbar'

export default function Features() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Content */}
      <div className="container mx-auto px-4 pt-36 pb-24">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">What do you get?</h1>

          <div className="grid md:grid-cols-1 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Local AI Assistant</h3>
              <p className="text-gray-300">
                Powerful AI capabilities that run entirely on your device. No internet required, no data sent to
                servers.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Voice Dictation</h3>
              <p className="text-gray-300">
                Convert your speech to text with high accuracy. Perfect for writing, note-taking, and accessibility.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Privacy Focused</h3>
              <p className="text-gray-300">
                Your data never leaves your device. All processing happens locally, ensuring complete privacy.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Mac Optimized</h3>
              <p className="text-gray-300">
                Built specifically for macOS with native performance. Supports both Apple Silicon and Intel processors.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Offline Capable</h3>
              <p className="text-gray-300">
                Works completely offline. No internet connection required for any features.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Easy Integration</h3>
              <p className="text-gray-300">Seamlessly integrates with your existing workflow and applications.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
