import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import ArchetypeHero from '@/components/results/ArchetypeHero';
import CareerMatchCard from '@/components/results/CareerMatchCard';
import IkigaiDiagram from '@/components/results/IkigaiDiagram';
import PathsToAwoid from '@/components/results/PathsToAvoid';
import NextSteps from 'A/components/results/NextSteps';
import ShareButton from '@/components/results/ShareButton';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

interface Params {
  sessionId: string;
}

interface SessionData {
  id: string;
  archetype_id: string;
  quiz_responses: Record<string, unknown>;
  created_at: string;
  user_age?: number;
}

interface ArchetypeData {
  id: string;
  name: string;
  emoji: string;
  core_drive: string;
  motto: string;
  color: string;
}

interface CareerMatch {
  id: string;
  title: string;
  slug: string;
  defensibility_score: number;
  match_percentage: number;
  description: string;
  rank: number;
}

interface IkigaiData {
  loves: string[];
  goodAt: string[];
  aiResilient: string[];
  earningPotential: string[];
  sweetSpot: string;
}

interface PathToAvoid {
  careerTitle: string;
  score: number;
  reason: string;
  alternativeTitle: string;
}

interface NextStep {
  title: string;
  description: string;
  actionUrl?: string;
}

export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  try {
    const { data: session } = await supabase
      .from('sessions')
      .select('archetype_id')
      .eq('id', params.sessionId)
      .single();

    if (!session) return {};

    const { data: archetype } = await supabase
      .from('archetypes')
      .select('name, emoji')
      .eq('id', session.archetype_id)
      .single();

    const title = archetype
      ? `You're a ${archetype.emoji} ${archetype.name}! | FutureProof`
      : 'Your Career Results | FutureProof';

    const description = archetype
      ? `Discover your career path as a ${archetype.name}. Explore AI-resilient jobs tailored to your unique strengths.`
      : 'Discover your career path with FutureProof. Explore AI-resilient jobs tailored to your unique strengths.';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        images: [
          {
            url: `/api/og-image/${params.sessionId}`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [`/api/og-image/${params.sessionId}`],
      },
    };
  } catch {
    return {};
  }
}

async function getSessionData(sessionId: string): Promise<{
  session: SessionData;
  archetype: ArchetypeData;
  topCareers: CareerMatch[];
  ikigai: IkigaiData;
  pathsToAvoid: PathToAvoid[];
  nextSteps: NextStep[];
}> {
  try {
    // Fetch session
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      throw new Error('Session not found');
    }

    // Fetch archetype
    const { data: archetype, error: archetypeError } = await supabase
      .from('archetypes')
      .select('*')
      .eq('id', session.archetype_id)
      .single();

    if (archetypeError || !archetype) {
      throw new Error('Archetype not found')
    }

    // Fetch top 5 career matches
    const { data: topCareers, error: careersError } = await supabase
      .from('career_matches')
      .select(
        `
        id,
        careers(id, title, slug, defensibility_score, description),
        match_percentage,
        rank
      `
      )
      .eq('session_id', sessionId)
      .eq('active', true)
      .order('rank', { ascending: true })
      .limit(5);

    if (careersError) {
      throw new Error('Failed to fetch careers');
    }

    // Map career matches
    const mappedCareers: CareerMatch[] = (topCareers || []).map((match: any) => ({
      id: match.careers.id,
      title: match.careers.title,
      slug: match.careers.slug,
      defensibility_score: match.careers.defensibility_score,
      match_percentage: match.match_percentage,
      description: match.careers.description,
      rank: match.rank
    }));
    
    // Build Ikigai data from session
    const ikigai: IkigaiData = {
      loves: session.quiz_responses?.loves || [],
      goodAt: session.quiz_responses?.goodAt || [],
      aiResilient: session.quiz_responses?.aiResilient || [],
      earningPotential: session.quiz_responses?.earningPotential || [],
      sweetSpot: archetype.name,
    };

    // Fetch paths to avoid (low defensibility matches)
    const { data: lowMatches } = await supabase
      .from('career_matches')
      .select(
        `
        id,
        careers(id, title, defensibility_score, description),
        match_percentage,
        rank
      `
      )
      .eq('session_id', sessionId)
      .eq('active', true)
      .gt('rank', 5)
      .order('match_percentage', { ascending: false })
      .limit(3);

    const pathsToAvoid: PathToAvoid[] = (lowMatches || []).map((match: any) => ({
      careerTitle: match.careers.title,
      score: match.careers.defensibility_score,
      reason:
        match.match_percentage > 70
          ? `High interest but AI automation is a risk (${match.careers.defensibility_score}% defensible)`
          : `Limited long-term growth potential`,
      alternativeTitle: mappedCareers[0]?.title || 'See top matches above',
    }));

    // Next steps based on archetype
    const nextSteps: NextStep[] = [
      {
        title: 'Learn foundational skills',
        description: 'Start with Python, data analysis, or communication skills',
        actionUrl: '/resources/skills',
      },
      {
        title: 'Explore internships',
        description: 'Find part-time or summer           opportunities in your field',
        actionUrl: '/resources/internships',
      },
      {
        title: 'Join communities',
        description: `Connect with other ${archetype.name}s building their careers`,
        actionUrl: '/community',
      },
      {
        title: 'Build a portfolio',
        description: 'Create projects that showcase your skills to employers',
        actionUrl: '/resources/portfolio',
      },
    ];

    return {
      session,
      archetype,
      topCareers: mappedCareers,
      ikigai,
      pathsToAvoid,
      nextSteps,
    };
  } catch (error) {
    console.error('Error fetching session data:', error);
    throw error;
  }
}

