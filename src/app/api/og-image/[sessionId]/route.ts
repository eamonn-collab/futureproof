import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

interface Params {
  sessionId: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { sessionId } = params;

    // Fetch session and archetype data
    const { data: session } = await supabase
      .from('sessions')
      .select('archetype_id')
      .eq('id', sessionId)
      .single();

    if (!session) {
      return new NextResponse('Session not found', { status: 404 });
    }

    const { data: archetype } = await supabase
      .from('archetypes')
      .select('name, emoji, color')
      .eq('id', session.archetype_id)
      .single();

    if (!archetype) {
      return new NextResponse('Archetype not found', { status: 404 });
    }

    // Generate SVG OG image
    const svg = generateOGImage(archetype.emoji, archetype.name);

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('OG image generation error:', error);
    return new NextResponse('Failed to generate OG image', { status: 500 });
  }
}

function generateOGImage(emoji: string, archetypeName: string): string {
  const width = 1200;
  const height = 630;

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
      </linearGradient>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3" />
      </filter>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>

    <!-- Decorative circles -->
    <circle cx="100" cy="100" r="150" fill="white" opacity="0.1"/>
    <circle cx="${width - 100}" cy="${height - 100}" r="200" fill="white" opacity="0.1"/>

    <!-- Main content -->
    <g filter="url(#shadow)">
      <!-- Emoji -->
      <text x="${width / 2}" y="200" font-size="120" text-anchor="middle" fill="white">
        ${emoji}
      </text>

      <!-- Headline -->
      <text x="${width / 2}" y="320" font-size="72" font-weight="bold" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif">
        You're a ${archetypeName}!
      </text>

      <!-- Subheading -->
      <text x="${width / 2}" y="400" font-size="32" text-anchor="middle" fill="white" opacity="0.9" font-family="system-ui, -apple-system, sans-serif">
        Discover your AI-resilient career path
      </text>

      <!-- CTA -->
      <text x="${width / 2}" y="520" font-size="28" text-anchor="middle" fill="white" font-weight="600" font-family="system-ui, -apple-system, sans-serif">
        FutureProof · futureproof.local
      </text>
    </g>
  </svg>`;
}
