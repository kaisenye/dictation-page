import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { renderEmailTemplate } from '@/emails'

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  interestType: z.enum(['download', 'waitlist']),
})

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const body = await request.json()

    // Validate input
    const validation = sendEmailSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid input', details: validation.error.issues }, { status: 400 })
    }

    const { email, interestType } = validation.data

    // Render email template using React Email
    const { subject, html, text } = await renderEmailTemplate({ email, interestType })

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Romo Team <team@updates.tryromo.com>', // Replace with your verified domain
      to: [email],
      subject,
      html,
      text,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        emailId: data?.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Send email error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
