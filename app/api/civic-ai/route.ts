import { NextResponse } from 'next/server';
import { generateCivicAIResponse, ChatMessage } from '@/lib/gemini/civicAssistant';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Convert UI history to Gemini format if necessary, assuming frontend sends it correctly
    // or we can map it here. Let's assume frontend sends { role: 'user' | 'model', parts: [{ text }] }
    const formattedHistory: ChatMessage[] = history || [];

    const responseText = await generateCivicAIResponse(formattedHistory, message);

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error('Civic AI Error:', error);
    return NextResponse.json(
      { error: error.message || 'Civic AI is temporarily unavailable. Please try again.' },
      { status: 503 }
    );
  }
}
