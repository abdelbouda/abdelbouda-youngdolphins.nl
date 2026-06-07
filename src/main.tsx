import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// @ts-ignore - CSS module (werkt in runtime)
import './index.css';

// Vercel Analytics pas laden na idle
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