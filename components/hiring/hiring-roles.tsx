import { Reveal } from "@/components/reveal";
import type { ReactNode } from "react";
import { FiTrendingUp, FiSearch, FiSend, FiEdit3 } from "react-icons/fi";

const ROLES: { title: string; desc: string; icon: ReactNode; fullTime: boolean }[] = [
  {
    title: "Growth / Business Development Lead",
    desc: "Lead Zenera's client acquisition strategy, manage the growth pipeline, coordinate outreach, and drive business development.",
    icon: <FiTrendingUp size={18} className="shrink-0" />,
    fullTime: true,
  },
  {
    title: "Lead Generation Intern",
    desc: "Research potential clients, identify decision-makers, understand business problems, qualify prospects, and maintain our prospect pipeline.",
    icon: <FiSearch size={18} className="shrink-0" />,
    fullTime: false,
  },
  {
    title: "Sales Development / Outreach Intern",
    desc: "Handle personalized LinkedIn and email outreach, follow-ups, prospect conversations, and appointment setting.",
    icon: <FiSend size={18} className="shrink-0" />,
    fullTime: false,
  },
  {
    title: "Marketing & Content Intern",
    desc: "Turn Zenera's technology projects into case studies, LinkedIn content, Instagram content, demo videos, website portfolio material, and sales collateral.",
    icon: <FiEdit3 size={18} className="shrink-0" />,
    fullTime: false,
  },
];

export function HiringRoles() {
  return (
    <section id="roles" className="relative z-[2] scroll-mt-[126px] py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal className="mb-10 max-w-[720px]">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-heading text-[11px] font-bold tracking-[0.4em] text-primary/50 uppercase">01</span>
            <span className="h-px w-10 bg-primary/30" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-[0.4em] text-primary uppercase">Open Roles</span>
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-balance md:text-4xl">
            Four ways to join the growth team
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            All roles work on real Zenera Labs growth operations — client acquisition, outreach and
            technology marketing — not busywork.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {ROLES.map((role, i) => (
            <Reveal key={role.title} delay={(i % 2) * 0.1}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 md:p-7">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary" aria-hidden="true">
                      {role.icon}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-foreground">{role.title}</h3>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${
                      role.fullTime
                        ? "border border-primary/25 bg-primary/10 text-primary"
                        : "border border-border bg-background/40 text-muted-foreground"
                    }`}
                  >
                    {role.fullTime ? "Full-time" : "Internship"}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground">{role.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}