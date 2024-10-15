import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/create-user', request.url))
}

export const config = {
  matcher: ['/tours/:path*'],
}
