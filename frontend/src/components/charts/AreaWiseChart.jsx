import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AreaWiseChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid stroke="#e9f1fa" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="area" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} width={56} />
        <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #dbe7f4', fontSize: 13 }} />
        <Bar dataKey="complaints" fill="var(--color-royal-500)" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
