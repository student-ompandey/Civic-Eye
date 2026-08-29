import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { genAI } from '@/lib/gemini/client';

function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Radius of the earth in m
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in m
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export async function POST(request: Request) {
  try {
    const { latitude, longitude, category, description } = await request.json();

    if (!latitude || !longitude || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDb();
    const issuesCollection = db.collection('issues');

    // Only check against active issues
    const activeIssues = await issuesCollection
      .find({ status: { $in: ['Open', 'In Progress'] } })
      .toArray();

    let bestMatch: any = null;
    let highestScore = 0;
    let bestDistance = 0;

    for (const issue of activeIssues) {
      if (!issue.latitude || !issue.longitude) continue;

      const distance = getDistanceFromLatLonInM(latitude, longitude, issue.latitude, issue.longitude);
      
      // If outside 500 meters, it's highly unlikely to be the exact same issue
      if (distance > 500) continue;

      let score = 0;
      
      // Base score on distance (closer = higher)
      score += Math.max(0, 40 - (distance / 500) * 40);

      // Score on category match
      if (issue.category === category) {
        score += 30;
      }

      // If it's already a good candidate, use AI to confirm text similarity
      if (score >= 40 && genAI && description && issue.description) {
        try {
          const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
          const prompt = `Analyze if these two civic issue reports likely describe the exact same physical problem.
Report 1: ${description}
Report 2: ${issue.description}
Respond ONLY with a JSON object containing a single key "similarityScore" with an integer value from 0 to 30.`;

          const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          });
          
          const text = result.response.text();
          const aiResult = JSON.parse(text);
          if (typeof aiResult.similarityScore === 'number') {
            score += Math.min(30, aiResult.similarityScore);
          }
        } catch (aiError) {
          console.error("AI similarity check failed, skipping AI bonus", aiError);
          // Fallback basic text length check or just skip
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = issue;
        bestDistance = distance;
      }
    }

    // Threshold for suggesting a duplicate
    if (bestMatch && highestScore >= 60) {
      const { userId, ...publicMatch } = bestMatch; // sanitize
      return NextResponse.json({
        isDuplicate: true,
        probability: Math.round(highestScore),
        distance: Math.round(bestDistance),
        existingIssue: {
          ...publicMatch,
          _id: bestMatch._id.toString(),
          id: bestMatch._id.toString()
        }
      });
    }

    return NextResponse.json({ isDuplicate: false });
  } catch (error: any) {
    console.error('Error checking duplicates:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
