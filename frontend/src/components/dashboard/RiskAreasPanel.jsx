import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync.js';
import { riskAreaService } from '../../services/riskAreaService.js';
import Badge from '../common/Badge.jsx';
import Loader from '../common/Loader.jsx';
import ErrorState from '../common/ErrorState.jsx';
import EmptyState from '../common/EmptyState.jsx';

export default function RiskAreasPanel() {
  const { data, status, refetch } = useAsync(() => riskAreaService.getAll(), []);
  const items = (data || []).filter((a) => a.riskLevel === 'High' || a.riskLevel === 'Critical').slice(0, 4);

  return (
    <div className="card-surface p-5 h-full flex flex-col">
      <h3 className="text-base font-semibold text-navy-900 mb-3">Flood / Risk Areas</h3>

      {status === 'loading' && <Loader label="Loading risk areas..." />}
      {status === 'error' && <ErrorState title="Unable to load risk areas." onRetry={refetch} />}
      {status === 'success' && items.length === 0 && <EmptyState title="No high-risk areas right now." />}

      {status === 'success' && items.length > 0 && (
        <ul className="flex flex-col divide-y divide-surface-200">
          {items.map((a) => (
            <li key={a.id} className="flex items-center justify-between py-2.5 first:pt-0 gap-3">
              <span className="text-sm font-medium text-navy-800 truncate">{a.area}</span>
              <Badge label={`${a.riskLevel} Risk`} tone={a.riskLevel === 'Critical' ? 'danger' : 'danger'} />
            </li>
          ))}
        </ul>
      )}

      <Link
        to="/admin/risk-areas"
        className="mt-4 pt-3 border-t border-surface-200 text-sm font-medium text-royal-600 hover:text-royal-700 flex items-center gap-1"
      >
        View All Areas <ArrowRight size={14} />
      </Link>
    </div>
  );
}
