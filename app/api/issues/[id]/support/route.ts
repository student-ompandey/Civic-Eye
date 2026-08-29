import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/auth';

async function authenticate() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return null;
  return await verifyJWT(token);
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await authenticate();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid issue ID' }, { status: 400 });
    }

    const db = await getDb();
    const issuesCollection = db.collection('issues');

    // Add support to the issue (e.g. tracking supporters in an array or counter)
    const result = await issuesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $addToSet: { supporters: user.id } } // Using addToSet to prevent duplicate support
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Issue supported successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error supporting issue:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
