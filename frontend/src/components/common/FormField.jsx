// Labeled input wrapper with consistent spacing, error text, and a11y wiring.
export default function FormField({ label, htmlFor, error, hint, children, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-navy-800">
          {label} {required && <span className="text-danger-500">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && (
        <p className="text-xs text-danger-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
