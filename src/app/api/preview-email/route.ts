import { NextRequest, NextResponse } from 'next/server'
import { renderEmailTemplate } from '@/emails'
import type { InterestType } from '@/components/EmailCaptureModal'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = (searchParams.get('type') as InterestType) || 'download'
  const email = searchParams.get('email') || 'preview@example.com'

  try {
    const { html } = await renderEmailTemplate({ 
      email, 
      interestType: type 
    })

    // Return HTML for browser preview
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch (error) {
    console.error('Email preview error:', error)
    return NextResponse.json({ error: 'Failed to generate preview' }, { status: 500 })
  }
}

// Also support POST for JSON response with all email data
export async function POST(request: NextRequest) {
  try {
    const { email = 'preview@example.com', interestType = 'download' } = await request.json()
    
    const { subject, html, text } = await renderEmailTemplate({ email, interestType })

    return NextResponse.json({
      subject,
      html,
      text,
      preview_url: `/api/preview-email?type=${interestType}&email=${encodeURIComponent(email)}`
    })
  } catch (error) {
    console.error('Email preview error:', error)
    return NextResponse.json({ error: 'Failed to generate preview' }, { status: 500 })
  }
}