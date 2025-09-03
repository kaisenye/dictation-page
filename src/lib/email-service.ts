import { Resend } from 'resend'
import { z } from 'zod'
import { renderEmailTemplate } from '@/emails'

const resend = new Resend(process.env.RESEND_API_KEY)

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
  interestType: z.enum(['download', 'waitlist']),
})

export interface EmailServiceResult {
  success: boolean
  emailId?: string
  error?: string
}

export async function sendEmailService(params: {
  email: string
  interestType: 'download' | 'waitlist'
}): Promise<EmailServiceResult> {
  try {
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return { success: false, error: 'Email service not configured' }
    }

    // Validate input
    const validation = emailSchema.safeParse(params)
    if (!validation.success) {
      return { 
        success: false, 
        error: `Invalid input: ${validation.error.issues.map(i => i.message).join(', ')}` 
      }
    }

    const { email, interestType } = validation.data

    // Render email template using React Email
    const { subject, html, text } = await renderEmailTemplate({ email, interestType })

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Romo Team <team@updates.tryromo.com>',
      to: [email],
      subject,
      html,
      text,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error: 'Failed to send email' }
    }

    return { 
      success: true, 
      emailId: data?.id 
    }
  } catch (error) {
    console.error('Email service error:', error)
    return { success: false, error: 'Internal email service error' }
  }
}