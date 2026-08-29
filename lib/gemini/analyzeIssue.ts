import { genAI } from './client';
import { SYSTEM_PROMPT } from './prompts';

export async function analyzeIssue(imageBase64: string, mimeType: string) {
  // DEMO MODE FALLBACK
  const mockResponse = {
    isIssue: true,
    category: 'Road Pothole',
    severity: 'medium',
    confidence: 88,
    title: 'Damaged Road Surface',
    description: 'This appears to be a pothole or damaged section of the road surface, potentially posing a risk to vehicles.',
    risk: 'Medium - potential for vehicle damage',
    department: 'Department of Public Works'
  };

  if (!genAI) {
    console.warn('GEMINI_API_KEY is not configured. Falling back to Demo Mode.');
    // Simulate network delay for demo
    await new Promise(resolve => setTimeout(resolve, 2000));
    return mockResponse;
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
    console.error('Error analyzing image with Gemini, falling back to Demo Mode:', error);
    // Simulate network delay for demo
    await new Promise(resolve => setTimeout(resolve, 2000));
    return mockResponse;
  }
}
