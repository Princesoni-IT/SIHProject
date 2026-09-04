export default function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border border-surface-200 bg-white outline-none
        focus:border-royal-400 focus:ring-2 focus:ring-royal-50 transition-colors ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
