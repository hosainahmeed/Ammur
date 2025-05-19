import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || '';
  const { pathname } = request.nextUrl;

  if (pathname === '/home' && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (pathname === '/' && !token) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/home'],
};
