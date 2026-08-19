import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function CaseSection({
  index,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative z-[2] scroll-mt-[150px] py-16 md:py-20", className)}>
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal className="mb-10 max-w-[720px]">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-heading text-[11px] font-bold tracking-[0.4em] text-primary/50 uppercase">
              {index}
            </span>
            <span className="h-px w-10 bg-primary/30" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-[0.4em] text-primary uppercase">
              {eyebrow}
            </span>
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-balance md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}