export default async function ResultsPage({
  params,
}: {
  params: Params;
}) {
  try {
    const { session, archetype, topCareers, ikigai, pathsToAvoid, nextSteps } =
      await getSessionData(params.sessionId);

    return (
      <main className="min-h-screen bg-gradient-to-br&from-gray-50 to-gray-100">
        {/* Hero Section */}
        <ArchetypeHero
          name={archetype.name}
          emoji={archetype.emoji}
          coreDrive={archetype.core_drive}
          motto={archetype.motto}
          color={archetype.color}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Top 5 Career Matches */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Your Top Career Matches
              </h2>
              <p className="text-gray-600">
                Ranked by how well they fit your skills, interests, and AI resilience
              </p>
            </div>

            <div className="space-y-4">
              {topCareers.map((career) => (
                <CareerMatchCard
                  key={career.id}
                  rank={career.rank}
                  title={career.title}
                  defensibilityScore={career.defensibility_score}
                  matchPercentage={career.match_percentage}
                  description={career.description}
                  slug={career.slug}
                />
              ))}
            </div>
          </section>

          {/* Ikigai Diagram */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Your Ikigai: The Sweet Spot
              </h2>
              <p className="text-gray-600">
                Where your passions, skills, resilience, and earning potential intersect
              </p>
            </div>
            <IkigaiDiagram ikigaiData={ikigai} />
          </section>

          {/* Paths to Avoid */}
          {pathsToAvoid.length > 0 && (
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  A Heads Up: Paths to Reconsider
                </h2>
                <p className="text-gray-600">
                  These roles match your interests but may face AI automation challenges
                </p>
              </div>
              <PathsToAwoid paths={pathsToAvoid} />
            </section>
          )}

          {/* Next Steps */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Your Action Plan
              </h2>
              <p className="text-gray-600">
                Start building toward your future today
              </p>
            </div>
            <NextSteps steps={nextSteps} />
          </section>

          {/* Share Section */}
          <section className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Share Your Results
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Let your friends discover their career paths too. Share your archetype and inspire others to explore their future.
            </p>
            <ShareButton
              sessionId={params.sessionId}
              archetypeName={archetype.name}
            />
          </section>

          {/* Footer CTA */}
          <section className="text-center py-8">
            <p className="text-gray-600 mb-4">
              Want to dive deeper? Explore one of your career matches now.
            </p>
              {topCareers.length > 0 && (
                <a
                  href={`/careers/${topCareers[0].slug}`}
                  className="indine-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Explore {topCareers[0].title}
                </a>
              )}
    </section>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error rendering results page:', error);
    notFound();
  }
}
