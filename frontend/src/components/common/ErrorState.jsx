import { AlertTriangle, RotateCw } from 'lucide-react';
import Button from './Button.jsx';

export default function ErrorState({
  title = 'Unable to load data.',
  message,
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-14 text-center px-4">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-1">
        <AlertTriangle size={20} className="text-danger-500" />
      </div>
      <p className="text-sm font-medium text-navy-800">{title}</p>
      {message && <p className="text-sm text-slate-500 max-w-xs">{message}</p>}
      {onRetry && (
        <Button variant="secondary" size="sm" icon={RotateCw} onClick={onRetry} className="mt-2">
          Retry
        </Button>
      )}
    </div>
  );
}
