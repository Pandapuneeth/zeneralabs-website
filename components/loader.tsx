"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.setTimeout(() => setHidden(true), 0);
      return () => window.clearTimeout(frame);
    }
    const timer = window.setTimeout(() => setHidden(true), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      id="loader"
      className={cn(
        "fixed inset-0 z-[9000] flex items-center justify-center bg-background transition-[opacity,visibility] duration-500",
        hidden && "pointer-events-none invisible opacity-0",
      )}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-4.5">
        <div className="relative flex size-20 items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo.png"
            alt=""
            className="relative z-[1] size-14 rounded-xl border border-primary/25 bg-primary/10 object-contain"
          />
          <svg className="absolute inset-0 size-20 animate-spin" viewBox="0 0 120 120" fill="none">
            <polygon className="stroke-primary/15" points="60,6 111,33 111,87 60,114 9,87 9,33" strokeWidth="2" />
            <polygon
              className="animate-hex-draw stroke-primary [stroke-dasharray:320] [stroke-dashoffset:320]"
              points="60,6 111,33 111,87 60,114 9,87 9,33"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="h-0.5 w-[140px] overflow-hidden rounded bg-white/10">
          <div className="h-full bg-linear-to-r from-primary via-primary to-primary/80 animate-bar-fill" />
        </div>
        <p className="font-heading text-xs font-extrabold tracking-[6px] text-primary animate-loader-pulse">
          ZENERA LABS
        </p>
      </div>
    </div>
  );
}