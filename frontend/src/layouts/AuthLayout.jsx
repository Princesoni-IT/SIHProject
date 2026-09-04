import { Outlet } from 'react-router-dom';
import Logo from '../components/common/Logo.jsx';

export default function AuthLayout() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background:
          'radial-gradient(circle at 15% 10%, rgba(56,217,232,0.10), transparent 45%), radial-gradient(circle at 85% 90%, rgba(47,95,209,0.10), transparent 45%), var(--color-surface-50)',
      }}
    >
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-7">
          <Logo size="lg" theme="light" />
        </div>
        <div className="card-surface p-7 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
