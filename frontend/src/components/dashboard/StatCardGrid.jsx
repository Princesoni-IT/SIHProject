import { ClipboardList, Clock, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';
import StatCard from './StatCard.jsx';
import Skeleton from '../common/Skeleton.jsx';
import { formatNumber } from '../../utils/format.js';

const CONFIG = [
  { key: 'totalComplaints', title: 'Total Complaints', icon: ClipboardList, tone: 'royal' },
  { key: 'pendingComplaints', title: 'Pending Complaints', icon: Clock, tone: 'safe' },
  { key: 'inProgressComplaints', title: 'In Progress', icon: RefreshCw, tone: 'warn' },
  { key: 'resolvedComplaints', title: 'Resolved', icon: CheckCircle2, tone: 'resolve' },
  { key: 'highRiskAreas', title: 'High Risk Areas', icon: AlertTriangle, tone: 'danger' },
];

export default function StatCardGrid({ stats, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {CONFIG.map((c) => (
          <Skeleton key={c.key} className="h-[126px] rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {CONFIG.map((c) => {
        const s = stats?.[c.key];
        return (
          <StatCard
            key={c.key}
            title={c.title}
            icon={c.icon}
            tone={c.tone}
            value={formatNumber(s?.value)}
            trend={s?.trend}
            trendLabel={s?.trendLabel}
          />
        );
      })}
    </div>
  );
}
