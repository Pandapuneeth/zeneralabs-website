"use client";

import { useEffect, useRef } from "react";

export function BgParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let pmx = 0;
    let pmy = 0;
    const PINK = (() => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "0.7 0.22 350";
      const [l, c, h] = raw.split(" ").map((v) => parseFloat(v));
      if (Number.isNaN(l) || Number.isNaN(c) || Number.isNaN(h)) return [255, 0, 127];
      const oklchToRgb = (L: number, C: number, H: number): [number, number, number] => {
        const s = C / Math.max(L, 0.0001);
        const hsl = [H, s, L];
        const h = hsl[0] / 360;
        const s2 = hsl[1];
        const l2 = hsl[2];
        let r: number, g: number, b: number;
        if (s2 === 0) {
          r = g = b = l2;
        } else {
          const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };
          const q = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
          const p = 2 * l2 - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
      };
      return oklchToRgb(l, c, h);
    })();

    type Dot = { x: number; y: number; vx: number; vy: number; r: number; o: number };
    let dots: Dot[] = [];

    const initDots = () => {
      dots = Array.from({ length: 55 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.4 + 0.5,
        o: Math.random() * 0.22 + 0.05,
      }));
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initDots();
    };

    resize();

    const onMove = (e: MouseEvent) => {
      pmx = e.clientX;
      pmy = e.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const MAX = 130;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;
        for (let j = i + 1; j < dots.length; j++) {
          const o = dots[j];
          const dx = d.x - o.x;
          const dy = d.y - o.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(${PINK},${(1 - dist / MAX) * 0.07})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      const glow = ctx.createRadialGradient(pmx, pmy, 0, pmx, pmy, 200);
      glow.addColorStop(0, "rgba(255,0,127,.05)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PINK},${d.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    let raf = requestAnimationFrame(draw);
    document.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}