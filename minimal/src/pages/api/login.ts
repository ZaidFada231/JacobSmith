// src/pages/api/login.ts
export const prerender = false;

import { supabase } from '../../lib/supabaseClient';
import type { APIContext } from 'astro';

export async function POST({ request }: APIContext) {
  const body = await request.json();
  const { email, password } = body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login failed:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 401 }
    );
  }

  if (!data.session) {
    return new Response(
      JSON.stringify({ error: "No active session created." }),
      { status: 401 }
    );
  }

  return new Response(
    JSON.stringify({ message: 'Login successful', session: data.session }),
    { status: 200 }
  );
}
