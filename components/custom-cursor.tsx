"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (
      typeof window === "undefined" ||
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth <= 600
    ) {
      return;
    }

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(tick);
    };

    const targets = document.querySelectorAll("a, button, [data-slot]");
    const grow = () => {
      dot.classList.add("!size-4");
      ring.classList.add("!size-[52px]", "!border-primary/70");
    };
    const shrink = () => {
      dot.classList.remove("!size-4");
      ring.classList.remove("!size-[52px]", "!border-primary/70");
    };

    targets.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary mix-blend-screen transition-[width,height] duration-200"
        style={{ left: "-100px", top: "-100px" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-[9998] size-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-primary/50 transition-[width,height,border-color] duration-[250ms]"
        style={{ left: "-100px", top: "-100px" }}
      />
    </>
  );
}