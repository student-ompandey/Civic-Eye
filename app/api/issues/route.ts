import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

async function authenticate() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return null;
  return await verifyJWT(token);
}

export async function POST(request: Request) {
  try {
    const user = await authenticate();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      category,
      severity,
      latitude,
      longitude,
      address,
      landmark,
      city,
      state,
      aiConfidence,
      aiRisk,
      department,
      imageUrl
    } = body;

    const db = await getDb();
    const issuesCollection = db.collection('issues');

    const newIssue = {
      userId: user.id,
      title,
      description,
      category,
      severity,
      status: 'Open',
      latitude,
      longitude,
      address,
      landmark,
      city,
      state,
      aiConfidence,
      aiRisk,
      department,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await issuesCollection.insertOne(newIssue);

    return NextResponse.json(
      { success: true, id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating issue:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const user = await authenticate();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const query: any = { userId: user.id };
    if (status && status !== 'All') {
      query.status = status;
    }

    const db = await getDb();
    const issuesCollection = db.collection('issues');

    const issues = await issuesCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    // Map _id to id string for frontend compatibility
    const formattedIssues = issues.map(issue => ({
      ...issue,
      _id: issue._id.toString(),
      id: issue._id.toString()
    }));

    return NextResponse.json({ issues: formattedIssues }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching issues:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
