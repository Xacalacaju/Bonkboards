import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(url, anon);

export function getServerSupabase(serviceRoleKey) {
  if (!serviceRoleKey) throw new Error('Missing service role key');
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, serviceRoleKey);
}
