import { Link } from 'react-router-dom';
import { MapPinOff } from 'lucide-react';
import Button from '../components/common/Button.jsx';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-surface-50 text-center">
      <div className="max-w-sm">
        <div className="w-14 h-14 rounded-2xl bg-royal-50 flex items-center justify-center mx-auto mb-5">
          <MapPinOff size={26} className="text-royal-600" />
        </div>
        <h1 className="text-xl font-semibold text-navy-900">Page Not Found</h1>
        <p className="text-sm text-slate-500 mt-2 mb-6">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link to="/">
          <Button className="w-full">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
