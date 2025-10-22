import { NextRequest, NextResponse } from 'next/server';

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const { code, grant_type, refresh_token } = await request.json();
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/callback/spotify`;

    let body: Record<string, string>;
    
    if (grant_type === 'refresh_token') {
      body = {
        grant_type: 'refresh_token',
        refresh_token,
      };
    } else {
      body = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      };
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Spotify API error:', errorText);
      return NextResponse.json({ error: 'Failed to get token' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}