import { Reveal } from "@/components/reveal";
import type { PortfolioWork } from "@/lib/works";

export function ArchitectureFigure({ work }: { work: PortfolioWork }) {
  if (!work.architecture) return null;
  const { architecture } = work;

  return (
    <Reveal>
      <figure className="overflow-hidden rounded-2xl border border-border/80 bg-card">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:32px_32px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={architecture.src}
            alt={architecture.alt}
            width={1920}
            height={1080}
            loading="lazy"
            className="h-full w-full object-contain p-3 md:p-6"
          />
        </div>
        <figcaption className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
          {architecture.caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}