import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Analytics pas laden nadat de pagina interactief is
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => import('@vercel/analytics').then(({ inject }) => inject()));
} else {
  setTimeout(() => import('@vercel/analytics').then(({ inject }) => inject()), 2000);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);