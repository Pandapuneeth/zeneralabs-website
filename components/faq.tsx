"use client";

import { FAQS } from "@/lib/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <div>
      <h3 className="font-heading mb-3 text-[15px] font-bold">Quick FAQs</h3>
      <Accordion>
        {FAQS.map((faq, i) => (
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
    </div>
  );
}