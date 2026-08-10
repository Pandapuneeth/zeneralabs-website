import { PRICING_EXCLUSIONS } from "@/lib/pricing";
import { Reveal } from "@/components/reveal";

function XCircleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6M15 9l-6 6" strokeLinecap="round" />
    </svg>
  );
}

export function PricingExclusions() {
  return (
    <section className="relative z-[2] scroll-mt-[126px] py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Reveal
              className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase"
              as="span"
            >
              The Fine Print
            </Reveal>
            <Reveal as="h2" className="font-heading text-3xl font-extrabold tracking-tight text-balance mb-3 md:text-4xl">
              What&apos;s not in the price
            </Reveal>
            <Reveal as="p" className="leading-relaxed text-muted-foreground">
              One-time development pricing never quietly includes recurring costs. Hosting, domains
              and third-party services are billed separately — so you always know exactly what
              you&apos;re paying for.
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {PRICING_EXCLUSIONS.map((item, i) => (
              <Reveal
                key={item}
                delay={Math.min(i * 0.06, 0.3)}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5"
              >
                <span className="shrink-0 text-foreground/40">
                  <XCircleIcon size={16} />
                </span>
                <span className="text-[13px] font-medium text-muted-foreground">{item}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}