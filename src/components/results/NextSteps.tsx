import Link from 'next/link';
import {
  Lightbulb,
  Briefcase,
  Users,
  Layers,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

interface Step {
  title: string;
  description: string;
  actionUrl?: string;
}

interface NextStepsProps {
  steps: Step[];
}

const iconMap: Record<number, React.ReactNode> = {
  0: <Lightbulb size={24} />,
  1: <Briefcase size={24} />,
  2: <Users size={24} />,
  3: <Layers size={24} />,
};

export default function NextSteps({ steps }: NextStepsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow p-6 flex flex-col h-full"
        >
          {/* Number and icon */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
              {idx + 1}
            </div>
            <div className="text-blue-500">{iconMap[idx] || <CheckCircle size={24} />}</div>
          </div>

          {/* Content */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
          <p className="text-gray-600 text-sm sm:text-base mb-4 flex-1">
            {step.description}
          </p>

          {/* Action button */}
          {step.actionUrl && (
            <Link
              href={step.actionUrl}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors group"
            >
              Learn more
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          )}
        </div>
      ))}
    </div>
  (€