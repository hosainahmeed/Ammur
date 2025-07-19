import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value || '';
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

  if (pathname === '/message' && !token) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  if (pathname === '/timeline' && !token) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  if (pathname === '/upcoming-event' && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/home', '/message', '/upcoming-event', '/timeline'],
};
