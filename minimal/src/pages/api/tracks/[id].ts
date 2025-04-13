export const prerender = false;
import { supabase } from '../../../lib/supabaseClient.js';
import type { APIContext } from 'astro';

export async function PUT({ request, params }: APIContext) {
  const id = params.id;
  const body = await request.json();
  const { title, description, spotify_url } = body;

  const { error } =await supabase.from('produced_tracks')
    .update({ title, description, spotify_url })
    .eq('id', id);
  
  if (error) {
    console.error('Error updating track:', error);
    return new Response('Failed to update track', { status: 500 });
  }

  return new Response(null, { status: 200 });
}

export async function DELETE({ params }: APIContext) {
  const id = params.id;

  const { error } = await supabase
    .from('produced_tracks')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting track:', error);
    return new Response('Failed to delete track', { status: 500 });
  }

  return new Response(null, { status: 200 });
}
