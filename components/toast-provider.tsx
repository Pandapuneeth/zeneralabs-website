"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { ToasterIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";
type Toast = { id: number; message: string; type: ToastType };
export type ShowToast = (message: string, type?: ToastType, duration?: number) => void;

const ToastContext = createContext<ShowToast | null>(null);

let idCounter = 0;

const TYPE_CLASSES: Record<ToastType, string> = {
  success: "border-green-500/30 text-green-500",
  error: "border-red-500/30 text-red-500",
  info: "border-primary/30 text-primary",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback<ShowToast>(
    (message, type = "success", duration = 4000) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      window.setTimeout(() => dismiss(id), duration);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        id="toast-container"
        className="pointer-events-none fixed right-7 bottom-7 left-7 z-[9999] flex flex-col gap-2.5 sm:left-auto sm:w-[340px]"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={cn(
              "pointer-events-auto flex max-w-full items-center gap-2.5 rounded-xl border border-border border-l-4 bg-card px-4 py-3 text-sm font-medium shadow-lg animate-in slide-in-from-right-8 duration-300 max-sm:w-full",
              TYPE_CLASSES[toast.type],
            )}
          >
            <ToasterIcon type={toast.type} />
            <span className="flex-1 text-foreground">{toast.message}</span>
            <button
              type="button"
              className="rounded p-0 pl-2 text-base leading-none text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Dismiss notification"
              onClick={() => dismiss(toast.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ShowToast {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}