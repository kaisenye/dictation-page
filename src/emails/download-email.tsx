import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text, Tailwind } from '@react-email/components'
import * as React from 'react'

export const DownloadEmail = () => (
  <Html>
    <Head />
    <Preview>Your Romo download link - Free AI dictation tool</Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="mx-auto py-10 px-5 max-w-2xl">
          {/* Header */}
          <Section className="text-center mb-10">
            <Heading className="text-neutral-700 text-2xl font-bold m-0">romo.</Heading>
            <Text className="text-neutral-500 mt-2 mb-0 text-base">Type Less. Think More.</Text>
          </Section>

          {/* Main Content */}
          <Section className="bg-neutral-50 border border-neutral-200 rounded-lg p-8 mb-8">
            <Heading className="text-neutral-900 text-xl font-bold mt-0 mb-4">
              Thanks for your interest in Romo! 🎉
            </Heading>

            <Text className="text-neutral-600 text-base leading-relaxed mt-0 mb-6">
              You&apos;re just one click away from experiencing the future of dictation. Romo is a privacy-focused,
              offline-capable AI dictation tool that helps you type less and think more.
            </Text>

            {/* Download Button */}
            <Section className="text-center my-8">
              <Button
                href="https://romo-app-2025.s3.us-west-1.amazonaws.com/Romo-1.0.0-arm64.dmg"
                className="bg-neutral-900 text-white no-underline px-8 py-3 rounded-md font-medium text-base inline-block"
              >
                Download Now
              </Button>
            </Section>

            {/* Getting Started */}
            <Section className="bg-neutral-100 rounded-md px-4 py-6">
              <Heading className="text-neutral-700 text-base font-bold">Getting Started:</Heading>
              <Text className="text-neutral-600 text-base leading-relaxed mt-0 mb-2">1. Download and install Romo</Text>
              <Text className="text-neutral-600 text-base leading-relaxed mt-0 mb-2">
                2. Grant microphone permissions
              </Text>
              <Text className="text-neutral-600 text-base leading-relaxed mt-0 mb-0">3. Start dictating anywhere!</Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section className="text-center border-t border-neutral-200 pt-8">
            <Text className="text-neutral-500 text-sm mt-0 mb-4">
              Need help? Reply to this email or visit our documentation.
            </Text>
            <Text className="text-neutral-400 text-xs m-0">
              You received this email because you requested a download link for Romo.
              <br />© 2025 Romo. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

export default DownloadEmail
