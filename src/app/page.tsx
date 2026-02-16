import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { ScoreBadge } from '@/components/shared/ScoreBadge';

export const metadata = {
  title: 'FutureProof — Find Careers That Won't Be Replaced by AI",
  description:
    'Discover careers that match who you are and actually have a future. Get AI defensibility scores for real career guidance.',
};

const careerExamples = [
  { name: 'Emergency Room Nurse', score: 92 },
  { name: 'Commercial Electrician', score: 88 },
  { name: 'UX Researcher', score: 71 },
  { name: 'Financial Analyst', score: 42 },
  { name: 'Junior Software Engineer', score: 28 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br&from-purple-600 via-purple-500 to-blue-600 text-white px-4 py-16 md:py-28 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 opacity-10 rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 opacity-10 rounded-full -ml-40 -mb-40" />

        <div className="relative z-10 max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            The careers you're told to chase might not exist in 10 years.
          </h1>

          <p className="text-lg md:text-xl text-purple-100 mb-8 leading-relaxed">
            FutureProof helps you find career paths that match who you are ∤ *            and won't be replaced by AI. Get real, AI-defensibility scores instead of outdated career advice.
          </p>

          <Link href="/assessment">
            <Button variant="primary" size="lg">
              Discover Your Path
            </Button>
          </Link>

          <p className="text-sm text-purple-200 mt-6">
            Takes about 7 minutes. No account needed.
          </p>
        </div>

        {/* Hero illustration placeholder */}
        <div className="relative z-10 max-w-2xl mx-auto mt-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl aspect-video flex items-center justify-center border border-white border-opacity-20">
            <div className="text-center">
              <div className="text-6xl mb-4">⚡</div>
              <p className="text-purple-100">Your future awaits</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Three simple steps to find your future.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
                <div className="flex items-center justify-center w-14 h-14 bg-purple-600 text-white rounded-full font-bold text-xl mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Chat with Scout</h3>
                <p className="text-gray-600 leading-relaxed">
                  Answer a few fun questions about what makes you tick. No boring forms. No judgment.
                </p>
              </div>
              {/* Connector line */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600" />
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Get Your Profile</h3>
                <p className="text-gray-600 leading-relaxed">
                  Discover your archetype and see which careers match your strengths and personality.
                </p>
              </div>
              {/* Connector line */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600" />
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
                <div className="flex items-center justify-center w-14 h-14 bg-purple-600 text-white rounded-full font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">See the Truth</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every career comes with an AI Defensibility Score. Know what's really future-proof.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 md:p-12 border border-red-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Problem
            </h2>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              School counselors still recommend careers from 2010. Your parents built their paths in a different world. And nobody's telling you the truth: <span className="font-bold">AI is rewriting the rules right now.</span>
            </p>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Financial analysts? Being automated. Junior software engineers? Outsourced to Claude and ChatGPT. But Emergency Room Nurses? Electricians? Therapists? <span className="font-bold">These careers need humans.</span>
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              You deserve guidance that keeps up. Not outdated advice. Not test scores from the 90s. Real defensibility data for the world you're actually entering.
            </p>
          </div>
        </div>
      </section>

      {/* Example Scores Section */}
      <section className="px-4 py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div class="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Career Defensibility Scores
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            See how different careers stack up against AI automation.
          </p>

          <div className="space-y-4">
            {careerExamples.map((career, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <span className="text-lg font-semibold text-gray-900">{career.name}</span>
                <ScoreBadge score={career.score} size="lg" />
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
            <p className="text-gray-700 text-center">
              <span className="font-semibold">Higher scores</span> mean the career requires human skills AI can't replicate. <span className="font-semibold">Lower scores</span> mean it's worth preparing for change.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials Section */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Designed for Teens
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            By people who remember what it's like to be confused about the future.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/** Add testimonials here */}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-16 md:py-24 bg-gradient-to-br&from-purple-600 via-purple-500 to-blue-600 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 opacity-10 rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 opacity-10 rounded-full -ml-40 -mb-40" />

        <div class="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Ready to find your path?
          </h2>

          <p className="text-lg md:text-xl text-purple-100 mb-8">
            Takes about 7 minutes. Completely free. No account needed.
          </p>

          <Link href="/assessment">
            <Button variant="primary" size="lg">
              Start Now
            </Button>
          </Link>

          <p className="text-sm text-purple-200 mt-8">
            Your future is too important for outdated advice.
          </p>
        </div>
      </section>

      {/* Footer CTA for undecided visitors */}
      <section className="px-4 py-12 md:py-16 bg-gray-900 text-white text-center">
        <div class="max-w-2xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold mb-4">Still not sure?</h3>
          <p className="text-gray-300 mb-8">
            It's free, takes 7 minutes, and could change everything. What have you got to lose?
          </p>
          <Link href="/assessment">
            <Button variant="secondary" size="lg">
              Start Exploring
            </Button>
          </Link>
        </div>
      </section>
  
    </div>
  );
}
