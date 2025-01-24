import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const isApiRoute = req.nextUrl.pathname.startsWith('/api/admin');

  // Check for admin routes
  if ((isAdminRoute || isApiRoute) && token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Protected routes that require authentication
  if (!token && req.nextUrl.pathname !== '/auth/login') {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/profile/:path*']
}; 