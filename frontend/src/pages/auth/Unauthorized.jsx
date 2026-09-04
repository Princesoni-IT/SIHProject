import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import Button from '../../components/common/Button.jsx';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-surface-50 text-center">
      <div className="max-w-sm">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
          <ShieldAlert size={26} className="text-danger-600" />
        </div>
        <h1 className="text-xl font-semibold text-navy-900">Access Restricted</h1>
        <p className="text-sm text-slate-500 mt-2 mb-6">
          You don't have permission to view this page. If you believe this is a mistake, contact your administrator.
        </p>
        <Link to="/login">
          <Button className="w-full">Back to Login</Button>
        </Link>
      </div>
    </div>
  );
}
