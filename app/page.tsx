'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shortCode = Math.random().toString(36).substring(7);
    
    // Call your API
    const res = await fetch('/api/shorten', {
      method: 'POST',
      body: JSON.stringify({ originalUrl: url, shortCode }),
    });

    if (res.ok) {
      setShortUrl(`${window.location.origin}/${shortCode}`);
    }
  };

  return (
    <main style={{ padding: '50px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <input 
          type="url" 
          placeholder="Paste your long link here..." 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{ width: '80%', padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>Shorten</button>
      </form>

      {shortUrl && (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc' }}>
          <p>Your Short Link:</p>
          <a href={shortUrl} target="_blank" style={{ fontSize: '20px', color: 'blue' }}>{shortUrl}</a>
          <br/>
          <button 
            onClick={() => navigator.clipboard.writeText(shortUrl)}
            style={{ marginTop: '10px', cursor: 'pointer' }}
          >
            Copy Link
          </button>
        </div>
      )}
    </main>
  );
}