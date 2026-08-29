import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { id, full_name, avatar_url } = await request.json();

    if (!id || !full_name) {
      return NextResponse.json(
        { error: 'Missing required fields: id and full_name' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const profiles = db.collection('profiles');

    // Check if profile already exists to prevent duplicate operations.
    const existingProfile = await profiles.findOne({ id });
    if (existingProfile) {
      return NextResponse.json(
        { message: 'Profile already exists' },
        { status: 200 }
      );
    }

    // Insert profile document into public.profiles equivalent in MongoDB.
    await profiles.insertOne({
      id,
      full_name,
      avatar_url: avatar_url || null,
      created_at: new Date(),
    });

    return NextResponse.json(
      { success: true, message: 'Profile created successfully' },
      { status: 201 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error creating user profile in MongoDB:', err);
    return NextResponse.json(
      { error: err?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
