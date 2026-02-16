/**
 * Assessment-related TypeScript types for FutureProof
 */

export interface AssessmentSession {
  id: string;
  session_token: string;
  user_age: number;
  status: 'in_progress' | 'completed' | 'abandoned';
  phase: 1 | 2 | 3;
  phase_progress: number;
  interests_raw: string[];
  strengths_raw: string[];
  values_raw: string[];
  primary_archetype: string | null;
  secondary_archetype: string | null;
  archetype_scores: Record<string, number> | null;
  recommended_career_ids: string[];
  recommended_with_scores: RecommendedCareerWithScore[] | null;
  paths_to_avoid: PathToAvoid[] | null;
  ikigai_diagram: Record<string, unknown> | null;
  created_at: string;
  completed_at: string | null;
  last_message_at: string | null;
}

export interface RecommendedCareerWithScore {
  careerId: string;
  careerTitle: string;
  careerSlug: string;
  defensibilityScore: number;
  matchScore: number;
}

export interface PathToAvoid {
  careerId: string;
  careerTitle: string;
  careerSlug: string;
  defensibilityScore: number;
  reason: string;
  alternativeTitle: string;
}

export interface ConversationMessage {
  id: string;
  session_id: string;
  sequence_number: number;
  scout_message: string;
  user_response: string | null;
  created_at: string;
}

export interface ChatMessage {
  role: 'scout' | 'user';
  content: string;
  timestamp: number;
}

export interface StreamChunk {
  content?: string;
  phase?: 1 | 2 | 3;
  progress?: number;
  isComplete?: boolean;
}

/** State object passed to Scout system prompt for context */
export interface AssessmentState {
  phase: number;
  conversationCount: number;
  interests: string[];
  strengths: string[];
  values: string[];
  readyForMapping: boolean;
}

export enum AssessmentPhase {
  DISCOVERY = 1,
  MAPPING = 2,
  RESULTS = 3,
}

export const PhaseLabels: Record<number, string> = {
  1: 'Getting to know you',
  2: 'Finding your path',
  3: 'Your results',
};
