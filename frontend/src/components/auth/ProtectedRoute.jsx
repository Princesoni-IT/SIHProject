import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Loader from '../common/Loader.jsx';
import { ROLE_HOME_ROUTE } from '../../utils/constants.js';

// Wrap route groups with <ProtectedRoute allowedRoles={[...]} /> in the router.
// Redirects to /login when unauthenticated, and to /unauthorized when the
// user's role isn't permitted for this section.
export default function ProtectedRoute({ allowedRoles }) {
  const { status, user } = useAuth();
  const location = useLocation();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <Loader label="Checking your session..." />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export function RoleRedirect() {
  const { status, user } = useAuth();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <Loader label="Checking your session..." />
      </div>
    );
  }

  const target = status === 'authenticated' ? ROLE_HOME_ROUTE[user?.role] || '/login' : '/login';
  return <Navigate to={target} replace />;
}
