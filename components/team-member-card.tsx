import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { CSSProperties } from "react";
import type { TeamMember } from "@/lib/site";

export function TeamMemberCard({ member, className }: { member: TeamMember; className?: string }) {
  return (
    <div
      className={`group overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-primary/25 ${className ?? ""}`}
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
    </div>
  );
}
