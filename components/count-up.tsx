"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(() => setValue(target), 0);
      return () => window.clearTimeout(timer);
    }
    let raf = 0;
    let start: number | null = null;
    const duration = 1600;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            raf = requestAnimationFrame(step);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return <span ref={ref}>{value}</span>;
}