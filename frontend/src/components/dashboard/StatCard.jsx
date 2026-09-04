import { ArrowUp, ArrowDown } from 'lucide-react';

const TONE_BG = {
  royal: 'bg-royal-50 text-royal-600',
  safe: 'bg-emerald-50 text-safe-600',
  warn: 'bg-amber-50 text-warn-600',
  resolve: 'bg-violet-50 text-resolve-600',
  danger: 'bg-red-50 text-danger-600',
};

export default function StatCard({ title, value, icon: Icon, trend, trendLabel, tone = 'royal' }) {
  const isUp = (trend ?? 0) >= 0;
  return (
    <div className="card-surface p-5 flex flex-col gap-3 min-w-0">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${TONE_BG[tone]}`}>
        <Icon size={19} />
      </div>
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-navy-900 mt-0.5">{value}</p>
      </div>
      {trend !== undefined && trend !== null && (
        <p className={`text-xs font-medium flex items-center gap-1 ${isUp ? 'text-safe-600' : 'text-danger-600'}`}>
          {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {Math.abs(trend)}% {trendLabel}
        </p>
      )}
    </div>
  );
}
