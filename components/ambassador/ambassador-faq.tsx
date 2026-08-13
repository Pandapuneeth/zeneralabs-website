"use client";

import { Reveal } from "@/components/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AMBASSADOR_FAQS } from "@/lib/ambassador";

export function AmbassadorFaq() {
  return (
    <section className="relative z-[2] py-20 md:py-24">
      <div className="mx-auto w-full max-w-[760px] px-6 md:px-12">
        <Reveal className="mb-3 inline-block text-[11px] font-semibold tracking-[0.4em] text-primary uppercase" as="span">
          FAQ
        </Reveal>
        <Reveal as="h2" className="font-heading text-3xl font-extrabold tracking-tight text-balance mb-8 md:text-5xl">
          Everything you need to know
        </Reveal>
        <Reveal>
          <Accordion>
            {AMBASSADOR_FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={i.toString()}
                className="mb-2 rounded-xl border border-border px-3 transition-colors hover:border-primary/30"
              >
                <AccordionTrigger className="rounded-none py-3 text-[13px] font-medium text-foreground hover:no-underline">
                  <span className="pr-2 text-left">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-2 text-[13px] leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
