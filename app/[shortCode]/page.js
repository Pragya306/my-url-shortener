import { redirect } from 'next/navigation';
import { supabase } from '../../lib/supabase'; // Adjust path if your lib folder is located elsewhere

export default async function RedirectPage({ params }) {
  // Get the short code from the URL path
  const { shortCode } = params;

  // Find the original URL in Supabase that matches this short code
  const { data, error } = await supabase
    .from('urls')
    .select('original_url') // Ensure this matches your database column name
    .eq('short_code', shortCode)
    .single();

  // If there is an error or no URL found, show a message
  if (error || !data) {
    return <div>URL not found!</div>;
  }

  // Redirect the user to the original long URL
  redirect(data.original_url);
}