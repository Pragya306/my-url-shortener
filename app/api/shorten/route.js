import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const { originalUrl, shortCode } = await req.json();

  // Clean the code before saving
  const cleanCode = shortCode.trim();

  const { data, error } = await supabase
    .from('urls')
    .insert([{ original_url: originalUrl, short_code: cleanCode }]);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ message: 'Success!', data });
}