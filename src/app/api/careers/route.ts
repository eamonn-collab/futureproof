import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const archetype = searchParams.get('archetype');
    const sort = searchParams.get('sort') || 'defensibility_score';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 100;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;

    let query = supabase
      .from('careers')
      .select(
        `
        id,
        title,
        slug,
        description,
        defensibility_score,
        archetype_id,
        created_at
      `
      )
      .eq('active', true);

    // Filter by archetype if provided
    if (archetype) {
      query = query.eq('archetype_id', archetype);
    }

    // Sort
    let ascending = false;
    if (sort === 'title') {
      ascending = true;
    }
    query = query.order(sort === 'title' ? 'title' : 'defensibility_score', {
      ascending,
    });

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data: careers, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch careers' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: careers || [],
      pagination: {
        limit,
        offset,
        count: careers?.length || 0,
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
