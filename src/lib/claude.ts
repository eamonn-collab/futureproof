import Anthropic from '@anthropic-ai/sdk';
import { AssessmentState } from '@/types/assessment';
import { getScoutPromptWithContext } from '@/prompts/scout-system';

const API_KEY = process.env.CLAUDE_API_KEY;

if (!API_KEY) {
  throw new Error('CLAUDE_API_KEY environment variable is not set');
}

const client = new Anthropic({ apiKey: API_KEY });

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Stream a Scout response from Claude using the assessment context
 */
export async function streamScoutResponse(
  userMessage: string,
  conversationHistory: ConversationMessage[],
  assessmentState: AssessmentState
): Promise<ReadableStream> {
  const systemPrompt = getScoutPromptWithContext(assessmentState);

  const messages: Anthropic.Messages.MessageParam[] = [
    ...conversationHistory.map(msg => ({
      role: msg.role,
      content: msg.content,
    })),
    {
      role: 'user' as const,
      content: userMessage,
    },
  ];

  try {
    // Use the streaming API and convert to ReadableStream
    const stream = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: systemPrompt,
      messages: messages,
      stream: true,
    });

    // Convert the async iterator to a ReadableStream
    let buffer = '';

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta?.type === 'text_delta'
            ) {
              const text = event.delta.text;
              buffer += text;
              controller.enqueue(new TextEncoder().encode(text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return readableStream;
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      throw new Error(`Claude API error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Analyze the full conversation history and extract archetype scores and insights
 */
export async function analyzeAssessment(
  conversationHistory: ConversationMessage[]
): Promise<{
  archetypeScores: Record<string, number>;
  interests: string[];
  strengths: string[];
  values: string[];
}> {
  const analysisPrompt = `You are analyzing a career exploration conversation with a teen.
Extract and return ONLY a valid JSON object with this exact structure:
{
  "archetypeScores": {
    "Builder": number,
    "Healer": number,
    "Strategist": number,
    "Creator": number,
    "Connector": number,
    "Guardian": number,
    "Explorer": number,
    "Operator": number
  },
  "interests": [string],
  "strengths": [string],
  "values": [string]
}

The 8 archetypes are: Builder (creates tangible things), Healer (helps people directly), Strategist (solves complex problems), Creator (expresses and innovates), Connector (brings people together), Guardian (protects and maintains), Explorer (discovers and investigates), Operator (runs and optimizes systems).

Each archetype score should be 0-100. interests, strengths, and values should be arrays of 3-5 strings each.
Return ONLY the JSON object, no other text.`;

  const conversationText = conversationHistory
    .map(msg => `${msg.role}: ${msg.content}`)
    .join('\n\n');

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `${analysisPrompt}\n\nCONVERSATION:\n${conversationText}`,
        },
      ],
    });

    const responseText =
      response.content[0].type === 'text' ? response.content[0].text : '';

    // Extract JSON from response (it might be wrapped in markdown code blocks)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from analysis response');
    }

    const analysisResult = JSON.parse(jsonMatch[0]);

    return {
      archetypeScores: analysisResult.archetypeScores,
      interests: analysisResult.interests,
      strengths: analysisResult.strengths,
      values: analysisResult.values,
    };
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      throw new Error(`Claude API error during analysis: ${error.message}`);
    }
    throw error;
  }
}
