import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, XCircle, Info, X, AlertTriangle } from 'lucide-react';

// Context
const ToastContext = createContext(null);

const ICONS = {
    success: <CheckCircle2 size={20} color="#22c55e" />,
    error: <XCircle size={20} color="#ef4444" />,
    info: <Info size={20} color="#00A99D" />,
    warning: <AlertTriangle size={20} color="#f59e0b" />,
};

// Individual toast item
const ToastItem = ({ toast, onRemove }) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                background: '#1a1a2e',
                color: '#f1f5f9',
                borderRadius: '20px',
                padding: '14px 16px',
                marginBottom: '10px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                animation: 'toastSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                minWidth: '260px',
                maxWidth: '90vw',
                position: 'relative',
                border: `1px solid rgba(255,255,255,0.07)`,
            }}
        >
            <div style={{ flexShrink: 0, marginTop: '1px' }}>
                {ICONS[toast.type] || ICONS.info}
            </div>
            <div style={{ flex: 1 }}>
                {toast.title && (
                    <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '2px', color: '#f8fafc' }}>
                        {toast.title}
                    </p>
                )}
                <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.4, margin: 0 }}>
                    {toast.message}
                </p>
            </div>
            <button
                onClick={() => onRemove(toast.id)}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#64748b',
                    padding: '2px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <X size={14} />
            </button>
        </div>
    );
};

// Provider component
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const toast = useCallback(({ message, title, type = 'info', duration = 3500 }) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, title, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            {/* Toast container */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '90px', // above bottom nav
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 99999,
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    alignItems: 'center',
                    width: '100%',
                    padding: '0 16px',
                    pointerEvents: 'none',
                }}
            >
                {toasts.map(t => (
                    <div key={t.id} style={{ pointerEvents: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <ToastItem toast={t} onRemove={removeToast} />
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes toastSlideUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </ToastContext.Provider>
    );
};

// Hook
export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within a ToastProvider');
    return ctx.toast;
};
