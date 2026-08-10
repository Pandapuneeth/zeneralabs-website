import { Badge } from "@/components/ui/badge";
import { ANNIVERSARY_OFFERS } from "@/lib/pricing";
import { Reveal } from "@/components/reveal";

function SparkleIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.4c.6 4.1 1.5 5 5.6 5.6-4.1.6-5 1.5-5.6 5.6-.6-4.1-1.5-5-5.6-5.6 4.1-.6 5-1.5 5.6-5.6Zm7.5 11c.4 2.5.9 3 3.5 3.4-2.6.4-3.1.9-3.5 3.4-.4-2.5-.9-3-3.5-3.4 2.6-.4 3.1-.9 3.5-3.4Z" />
    </svg>
  );
}

export function AnniversaryOffers() {
  return (
    <section className="relative z-[2] scroll-mt-[126px] py-16">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal
          className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase"
          as="span"
        >
          Anniversary Special
        </Reveal>
        <Reveal as="h2" className="font-heading text-3xl font-extrabold tracking-tight text-balance mb-3 md:text-4xl">
          One year of building. One special offer for you.
        </Reveal>
        <Reveal as="p" className="max-w-[560px] leading-relaxed text-muted-foreground">
          A campaign hook, not the permanent definition of Zenera. Limited-time anniversary starting
          prices are live now.
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ANNIVERSARY_OFFERS.map((offer, i) => (
            <Reveal
              key={offer.label}
              delay={Math.min(i * 0.1, 0.3)}
              className="group/offer relative flex flex-col overflow-hidden rounded-2xl border border-primary/25 bg-linear-to-br from-primary/10 via-primary/5 to-primary/5 p-7 transition-colors hover:border-primary/40"
            >
              <div className="mb-3 inline-flex w-fit items-center gap-1.5 text-primary">
                <SparkleIcon size={14} />
                <Badge className="h-5 rounded-full border-primary/25 bg-primary/15 px-2.5 text-[10px] font-bold tracking-[0.16em] text-primary uppercase">
                  Zenera Turns 1
                </Badge>
              </div>
              <span className="mt-2 font-heading text-[40px] leading-none font-extrabold text-primary tabular-nums">
                {offer.price}
              </span>
              <span className="mt-3 text-[11px] font-semibold tracking-[0.2em] text-foreground/60 uppercase">
                {offer.label}
              </span>
              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{offer.scope}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="mt-6 text-center text-[12px] text-foreground/40">
          <span className="font-semibold text-primary">Zenera Turns 1 — Anniversary Starting Price.</span>{" "}
          All prices are &quot;starting at&quot; — final pricing depends on scope, features and integrations.
        </Reveal>
      </div>
    </section>
  );
}