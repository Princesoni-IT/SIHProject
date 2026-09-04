import { Link } from 'react-router-dom';
import { ArrowRight, Circle } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync.js';
import { alertService } from '../../services/alertService.js';
import Loader from '../common/Loader.jsx';
import ErrorState from '../common/ErrorState.jsx';
import EmptyState from '../common/EmptyState.jsx';
import { timeAgo } from '../../utils/format.js';

const DOT_COLOR = {
  critical: 'text-danger-500',
  high: 'text-danger-500',
  warning: 'text-warn-500',
  info: 'text-royal-500',
};

export default function AlertsPanel() {
  const { data, status, refetch } = useAsync(() => alertService.getAll(), []);
  const items = (data || []).slice(0, 3);

  return (
    <div className="card-surface p-5 h-full flex flex-col">
      <h3 className="text-base font-semibold text-navy-900 mb-3">Alerts / Notifications</h3>

      {status === 'loading' && <Loader label="Loading alerts..." />}
      {status === 'error' && <ErrorState title="Unable to load alerts." onRetry={refetch} />}
      {status === 'success' && items.length === 0 && <EmptyState title="No active alerts." />}

      {status === 'success' && items.length > 0 && (
        <ul className="flex flex-col gap-4">
          {items.map((a) => (
            <li key={a.id} className="flex gap-2.5">
              <Circle size={9} className={`mt-1.5 shrink-0 fill-current ${DOT_COLOR[a.severity] || 'text-slate-400'}`} />
              <div>
                <p className="text-sm font-medium text-navy-800 leading-snug">{a.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{timeAgo(a.time)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link
        to="/admin/alerts"
        className="mt-4 pt-3 border-t border-surface-200 text-sm font-medium text-royal-600 hover:text-royal-700 flex items-center gap-1"
      >
        View All Alerts <ArrowRight size={14} />
      </Link>
    </div>
  );
}
