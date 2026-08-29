import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = await verifyJWT(token);
    if (!decoded) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: decoded.id as string,
        email: decoded.email as string,
        name: decoded.name as string
      }
    });
  } catch (error: unknown) {
    console.error('Session API Error:', error);
    return NextResponse.json({ user: null });
  }
}
