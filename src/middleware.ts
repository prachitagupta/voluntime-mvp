import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware() {
  const res = NextResponse.next();

  // Temporarily disabled to test if this is causing the cookies error
  /*
  try {
    const supabase = createMiddlewareClient({ req, res });
    await supabase.auth.getSession(); // attaches cookies
  } catch (error) {
    // Handle any auth errors gracefully
    console.error('Middleware auth error:', error);
  }
  */

  return res;
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api|_vercel).*)'], // run on all routes except static and API
};