import { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message, type = 'success') => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => dismiss(id), 4500);
    },
    [dismiss]
  );

  const toast = useMemoToast(push);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-4 right-4 z-[1000] flex flex-col gap-2 w-[min(360px,calc(100vw-2rem))]">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="card-surface flex items-start gap-2.5 px-4 py-3 border-l-4"
            style={{
              borderLeftColor:
                t.type === 'success'
                  ? 'var(--color-safe-500)'
                  : t.type === 'error'
                  ? 'var(--color-danger-500)'
                  : 'var(--color-royal-500)',
            }}
          >
            {t.type === 'success' && <CheckCircle2 size={18} className="text-safe-500 mt-0.5 shrink-0" />}
            {t.type === 'error' && <XCircle size={18} className="text-danger-500 mt-0.5 shrink-0" />}
            {t.type === 'info' && <Info size={18} className="text-royal-500 mt-0.5 shrink-0" />}
            <p className="text-sm text-navy-900 flex-1">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function useMemoToast(push) {
  return {
    success: (msg) => push(msg, 'success'),
    error: (msg) => push(msg, 'error'),
    info: (msg) => push(msg, 'info'),
  };
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
