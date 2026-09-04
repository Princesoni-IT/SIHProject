import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function colorForRisk(v) {
  if (v >= 70) return 'var(--color-danger-500)';
  if (v >= 40) return 'var(--color-warn-500)';
  return 'var(--color-safe-500)';
}

export default function RiskChart({ data = [], dataKey = 'risk', nameKey = 'area' }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid stroke="#e9f1fa" vertical={false} />
        <XAxis dataKey={nameKey} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #dbe7f4', fontSize: 13 }} />
        <Bar dataKey={dataKey} radius={[6, 6, 0, 0]}>
          {data.map((d, i) => (
            <Cell key={i} fill={colorForRisk(d[dataKey])} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
