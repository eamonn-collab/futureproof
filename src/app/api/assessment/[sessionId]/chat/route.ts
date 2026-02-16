import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import { getScoutPromptWithContext } from '@/prompts/scout-system';
import { AssessmentState } from '@/types/assessment';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY! });

const INITIAL_MESSAGE = `Hey! I'm Scout — think of me as a friend who's spent way too much time thinking about careers and AI. I'm here to help you figure out what you're built for, and more importantly, what's actually going to be worth pursuing in the next 10-20 years.

Let's start simple: **What's something you could talk about for hours without getting bored?**`;

interface ChatRequest {
  message: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
): Promise<NextResponse> {
  try {
    const sessionId = params.sessionId;
    const body: ChatRequest = await request.json();
    const userMessage = body.message;

    // Handle initialization — return Scout's opening message
    if (userMessage === '__init__') {
      // Save initial Scout message to conversation
      await supabase.from('assessment_conversations').insert({
        session_id: sessionId,
        sequence_number: 0,
        scout_message: INITIAL_MESSAGE,
        user_response: null,
      });

      return NextResponse.json({
        initialMessage: INITIAL_MESSAGE,
        progress: 5,
        phase: 1,
      });
    }

    // Load session
    const { data: session, error: sessionError } = await supabase
      .from('assessment_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Load conversation history
    const { data: conversations } = await supabase
      .from('assessment_conversations')
      .select('scout_message, user_response')
      .eq('session_id', sessionId)
      .order('sequence_number', { ascending: true });

    // Build Claude message history
    const conversationHistory: { role: 'user' | 'assistant'; content: string }[] = [];
    for (const conv of conversations || []) {
      if (conv.scout_message) {
        conversationHistory.push({ role: 'assistant', content: conv.scout_message });
      }
      if (conv.user_response) {
        conversationHistory.push({ role: 'user', content: conv.user_response });
      }
    }

    // Add current user message
    conversationHistory.push({ role: 'user', content: userMessage });

    // Calculate exchange count and phase
    const exchangeCount = (conversations?.filter(c => c.user_response) || []).length + 1;
    const currentPhase = exchangeCount <= 7 ? 1 : 2;
    const progress = Math.min(Math.round((exchangeCount / 9) * 100), 95);

    // Build assessment state for Scout context
    const assessmentState: AssessmentState = {
      phase: currentPhase,
      conversationCount: exchangeCount,
      interests: session.interests_raw || [],
      strengths: session.strengths_raw || [],
      values: session.values_raw || [],
      readyForMapping: exchangeCount >= 7,
    };

    const systemPrompt = getScoutPromptWithContext(assessmentState);

    // Stream response from Claude
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 500,
            system: systemPrompt,
            messages: conversationHistory,
            stream: true,
          });

          let scoutMessage = '';

          for await (const event of response) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const text = event.delta.text;
              scoutMessage += text;

              const chunk = JSON.stringify({
                content: text,
                phase: currentPhase,
                progress,
              });
              controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
            }
          }

          // Check if mapping is complete (Scout included JSON block)
          const jsonMatch = scoutMessage.match(/---JSON---\s*(\{[\s\S]*\})/);
          let isComplete = false;
          let mappingData = null;

          if (jsonMatch) {
            try {
              mappingData = JSON.parse(jsonMatch[1]);
              isComplete = mappingData.phase === 'mapping_complete';
            } catch {
              // JSON parse failed, not complete
            }
          }

          // Strip the JSON block from the displayed message
          const displayMessage = scoutMessage.replace(/---JSON---[\s\S]*$/, '').trim();

          // Send completion signal
          const finalChunk = JSON.stringify({
            done: true,
            phase: isComplete ? 3 : currentPhase,
            progress: isComplete ? 100 : progress,
            isComplete,
            mappingData,
          });
          controller.enqueue(encoder.encode(`data: ${finalChunk}\n\n`));

          // Save conversation to DB
          await supabase.from('assessment_conversations').insert({
            session_id: sessionId,
            sequence_number: exchangeCount,
            scout_message: displayMessage,
            user_response: userMessage,
          });

          // Update session
          const updateData: Record<string, unknown> = {
            phase: isComplete ? 3 : currentPhase,
            phase_progress: isComplete ? 100 : progress,
            last_message_at: new Date().toISOString(),
          };

          if (isComplete && mappingData) {
            updateData.status = 'completed';
            updateData.completed_at = new Date().toISOString();
            updateData.primary_archetype = mappingData.primaryArchetype;
            updateData.secondary_archetype = mappingData.secondaryArchetype;
            updateData.archetype_scores = mappingData.archetypeScores;
            updateData.interests_raw = mappingData.interests || [];
            updateData.strengths_raw = mappingData.strengths || [];
            updateData.values_raw = mappingData.values || [];
          }

          await supabase
            .from('assessment_sessions')
            .update(updateData)
            .eq('id', sessionId);

          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          const errorChunk = JSON.stringify({ error: 'Stream failed' });
          controller.enqueue(encoder.encode(`data: ${errorChunk}\n\n`));
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
