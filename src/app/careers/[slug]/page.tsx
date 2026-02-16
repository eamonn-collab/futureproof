import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight, TrendingUp } from 'lucide-react';
import DefensibilityChart from '@/components/career/DefensibilityChart';
import SalaryChart from '@/components/career/SalaryChart';
import SkillsList from '@/components/career/SkillsList';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

interface Params {
  slug: string;
}

interface CareerData {
  id: string;
  slug: string;
  title: string;
  description: string;
  defensibility_score: number;
  defensibility_breakdown: {
    human_judgment: number;
    creativity: number;
    emotional_intelligence: number;
    physical_presence: number;
    strategic_thinking: number;
  };
  day_to_day: string;
  ai_impact_analysis: string;
  salary_entry_min: number;
  salary_entry_max: number;
  salary_mid_min: number;
  salary_mid_max: number;
  salary_senior_min: number;
  salary_senior_max: number;
  skills_to_develop: Array<{
    skill: string;
    priority: 'high' | 'medium' | 'low';
    how_to_develop: string;
  }>;
  education_path: {
    degree: string;
    trade: string;
    apprenticeship: string;
  };
  real_world_examples: Array<{
    name: string;
    title: string;
    description: string;
  }>;
  related_careers: Array<{
    title: string;
    slug: string;
  }>;
  created_at: string;
}

export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  try {
    const { data: career } = await supabase
      .from('careers')
      .select('title, description')
      .eq('slug', params.slug)
      .single();

    if (!career) return {};

    const title = `${career.title} | FutureProof`;
    const description =
      career.description ||
      `Explore the ${career.title} career path. Learn about AI resilience, salary, and skills needed.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
      },
    };
  } catch {
    return {};
  }
}

async function getCareerData(slug: string): Promise<CareerData> {
  try {
    const { data: career, error } = await supabase
      .from('careers')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !career) {
      throw new Error('Career not found');
    }

    return career as CareerData;
  } catch (error) {
    console.error('Error fetching career:', error);
    throw error;
  }
}

function getDefensibilityBand(score: number): {
  label: string;
  color: string;
  bg: string;
} {
  if (score >= 75) {
    return {
      label: 'Highly Resilient',
      color: 'text-green-700',
      bg: 'bg-green-100',
    };
  } else if (score >= 50) {
    return {
      label: 'Moderately Resilient',
      color: 'text-yellow-700',
      bg: 'bg-yellow-100',
    };
  } else if (score >= 25) {
    return {
      label: 'Some Risk',
      color: 'text-orange-700',
      bg: 'bg-orange-100',
    };
  } else {
    return {
      label: 'High Risk',
      color: 'text-red-700',
      bg: 'bg-red-100',
    };
  }
}

export default async function CareerDetailPage({
  params,
}: {
  params: Params;
}) {
  try {
    const career = await getCareerData(params.slug);
    const defensibilityBand = getDefensibilityBand(career.defensibility_score);

    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-6">
              <a
                href="/results"
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 mb-4 w-fit"
              >
                ← Back to Results
              </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                  {career.title}
                </h1>
                <p className="text-lg text-gray-600">{career.description}</p>
              </div>

              {/* Defensibility Score */}
              <div className={`${defensibilityBand.bg} rounded-lg p-6 min-w-fit`}>
                <p className="text-sm text-gray-600 mb-1">AI Resilience Score</p>
                <p className={`text-5xl font-bold ${defensibilityBand.color}`}>
                  {career.defensibility_score}%
                </p>
                <p
                  className={`text-sm font-semibold ${defensibilityBand.color} mt-2`}
                >
                  {defensibilityBand.label}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Defensibility Breakdown */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                What Makes This Role Future-Proof?
              </h2>
              <p className="text-gray-600">
                A breakdown of the factors that protect this role from AI automation
              </p>
            </div>
            <DefensibilityChart
              scores={career.defensibility_breakdown}
            />
          </section>

          {/* Day to Day */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What's a Typical Day Like?
            </h2>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="whitespace-pre-line">{career.day_to_day}</p>
            </div>
          </section>

          {/* AI Impact Analysis */}
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md p-8 border border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <TrendingUp size={32} className="text-blue-600" />
              How AI Is Changing This Role
            </h2>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="whitespace-pre-line">{career.ai_impact_analysis}</p>
            </div>
          </section>

          {/* Salary Ranges */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Salary Potential
              </h2>
              <p className="text-gray-600">
                Typical salary ranges by career stage (US estimates)
              </p>
            </div>
            <SalaryChart
              entryMin={career.salary_entry_min}
              entryMax={career.salary_entry_max}
              midMin={career.salary_mid_min}
              midMax={career.salary_mid_max}
              seniorMin={career.salary_senior_min}
              seniorMax={career.salary_senior_max}
            />
          </section>

          {/* Skills to Develop */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Skills to Start Developing Now
              </h2>
              <p className="text-gray-600">
                Priority-ranked skills that will help you excel in this career
              </p>
            </div>
            <SkillsList skills={career.skills_to_develop} />
          </section>

          {/* Education Path */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Education Paths
              </h2>
              <p className="text-gray-600">
                Different routes to get into this career
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Degree */}
              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  4-Year Degree
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {career.education_path.degree}
                </p>
                <div className="mt-4 flex items-center gap-2 text-blue-600 font-semibold text-sm">
                  Learn more
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Trade */}
              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-600">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Trade School
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {career.education_path.trade}
                </p>
                <div className="mt-4 flex items-center gap-2 text-green-600 font-semibold text-sm">
                  Learn more
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Apprenticeship */}
              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-600">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Apprenticeship
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {career.education_path.apprenticeship}
                </p>
                <div className="mt-4 flex items-center gap-2 text-purple-600 font-semibold text-sm">
                  Learn more
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </section>

          {/* Real World Examples */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                People Thriving in This Career
              </h2>
              <p className="text-gray-600">
                Real examples of people who've built successful careers in this field
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {career.real_world_examples.map((example, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {example.name}
                  </h3>
                  <p className="text-blue-600 font-semibold text-sm mb-3">
                    {example.title}
                  </p>
                  <p className="text-gray-700 text-sm">{example.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Careers */}
          {career.related_careers.length > 0 && (
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Related Careers
                </h2>
                <p className="text-gray-600">
                  Similar roles you might also be interested in
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {career.related_careers.map((relatedCareer, idx) => (
                  <a
                    key={idx}
                    href={`/careers/${relatedCareer.slug}`}
                    className="group bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all hover:scale-105 border border-gray-100"
                  >
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                      {relatedCareer.title}
                      <ArrowRight size={18} />
                    </h3>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Footer CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg p-8 sm:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Pursue This Career?
            </h2>
            <p className="text-lg text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
              Start building your skills today. Explore resources, find mentors, and
              connect with others on the same path.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors inline-block">
              Explore Resources
            </button>
          </section>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error rendering career page:', error);
    notFound();
  }
}
