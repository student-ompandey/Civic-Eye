import { genAI } from './client';
import { SYSTEM_PROMPT } from './prompts';

export async function analyzeIssue(imageBase64: string, mimeType: string) {
  if (!genAI) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType
    },
  };

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            { text: SYSTEM_PROMPT },
            imagePart
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const responseText = result.response.text();
    return JSON.parse(responseText);
  } catch (error) {
    console.error('Error analyzing image with Gemini:', error);
    throw error;
  }
}
