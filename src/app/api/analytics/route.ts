import { NextRequest, NextResponse } from 'next/server';

interface AnalyticsPayload {
  event: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyticsPayload = await request.json();

    const { event, properties = {}, timestamp = new Date().toISOString() } = body;

    // Validate event name
    if (!event || typeof event !== 'string') {
      return NextResponse.json(
        { error: 'Invalid event name' },
        { status: 400 }
      );
    }

    // Log analytics event (console for now, will integrate with PostHog later)
    console.log('[ANALYTICS]', {
      event,
      properties,
      timestamp,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    });

    // In the future, this will send to PostHog or similar
    // Example integration point:
    // await posthog.capture({
    //   distinctId: properties.userId || 'anonymous',
    //   event,
    //   properties,
    //   timestamp,
    // });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[ANALYTICS ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to process analytics event' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint for health check
export async function GET() {
  return NextResponse.json({
    message: 'Analytics endpoint ready',
    methods: ['POST'],
  });
}
