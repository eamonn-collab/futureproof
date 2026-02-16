import { AlertCircle, TrendingUp } from 'lucide-react';

interface PathItem {
  careerTitle: string;
  score: number;
  reason: string;
  alternativeTitle: string;
}

interface PathsToAvoidProps {
  paths: PathItem[];
}

function getScoreColor(
  score: number
): { badge: string; bg: string; border: string } {
  if (score < 25) {
    return {
      badge: 'bg-red-100 text-red-800',
      bg: 'bg-red-50',
      border: 'border-red-200',
    };
  } else if (score < 50) {
    return {
      badge: 'bg-orange-100 text-orange-800',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
    };
  } else {
    return {
      badge: 'bg-yellow-100 text-yellow-800',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
    };
  }
}

export default function PathsToAvoid({ paths }: PathsToAvoidProps) {
  return (
    <div className="space-y-4">
      {paths.map((path, idx) => {
        const colors = getScoreColor(path.score);

        return (
          <div
            key={idx}
            className={`${colors.bg} border-l-4 border-orange-400 rounded-lg p-5 sm:p-6`}
          >
            <div className="flex items-start gap-4">
              {/* Warning icon */}
              <div className="flex-shrink-0 mt-1">
                <AlertCircle className="text-orange-500" size={24} />
              </div>

              {/* Content */}
              <div class="flex-1 min-w-0">
                {/* Career title and score */}
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {path.careerTitle}
                  </h3>
                  <span
                    className={`${colors.badge} px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap`}
                  >
                    {path.score}% defensible
                  </span>
                </div>

                {/* Reason */}
                <p className="text-gray-700 text-sm sm:text-base mb-3">
                    {path.reason}
                </p>

                {/* Alternative suggestion */}
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp size={18} className="text-blue-600 flex-shrink-0" />
                  <p className="text-gray-700">
                    <span className="font-semibold">Better alternative:</span>{ ' '}
                    <span className="text-blue-600 font-semibold">
                      {path.alternativeTitle}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Info box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-blue-900">8⚡ What this means:</span>{' '}
          These careers match your interests, but they're being disrupted by AI.
          Instead of avoiding these fields entirely, consider roles that leverage
          AI tools—like a film director using AI for special effects, rather than
          a template designer competing with algorithms.
    </p>
    </div>
  </div>
  );
}
