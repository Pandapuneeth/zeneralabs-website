import { Reveal } from "@/components/reveal";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { FiMapPin, FiClock, FiBriefcase, FiMail, FiSend } from "react-icons/fi";

const APPLY_MAILTO =
  "mailto:zeneralabs@gmail.com?subject=Application%20%E2%80%93%20Zenera%20Labs%20%E2%80%93%20%5BRole%5D";

const FACTS = [
  { icon: <FiMapPin size={16} className="shrink-0" />, label: "Location", value: "Remote / Hybrid" },
  { icon: <FiClock size={16} className="shrink-0" />, label: "Working Hours", value: "10:00 AM – 5:00 PM" },
  { icon: <FiBriefcase size={16} className="shrink-0" />, label: "Opportunity", value: "Full-time / Internship" },
  { icon: <FiMail size={16} className="shrink-0" />, label: "Apply To", value: "zeneralabs@gmail.com" },
] as const;

export function HiringHero() {
  return (
    <section className="relative z-[2] pt-[130px] pb-[60px]">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal
          className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase"
          as="span"
        >
          Now Hiring
        </Reveal>
        <Reveal as="h1" className="font-heading text-4xl font-extrabold tracking-tight text-balance leading-[1.08] mb-5 md:text-6xl" delay={0.1}>
          Zenera Labs is hiring.
          <br />
          <span className="bg-linear-to-r from-primary via-primary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-grad-shift">
            Build our growth engine.
          </span>
        </Reveal>
        <Reveal as="p" className="max-w-[620px] leading-relaxed text-muted-foreground" delay={0.2}>
          We&apos;re building a dedicated <strong className="text-foreground">Growth, Marketing &amp; People
          Operations Team</strong> to take Zenera Labs to the next level — hands-on experience in sales, business
          development, lead generation, outreach, technology marketing and people operations.
        </Reveal>
        <Reveal delay={0.3} className="mt-8 flex flex-col gap-4 sm:flex-row">
          <CosmicButton href={APPLY_MAILTO} target="_self" className="w-full sm:w-auto">
            <FiSend size={16} className="shrink-0" />
            Apply Now
          </CosmicButton>
          <a
            href="#roles"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-6 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
          >
            View Open Roles
          </a>
        </Reveal>
        <Reveal delay={0.4} className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.label} className="rounded-2xl border border-border bg-card p-4">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wide text-primary uppercase">
                {f.icon}
                {f.label}
              </div>
              <div className="mt-1.5 text-sm leading-snug text-foreground">{f.value}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}