'use client';

interface DefensibilityBreakdown {
  human_judgment: number;
  creativity: number;
  emotional_intelligence: number;
  physical_presence: number;
  strategic_thinking: number;
}

interface DefensibilityChartProps {
  scores: DefensibilityBreakdown;
}

function getScoreColor(score: number): {
  bar: string;
  bg: string;
  text: string;
} {
  if (score >= 75) {
    return {
      bar: 'bg-green-500',
      bg: 'bg-green-50',
      text: 'text-green-700',
    };
  } else if (score >= 50) {
    return {
      bar: 'bg-yellow-500',
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
    };
  } else if (score >= 25) {
    return {
      bar: 'bg-orange-500',
      bg: 'bg-orange-50',
      text: 'text-orange-700',
    };
  } else {
    return {
      bar: 'bg-red-500',
      bg: 'bg-red-50',
      text: 'text-red-700',
    };
  }
}

export default function DefensibilityChart({
  scores,
}: DefensibilityChartProps) {
  const factors = [
    {
      label: 'Human Judgment',
      key: 'human_judgment',
      description: 'Requires nuanced decision-making and experience',
      icon: '🧠',
    },
    {
      label: 'Creativity',
      key: 'creativity',
      description: 'Involves original thinking and innovation',
      icon: '💡',
    },
    {
      label: 'Emotional Intelligence',
      key: 'emotional_intelligence',
      description: 'Requires understanding and managing emotions',
      icon: '❤️',
    },
    {
      label: 'Physical Presence',
      key: 'physical_presence',
      description: 'In-person interaction or hands-on work',
      icon: '🤝',
    },
    {
      label: 'Strategic Thinking',
      key: 'strategic_thinking',
      description: 'Long-term planning and complex problem-solving',
      icon: '🎯',
    },
  ];

  return (
    <div className="space-y-6">
      {factors.map((factor) => {
        const score = scores[factor.key as keyof DefensibilityBreakdown];
        const colors = getScoreColor(score);

        return (
          <div
            key={factor.key}
            className={`${colors.bg} rounded-lg p-5 sm:p-6 border border-gray-200`}
          >
            <div className="flex items-start justify-between mb-3 gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{factor.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900">
                    {factor.label}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">{factor.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-3xl font-bold ${colors.text}`}>{score}%</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
              <div
                className={`${colors.bar} h-full rounded-full transition-all duration-500`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        );
      })}

      {/* Summary box */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          What This Means
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-0.5">•</span>
            <span>
              <strong>Higher scores</strong> mean this aspect of the job is harder
              for AI to automate
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-0.5">•</span>
            <span>
              <strong>Lower scores</strong> mean AI tools might handle this task—but
              you can use AI to enhance your work
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-0.5">•</span>
            <span>
              <strong>The key insight:</strong> Future careers combine human skills
              with AI tools
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
