'use client';

interface SalaryChartProps {
  entryMin: number;
  entryMax: number;
  midMin: number;
  midMax: number;
  seniorMin: number;
  seniorMax: number;
}

function formatSalary(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

function getStageColor(stage: string): {
  bg: string;
  bar: string;
  text: string;
} {
  switch (stage) {
    case 'entry':
      return {
        bg: 'bg-blue-50',
        bar: 'bg-blue-500',
        text: 'text-blue-900',
      };
    case 'mid':
      return {
        bg: 'bg-purple-50',
        bar: 'bg-purple-500',
        text: 'text-purple-900',
      };
    case 'senior':
      return {
        bg: 'bg-green-50',
        bar: 'bg-green-500',
        text: 'text-green-900',
      };
    default:
      return {
        bg: 'bg-gray-50',
        bar: 'bg-gray-500',
        text: 'text-gray-900',
      };
  }
}

export default function SalaryChart({
  entryMin,
  entryMax,
  midMin,
  midMax,
  seniorMin,
  seniorMax,
}: SalaryChartProps) {
  const stages = [
    {
      label: 'Entry Level',
      stage: 'entry',
      min: entryMin,
      max: entryMax,
      icon: '🌱',
      description: 'Fresh out of school or new to the field',
    },
    {
      label: 'Mid-Career',
      stage: 'mid',
      min: midMin,
      max: midMax,
      icon: '📈',
      description: '5-10 years of experience',
    },
    {
      label: 'Senior/Expert',
      stage: 'senior',
      min: seniorMin,
      max: seniorMax,
      icon: '⭐',
      description: '10+ years or leadership position',
    },
  ];

  // Find max value for scaling
  const maxSalary = Math.max(entryMax, midMax, seniorMax);

  return (
    <div className="space-y-6">
      {stages.map((stage) => {
        const colors = getStageColor(stage.stage);
        const barWidth = (stage.max / maxSalary) * 100;
        const minWidth = (stage.min / maxSalary) * 100;

        return (
          <div key={stage.stage} className={`${colors.bg} rounded-lg p-5 sm:p-6 border border-gray-200`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{stage.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900">
                    {stage.label}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">{stage.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-sm font-semibold ${colors.text}`}>
                  {formatSalary(stage.min)} – {formatSalary(stage.max)}
                </p>
              </div>
            </div>

            {/* Salary range visualization */}
            <div className="relative h-12 bg-gray-200 rounded-lg overflow-hidden">
              {/* Full range bar */}
              <div
                className={`${colors.bar} h-full opacity-30 absolute left-0 top-0`}
                style={{ width: `${barWidth}%` }}
              />

              {/* Min-Max range bar */}
              <div
                className={`${colors.bar} h-full rounded-lg flex items-center px-3`}
                style={{
                  width: `${barWidth - (minWidth - (stage.min / maxSalary) * 100)}%`,
                  marginLeft: `${(stage.min / maxSalary) * 100}%`,
                }}
              >
                <div className="flex items-center justify-between w-full text-white text-xs sm:text-sm font-bold">
                  <span>{formatSalary(stage.min)}</span>
                  <span className="hidden sm:inline">
                    {formatSalary(stage.max)}
                  </span>
                </div>
              </div>

              {/* Labels on the sides */}
              <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
                <span className="text-xs font-semibold text-gray-600">
                  {formatSalary(stage.min)}
                </span>
                <span className="text-xs font-semibold text-gray-600 hidden sm:inline">
                  {formatSalary(stage.max)}
                </span>
              </div>
            </div>

            {/* Growth indicator */}
            {stage.stage === 'entry' || stage.stage === 'mid' ? (
              <div className="mt-2 text-xs text-gray-600 flex items-center gap-1">
                📈 Typical growth from this stage
              </div>
            ) : null}
          </div>
        );
      })}

      {/* Notes and context */}
      <div className="mt-8 p-5 sm:p-6 bg-amber-50 border border-amber-200 rounded-lg">
        <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
          <span>💡</span>
          Important Context
        </h3>
        <ul className="space-y-2 text-sm text-amber-900">
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>
              <strong>Geographic variation:</strong> Salaries vary significantly by
              location, with tech hubs paying 20-40% more
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>
              <strong>Industry matters:</strong> The same role can pay very differently
              in startups vs corporations
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>
              <strong>Trends:</strong> These figures are based on current data and may
              change with market demand
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>
              <strong>Negotiation:</strong> Your actual salary depends on skills,
              experience, and how well you negotiate
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
