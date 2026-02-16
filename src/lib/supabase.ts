import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  );
}

// Client-side Supabase client (for browser)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (for API routes) - uses service role key
export function getServerSupabaseClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY. Required for server-side operations.'
    );
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

// Common queries
export const queries = {
  // Archetype queries
  async getArchetype(id: string) {
    return supabaseClient.from('archetypes').select('*').eq('id', id).single();
  },

  async getAllArchetypes() {
    return supabaseClient.from('archetypes').select('*').order('created_at');
  },

  // Career queries
  async getCareer(slug: string) {
    return supabaseClient.from('careers').select('*').eq('slug', slug).eq('active', true).single();
  },

  async getAllCareers(limit: number = 100, offset: number = 0) {
    return supabaseClient
      .from('careers')
      .select('*')
      .eq('active', true)
      .order('defensibility_score', { ascending: false })
      .range(offset, offset + limit - 1);
  },

  async getCareersByArchetype(archetypeId: string) {
    return supabaseClient
      .from('careers')
      .select('*')
      .eq('archetype_id', archetypeId)
      .eq('active', true)
      .order('defensibility_score', { ascending: false });
  },

  // Session queries
  async getSession(id: string) {
    return supabaseClient.from('sessions').select('*').eq('id', id).single();
  },

  async createSession(archetypeId: string, quizResponses: Record<string, unknown>) {
    return supabaseClient.from('sessions').insert({
      archetype_id: archetypeId,
      quiz_responses: quizResponses,
    });
  },

  // Career match queries
  async getCareerMatches(sessionId: string) {
    return supabaseClient
      .from('career_matches')
      .select(
        `
        *,
        careers(*)
      `
      )
      .eq('session_id', sessionId)
      .eq('active', true)
      .order('rank', { ascending: true });
  },

  async getTopCareerMatches(sessionId: string, limit: number = 5) {
    return supabaseClient
      .from('career_matches')
      .select(
        `
        *,
        careers(*)
      `
      )
      .eq('session_id', sessionId)
      .eq('active', true)
      .order('rank', { ascending: true })
      .limit(limit);
  },
};
