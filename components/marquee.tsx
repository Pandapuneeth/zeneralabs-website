import { Fragment } from "react";
import { MARQUEE_ITEMS } from "@/lib/site";

export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className="relative z-[2] overflow-hidden border-y border-border bg-white/[0.015] py-3.5"
      aria-hidden="true"
    >
      <div className="flex w-max items-center gap-8 whitespace-nowrap animate-marquee">
        {items.map((item, i) => (
          <Fragment key={`${item}-${i}`}>
            <span className="font-heading text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {item}
            </span>
            <span className="text-[9px] text-primary" aria-hidden="true">✦</span>
          </Fragment>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[120px] bg-linear-to-r from-background to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[120px] bg-linear-to-l from-background to-transparent" aria-hidden="true" />
    </div>
  );
}