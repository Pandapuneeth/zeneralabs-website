import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { TeamMemberCard } from "@/components/team-member-card";
import { TEAM } from "@/lib/site";
import { ArrowUpRightIcon } from "@/components/icons";

export function TeamTeaser() {
  const founders = TEAM.filter((m) => m.badge === "Founder" || m.badge === "Co-Founder");

  return (
    <section id="team" className="relative z-[2] scroll-mt-[126px] py-24 md:py-28">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal
          className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase"
          as="span"
        >
          The People
        </Reveal>
        <Reveal as="h2" className="font-heading text-4xl font-extrabold tracking-tight text-balance mb-4 md:text-5xl">
          Meet the Team
        </Reveal>
        <Reveal as="p" className="max-w-[520px] leading-relaxed text-muted-foreground">
          Engineers, designers, and builders who actually give a damn about the craft.
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:max-w-[640px]">
          {founders.map((member, i) => (
            <Reveal
              key={member.name}
              delay={Math.min(i * 0.1, 0.3)}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-primary/25"
            >
              <TeamMemberCard member={member} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Meet the full team
            <ArrowUpRightIcon width={14} height={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
