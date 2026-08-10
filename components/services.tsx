import Link from "next/link";
import type { ComponentType } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SERVICES, SERVICE_STUDENT } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import {
  AiIcon,
  WebIcon,
  FlutterIcon,
  BackendIcon,
  DesignIcon,
  StudentIcon,
} from "@/components/icons";

const SERVICE_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  ai: AiIcon,
  web: WebIcon,
  flutter: FlutterIcon,
  backend: BackendIcon,
  design: DesignIcon,
};

function quoteHref(service: string) {
  return `/contact?service=${encodeURIComponent(service)}`;
}

export function Services() {
  return (
    <section id="services" className="relative z-[2] scroll-mt-[126px] py-24 md:py-28">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <Reveal
          className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase"
          as="span"
        >
          What We Do
        </Reveal>
        <Reveal as="h2" className="font-heading text-4xl font-extrabold tracking-tight text-balance mb-4 md:text-5xl">
          Our Services
        </Reveal>
        <Reveal as="p" className="max-w-[520px] leading-relaxed text-muted-foreground">
          We build fast. We build right. And we make it look damn good.
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[service.id];
            return (
              <Reveal
                key={service.id}
                delay={Math.min(i * 0.1, 0.35)}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/25"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-primary/25 text-primary bg-primary/15">
                    <Icon size={22} />
                  </div>
                  <span className="font-heading text-[11px] font-bold tracking-widest text-primary/40">
                    {service.num}
                  </span>
                </div>
                <h3 className="font-heading scroll-mt-[126px] text-xl font-bold mb-3">{service.title}</h3>
                <p className="mb-5 leading-relaxed text-[14px] text-muted-foreground">{service.desc}</p>
                <div className="mt-auto mb-5 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="h-6 rounded-full border-primary/25 bg-transparent px-2.5 text-[11px] font-medium text-primary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link
                  href={quoteHref(service.title)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "h-9 w-fit rounded-lg px-4 text-[13px]",
                  )}
                >
                  Get a Quote ↗
                </Link>
              </Reveal>
            );
          })}

          <Reveal
            delay={0.4}
            className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/25 lg:col-span-2"
          >
            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto]">
              <div className="flex flex-col">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-primary/25 text-primary bg-primary/15">
                    <StudentIcon size={22} />
                  </div>
                  <span className="font-heading text-[11px] font-bold tracking-widest text-primary/40">
                    {SERVICE_STUDENT.num}
                  </span>
                </div>
                <h3 className="font-heading scroll-mt-[126px] text-xl font-bold mb-3">
                  {SERVICE_STUDENT.title}
                </h3>
                <p className="mb-5 leading-relaxed text-[14px] text-muted-foreground">
                  {SERVICE_STUDENT.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SERVICE_STUDENT.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="h-6 rounded-full border-primary/25 bg-transparent px-2.5 text-[11px] font-medium text-primary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link
                  href={quoteHref(SERVICE_STUDENT.title)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "mt-5 h-9 w-fit rounded-lg px-4 text-[13px]",
                  )}
                >
                  Get Help Now →
                </Link>
              </div>
              <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
                <div className="flex flex-col items-center sm:items-start">
                  <span className="font-heading text-6xl font-extrabold leading-none text-primary tabular-nums">
                    {SERVICE_STUDENT.bigNum}
                  </span>
                  <span className="mt-1 text-[13px] text-muted-foreground">{SERVICE_STUDENT.bigLabel}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}