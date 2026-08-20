import { Reveal } from "@/components/reveal";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { FiSend, FiMail } from "react-icons/fi";

const APPLY_MAILTO =
  "mailto:zeneralabs@gmail.com?subject=Application%20%E2%80%93%20Zenera%20Growth%20Team%20%E2%80%93%20%5BRole%5D";

const SUBJECT_LABELS = [
  "Growth / Business Development Lead",
  "Lead Generation Intern",
  "Sales Development / Outreach Intern",
  "Marketing & Content Intern",
] as const;

export function HiringApply() {
  return (
    <section className="relative z-[2] py-12 pb-24">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal className="flex flex-col items-center justify-between gap-10 rounded-[32px] border border-primary/25 bg-linear-to-br from-primary/10 via-primary/5 to-background p-9 text-center md:flex-row md:p-14 md:text-left">
          <div className="max-w-[440px]">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-balance leading-tight mb-3 md:text-4xl">
              Sound like your
              <br />
              <span className="bg-linear-to-r from-primary via-primary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-grad-shift">
                next move?
              </span>
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Send your CV + a short introduction about yourself. Use the role name in the subject line.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Subject: <strong className="text-foreground">Application – Zenera Growth Team – [Role]</strong>
            </p>
            <p className="mt-6 border-t border-primary/15 pt-5 text-sm text-muted-foreground">
              <strong className="block font-heading text-base font-bold text-foreground">Zenera Labs</strong>
              Building Intelligent Technology. Creating Real-World Impact.
            </p>
          </div>
          <div className="w-full max-w-[360px]">
            <CosmicButton href={APPLY_MAILTO} target="_self" className="w-full">
              <FiSend size={18} className="shrink-0" />
              Apply Now
            </CosmicButton>
            <a
              href={APPLY_MAILTO}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/50 px-6 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            >
              <FiMail size={16} className="shrink-0" />
              zeneralabs@gmail.com
            </a>
            <ul className="mt-5 space-y-1.5">
              {SUBJECT_LABELS.map((label) => (
                <li key={label} className="text-xs text-muted-foreground">
                  <span className="text-primary" aria-hidden="true">→ </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}