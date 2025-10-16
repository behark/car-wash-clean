'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { CheckCircle, AlertCircle, X, Info, AlertTriangle } from 'lucide-react'

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void
  hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString()
    const newToast = { ...toast, id }
    setToasts(prev => [...prev, newToast])

    // Auto-remove toast after duration
    setTimeout(() => {
      hideToast(id)
    }, toast.duration || 5000)
  }

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const getToastConfig = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          iconColor: 'text-green-600',
          progressColor: 'bg-green-500'
        }
      case 'error':
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          bgColor: 'bg-gradient-to-r from-red-50 to-rose-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          iconColor: 'text-red-600',
          progressColor: 'bg-red-500'
        }
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          bgColor: 'bg-gradient-to-r from-yellow-50 to-amber-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-600',
          progressColor: 'bg-yellow-500'
        }
      case 'info':
        return {
          icon: <Info className="w-5 h-5" />,
          bgColor: 'bg-gradient-to-r from-blue-50 to-sky-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-600',
          progressColor: 'bg-blue-500'
        }
    }
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      {/* Toast Container - Mobile Optimized */}
      <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 z-50 space-y-2 sm:max-w-sm">
        {toasts.map((toast) => {
          const config = getToastConfig(toast.type)
          const duration = toast.duration || 5000
          
          return (
            <div
              key={toast.id}
              className={`toast-enter border ${config.borderColor} ${config.bgColor} rounded-xl shadow-xl backdrop-blur-sm overflow-hidden`}
            >
              {/* Progress Bar */}
              <div className="h-1 bg-gray-200/50 overflow-hidden">
                <div 
                  className={`h-full ${config.progressColor} toast-progress`}
                  style={{ animationDuration: `${duration}ms` }}
                />
              </div>

              <div className="p-4">
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div className={`flex-shrink-0 ${config.iconColor}`}>
                    {config.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${config.textColor} mb-1`}>
                      {toast.title}
                    </p>
                    <p className={`text-sm ${config.textColor} opacity-90`}>
                      {toast.message}
                    </p>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => hideToast(toast.id)}
                    className={`flex-shrink-0 ${config.textColor} opacity-60 hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-black/5 active:scale-95`}
                    aria-label="Sulje ilmoitus"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes toast-enter {
          from {
            opacity: 0;
            transform: translateX(100%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes toast-progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .toast-enter {
          animation: toast-enter 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .toast-progress {
          animation: toast-progress linear forwards;
        }

        @media (max-width: 640px) {
          @keyframes toast-enter {
            from {
              opacity: 0;
              transform: translateY(-100%) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        }
      `}</style>
    </ToastContext.Provider>
  )
}

// Helper hook for common toast messages
export const useToastHelpers = () => {
  const { showToast } = useToast()

  return {
    success: (title: string, message: string) => 
      showToast({ type: 'success', title, message }),
    
    error: (title: string, message: string) => 
      showToast({ type: 'error', title, message }),
    
    warning: (title: string, message: string) => 
      showToast({ type: 'warning', title, message }),
    
    info: (title: string, message: string) => 
      showToast({ type: 'info', title, message }),
    
    // Preset Finnish messages
    bookingSuccess: () => 
      showToast({ 
        type: 'success', 
        title: 'Varaus onnistui!', 
        message: 'Lähetimme vahvistuksen sähköpostiisi' 
      }),
    
    bookingError: () => 
      showToast({ 
        type: 'error', 
        title: 'Virhe varauksessa', 
        message: 'Yritä uudelleen tai ota yhteyttä' 
      }),
    
    formError: () => 
      showToast({ 
        type: 'warning', 
        title: 'Tarkista tiedot', 
        message: 'Täytä kaikki pakolliset kentät' 
      }),
  }
}
