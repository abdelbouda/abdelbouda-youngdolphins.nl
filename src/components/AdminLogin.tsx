import { useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      // Dynamisch de auth module laden
      const { getAuthModule } = await import('../firebase');
      const auth = await getAuthModule();
      const { signInWithPopup } = await import('firebase/auth');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('Ingelogd als:', result.user.email);
      onLogin();
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
        <h2 className="text-2xl font-black text-primary mb-2">🐬 Admin Login</h2>
        <p className="text-sm text-gray-500 mb-6">Sign in with your Google account</p>
        {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold mb-4">{error}</div>}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 bg-white border-2 border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? <div className="w-5 h-5 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div> : <>Sign in with Google</>}
        </button>
      </div>
    </div>
  );
}