import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

// Cache for 1 hour
export const revalidate = 3600;

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
    // Fetch from Supabase
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

export async function GET(
  _request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const sessionData = await getSessionData(params.sessionId);

    if (!sessionData) {
      return new ImageResponse(
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
            fontSize: 48,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          Profile not found
        </div>,
        {
          width: 1200,
          height: 630,
        }
      );
    }

    return new ImageResponse(
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: 'white',
          padding: '40px',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative background elements */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            left: '-50px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            gap: '60px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Left side - Archetype */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 0.4,
            }}
          >
            <div
              style={{
                fontSize: 140,
                marginBottom: '20px',
              }}
            >
              {sessionData.archetypeEmoji}
            </div>
            <div
              style={{
                fontSize: 44,
                fontWeight: 'bold',
                textAlign: 'center',
                lineHeight: 1.2,
                marginBottom: '20px',
              }}
            >
              You're a <br /> {sessionData.archetype}
            </div>
            <div
              style={{
                fontSize: 24,
                fontStyle: 'italic',
                opacity: 0.9,
                textAlign: 'center',
              }}
            >
              {sessionData.motto}
            </div>
          </div>

          {/* Right side - Top careers */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              flex: 0.6,
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                marginBottom: '10px',
                  }}
            >
              Your Top Matches
            </div>

            {sessionData.topCareers.map((career, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    flex: 1,
                  }}
                >
                  {career.name}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '70px',
                    height: '70px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    fontSize: 32,
                    fontWeight: 'bold',
                  }}
                >
                  {career.defensibilityScore}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FutureProof branding - bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 20,
            fontWeight: 'bold',
            opacity: 0.9,
          }}
        >
          <span>⚡</span>
          <span>FutureProof</span>
        </div>

        {/* QR code placeholder - bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '40px',
            fontSize: 14,
            opacity: 0.7,
            textAlign: 'center',
          }}
        >
          futureproof.app
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new ImageResponse(
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
          fontSize: 48,
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        FutureProof
      </div>,
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
