import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initieer app voor Firestore (geen auth)
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Lazy auth: wordt pas geïnitialiseerd wanneer nodig
let authInstance = null;
let authApp = null;

export const getAuthModule = async () => {
  if (!authInstance) {
    // Dynamische import van de volledige auth module
    const authModule = await import('firebase/auth');
    if (!authApp) {
      // Hergebruik dezelfde config, maar initialiseer een nieuwe app voor auth
      const { initializeApp: initApp } = await import('firebase/app');
      authApp = initApp(firebaseConfig);
    }
    authInstance = authModule.getAuth(authApp);
  }
  return authInstance;
};