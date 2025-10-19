"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (
    message: string,
    type: ToastType = "info",
    duration: number = 3000
  ) => {
    const id = Math.random().toString(36).substring(7);
    const newToast: Toast = { id, message, type, duration };
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: () => void;
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - 100 / (toast.duration! / 50);
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [toast.duration]);

  const icons = {
    success: <CheckCircle2 className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  };

  const colors = {
    success: {
      bg: "bg-green-500/10 border-green-500/50",
      icon: "text-green-500",
      progress: "bg-green-500",
    },
    error: {
      bg: "bg-red-500/10 border-red-500/50",
      icon: "text-red-500",
      progress: "bg-red-500",
    },
    warning: {
      bg: "bg-orange-500/10 border-orange-500/50",
      icon: "text-orange-500",
      progress: "bg-orange-500",
    },
    info: {
      bg: "bg-blue-500/10 border-blue-500/50",
      icon: "text-blue-500",
      progress: "bg-blue-500",
    },
  };

  const colorScheme = colors[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }}
      className="pointer-events-auto"
    >
      <div
        className={cn(
          "relative min-w-[300px] max-w-md rounded-lg border backdrop-blur-lg shadow-lg overflow-hidden",
          colorScheme.bg
        )}
      >
        <div className="flex items-start gap-3 p-4">
          <div className={cn("flex-shrink-0", colorScheme.icon)}>
            {icons[toast.type]}
          </div>
          <p className="flex-1 text-sm font-medium text-foreground pr-6">
            {toast.message}
          </p>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {toast.duration && toast.duration > 0 && (
          <div className="h-1 bg-muted/20">
            <motion.div
              className={cn("h-full", colorScheme.progress)}
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
