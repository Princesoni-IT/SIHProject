import { useNavigate } from 'react-router-dom';
import { Map, Megaphone, AlertTriangle, FileBarChart } from 'lucide-react';

const ACTIONS = [
  { label: 'View Map', icon: Map, to: '/admin/map' },
  { label: 'Add Notice', icon: Megaphone, to: '/admin/notices' },
  { label: 'Send Alert', icon: AlertTriangle, to: '/admin/alerts' },
  { label: 'Generate Report', icon: FileBarChart, to: '/admin/reports' },
];

export default function QuickActions() {
  const navigate = useNavigate();
  return (
    <div className="card-surface p-5 h-full">
      <h3 className="text-base font-semibold text-navy-900 mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {ACTIONS.map(({ label, icon: Icon, to }) => (
          <button
            key={label}
            onClick={() => navigate(to)}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-surface-200 py-4 hover:border-royal-300 hover:bg-royal-50/40 transition-colors"
          >
            <Icon size={19} className="text-royal-600" />
            <span className="text-xs font-medium text-navy-700 text-center">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
