import { NextResponse } from 'next/server';

export async function middleware(request) {
  const isAuthenticated = false;

  console.log(`request.url: ${request.url}`);

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // const { pathname } = request.nextUrl;
  // console.log(`Requested Page: ${pathname}`);

  return NextResponse.next();
}

export const config = {
  matcher: ['/bookings']
};