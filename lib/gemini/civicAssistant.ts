import { genAI } from './client';
import { CIVIC_AI_SYSTEM_PROMPT } from './prompts';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

export async function generateCivicAIResponse(history: ChatMessage[], message: string) {
  if (!genAI) {
    throw new Error('Gemini API key is not configured.');
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: CIVIC_AI_SYSTEM_PROMPT,
  });

  const chat = model.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 500, // Keep responses concise
      temperature: 0.7,
    },
  });

  const result = await chat.sendMessage(message);
  const response = await result.response;
  return response.text();
}
