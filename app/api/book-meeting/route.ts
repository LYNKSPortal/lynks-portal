import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, phone, preferredDate, preferredTime, message } = body;

    if (!name || !email || !phone || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    if (type === 'online') {
      const { platform } = body;
      
      await sql`
        INSERT INTO meeting_requests (
          type, name, email, phone, platform, preferred_date, preferred_time, message, created_at
        )
        VALUES (
          'online', ${name}, ${email}, ${phone}, ${platform}, ${preferredDate}, ${preferredTime}, ${message || ''}, NOW()
        )
      `;
    } else if (type === 'callback') {
      const { timezone } = body;
      
      await sql`
        INSERT INTO meeting_requests (
          type, name, email, phone, timezone, preferred_date, preferred_time, message, created_at
        )
        VALUES (
          'callback', ${name}, ${email}, ${phone}, ${timezone}, ${preferredDate}, ${preferredTime}, ${message || ''}, NOW()
        )
      `;
    } else {
      return NextResponse.json(
        { error: 'Invalid meeting type' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Meeting request submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting meeting request:', error);
    return NextResponse.json(
      { error: 'Failed to submit meeting request' },
      { status: 500 }
    );
  }
}
