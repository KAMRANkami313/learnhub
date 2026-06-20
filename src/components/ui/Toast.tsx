'use client';

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X, Info, AlertTriangle } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface ToastContextType {
  showToast: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, message }]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-60 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onRemove={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    color: '#34d399',
    bg: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.25)',
    glow: 'rgba(16, 185, 129, 0.15)',
  },
  error: {
    icon: XCircle,
    color: '#f87171',
    bg: 'rgba(239, 68, 68, 0.12)',
    border: 'rgba(239, 68, 68, 0.25)',
    glow: 'rgba(239, 68, 68, 0.15)',
  },
  info: {
    icon: Info,
    color: '#60a5fa',
    bg: 'rgba(59, 130, 246, 0.12)',
    border: 'rgba(59, 130, 246, 0.25)',
    glow: 'rgba(59, 130, 246, 0.15)',
  },
  warning: {
    icon: AlertTriangle,
    color: '#fbbf24',
    bg: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.25)',
    glow: 'rgba(245, 158, 11, 0.15)',
  },
};

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const config = toastConfig[toast.type] ?? toastConfig.info;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg min-w-72 max-w-sm relative overflow-hidden"
      style={{
        backgroundColor: config.bg,
        borderColor: config.border,
        backdropFilter: 'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 24px ${config.glow}`,
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: config.color }}
      />

      <Icon
        className="w-5 h-5 shrink-0 relative z-10"
        style={{ color: config.color }}
      />
      <p
        className="text-sm flex-1 relative z-10"
        style={{ color: 'var(--text-primary)' }}
      >
        {toast.message}
      </p>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 p-0.5 rounded transition-colors hover:bg-white/10 relative z-10"
        style={{ color: 'var(--text-muted)' }}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}