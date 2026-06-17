"use client";
import { useState } from 'react';
import { supabase } from './lib/supabase';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const shortCode = Math.random().toString(36).substring(7);
    
    const { error } = await supabase
      .from('urls')
      .insert([{ original_url: longUrl, short_code: shortCode }]);

    if (error) {
      alert('Error: ' + error.message);
    } else {
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
          onChange={(e) => setLongUrl(e.target.value)} 
          placeholder="Enter long URL"
          required 
          style={{ padding: '8px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '8px', marginLeft: '5px' }}>Shorten</button>
      </form>
      {shortUrl && <p>Shortened: <a href={shortUrl} target="_blank">{shortUrl}</a></p>}
    </main>
  );
}