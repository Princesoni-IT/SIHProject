import { useState } from 'react';
import { Bell, ClipboardList, AlertTriangle, Info } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync.js';
import { notificationService } from '../../services/notificationService.js';
import { useToast } from '../../context/ToastContext.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { timeAgo } from '../../utils/format.js';

const TYPE_ICON = { complaint: ClipboardList, emergency: AlertTriangle, system: Info };
const TYPE_TONE = { complaint: 'text-royal-600 bg-royal-50', emergency: 'text-danger-600 bg-red-50', system: 'text-slate-500 bg-surface-100' };

export default function Messages() {
  const { data, status, refetch } = useAsync(() => notificationService.getAll(), []);
  const toast = useToast();
  const [items, setItems] = useState(null);

  const notifications = items ?? data ?? [];

  function markRead(n) {
    if (n.read) return;
    notificationService
      .markRead(n.id)
      .then(() => setItems(notifications.map((x) => (x.id === n.id ? { ...x, read: true } : x))))
      .catch((err) => toast.error(err.message || 'Unable to mark as read.'));
  }

  return (
    <div>
      <PageHeader title="Messages" subtitle="Notifications, system messages and emergency alerts" />

      <div className="card-surface p-2">
        {status === 'loading' && <Loader label="Loading messages..." />}
        {status === 'error' && <ErrorState title="Unable to load messages." onRetry={refetch} />}
        {status === 'success' && notifications.length === 0 && (
          <EmptyState icon={Bell} title="No messages yet." message="You're all caught up." />
        )}
        {status === 'success' && notifications.length > 0 && (
          <ul className="flex flex-col divide-y divide-surface-100">
            {notifications.map((n) => {
              const Icon = TYPE_ICON[n.type] || Info;
              return (
                <li key={n.id}>
                  <button
                    onClick={() => markRead(n)}
                    className={`w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-surface-50 ${!n.read ? 'bg-royal-50/40' : ''}`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${TYPE_TONE[n.type] || TYPE_TONE.system}`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!n.read ? 'font-semibold text-navy-900' : 'font-medium text-navy-700'}`}>{n.title}</p>
                      <p className="text-sm text-slate-500 mt-0.5">{n.message}</p>
                      <p className="text-xs text-slate-400 mt-1">{timeAgo(n.time)}</p>
                    </div>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-royal-500 mt-1.5 shrink-0" />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
