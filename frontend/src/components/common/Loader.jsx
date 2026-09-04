import { Loader2 } from 'lucide-react';

export default function Loader({ label = 'Loading...', className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 py-10 text-slate-500 ${className}`}>
      <Loader2 size={22} className="animate-spin text-royal-500" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
