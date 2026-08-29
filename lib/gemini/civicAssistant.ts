import { genAI } from './client';
import { CIVIC_AI_SYSTEM_PROMPT } from './prompts';
import { FunctionDeclaration, SchemaType } from '@google/generative-ai';
import { getTopPriorityIssues, getIssuePriority } from './tools';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: [{ text?: string; functionCall?: any; functionResponse?: any }];
}

const getTopPriorityIssuesDeclaration: FunctionDeclaration = {
  name: 'getTopPriorityIssues',
  description: 'Gets a list of the most urgent and highest priority civic issues currently active in the system.',
};

const getIssuePriorityDeclaration: FunctionDeclaration = {
  name: 'getIssuePriority',
  description: 'Gets the Civic Priority Score and the contributing factors for a specific issue by its ID.',
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      issueId: {
        type: SchemaType.STRING,
        description: 'The unique ID of the issue to retrieve priority data for.',
      },
    },
    required: ['issueId'],
  },
};

const tools = {
  getTopPriorityIssues,
  getIssuePriority,
};

export async function generateCivicAIResponse(history: any[], message: string) {
  if (!genAI) {
    throw new Error('Gemini API key is not configured.');
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: CIVIC_AI_SYSTEM_PROMPT,
    tools: [
      {
        functionDeclarations: [getTopPriorityIssuesDeclaration, getIssuePriorityDeclaration],
      },
    ],
  });

  const chat = model.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 500, // Keep responses concise
      temperature: 0.7,
    },
  });

  let result = await chat.sendMessage([{ text: message }]);
  
  // Handle function calls loop
  let keepGoing = true;
  while (keepGoing) {
    const response = result.response;
    const functionCalls = response.functionCalls();
    
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      let functionResult = {};
      
      try {
        if (call.name === 'getTopPriorityIssues') {
          functionResult = await getTopPriorityIssues();
        } else if (call.name === 'getIssuePriority') {
          const args = call.args as any;
          functionResult = await getIssuePriority({ issueId: args.issueId });
        } else {
          functionResult = { error: 'Function not found.' };
        }
      } catch (err: any) {
        functionResult = { error: err.message };
      }

      result = await chat.sendMessage([{
        functionResponse: {
          name: call.name,
          response: functionResult,
        }
      }]);
    } else {
      keepGoing = false;
    }
  }

  return result.response.text();
}
