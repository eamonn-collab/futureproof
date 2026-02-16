import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

interface AnalyticsEvent {
  event: string;
  session_id?: string;
  archetype?: string;
  platform?: string;
  timestamp?: string;
  [key: string]: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyticsEvent = await request.json();

    if (!body.event) {
      return NextResponse.json(
        { error: 'Event type is required' },
        { status: 400 }
      );
    }

    // Insert analytics event
    const { error } = await supabase.from('analytics_events').insert({
      event_type: body.event,
      session_id: body.session_id || null,
      archetype: body.archetype || null,
      platform: body.platform || null,
      metadata: body,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Analytics error:', error);
      // Don't return error to client - analytics failures shouldn't break the app
      return NextResponse.json({ success: false }, { status: 200 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API error:', error);
    // Don't return error to client - analytics failures shouldn't break the app
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
