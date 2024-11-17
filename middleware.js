import { NextResponse } from 'next/server';
import checkAuth from './app/actions/checkAuth';

export async function middleware(request) {
  const { isAuthenticated } = await checkAuth();

  // console.log(`request.url: ${request.url}`);

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // const { pathname } = request.nextUrl;
  // console.log(`Requested Page: ${pathname}`);

  return NextResponse.next();
}

export const config = {
  matcher: ['/bookings', '/rooms/add', '/rooms/my']
};