// Archetype types
export interface Archetype {
  id: string;
  name: string;
  emoji: string;
  core_drive: string;
  motto: string;
  color: string;
  description: string;
  created_at: string;
}

// Career types
export interface DefensibilityBreakdown {
  human_judgment: number;
  creativity: number;
  emotional_intelligence: number;
  physical_presence: number;
  strategic_thinking: number;
}

export interface Skill {
  skill: string;
  priority: 'high' | 'medium' | 'low';
  how_to_develop: string;
}

export interface EducationPath {
  degree: string;
  trade: string;
  apprenticeship: string;
}

export interface RealWorldExample {
  name: string;
  title: string;
  description: string;
}

export interface RelatedCareer {
  title: string;
  slug: string;
}

export interface Career {
  id: string;
  slug: string;
  title: string;
  description: string;
  archetype_id: string;
  defensibility_score: number;
  defensibility_breakdown: DefensibilityBreakdown;
  day_to_day: string;
  ai_impact_analysis: string;
  salary_entry_min: number;
  salary_entry_max: number;
  salary_mid_min: number;
  salary_mid_max: number;
  salary_senior_min: number;
  salary_senior_max: number;
  skills_to_develop: Skill[];
  education_path: EducationPath;
  real_world_examples: RealWorldExample[];
  related_careers: RelatedCareer[];
  active: boolean;
  created_at: string;
}

// Session types
export interface Session {
  id: string;
  archetype_id: string;
  quiz_responses: Record<string, unknown>;
  user_age?: number;
  created_at: string;
}

export interface CareerMatch {
  id: string;
  session_id: string;
  career_id: string;
  match_percentage: number;
  rank: number;
  active: boolean;
  created_at: string;
  careers?: Career;
}

// Analytics types
export interface AnalyticsEvent {
  id: string;
  event_type: string;
  session_id?: string;
  archetype?: string;
  platform?: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  pagination?: {
    limit: number;
    offset: number;
    count: number;
  };
}

export interface IkigaiData {
  loves: string[];
  goodAt: string[];
  aiResilient: string[];
  earningPotential: string[];
  sweetSpot: string;
}

export interface PathToAvoid {
  careerTitle: string;
  score: number;
  reason: string;
  alternativeTitle: string;
}

export interface NextStep {
  title: string;
  description: string;
  actionUrl?: string;
}
