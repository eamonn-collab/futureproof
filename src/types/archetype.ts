export interface Archetype {
  name: string;
  emoji: string;
  icon: string;
  core_drive: string;
  description: string;
  keywords: string[];
  motto: string;
  color: string;
}

export interface ArchetypeMatch {
  archetype: string;
  score: number; // 0-1
  reasoning: string;
}
