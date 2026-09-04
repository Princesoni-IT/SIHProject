import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = {
  Pending: 'var(--color-danger-500)',
  'In Progress': 'var(--color-warn-500)',
  Resolved: 'var(--color-safe-500)',
  Closed: '#c9d3e0',
};

export default function ComplaintsStatusChart({ data = [] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <div className="flex items-center gap-6">
      <div className="relative w-[168px] h-[168px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={54} outerRadius={78} paddingAngle={2} stroke="none">
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name] || '#cbd5e1'} />
              ))}
            </Pie>
            <Tooltip formatter={(v, n) => [v, n]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xl font-bold text-navy-900">{total}</p>
          <p className="text-xs text-slate-500">Total</p>
        </div>
      </div>
      <ul className="flex flex-col gap-2.5">
        {data.map((d) => (
          <li key={d.name} className="flex items-center gap-2 text-sm">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[d.name] || '#cbd5e1' }} />
            <span className="text-navy-700">{d.name}</span>
            <span className="text-slate-400">({d.value})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
