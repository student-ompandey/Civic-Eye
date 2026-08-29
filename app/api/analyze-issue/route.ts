import { NextResponse } from 'next/server';
import { analyzeIssue } from '@/lib/gemini/analyzeIssue';

export async function POST(request: Request) {
  try {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ demo_mode: true, error: 'GEMINI_API_KEY not configured' }, { status: 503 });
    }

    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    // Extract base64 and mime type from data URL
    // Format: "data:image/jpeg;base64,/9j/4AAQ..."
    const matches = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
    
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    const result = await analyzeIssue(base64Data, mimeType);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API /analyze-issue error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}
