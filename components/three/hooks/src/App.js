import React from 'react';

function App() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#0b1021',
        color: '#e6e6f0',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 460 }}>
        <p
          style={{
            marginBottom: 8,
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            fontSize: 12,
          }}
        >
          components/three/hooks
        </p>
        <h1 style={{ margin: '0 0 12px', fontSize: 26 }}>
          Sandbox placeholder
        </h1>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          This Create React App stub exists to satisfy tooling tasks in this
          workspace. Replace it with your own hooks showcase or ignore it if you
          are working in the main Next.js app.
        </p>
      </div>
    </main>
  );
}

export default App;
