// ... (eerste deel blijft hetzelfde)

// Admin componenten lazy laden
const AdminLogin = lazy(() => import('./components/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

// In de admin route:
if (isAdminRoute) {
  if (checkingAuth) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>;
  }
  if (isAdmin) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
        <AdminDashboard />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
      <AdminLogin onLogin={() => setIsAdmin(true)} />
    </Suspense>
  );
}