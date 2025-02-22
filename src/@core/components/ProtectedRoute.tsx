import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/pages/login'); // Use replace to prevent going back
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
