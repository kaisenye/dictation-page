import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text, Tailwind } from '@react-email/components'
import * as React from 'react'

interface WaitlistEmailProps {
  email: string
}

export const WaitlistEmail = ({ email }: WaitlistEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to the Romo Agent waitlist - Get exclusive early access</Preview>
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
            <Heading className="text-neutral-900 text-xl font-bold mt-0 mb-4">Welcome to the future! ✨</Heading>

            <Text className="text-neutral-600 text-base leading-relaxed mt-0 mb-6">
              You&apos;re now on the exclusive waitlist for <strong className="text-neutral-700">Romo Agent</strong> -
              the AI-powered assistant that will revolutionize how you interact with your computer through voice.
            </Text>

            {/* What to Expect */}
            <Section className="my-8">
              <Heading className="text-neutral-900 text-lg font-bold mb-4">What to expect:</Heading>
              <Text className="text-neutral-600 text-base leading-relaxed mt-0 mb-2">
                AI Agent Mode with advanced capabilities
              </Text>
              <Text className="text-neutral-600 text-base leading-relaxed mt-0 mb-2">
                Early access invitation (you&apos;ll be among the first!)
              </Text>
              <Text className="text-neutral-600 text-base leading-relaxed mt-0 mb-2">Exclusive launch pricing</Text>
              <Text className="text-neutral-600 text-base leading-relaxed mt-0 mb-0">
                Priority support and feature requests
              </Text>
            </Section>

            {/* Try Free Version */}
            <Section className="bg-neutral-100 rounded-md p-5 my-6">
              <Heading className="text-neutral-700 text-base font-bold mt-2 mb-3">While you wait...</Heading>
              <Text className="text-neutral-600 text-base leading-relaxed mt-0 mb-4">
                Try our free version of Romo! It&apos;s already packed with powerful features and completely free.
              </Text>
              <Section className="text-center">
                <Button
                  href="https://github.com/yourusername/romo/releases/latest"
                  className="bg-neutral-800 border border-neutral-700 text-neutral-100 no-underline px-6 py-2.5 rounded-md font-medium text-sm inline-block"
                >
                  Download Free Version
                </Button>
              </Section>
            </Section>

            {/* Timeline */}
            <Section className="my-8">
              <Heading className="text-neutral-900 text-base font-bold mt-8 mb-3">Expected Timeline:</Heading>
              <Text className="text-neutral-500 text-sm leading-relaxed m-0">
                We&apos;re aiming for November 2025. You&apos;ll receive updates as we get closer to launch.
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section className="text-center border-t border-neutral-200 pt-8">
            <Text className="text-neutral-500 text-sm mt-0 mb-4">
              Questions? Reply to this email - we&apos;d love to hear from you!
            </Text>
            <Text className="text-neutral-400 text-xs m-0">
              You joined the Romo Agent waitlist with {email}
              <br />© 2025 Romo. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

export default WaitlistEmail
