export const EMAILJS = {
  serviceId: "service_xdlvzze",
  templateId: "template_fu7588d",
  publicKey: "pD_FAm9FzOx9KgQ5h",
};

export const WHATSAPP_NUMBER = "918073378278";

export type ContactPayload = {
  from_name: string;
  from_email: string;
  phone: string;
  service: string;
  message: string;
  time: string;
};

export function buildWhatsAppLink(payload: ContactPayload): string {
  const text = [
    "*New Inquiry — Zenera Labs Website*",
    "",
    `*Name:* ${payload.from_name}`,
    `*Email:* ${payload.from_email}`,
    payload.phone ? `*Phone:* ${payload.phone}` : null,
    `*Service:* ${payload.service}`,
    "",
    `*Message:*\n${payload.message}`,
  ]
    .filter(Boolean)
    .join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildHumanTime(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}