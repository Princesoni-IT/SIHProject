const ITEMS = [
  { color: '#e0453f', label: 'High Risk Area' },
  { color: '#ea9a1e', label: 'Water Logged' },
  { color: '#17a869', label: 'Normal' },
];

export default function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-[400] bg-white rounded-xl shadow-card-hover px-4 py-3 text-xs">
      <p className="font-semibold text-navy-800 mb-2">Legend</p>
      <div className="flex flex-col gap-1.5">
        {ITEMS.map((i) => (
          <div key={i.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: i.color }} />
            <span className="text-slate-600">{i.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
