import { Reveal } from "@/components/reveal";
import type { ReactNode } from "react";
import { FiTrendingUp, FiSearch, FiSend, FiEdit3, FiUsers } from "react-icons/fi";

const ROLES: { title: string; desc: string; icon: ReactNode; fullTime: boolean; responsibilities?: string[] }[] = [
  {
    title: "HR Intern",
    desc: "Support Zenera Labs' people operations and help us build a great team experience end to end.",
    icon: <FiUsers size={18} className="shrink-0" />,
    fullTime: false,
    responsibilities: [
      "Manage end-to-end recruitment: posting roles, screening applicants, scheduling and coordinating interviews.",
      "Own the onboarding experience for new hires and interns.",
      "Maintain accurate employee and intern records, contracts, and documentation.",
      "Track attendance, leaves, and weekly intern hours.",
      "Coordinate monthly payroll inputs and timesheet consolidation.",
      "Support labour-law and compliance basics (offer letters, NDAs, reliefs).",
      "Help run performance reviews and feedback cycles.",
      "Drive employee engagement and team-culture initiatives.",
      "Build and maintain HR policies, templates, and onboarding kits.",
      "Strong proficiency in Excel / Google Sheets for HR reporting.",
    ],
  },
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
              Five ways to join the team
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              All roles work on real Zenera Labs operations — client acquisition, outreach, technology
              marketing and people operations — not busywork.
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
                {role.responsibilities ? (
                  <ul className="mt-1 space-y-2 border-t border-border/70 pt-4">
                    {role.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}