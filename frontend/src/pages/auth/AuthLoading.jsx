import Loader from '../../components/common/Loader.jsx';
import Logo from '../../components/common/Logo.jsx';

// Shown briefly during app bootstrap while AuthContext verifies an
// existing session token against GET /api/auth/me.
export default function AuthLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-surface-50">
      <Logo size="lg" theme="light" />
      <Loader label="Setting things up..." />
    </div>
  );
}
