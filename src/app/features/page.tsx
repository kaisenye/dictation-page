import Navbar from '@/components/Navbar'

export default function Features() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Content */}
      <div className="container mx-auto px-4 pt-36 pb-24">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">What makes it different?</h1>

          <div className="grid md:grid-cols-1 gap-8">
            <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
              <h3 className="text-xl font-semibold mb-3">Local AI Assistant</h3>
              <p className="text-gray-300">
                Say goodbye to cloud delays and privacy concerns. Everything runs right on your Mac — fast, secure, and
                offline.
              </p>
            </div>

            <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
              <h3 className="text-xl font-semibold mb-3">Smarter Voice Dictation</h3>
              <p className="text-gray-300">
                It doesn’t just transcribe — it listens. Autocorrects typos, formats as you speak, and adapts to how you
                write emails, to-dos, or blog posts.
              </p>
            </div>

            <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
              <h3 className="text-xl font-semibold mb-3">Understands Context</h3>
              <p className="text-gray-300">
                Know the difference between a task list and a journal entry. Automatically adjusts tone, structure, and
                punctuation to fit your intent.
              </p>
            </div>

            <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
              <h3 className="text-xl font-semibold mb-3">Built for macOS</h3>
              <p className="text-gray-300">
                Native performance. Zero bloat. Works beautifully on Apple Silicon and Intel — like it was made just for
                your Mac (because it was).
              </p>
            </div>

            <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
              <h3 className="text-xl font-semibold mb-3">Truly Offline</h3>
              <p className="text-gray-300">
                No internet? No problem. Dictate anywhere — airplane, cabin, basement bunker. Your data stays with you,
                always.
              </p>
            </div>

            <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
              <h3 className="text-xl font-semibold mb-3">Fits Right In</h3>
              <p className="text-gray-300">
                Drop your notes into Notion, email drafts into Apple Mail, or tasks into Things. It plays nice with your
                workflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

