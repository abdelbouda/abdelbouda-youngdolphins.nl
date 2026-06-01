import { useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const isAdminRoute = window.location.hash === '#admin';

  // Check of gebruiker al ingelogd is
  useState(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAdmin(true);
      }
      setCheckingAuth(false);
    });
  });

  if (isAdminRoute) {
    if (checkingAuth) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      );
    }
    return isAdmin ? (
      <AdminDashboard />
    ) : (
      <LanguageProvider>
        <AdminLogin onLogin={() => setIsAdmin(true)} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}