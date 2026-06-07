import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Laad CSS pas nadat de app is gestart (niet render-blocking)
const loadCSS = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/assets/style.css';
  document.head.appendChild(link);
};

// Start de app
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// CSS en analytics pas laden nadat de eerste render klaar is
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    loadCSS();
    import('@vercel/analytics').then(({ inject }) => inject());
  });
} else {
  setTimeout(() => {
    loadCSS();
    import('@vercel/analytics').then(({ inject }) => inject());
  }, 100);
}