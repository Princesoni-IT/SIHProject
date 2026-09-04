export default function Input({ className = '', invalid = false, ...props }) {
  return (
    <input
      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white outline-none transition-colors placeholder:text-slate-400
        ${invalid ? 'border-danger-400 focus:border-danger-500' : 'border-surface-200 focus:border-royal-400'}
        focus:ring-2 ${invalid ? 'focus:ring-red-100' : 'focus:ring-royal-50'} ${className}`}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
