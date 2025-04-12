import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  // 1) Grab your Spotify client credentials from environment variables
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  // 2) Request an access token from Spotify
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  // 3) Parse the token JSON
  const tokenData = await tokenRes.json();

  // 4) Return the token (or an error if something failed)
  if (tokenData.error) {
    return new Response(JSON.stringify(tokenData), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 5) Return the token as JSON
  return new Response(JSON.stringify(tokenData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
