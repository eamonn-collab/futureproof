/**
 * Assessment utility functions
 */

import { AssessmentPhase, PhaseLabels } from '@/types/assessment';

export function getPhaseLabel(phase: 1 | 2 | 3): string {
  const labels: Record<1 | 2 | 3, string> = {
    1: 'Getting to know you',
    2: 'Finding your path',
    3: 'Your results',
  };
  return labels[phase];
}

export function calculatePhaseFromExchangeCount(exchanges: number): 1 | 2 | 3 {
  if (exchanges < 3) return 1;
  if (exchanges < 6) return 2;
  return 3;
}

export function calculateProgressFromExchangeCount(exchanges: number): number {
  const progressMap: Record<number, number> = {
    0: 5,
    1: 15,
    2: 25,
    3: 40,
    4: 50,
    5: 65,
    6: 80,
    7: 90,
    8: 95,
  };
  return Math.min(progressMap[exchanges] || 95, 100);
}

export function shouldTransitionToResults(
  phase: 1 | 2 | 3,
  exchanges: number
): boolean {
  return phase === 2 && exchanges >= 6;
}

export function parseStreamChunk(line: string): Record<string, unknown> | null {
  if (!line.startsWith('data: ')) return null;
  try {
    return JSON.parse(line.slice(6));
  } catch {
    return null;
  }
}

export const INITIAL_SCOUT_MESSAGE = `Hey there! 👋 I'm Scout, your personal career exploration guide. I'm here to help you discover career paths that feel right for *you*—and that are built to last in our changing world.

Before we dive in, I've got a quick question for you: **What's something you're genuinely interested in?** Could be a hobby, a subject you love learning about, or just something that gets you excited. No wrong answers here!`;

export const ASSESSMENT_COMPLETE_MESSAGE = `That's fantastic! 🎯 I've got a really good sense of who you are now. Let me show you some career paths that could be perfect for you...`;
