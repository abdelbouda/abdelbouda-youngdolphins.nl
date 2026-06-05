import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Init app en Firestore direct (niet blokkerend)
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Auth wordt pas geladen wanneer nodig (lazy)
let authPromise = null;
export const getAuth = () => {
  if (!authPromise) {
    authPromise = import('firebase/auth').then(({ getAuth }) => getAuth(app));
  }
  return authPromise;
};

// Proxy voor backward compatibility (zodat `auth` in bestaande code blijft werken)
export const auth = new Proxy(
  {},
  {
    get: (_, prop) => {
      // Return een promise-resolving getter
      return (...args) => getAuth().then((auth) => auth[prop](...args));
    },
  }
);