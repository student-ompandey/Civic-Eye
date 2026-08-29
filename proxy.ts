import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_jwt_key_should_be_long_and_random_32_bytes';
const secret = new TextEncoder().encode(JWT_SECRET);

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  const url = request.nextUrl.clone();
  const isProtectedRoute = ['/dashboard', '/my-reports', '/report'].some((path) =>
    url.pathname.startsWith(path)
  );

  const isAuthRoute = ['/login', '/register'].some((path) =>
    url.pathname.startsWith(path)
  );

  if (isProtectedRoute) {
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    try {
      await jwtVerify(token, secret);
    } catch (e) {
      url.pathname = '/login';
      const response = NextResponse.redirect(url);
      response.cookies.delete('auth_token');
      return response;
    }
  }

  if (isAuthRoute && token) {
    try {
      await jwtVerify(token, secret);
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    } catch (e) {
      // Token invalid, clear it and proceed to login/register
      const response = NextResponse.next();
      response.cookies.delete('auth_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/my-reports/:path*', '/report/:path*', '/login', '/register'],
};
