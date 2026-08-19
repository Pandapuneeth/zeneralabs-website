import type { PortfolioWork } from "@/lib/works";

export function DemoPlayer({ work }: { work: PortfolioWork }) {
  if (!work.demo) return null;
  const { demo } = work;

  return (
    <div className="space-y-6">
      <p className="max-w-[640px] leading-relaxed text-muted-foreground">{demo.intro}</p>

      <div className={`grid ${demo.sources.length > 1 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-4`}>
        {demo.sources.map((source) => (
          <figure key={source.src} className="overflow-hidden rounded-2xl border border-border/80 bg-card">
            <div className="relative aspect-video w-full bg-black">
              <video
                src={source.src}
                poster={demo.poster}
                controls
                preload="none"
                playsInline
                className="h-full w-full"
              >
                <p>
                  Your browser does not support the video tag.{" "}
                  <a href={source.src} className="text-primary underline underline-offset-4">Download the demo file</a>.
                </p>
              </video>
            </div>
            <figcaption className="border-t border-border/60 px-5 py-4 text-sm text-muted-foreground">
              {source.label}
            </figcaption>
          </figure>
        ))}
      </div>

      {demo.note ? (
        <p className="text-sm leading-relaxed text-muted-foreground">{demo.note}</p>
      ) : null}
    </div>
  );
}