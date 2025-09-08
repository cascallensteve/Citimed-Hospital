import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type RoleRouteProps = {
  children: React.ReactNode;
  roles: Array<'admin' | 'superadmin'>;
  redirectTo?: string;
};

const RoleRoute = ({ children, roles, redirectTo = '/login' }: RoleRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!roles.includes(user.role)) {
    // If authenticated but not authorized, send to role default dashboard
    const fallback = user.role === 'superadmin' ? '/dashboard/super' : '/dashboard/admin';
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
};

export default RoleRoute;


