// Semantic status/priority badge. Pass a `tone` or let it infer from `label`.
const TONE_STYLES = {
  danger: 'bg-red-50 text-danger-600',
  warning: 'bg-amber-50 text-warn-600',
  safe: 'bg-emerald-50 text-safe-600',
  resolve: 'bg-violet-50 text-resolve-600',
  info: 'bg-royal-50 text-royal-600',
  neutral: 'bg-slate-100 text-slate-600',
};

const LABEL_TONE_MAP = {
  critical: 'danger',
  high: 'danger',
  pending: 'warning',
  medium: 'warning',
  active: 'warning',
  scheduled: 'info',
  'in progress': 'info',
  monitoring: 'info',
  low: 'safe',
  resolved: 'safe',
  normal: 'safe',
  active_user: 'safe',
  closed: 'resolve',
  archived: 'neutral',
  inactive: 'neutral',
};

export default function Badge({ label, tone, className = '' }) {
  const resolvedTone = tone || LABEL_TONE_MAP[String(label).toLowerCase()] || 'neutral';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${TONE_STYLES[resolvedTone]} ${className}`}
    >
      {label}
    </span>
  );
}
