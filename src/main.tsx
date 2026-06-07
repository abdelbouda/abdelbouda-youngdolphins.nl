import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';   // ✅ gewone import, werkt nu dankzij vite-env.d.ts

// Vercel Analytics deferred (niet render-blockend)
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => import('@vercel/analytics').then(({ inject }) => inject()));
} else {
  setTimeout(() => import('@vercel/analytics').then(({ inject }) => inject()), 2000);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);