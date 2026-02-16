import { Archetype, ArchetypeMatch } from '@/types/archetype';
import { ARCHETYPES } from '@/lib/constants';

export class ArchetypeMatcher {
  /**
   * Scores each archetype based on keyword frequency matching
   * against archetype keywords in constants
   */
  static scoreFromKeywords(text: string): Record<string, number> {
    const lowerText = text.toLowerCase();
    const scores: Record<string, number> = {};

    // Initialize scores for all archetypes
    ARCHETYPES.forEach((archetype) => {
      scores[archetype.name] = 0;
    });

    // Count keyword matches for each archetype
    ARCHETYPES.forEach((archetype) => {
      let matchCount = 0;
      archetype.keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const matches = lowerText.match(regex);
        if (matches) {
          matchCount += matches.length;
        }
      });
      scores[archetype.name] = matchCount;
    });

    // Normalize scores to 0-1 range
    const maxScore = Math.max(...Object.values(scores));
    if (maxScore > 0) {
      Object.keys(scores).forEach((archetype) => {
        scores[archetype] = scores[archetype] / maxScore;
      });
    }

    return scores;
  }

  /**
   * Adds bonus scores based on specific response patterns
   */
  static scoreFromStructuredResponses(responses: {
    puzzleVsBuild?: string;
    moneyVsMeaning?: string;
    groupRole?: string;
  }): Record<string, number> {
    const scores: Record<string, number> = {};

    // Initialize all archetypes to 0
    ARCHETYPES.forEach((archetype) => {
      scores[archetype.name] = 0;
    });

    // Process puzzle vs build preference
    if (responses.puzzleVsBuild) {
      const lower = responses.puzzleVsBuild.toLowerCase();
      if (lower.includes('build')) {
        scores['Builder'] = (scores['Builder'] || 0) + 0.2;
      }
      if (lower.includes('solve') || lower.includes('puzzle')) {
        scores['Strategist'] = (scores['Strategist'] || 0) + 0.2;
        scores['Explorer'] = (scores['Explorer'] || 0) + 0.1;
      }
    }

    // Process money vs meaning preference
    if (responses.moneyVsMeaning) {
      const lower = responses.moneyVsMeaning.toLowerCase();
      if (lower.includes('money')) {
        scores['Strategist'] = (scores['Strategist'] || 0) + 0.1;
        scores['Operator'] = (scores['Operator'] || 0) + 0.1;
      }
      if (lower.includes('meaning')) {
        scores['Healer'] = (scores['Healer'] || 0) + 0.2;
        scores['Creator'] = (scores['Creator'] || 0) + 0.1;
      }
    }

    // Process group role preference
    if (responses.groupRole) {
      const lower = responses.groupRole.toLowerCase();
      if (
        lower.includes('leader') ||
        lower.includes('organize') ||
        lower.includes('lead')
      ) {
        scores['Connector'] = (scores['Connector'] || 0) + 0.2;
        scores['Operator'] = (scores['Operator'] || 0) + 0.1;
      }
      if (
        lower.includes('creative') ||
        lower.includes('ideas') ||
        lower.includes('innovation')
      ) {
        scores['Creator'] = (scores['Creator'] || 0) + 0.2;
      }
      if (lower.includes('helper') || lower.includes('support')) {
        scores['Healer'] = (scores['Healer'] || 0) + 0.2;
      }
    }

    return scores;
  }

  /**
   * Combines scores from different sources with specified weights
   */
  static combineScores(
    keywordScores: Record<string, number>,
    structuredScores: Record<string, number>,
    claudeScores?: Record<string, number>
  ): {
    primary: ArchetypeMatch;
    secondary: ArchetypeMatch;
    allScores: Record<string, number>;
  } {
    const combinedScores: Record<string, number> = {};

    // Determine weights based on whether claude scores are provided
    let keywordWeight = 0.4;
    let structuredWeight = 0.3;
    let claudeWeight = 0.3;

    if (!claudeScores) {
      // Redistribute weights if no claude scores
      keywordWeight = 0.5;
      structuredWeight = 0.5;
      claudeWeight = 0;
    }

    // Initialize combined scores
    ARCHETYPES.forEach((archetype) => {
      const keywordScore = keywordScores[archetype.name] || 0;
      const structuredScore = structuredScores[archetype.name] || 0;
      const claudeScore = claudeScores ? claudeScores[archetype.name] || 0 : 0;

      combinedScores[archetype.name] =
        keywordScore * keywordWeight +
        structuredScore * structuredWeight +
        claudeScore * claudeWeight;
    });

    // Find top 2 archetypes
    const sorted = Object.entries(combinedScores)
      .sort((a, b) => b[1] - a[1])
      .map(([name, score]) => ({ name, score }));

    const primary: ArchetypeMatch = {
      archetype: sorted[0].name,
      score: Math.min(sorted[0].score, 1),
      reasoning: `Strong alignment with ${sorted[0].name} archetype based on your responses.`,
    };

    const secondary: ArchetypeMatch = {
      archetype: sorted[1].name,
      score: Math.min(sorted[1].score, 1),
      reasoning: `Secondary alignment with ${sorted[1].name} archetype.`,
    };

    return {
      primary,
      secondary,
      allScores: combinedScores,
    };
  }

  /**
   * Looks up full archetype details from constants
   */
  static getArchetypeDetails(name: string): Archetype | undefined {
    return ARCHETYPES.find((archetype) => archetype.name === name);
  }
}
