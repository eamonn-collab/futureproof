import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { ScoreBadge } from '@/components/shared/ScoreBadge';

interface SharePageProps {
  params: {
    sessionId: string;
  };
}

interface SessionData {
  archetype: string;
  archetypeEmoji: string;
  topCareers: Array<{
    name: string;
    defensibilityScore: number;
  }>;
  motto: string;
}

async function getSessionData(sessionId: string): Promise<SessionData | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/sessions?id=eq.${sessionId}&select=archetype,archetype_emoji,top_careers,motto`,
      {
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY || '',
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY || ''}`,
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (!data || data.length === 0) return null;

    const session = data[0];
    return {
      archetype: session.archetype,
      archetypeEmoji: session.archetype_emoji || '⚡',
      topCareers: (session.top_careers || []).slice(0, 3),
      motto: session.motto || 'Future-ready.',
    };
  } catch (error) {
    console.error('Error fetching session data:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const sessionData = await getSessionData(params.sessionId);

  if (!sessionData) {
    return {
      title: 'FutureProof - Find Your Career Path',
      description: 'Discover careers that match who you are and won\'t be replaced by AI.',
    };
  }

  const title = `${sessionData.archetype} — My FutureProof Profile`;
  const description = `I discovered I'm a ${sessionData.archetype} on FutureProof. Check out my AI-defensible career matches!`;
  const ogImageUrl = `/api/og-image/${params.sessionId}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://futureproof.app/share/${params.sessionId}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${sessionData.archetype} FutureProof Profile`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const sessionData = await getSessionData(params.sessionId);

  if (!sessionData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Hmm, that profile isn't here.</h1>
          <p className="text-lg text-purple-100 mb-8">
            The link might be broken, or the profile was deleted.
          </p>
          <Link href="/assessment">
            <Button variant="primary" size="lg">
              Start Your Own Profile
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Hero section with profile */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="text-6xl md:text-8xl mb-6">{sessionData.archetypeEmoji}</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            They're a <span className="text-purple-200">{sessionData.archetype}</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-8 italic">
            "{sessionData.motto}"
          </p>
        </div>

        {/* Top careers */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Their Top Career Matches</h2>
          <div className="space-y-4">
            {sessionData.topCareers.map((career, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between"
              >
                <span className="text-lg font-semibold">{career.name}</span>
                <ScoreBadge score={career.defensibilityScore} size="lg" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to action section */}
      <div className="px-4 py-12 md:py-20 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            What's YOUR FutureProof Profile?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Curious where you fall? Discover your archetype, see your career matches, and find out which paths are truly future-proof. Takes about 7 minutes.
          </p>
          <Link href="/assessment">
            <Button variant="primary" size="lg">
              Discover Your Path
            </Button>
          </Link>
        </div>
      </div>

      {/* Why it matters section */}
      <div className="px-4 py-12 md:py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            What Makes FutureProof Different
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-100">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="font-bold text-gray-900 mb-2">AI Defensibility</h3>
              <p className="text-sm text-gray-600">
                Every career gets a defensibility score showing how safe it is from AI automation.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-100">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-bold text-gray-900 mb-2">Archetype Matching</h3>
              <p className="text-sm text-gray-600">
                Discover careers that match your personality and strengths, not just test scores.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-purple-100">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">Honest & Real</h3>
              <p className="text-sm text-gray-600">
                No sugarcoating. We tell you which careers might disappear and which will thrive.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="px-4 py-12 md:py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 mb-6">
            Your future is worth 7 minutes of honesty.
          </p>
          <Link href="/assessment">
            <Button variant="primary" size="lg">
              Start Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
