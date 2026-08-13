"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { CONTACT_CHIPS, SITE } from "@/lib/site";
import { buildHumanTime, buildWhatsAppLink, EMAILJS, type ContactPayload } from "@/lib/email";
import { useToast } from "@/components/toast-provider";
import { ArrowRightIcon, MailIcon, UserIcon, WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type FieldErrors = {
  service?: boolean;
  name?: boolean;
  email?: boolean;
  message?: boolean;
};

export function ContactForm({ initialService = "" }: { initialService?: string }) {
  const showToast = useToast();
  const [service, setService] = useState(initialService);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const serviceRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const charCount = message.length;

  const validate = () => {
    const next: FieldErrors = {};
    if (!service) next.service = true;
    if (!name.trim()) next.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = true;
    if (!message.trim() || message.trim().length < 10) next.message = true;
    setErrors(next);
    if (next.service) {
      serviceRef.current?.querySelector("button")?.focus();
    } else if (next.name) {
      nameRef.current?.focus();
    } else if (next.email) {
      emailRef.current?.focus();
    } else if (next.message) {
      messageRef.current?.focus();
    }
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    if (!validate()) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    setSending(true);

    const payload: ContactPayload = {
      from_name: name.trim(),
      from_email: email.trim(),
      phone: phone.trim() || "Not provided",
      service,
      message: message.trim(),
      time: buildHumanTime(new Date()),
    };

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, payload, EMAILJS.publicKey);
      showToast("Message sent! We'll be in touch soon 🚀", "success");
    } catch (err) {
      console.error("EmailJS error:", err);
      showToast("Email failed — but WhatsApp is opening as backup!", "info");
    }

    window.open(buildWhatsAppLink(payload), "_blank");

    setService("");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setErrors({});
    setSending(false);
    setShowSuccess(true);
  };

  return (
    <>
      <form id="contactForm" onSubmit={onSubmit} noValidate className="flex flex-col">
        <div className="mb-6">
          <Label id="service-label" className="mb-2.5 text-xs font-medium tracking-wide text-muted-foreground">
            I need help with <span className="text-primary">*</span>
          </Label>
          <div
            className="flex flex-wrap gap-2"
            id="serviceChips"
            ref={serviceRef}
            aria-labelledby="service-label"
          >
            {CONTACT_CHIPS.map((chip) => (
              <Button
                key={chip.value}
                type="button"
                variant={service === chip.value ? "default" : "outline"}
                size="sm"
                data-value={chip.value}
                aria-pressed={service === chip.value}
                onClick={() => {
                  setService(chip.value);
                  setErrors((prev) => ({ ...prev, service: false }));
                }}
                className={cn(
                  "h-9 rounded-full px-3.5 text-[13px]",
                  service === chip.value
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary",
                )}
              >
                {chip.label}
              </Button>
            ))}
          </div>
          <span className={cn("mt-1.5 hidden text-xs text-red-500", errors.service && "block")} id="serviceError">
            Please select a service
          </span>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="fname" className="mb-2.5 text-xs font-medium tracking-wide text-muted-foreground">
              Your Name <span className="text-primary">*</span>
            </Label>
            <div className="relative">
              <UserIcon className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground" width={16} height={16} />
              <Input
                type="text"
                id="fname"
                name="name"
                placeholder="Your name"
                autoComplete="name"
                value={name}
                aria-invalid={errors.name || undefined}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: false }));
                }}
                ref={nameRef}
                className="h-11 rounded-xl border-border bg-white/[0.04] pl-10 text-sm placeholder:text-foreground/20 focus-visible:border-primary/30 focus-visible:ring-primary/10"
              />
            </div>
            <span className={cn("mt-1.5 hidden text-xs text-red-500", errors.name && "block")} id="nameError">
              Name is required
            </span>
          </div>

          <div>
            <Label htmlFor="femail" className="mb-2.5 text-xs font-medium tracking-wide text-muted-foreground">
              Email Address <span className="text-primary">*</span>
            </Label>
            <div className="relative">
              <MailIcon className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground" width={16} height={16} />
              <Input
                type="email"
                id="femail"
                name="email"
                placeholder="you@email.com"
                autoComplete="email"
                spellCheck={false}
                value={email}
                aria-invalid={errors.email || undefined}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: false }));
                }}
                ref={emailRef}
                className="h-11 rounded-xl border-border bg-white/[0.04] pl-10 text-sm placeholder:text-foreground/20 focus-visible:border-primary/30 focus-visible:ring-primary/10"
              />
            </div>
            <span className={cn("mt-1.5 hidden text-xs text-red-500", errors.email && "block")} id="emailError">
              Valid email is required
            </span>
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="fphone" className="mb-2.5 text-xs font-medium tracking-wide text-muted-foreground">
            WhatsApp / Phone <span className="ml-1 text-[11px] text-foreground/25">(optional but faster)</span>
          </Label>
          <div className="relative">
            <WhatsAppIcon className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground" width={16} height={16} />
            <Input
              type="tel"
              id="fphone"
              name="phone"
              placeholder="+91 98765 43210"
              autoComplete="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 rounded-xl border-border bg-white/[0.04] pl-10 text-sm placeholder:text-foreground/20 focus-visible:border-primary/30 focus-visible:ring-primary/10"
            />
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="fmsg" className="mb-2.5 text-xs font-medium tracking-wide text-muted-foreground">
            Tell us about your project <span className="text-primary">*</span>
          </Label>
          <div className="relative">
            <Textarea
              id="fmsg"
              name="message"
              placeholder="Describe your project, timeline, budget (if any), and any specific requirements..."
              rows={5}
              maxLength={1000}
              value={message}
              aria-invalid={errors.message || undefined}
              onChange={(e) => {
                setMessage(e.target.value);
                setErrors((prev) => ({ ...prev, message: false }));
              }}
              ref={messageRef}
              className="min-h-[120px] rounded-xl border-border bg-white/[0.04] pb-7 text-sm placeholder:text-foreground/20 focus-visible:border-primary/30 focus-visible:ring-primary/10"
            />
            <span
              className={cn(
                "pointer-events-none absolute right-3 bottom-2.5 text-[11px] text-foreground/20 tabular-nums",
                message.length > 0 ? "visible" : "invisible",
              )}
              id="charCount"
            >
              {charCount} / 1000
            </span>
          </div>
          <span className={cn("mt-1.5 hidden text-xs text-red-500", errors.message && "block")} id="msgError">
            Please describe your project
          </span>
        </div>

        <CosmicButton
          as="button"
          type="submit"
          id="formSubmit"
          disabled={sending}
          className="mt-1 w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {sending ? (
            <>
              <Spinner />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <ArrowRightIcon width={18} height={18} />
            </>
          )}
        </CosmicButton>

        <p className="mt-4 text-center text-[13px] text-muted-foreground">
          Or reach us directly:
          <a href={`mailto:${SITE.email}`} className="text-primary hover:underline"> {SITE.email}</a> ·
          <a href={SITE.whatsapp} target="_blank" rel="noopener" className="text-primary hover:underline"> WhatsApp</a>
        </p>
      </form>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="rounded-[20px] bg-popover text-center sm:max-w-sm">
          <DialogHeader className="items-center gap-2 text-center sm:text-center">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true" className="mx-auto">
              <circle cx="22" cy="22" r="20" stroke="var(--primary)" strokeWidth="2" />
              <path
                d="M14.5 22l5.5 5.5 9.5-9.5"
                stroke="var(--primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-hex-draw [stroke-dasharray:30] [stroke-dashoffset:30]"
              />
            </svg>
            <DialogTitle className="font-heading text-2xl font-extrabold">Message sent! 🎉</DialogTitle>
            <DialogDescription className="py-2 text-sm leading-relaxed">
              We&apos;ll get back to you within a few hours. Check your WhatsApp too — Puneeth might
              ping you directly.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={SITE.whatsapp} target="_blank" rel="noopener" className={cn(buttonVariants(), "h-10 rounded-lg px-5 text-sm")}>
              Open WhatsApp
            </a>
            <DialogCloseButton onClick={() => setShowSuccess(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function DialogCloseButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outline" onClick={onClick} className="h-10 rounded-lg px-5 text-sm">
      Go Back
    </Button>
  );
}