// Shared card wrapper for chart widgets used across Dashboard and Reports.
export default function ChartCard({ title, subtitle, action, children, className = '' }) {
  return (
    <div className={`card-surface p-5 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-navy-900">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
