import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface CreateAssessmentRequest {
  age: number;
}

interface CreateAssessmentResponse {
  sessionId: string;
  sessionToken: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<CreateAssessmentResponse | { error: string }>> {
  try {
    const body: CreateAssessmentRequest = await request.json();

    // Validate age
    if (!body.age || typeof body.age !== 'number') {
      return NextResponse.json(
        { error: 'Invalid age provided' },
        { status: 400 }
      );
    }

    if (body.age < 13 || body.age > 99) {
      return NextResponse.json(
        { error: 'Age must be between 13 and 99' },
        { status: 400 }
      );
    }

    // Create session
    const sessionId = uuidv4();
    const sessionToken = uuidv4();

    const { error: insertError } = await supabase
      .from('assessment_sessions')
      .insert({
        id: sessionId,
        session_token: sessionToken,
        age: body.age,
        status: 'active',
        phase: 1,
        progress: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error('Database insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create assessment session' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        sessionId,
        sessionToken,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Assessment creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
