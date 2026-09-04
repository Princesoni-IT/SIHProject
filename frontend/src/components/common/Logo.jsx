import { Droplets } from 'lucide-react';

export default function Logo({ size = 'md', theme = 'dark' }) {
  const isDark = theme === 'dark';
  const sizes = {
    sm: { icon: 26, title: 'text-base', tag: 'text-[10px]' },
    md: { icon: 34, title: 'text-lg', tag: 'text-[11px]' },
    lg: { icon: 44, title: 'text-2xl', tag: 'text-xs' },
  }[size];

  return (
    <div className="flex items-center gap-2.5">
      <div
        className="shrink-0 rounded-xl flex items-center justify-center"
        style={{
          width: sizes.icon,
          height: sizes.icon,
          background: 'linear-gradient(135deg, var(--color-cyan-400), var(--color-royal-600))',
        }}
      >
        <Droplets size={sizes.icon * 0.58} className="text-white" strokeWidth={2.2} />
      </div>
      <div className="leading-tight">
        <p className={`font-bold ${sizes.title} ${isDark ? 'text-white' : 'text-navy-900'}`}>
          Aqua<span style={{ color: 'var(--color-cyan-400)' }}>Alert</span>
        </p>
        <p className={`${sizes.tag} ${isDark ? 'text-slate-300' : 'text-slate-500'} tracking-normal`}>
          Safer Cities, Brighter Tomorrows
        </p>
      </div>
    </div>
  );
}
