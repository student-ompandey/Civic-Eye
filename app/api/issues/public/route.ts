import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const severity = searchParams.get('severity');
    const status = searchParams.get('status');

    const query: any = {};
    if (category && category !== 'All') query.category = category;
    if (severity && severity !== 'All') query.severity = severity;
    if (status && status !== 'All') query.status = status;

    const db = await getDb();
    const issuesCollection = db.collection('issues');

    const issues = await issuesCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    // Map _id to id string for frontend compatibility, exclude userId for public endpoints
    const formattedIssues = issues.map(issue => {
      const { userId, ...publicData } = issue;
      return {
        ...publicData,
        _id: issue._id.toString(),
        id: issue._id.toString()
      };
    });

    return NextResponse.json({ issues: formattedIssues }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching public issues:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
