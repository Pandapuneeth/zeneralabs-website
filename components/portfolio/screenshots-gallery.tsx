"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PortfolioWork } from "@/lib/works";
import { Reveal } from "@/components/reveal";

export function ScreenshotsGallery({ work }: { work: PortfolioWork }) {
  if (work.screenshots.length === 0) return null;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const show = useCallback((index: number) => {
    setSelected(index);
    dialogRef.current?.showModal();
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setOpen(false);
  }, []);

  const step = useCallback(
    (delta: number) => {
      setSelected((prev) => (prev + delta + work.screenshots.length) % work.screenshots.length);
    },
    [work.screenshots.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const dialog = dialogRef.current;
    dialog?.addEventListener("keydown", onKey);
    return () => dialog?.removeEventListener("keydown", onKey);
  }, [open, step]);

  const shot = work.screenshots[selected];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {work.screenshots.map((snap, i) => (
          <Reveal key={snap.src} delay={Math.min(i * 0.05, 0.25)} className="h-full">
            <button
              type="button"
              onClick={() => show(i)}
              className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card text-left transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_12px_32px_-12px_color-mix(in_oklab,var(--primary)_30%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={snap.src}
                  alt={snap.alt}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
                />
              </div>
              {snap.caption ? (
                <div className="flex items-center justify-between gap-3 border-t border-border/60 px-4 py-3">
                  <span className="min-w-0 truncate text-sm text-muted-foreground">{snap.caption}</span>
                  <span aria-hidden="true" className="text-xs text-primary">↗</span>
                </div>
              ) : null}
            </button>
          </Reveal>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onCancel={close}
        onClose={() => setOpen(false)}
        aria-label={`${work.title} — screenshot viewer`}
        className="m-0 h-full w-full max-h-full max-w-full overflow-hidden border-0 bg-background/95 p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm [overscroll-behavior:contain]"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-4">
            <p className="min-w-0 truncate text-sm font-medium text-muted-foreground">
              <span className="text-primary tabular-nums">{selected + 1}</span>
              <span className="text-muted-foreground/60"> / {work.screenshots.length}</span>
              {shot.caption ? <span className="ml-3 hidden text-foreground sm:inline">{shot.caption}</span> : null}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Close screenshot viewer"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-sm text-foreground transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center gap-4 overflow-hidden px-4 py-4 md:px-8">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous screenshot"
              className="hidden size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-lg text-foreground transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
            >
              ‹
            </button>

            <figure className="flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.alt}
                width={1920}
                height={1080}
                className="max-h-full max-w-full object-contain"
              />
              <figcaption className="max-w-[640px] text-center text-sm text-muted-foreground">
                {shot.alt}
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next screenshot"
              className="hidden size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-lg text-foreground transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
            >
              ›
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 border-t border-border/60 px-5 py-3 sm:hidden">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous screenshot"
              className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next screenshot"
              className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Next
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}