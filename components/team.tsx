import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { CSSProperties } from "react";
import { TEAM } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function Team() {
  return (
    <section id="team" className="relative z-[2] scroll-mt-[86px] py-24 md:py-28">
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

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <Reveal
              key={member.name}
              delay={Math.min(i * 0.1, 0.7)}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-primary/25"
            >
              <div className="relative aspect-square overflow-hidden">
                {member.photo ? (
                  <Image
                    src={`/${member.photo}`}
                    alt={member.name}
                    fill
                    sizes="(max-width: 600px) 50vw, (max-width: 960px) 33vw, 25vw"
                    loading="lazy"
                    className="object-cover grayscale-[50%] transition-transform duration-500 group-hover:scale-[1.07] group-hover:grayscale-0"
                  />
                ) : (
                  <div
                    className="flex aspect-square items-center justify-center border-b border-border bg-white/[0.03]"
                    style={{ "--av-color": member.color } as CSSProperties}
                  >
                    <span
                      className="font-heading z-[1] text-4xl font-extrabold opacity-90"
                      style={{ color: member.color, textShadow: `0 0 40px ${member.color}` }}
                    >
                      {member.initials}
                    </span>
                    <span
                      className="absolute inset-[18px] rounded-full border-[1.5px] animate-ring-pulse"
                      style={{ borderColor: member.color }}
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/65 to-transparent" aria-hidden="true" />
                {member.badge && (
                  <Badge className="absolute top-3 right-3 z-10 rounded-full bg-primary text-primary-foreground hover:bg-primary">
                    {member.badge}
                  </Badge>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-heading text-[15px] font-bold mb-1">{member.name}</h3>
                <p className="text-xs text-primary">{member.role}</p>
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-2 block break-all text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {member.email}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}