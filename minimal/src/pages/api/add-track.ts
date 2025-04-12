export const prerender = false;

import { supabase } from '../../lib/supabase.ts';
import type { APIContext } from 'astro';

export async function POST({ request }: APIContext) {
  const body = await request.json();
  const { title, description } = body;

  const { error } = await supabase.from('produced_tracks').insert([
    { title, description }
  ]);

  if (error) {
    console.error('Error adding track:', error);
    return new Response('Failed to add track', { status: 500 });
  }

  return new Response(null, {
    status: 200,
  });
}
