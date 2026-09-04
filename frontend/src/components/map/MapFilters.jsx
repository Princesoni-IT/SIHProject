const OPTIONS = [
  { key: 'all', label: 'All' },
  { key: 'complaint', label: 'Complaints' },
  { key: 'risk', label: 'Risk Areas' },
  { key: 'emergency', label: 'Emergency' },
];

export default function MapFilters({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((o) => (
        <button
          key={o.key}
          onClick={() => onChange(o.key)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            value === o.key
              ? 'bg-royal-600 text-white border-royal-600'
              : 'bg-white text-navy-700 border-surface-200 hover:bg-surface-50'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
