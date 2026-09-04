import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RainfallChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="rainfallFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-cyan-500)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-cyan-500)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#e9f1fa" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} unit="mm" />
        <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #dbe7f4', fontSize: 13 }} />
        <Area type="monotone" dataKey="mm" stroke="var(--color-cyan-500)" strokeWidth={2.5} fill="url(#rainfallFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
