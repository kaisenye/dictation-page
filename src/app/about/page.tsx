import Navbar from '@/components/Navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Content */}
      <div className="container mx-auto px-4 pt-36 pb-8">
        <div className="max-w-sm mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            About Romo
          </h1>

          <div className="space-y-8 text-center">
            <section>
              <h2 className="text-xl font-semibold mb-4">Build for Everyone</h2>
              <p className="text-base text-gray-300 leading-relaxed">
                Romo is your local AI assistant, designed to be your friendly
                companion while respecting your privacy. Built with the
                philosophy that your data should stay on your device, Romo
                provides powerful AI capabilities without compromising your
                personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Privacy First</h2>
              <p className="text-base text-gray-300 leading-relaxed">
                We believe in the fundamental right to privacy. That&apos;s why
                Romo runs entirely on your local machine. No data is sent to
                external servers, no cloud processing, no tracking. Your
                conversations, your data, your control.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Built for Mac</h2>
              <p className="text-base text-gray-300 leading-relaxed">
                Optimized for macOS, Romo takes full advantage of Apple&apos;s
                powerful hardware. Whether you&apos;re using Apple Silicon or
                Intel processors, Romo delivers smooth, responsive performance
                that enhances your daily workflow.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
