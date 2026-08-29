"use client";

import { useState } from "react";
import { TEAM_CATEGORIES, type TeamMember, type TeamCategoryId } from "@/lib/site";
import { TeamMemberCard } from "@/components/team-member-card";

export function TeamDepartments({ members }: { members: TeamMember[] }) {
  const [active, setActive] = useState<TeamCategoryId | null>(null);
  const activeCat = TEAM_CATEGORIES.find((c) => c.id === active);
  const activeMembers = active ? members.filter((m) => m.category === active) : [];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM_CATEGORIES.map((cat) => {
          const count = members.filter((m) => m.category === cat.id).length;
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(isActive ? null : cat.id)}
              aria-expanded={isActive}
              className={`group flex h-full flex-col items-start gap-3 rounded-2xl border bg-card p-6 text-left transition-[border-color,box-shadow] duration-300 hover:border-primary/40 ${
                isActive
                  ? "border-primary/50 shadow-[0_12px_32px_-12px_color-mix(in_oklab,var(--primary)_30%,transparent)]"
                  : "border-border/70"
              }`}
            >
              <span className="font-heading text-lg font-bold text-foreground">{cat.label}</span>
              <span className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
                  {count}
                </span>
                {isActive ? "Hide members" : "View members"}
              </span>
            </button>
          );
        })}
      </div>

      {activeCat ? (
        <div className="mt-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 className="font-heading text-xl font-bold text-foreground">{activeCat.label}</h3>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {activeMembers.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
