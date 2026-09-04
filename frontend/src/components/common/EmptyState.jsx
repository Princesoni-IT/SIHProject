import { Inbox } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  message = '',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-14 text-center px-4">
      <div className="w-12 h-12 rounded-full bg-surface-100 flex items-center justify-center mb-1">
        <Icon size={20} className="text-slate-400" />
      </div>
      <p className="text-sm font-medium text-navy-800">{title}</p>
      {message && <p className="text-sm text-slate-500 max-w-xs">{message}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
