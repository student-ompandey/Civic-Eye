import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid issue ID format' }, { status: 400 });
    }

    const db = await getDb();
    const issuesCollection = db.collection('issues');

    const issue = await issuesCollection.findOne({ _id: new ObjectId(id) });

    if (!issue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    // Map _id and sanitize (don't send reporter's internal user ID)
    const { userId, ...publicData } = issue;
    
    // Default supporters to empty array if not exists
    const sanitizedIssue = {
      ...publicData,
      _id: issue._id.toString(),
      id: issue._id.toString(),
      supporters: issue.supporters || []
    };

    return NextResponse.json({ issue: sanitizedIssue }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching issue:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
