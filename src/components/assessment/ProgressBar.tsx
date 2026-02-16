interface ProgressBarProps {
  progress: number; // 0-100
  phase: 1 | 2 | 3; // 1: Discovery, 2: Mapping, 3: Results
}

const phaseLabels = {
  1: 'Getting to know you',
  2: 'Finding your path',
  3: 'Your results',
};

export default function ProgressBar({ progress, phase }: ProgressBarProps) {
  const phaseLabel = phaseLabels[phase];
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
      <div className="mx-auto max-w-full px-4 py-3 sm:px-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
            {phaseLabel}
          </h2>
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
            {clampedProgress}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="progress-fill h-full bg-gradient-to-r from-purple-600 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${clampedProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
