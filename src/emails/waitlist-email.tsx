import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

interface WaitlistEmailProps {
  email: string;
}

export const WaitlistEmail = ({ email }: WaitlistEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Welcome to the Romo Agent waitlist - Get exclusive early access
    </Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="mx-auto py-10 px-5 max-w-lg">
          {/* Header */}
          <Section className="text-center mb-10">
            <Heading className="text-neutral-700 text-xl font-medium m-0">
              Romo
            </Heading>
            <Text className="text-neutral-500 mt-2 mb-0 text-sm">
              Type Less. Think More.
            </Text>
          </Section>

          {/* Main Content */}
          <Section className="bg-neutral-50 border border-neutral-200 p-8 mb-4">
            <Heading className="text-neutral-900 text-lg font-medium mt-0 mb-4">
              Thanks for joining the waitlist!
            </Heading>

            <Text className="text-neutral-500 text-base leading-relaxed mt-0 mb-6">
              You&apos;re now on the exclusive waitlist for{' '}
              <strong className="text-neutral-700">Romo</strong> – the best AI
              assistant that will revolutionize how you interact with your
              computer through voice.
            </Text>

            <Section className="mb-6">
              <img
                src="https://tryromo.com/gifs/notion.gif"
                alt="Romo dictation demo"
                className="max-w-full h-auto rounded-md"
              />
            </Section>

            {/* What to Expect */}
            <Section className="my-8">
              <Heading className="text-neutral-900 text-lg font-medium mb-4">
                What to expect:
              </Heading>
              <Text className="text-neutral-500 text-base leading-relaxed mt-0 mb-2">
                - AI Agent Mode with advanced capabilities
              </Text>
              <Text className="text-neutral-500 text-base leading-relaxed mt-0 mb-2">
                - Early access invitation (you&apos;ll be among the first!)
              </Text>
              <Text className="text-neutral-500 text-base leading-relaxed mt-0 mb-2">
                - Exclusive launch pricing
              </Text>
              <Text className="text-neutral-500 text-base leading-relaxed mt-0 mb-0">
                - Priority support and feature requests
              </Text>
            </Section>

            {/* Timeline */}
            <Section className="my-8">
              <Heading className="text-neutral-900 text-lg font-medium mb-3">
                Timeline:
              </Heading>
              <Text className="text-neutral-500 text-base leading-relaxed m-0">
                We&apos;re aiming for December 2025. You&apos;ll receive updates
                as we get closer to launch.
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section className="text-center border-t border-neutral-200 pt-8">
            <Text className="text-neutral-400 text-xs m-0">
              You joined the Romo waitlist with {email}
              <br />© 2025 Romo. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default WaitlistEmail;
