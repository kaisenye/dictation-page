import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendEmailService } from '@/lib/email-service';
import { z } from 'zod';

const captureEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  interestType: z.enum(['download', 'waitlist']),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = captureEmailSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { email, interestType } = validation.data;

    // Create Supabase client
    const supabase = await createClient();

    // Insert into database (or update if exists)
    const { data, error } = await supabase
      .from('user_interests')
      .upsert(
        {
          email,
          interest_type: interestType,
          metadata: {
            user_agent: request.headers.get('user-agent'),
            ip:
              request.headers.get('x-forwarded-for') ||
              request.headers.get('x-real-ip'),
            timestamp: new Date().toISOString(),
          },
        },
        { onConflict: 'email,interest_type' }
      )
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Send email using shared service
    const emailResult = await sendEmailService({ email, interestType });

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      // Return error to frontend so user knows something went wrong
      return NextResponse.json(
        { error: 'Unable to send email. Please try again or contact support.' },
        { status: 500 }
      );
    } else {
      // Update the record to mark email as sent
      await supabase
        .from('user_interests')
        .update({
          email_sent: true,
          email_sent_at: new Date().toISOString(),
        })
        .eq('id', data[0]?.id);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Check your email for the next steps!',
        data: { email, interestType },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Capture email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
