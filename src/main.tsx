import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import App from './App';
// @ts-ignore: CSS module types are not declared in this project
import './index.css';

inject(); // <-- moet hier staan

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);