import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { hashPassword, signJWT } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { fullName, email, password } = await request.json();

    // 1. Basic validation
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const db = await getDb();
    
    // 2. Check if user already exists
    const existingUser = await db.collection('users').findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // 3. Hash password
    const hashedPassword = await hashPassword(password);

    // 4. Save user to MongoDB users collection
    const result = await db.collection('users').insertOne({
      name: fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      created_at: new Date()
    });

    const userId = result.insertedId.toString();

    // 5. Generate signed JWT token
    const token = await signJWT({
      id: userId,
      email: email.toLowerCase(),
      name: fullName
    });

    // 6. Set secure session cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: email.toLowerCase(),
        name: fullName
      }
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error: unknown) {
    console.error('Registration API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during registration' },
      { status: 500 }
    );
  }
}
