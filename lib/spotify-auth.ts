import { generateCodeVerifier, generateCodeChallenge } from './pkce-utils';

// Configuración para Spotify OAuth
export const SPOTIFY_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "f50bb374b8cd47a0977810495c03c09b",
  redirectUri: typeof window !== 'undefined' ? 
    (window.location.hostname === 'localhost' ? 
      'http://localhost:3000/callback/spotify' : 
      'https://jorgeajonesp.github.io/PortafolioJorgeAJones/callback/spotify'
    ) : '',
  scopes: [
    'user-read-currently-playing',
    'user-read-playback-state',
  ].join(' '),
};

export async function generateSpotifyAuthUrl(): Promise<string> {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  
  // Guardar el code_verifier para usarlo después
  localStorage.setItem('spotify_code_verifier', codeVerifier);
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CONFIG.clientId,
    scope: SPOTIFY_CONFIG.scopes,
    redirect_uri: SPOTIFY_CONFIG.redirectUri,
    state: generateRandomString(16),
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export function generateRandomString(length: number): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  
  return text;
}

export async function exchangeCodeForToken(code: string): Promise<{accessToken: string, refreshToken: string, expiresIn: number}> {
  const codeVerifier = localStorage.getItem('spotify_code_verifier');
  
  if (!codeVerifier) {
    throw new Error('No code verifier found');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: SPOTIFY_CONFIG.redirectUri,
      client_id: SPOTIFY_CONFIG.clientId,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Spotify token exchange error:', errorData);
    throw new Error('Failed to exchange code for token');
  }

  const data = await response.json();
  
  // Limpiar el code verifier
  localStorage.removeItem('spotify_code_verifier');
  
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in
  };
}

export async function refreshAccessToken(refreshToken: string): Promise<string> {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: SPOTIFY_CONFIG.clientId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  return data.access_token;
}