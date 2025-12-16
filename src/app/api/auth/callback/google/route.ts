import { NextRequest, NextResponse } from 'next/server';
import oauth2Client from '@/app/utils/google-auth';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(new URL('/?error=oauth_failed', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  try {
    // Exchange authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Store tokens in HTTP-only cookies
    const cookieStore = await cookies();
    
    if (tokens.access_token) {
      cookieStore.set('google_access_token', tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hour
        path: '/',
      });
    }

    if (tokens.refresh_token) {
      cookieStore.set('google_refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }

    // Get user info
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userInfoResponse.ok) {
      throw new Error('Failed to fetch user info');
    }

    const userInfo = await userInfoResponse.json();

    // Store user info in cookie
    cookieStore.set('google_user', JSON.stringify({
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    // Redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}
