import { NextRequest, NextResponse } from 'next/server'
import { sendEmailService } from '@/lib/email-service'
import { z } from 'zod'

const sendEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  interestType: z.enum(['download', 'waitlist']),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = sendEmailSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid input', details: validation.error.issues }, { status: 400 })
    }

    const { email, interestType } = validation.data

    // Use shared email service
    const result = await sendEmailService({ email, interestType })

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        emailId: result.emailId,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Send email error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
