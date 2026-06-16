"use client";

import { useState } from 'react';
import { supabase } from './lib/supabase'; // अपनी फाइल पाथ चेक कर लें

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // रैंडम कोड जनरेट करें
    const shortCode = Math.random().toString(36).substring(7);
    
    // Supabase में डेटा डालें
    const { data, error } = await supabase
      .from('urls')
      .insert([{ long_url: longUrl, short_code: shortCode }]);

    if (error) {
      console.error('Error inserting:', error.message);
    } else {
      setShortUrl(`${window.location.origin}/${shortCode}`);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
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
      
      {shortUrl && (
        <p>Shortened URL: <a href={shortUrl} target="_blank">{shortUrl}</a></p>
      )}
    </main>
  );
}