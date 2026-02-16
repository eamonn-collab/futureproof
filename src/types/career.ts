export interface Skill {
  skill: string;
  priority: 'high' | 'medium' | 'low';
  how_to_develop: string;
}

export interface EducationPath {
  type: 'degree' | 'trade' | 'apprenticeship' | 'self_taught';
  details: string;
  duration: string;
}

export interface RealWorldExample {
  name: string;
  role: string;
  achievement: string;
}

export interface Career {
  id: string;
  title: string;
  slug: string;
  primary_archetype: string;
  secondary_archetype: string;
  defensibility_score: number; // 1-100
  factor_physical_presence: number; // 0-100
  factor_human_judgment: number; // 0-100
  factor_creative_originality: number; // 0-100
  factor_relationship_dependency: number; // 0-100
  factor_regulatory_barrier: number; // 0-100
  entry_salary_low: number;
  entry_salary_high: number;
  mid_salary_low: number;
  mid_salary_high: number;
  senior_salary_low: number;
  senior_salary_high: number;
  day_to_day_description: string;
  ai_impact_analysis: string;
  skills_to_develop: Skill[];
  education_path: EducationPath;
  real_world_examples: RealWorldExample[];
  status: 'active' | 'archived' | 'draft';
}

export interface DefensibilityBreakdown {
  physical_presence: number;
  human_judgment: number;
  creative_originality: number;
  relationship_dependency: number;
  regulatory_barrier: number;
}

export type ScoreBand = 'highly-defensible' | 'evolving' | 'at-risk' | 'high-disruption';
