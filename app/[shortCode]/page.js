import { redirect } from 'next/navigation';
import { supabase } from '../lib/supabase';


export default async function RedirectPage({ params }) {
  const { shortCode } = await params; 

  const { data, error } = await supabase
    .from('urls')
    .select('original_url')
    .eq('short_code', shortCode)
    .single();

  if (error || !data) {
    return <div>URL not found!</div>;
  }

  redirect(data.original_url);
}