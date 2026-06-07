import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Normale render zonder extra trucs
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Analytics alleen lazy (veilig)
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => import('@vercel/analytics').then(({ inject }) => inject()));
} else {
  setTimeout(() => import('@vercel/analytics').then(({ inject }) => inject()), 1000);
}