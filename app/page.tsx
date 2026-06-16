"use client";

import { useState } from 'react';
import { supabase } from './lib/supabase'; // Ensure the path to your supabase client is correct

export default function Home() {
  // State to store the long URL input and the generated short URL
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh on form submit
    
    // Generate a random string to use as the short code
    const shortCode = Math.random().toString(36).substring(7);
    
    // Insert the data into the 'urls' table in Supabase
    // Using 'original_url' and 'short_code' to match your database columns
    const { data, error } = await supabase
      .from('urls')
      .insert([{ original_url: longUrl, short_code: shortCode }]);

    if (error) {
      console.error('Error inserting:', error.message);
      alert('Error: ' + error.message); // Show error to the user if something fails
    } else {
      // Create the full shortened URL and update the state
      setShortUrl(`${window.location.origin}/${shortCode}`);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={longUrl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          required
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button type="submit" style={{ marginLeft: '1rem', padding: '0.5rem' }}>
          Shorten
        </button>
      </form>
      
      {/* Display the shortened URL if it exists */}
      {shortUrl && (
        <div style={{ marginTop: '1rem' }}>
          <p>Shortened URL: <a href={shortUrl} target="_blank">{shortUrl}</a></p>
        </div>
      )}
    </main>
  );
}