"use client";

import { useEffect, useRef, useState, type ReactNode, type Ref } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(timer);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as Ref<HTMLDivElement>}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-7 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}