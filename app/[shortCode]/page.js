import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function RedirectPage({ params }) {
  // CRITICAL FIX: In Next.js 15+, params must be awaited
  const { shortCode } = await params;

  const { data, error } = await supabase
    .from('urls')
    .select('original_url')
    .eq('short_code', shortCode)
    .single();

  if (error || !data) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>404 - Link not found</h1>
        <p>The code "{shortCode}" does not exist.</p>
      </div>
    );
  }

  redirect(data.original_url);
}