import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync.js';
import { complaintService } from '../../services/complaintService.js';
import Badge from '../common/Badge.jsx';
import Loader from '../common/Loader.jsx';
import ErrorState from '../common/ErrorState.jsx';
import EmptyState from '../common/EmptyState.jsx';
import { timeAgo } from '../../utils/format.js';

export default function RecentComplaints() {
  const { data, status, refetch } = useAsync(() => complaintService.getRecent(), []);

  return (
    <div className="card-surface p-5 flex flex-col h-full">
      <h3 className="text-base font-semibold text-navy-900 mb-3">Recent Complaints</h3>

      {status === 'loading' && <Loader label="Loading complaints..." />}
      {status === 'error' && <ErrorState title="Unable to load complaints." onRetry={refetch} />}
      {status === 'success' && (!data || data.length === 0) && (
        <EmptyState title="No complaints found." message="New citizen reports will appear here." />
      )}

      {status === 'success' && data && data.length > 0 && (
        <ol className="flex flex-col divide-y divide-surface-200">
          {data.map((c, i) => (
            <li key={c.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <span className="text-sm font-semibold text-slate-400 w-4 shrink-0">{i + 1}.</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-navy-800 truncate">{c.type}</p>
                <p className="text-xs text-slate-500 truncate">{c.location}</p>
              </div>
              <Badge label={c.priority} />
              <span className="text-xs text-slate-400 w-16 text-right shrink-0">{timeAgo(c.date)}</span>
            </li>
          ))}
        </ol>
      )}

      <Link
        to="/admin/complaints"
        className="mt-4 pt-3 border-t border-surface-200 text-sm font-medium text-royal-600 hover:text-royal-700 flex items-center gap-1"
      >
        View All Complaints <ArrowRight size={14} />
      </Link>
    </div>
  );
}
