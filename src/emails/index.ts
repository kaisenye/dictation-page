import { render } from '@react-email/render'
import { DownloadEmail } from './download-email'
import { WaitlistEmail } from './waitlist-email'
import type { InterestType } from '@/components/EmailCaptureModal'

interface EmailTemplateData {
  email: string
  interestType: InterestType
}

export function getEmailSubject(interestType: InterestType): string {
  switch (interestType) {
    case 'download':
      return '🚀 Your Romo Download Link - Free AI Dictation Tool'
    case 'waitlist':
      return '✨ Welcome to the Romo Agent Waitlist'
    default:
      return 'Welcome to Romo'
  }
}

export async function renderEmailTemplate({ email, interestType }: EmailTemplateData): Promise<{
  subject: string
  html: string
  text: string
}> {
  const subject = getEmailSubject(interestType)

  let emailComponent
  let textContent: string

  switch (interestType) {
    case 'download':
      emailComponent = DownloadEmail()
      textContent = `Thanks for your interest in Romo! Download the free AI dictation tool at: https://github.com/yourusername/romo/releases/latest`
      break
    case 'waitlist':
      emailComponent = WaitlistEmail({ email })
      textContent = `Welcome to the Romo Agent waitlist! You'll be among the first to get access when we launch.`
      break
    default:
      throw new Error(`Unknown interest type: ${interestType}`)
  }

  const html = await render(emailComponent)

  return {
    subject,
    html,
    text: textContent,
  }
}

// Export components for preview/development
export { DownloadEmail, WaitlistEmail }
