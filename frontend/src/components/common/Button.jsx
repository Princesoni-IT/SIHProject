import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: 'bg-royal-600 text-white hover:bg-royal-700 disabled:bg-royal-300',
  secondary: 'bg-white text-navy-800 border border-surface-200 hover:bg-surface-50',
  danger: 'bg-danger-500 text-white hover:bg-danger-600 disabled:bg-red-200',
  ghost: 'bg-transparent text-navy-700 hover:bg-surface-100',
};

const SIZES = {
  sm: 'text-xs px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2.5 gap-2',
  lg: 'text-sm px-5 py-3 gap-2',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon: Icon,
  className = '',
  disabled,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        Icon && <Icon size={16} />
      )}
      {children}
    </button>
  );
}
