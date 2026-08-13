"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function WebGLFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden",
        "bg-[radial-gradient(ellipse_at_top,rgba(242,0,137,0.28),transparent_60%)]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(26,11,46,0.9),transparent_65%)]" />
    </div>
  );
}

interface WebGLErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<
  WebGLErrorBoundaryProps,
  WebGLErrorBoundaryState
> {
  state: WebGLErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error("[AnimatedGradient] WebGL error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
