export const prerender = false;
import { supabase } from '../../../lib/supabaseClient.js';
import type { APIContext } from 'astro';

export async function GET() {
  const { data, error } = await supabase.from('produced_tracks').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tracks:', error);
    return new Response('Failed to fetch tracks', { status: 500 });
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}

export async function POST({ request }: APIContext) {
  const body = await request.json();
  const { title, description } = body;

  const { error } = await supabase.from('produced_tracks').insert([{ title, description }]);

  if (error) {
    console.error('Error adding track:', error);
    return new Response('Failed to add track', { status: 500 });
  }

  return new Response(null, { status: 201 });
}
