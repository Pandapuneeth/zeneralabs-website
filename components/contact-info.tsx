import Image from "next/image";
import { SITE, TEAM, TRUST_BADGES } from "@/lib/site";
import { Faq } from "@/components/faq";
import { CutoutCard, cutoutCardSurfaceShadowClassName } from "@/components/ui/cutout-card";
import { cn } from "@/lib/utils";
import { MailIcon, UserIcon, WhatsAppIcon } from "@/components/icons";

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-5 md:sticky md:top-[94px]">
      <CutoutCard className={cn(cutoutCardSurfaceShadowClassName, "rounded-[20px] bg-card p-5")}>
        <div className="mb-3.5 flex items-center justify-between gap-2">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-primary uppercase">Meet the team</p>
          <span className="text-[11px] text-muted-foreground">{TEAM.length} people</span>
        </div>
        <div className="flex min-w-0 flex-wrap items-center gap-2.5">
          {TEAM.map((member) =>
            member.photo ? (
              <Image
                key={member.name}
                src={`/${member.photo}`}
                alt={member.name}
                width={36}
                height={36}
                className="size-9 shrink-0 rounded-full border-2 border-background object-cover"
              />
            ) : (
              <span
                key={member.name}
                title={member.name}
                className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-background bg-primary/15 font-heading text-[10px] font-bold text-primary"
              >
                {member.initials}
              </span>
            ),
          )}
        </div>
        <p className="mt-3.5 text-xs leading-relaxed text-muted-foreground">
          Engineers, designers and builders who actually give a damn about the craft. Send the form or reach us
          directly below — we&apos;ll route you to the right person.
        </p>
      </CutoutCard>

      <div className="flex flex-col gap-2.5">
        <CutoutCard className={cn("group flex items-center gap-3 rounded-[18px] border border-border bg-card px-4 py-3.5 shadow-[0px_1px_2px_-1px_color-mix(in_oklab,var(--foreground)_8%,transparent)] transition-colors hover:border-primary/30 hover:bg-primary/5")}>
          <a href={SITE.whatsapp} target="_blank" rel="noopener" className="flex w-full items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green-500/15 text-green-500">
              <WhatsAppIcon width={20} height={20} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] tracking-wide text-muted-foreground">WhatsApp / Call</span>
              <span className="mt-0.5 block text-[13px] font-medium text-foreground">{SITE.phoneDisplay}</span>
            </div>
            <span className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true">↗</span>
          </a>
        </CutoutCard>

        <CutoutCard className={cn("group flex items-center gap-3 rounded-[18px] border border-border bg-card px-4 py-3.5 shadow-[0px_1px_2px_-1px_color-mix(in_oklab,var(--foreground)_8%,transparent)] transition-colors hover:border-primary/30 hover:bg-primary/5")}>
          <a href={`mailto:${SITE.email}`} className="flex w-full items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <MailIcon width={20} height={20} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] tracking-wide text-muted-foreground">General Enquiries</span>
              <span className="mt-0.5 block text-[13px] font-medium text-foreground">{SITE.email}</span>
            </div>
            <span className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true">↗</span>
          </a>
        </CutoutCard>

        <CutoutCard className={cn("group flex items-center gap-3 rounded-[18px] border border-border bg-card px-4 py-3.5 shadow-[0px_1px_2px_-1px_color-mix(in_oklab,var(--foreground)_8%,transparent)] transition-colors hover:border-primary/30 hover:bg-primary/5")}>
          <a href={`mailto:${SITE.founderEmail}`} className="flex w-full items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <UserIcon width={20} height={20} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] tracking-wide text-muted-foreground">Founder</span>
              <span className="mt-0.5 block text-[13px] font-medium text-foreground">{SITE.founderEmail}</span>
            </div>
            <span className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true">↗</span>
          </a>
        </CutoutCard>
      </div>

      <div>
        <h3 className="mb-3.5 font-heading text-[15px] font-bold tracking-wide text-foreground/85">
          Follow Zenera Labs
        </h3>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <a
            href={SITE.linkedin}
            className="relative isolate flex items-center gap-3.5 overflow-hidden rounded-2xl bg-linear-to-br from-[#0a66c2] to-[#0e4a8a] p-[18px] text-white transition-transform hover:-translate-y-1 hover:scale-[1.015]"
            target="_blank"
            rel="noopener"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
              </svg>
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="font-heading text-[15px] leading-tight font-bold">LinkedIn</span>
              <span className="truncate text-[12.5px] opacity-85">Zenera Labs</span>
            </div>
            <span className="ml-auto text-base opacity-75 transition-opacity" aria-hidden="true">↗</span>
          </a>

          <a
            href={SITE.instagram}
            className="relative isolate flex items-center gap-3.5 overflow-hidden rounded-2xl bg-linear-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] p-[18px] text-white transition-transform hover:-translate-y-1 hover:scale-[1.015]"
            target="_blank"
            rel="noopener"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="font-heading text-[15px] leading-tight font-bold">Instagram</span>
              <span className="truncate text-[12.5px] opacity-85">@zeneralabs</span>
            </div>
            <span className="ml-auto text-base opacity-75 transition-opacity" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {TRUST_BADGES.map((badge) => (
          <CutoutCard
            key={badge.label}
            className="flex items-center gap-2 rounded-[14px] border border-border bg-card px-3 py-2.5 text-[13px] text-muted-foreground shadow-[0px_1px_2px_-1px_color-mix(in_oklab,var(--foreground)_8%,transparent)]"
          >
            <span className="text-base" aria-hidden="true">{badge.icon}</span>
            <span>{badge.label}</span>
          </CutoutCard>
        ))}
      </div>

      <Faq />
    </div>
  );
}