import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuratie (wordt later ook gebruikt voor admin)
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initieer app alleen voor Firestore (geen auth!)
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Auth wordt pas geïnitialiseerd wanneer nodig (lazy)
let authInstance = null;
let authApp = null;

export const getAuthModule = async () => {
  if (!authInstance) {
    // Importeer auth dynamisch (wordt alleen geladen wanneer nodig)
    const { getAuth, initializeApp: initApp } = await import('firebase/auth');
    if (!authApp) {
      authApp = initApp(firebaseConfig);
    }
    authInstance = getAuth(authApp);
  }
  return authInstance;
};