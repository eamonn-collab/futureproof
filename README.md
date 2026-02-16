# FutureProof — Career Guidance for the AI Era

Career guidance platform for teens (13-18) using a Modified Ikigai framework with AI Defensibility Scoring.

## Quick Start (5 minutes)

### 1. Get API Keys

**Claude API** (powers Scout, the AI career guide):
- Go to [console.anthropic.com](https://console.anthropic.com) → Sign up → API Keys → Create Key
- Copy the key (starts with `sk-ant-...`)

**Supabase** (database):
- Open your Supabase project dashboard → Settings → API
- Copy: Project URL, `anon` public key, and `service_role` secret key

### 2. Set Up Database

In Supabase dashboard → SQL Editor, run these in order:
1. `migrations/001_initial_schema.sql`
2. `migrations/002_rls_policies.sql`

### 3. Configure & Run

```bash
cp .env.example .env.local
# Edit .env.local with your keys

npm install
npm run seed   # Populate career database (32 careers)
npm run dev    # Start at http://localhost:3000
```

### 4. Deploy

```bash
npx vercel
# Add env vars in Vercel dashboard → Settings → Environment Variables
```

## Environment Variables

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
CLAUDE_API_KEY=sk-ant-your-key
```

## Architecture

| Layer | Tech | Purpose |
|-------|------|---------|
| Frontend | Next.js 14, React 18, Tailwind CSS | Mobile-first web app |
| Database | Supabase (Postgres + RLS) | Careers, sessions, conversations |
| AI | Claude API (Anthropic) | Scout persona, assessment analysis |
| Share Cards | @vercel/og (Satori) | Dynamic OG images for social sharing |
| Hosting | Vercel | Edge functions, zero-config deployment |

## Key Files

| File | What it does |
|------|-------------|
| `src/prompts/scout-system.ts` | Scout's personality and conversation flow |
| `src/lib/claude.ts` | Claude API streaming client |
| `src/app/api/assessment/[sessionId]/chat/route.ts` | Chat streaming endpoint |
| `src/lib/archetype.ts` | Archetype matching algorithm |
| `src/lib/career-matching.ts` | Career ranking (defensibility + fit) |
| `scripts/seed-careers.ts` | 32 careers across 8 archetypes |
| `src/app/page.tsx` | Landing page |
| `src/app/assessment/chat/page.tsx` | Chat interface |
| `src/app/results/[sessionId]/page.tsx` | Results page |
| `src/app/careers/[slug]/page.tsx` | Career detail page |

## The 8 Archetypes

| | Archetype | Core Drive | Example Careers |
|-|-----------|-----------|-----------------|
| ⚡ | Builder | Create tangible things | Electrician, Civil Engineer, Robotics Tech |
| 💚 | Healer | Help people directly | ER Nurse, Physical Therapist, Vet|
| 🏯 | Strategist | Solve complex problems | Urban Planner, Military Officer |
| 🏨 | Creator | Express and innovate | Film Director, Chef, Game Designer |
| 🤝 | Connector | Bring people together | Teacher, Sales Director, Recruiter |
| 🛡️ | Guardian | Protect and maintain | Cybersecurity Analyst, Detective |
| 🔭 | Explorer | Discover and investigate | Marine Biologist, Aerospace Engineer |
| ⚚️ | Operator | Run and optimize systems | Air Traffic Controller, Project Manager |

## AI Defensibility Score

Every career is scored 1-100 based on:
- Physical Presence Required (25%)
- Human Judgment Complexity (25%)
- Creative Originality (20%)
- Relationship Dependency (15%)
- Regulatory/Liability Barrier (15%)

Score bands: 80-100 (Highly Defensible), 60-79 (Evolving), 40-59 (At Risk), 1-39 (High Disruption)
