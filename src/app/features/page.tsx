import Navbar from '@/components/Navbar'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import AppLogosScroller from '@/components/AppLogosScroller'

export default function Features() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Content */}
      <div className="container mx-auto px-4 pt-36 pb-48">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">Just Speak.</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-neutral-900/50 border-neutral-800">
              <CardContent className="px-8">
                <div className="mb-4">
                  <img
                    src="/images/feature-1.png"
                    alt="Local AI Assistant"
                    className="w-full rounded-lg mb-6 object-cover"
                  />
                  <CardTitle className="text-2xl font-semibold text-white">Local AI Models</CardTitle>
                </div>
                <CardDescription className="text-base text-neutral-400">
                  Say goodbye to cloud delays and privacy concerns. Everything runs right on your Mac — fast, secure,
                  and offline.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/50 border-neutral-800">
              <CardContent className="px-8">
                <div className="mb-4">
                  <img
                    src="/images/feature-2.png"
                    alt="Local AI Assistant"
                    className="w-full rounded-lg mb-6 object-cover"
                  />
                  <CardTitle className="text-2xl font-semibold text-white">Smart Voice Dictation</CardTitle>
                </div>
                <CardDescription className="text-base text-neutral-400">
                  It doesn't just transcribe — it listens. Autocorrects typos, formats as you speak, and adapts to how
                  you write emails, to-dos, or blog posts.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/50 border-neutral-800">
              <CardContent className="px-8">
                <div className="mb-4">
                  <div className="mb-6">
                    <AppLogosScroller />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-white">Fits Right In</CardTitle>
                </div>
                <CardDescription className="text-base text-neutral-400">
                  Drop your notes into Notion or Obsidian, email drafts into Gmail or Outlook, or tasks into Linear or
                  Jira. It plays nice with your workflow.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/50 border-neutral-800">
              <CardContent className="px-8">
                <div className="mb-4">
                  <img
                    src="/images/feature-3.png"
                    alt="Local AI Assistant"
                    className="w-full rounded-lg mb-6 object-cover"
                  />
                  <CardTitle className="text-2xl font-semibold text-white">Truly Offline</CardTitle>
                </div>
                <CardDescription className="text-base text-neutral-400">
                  No internet? No problem. Dictate anywhere — airplane, cabin, basement bunker. Your data stays with
                  you, always.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

