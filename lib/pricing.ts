export type PriceTier = {
  name: string;
  price: string;
  note: string;
  anniversary?: boolean;
};

export type PricingCategory = {
  id: string;
  label: string;
  blurb: string;
  tiers: PriceTier[];
};

export const ANNIVERSARY_OFFERS = [
  {
    label: "Business Websites",
    price: "₹2,999+",
    scope: "1-page responsive launch site. Ideal for local businesses, freelancers, creators and simple launches.",
  },
  {
    label: "Student Projects",
    price: "₹1,999+",
    scope: "Entry-level development & support package. Final scope depends on project complexity.",
  },
  {
    label: "Mini Projects",
    price: "₹999+",
    scope: "Simple Python / web / ML project. Working code, basic documentation and setup guidance.",
  },
] as const;

export const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: "web",
    label: "Websites",
    blurb: "From a single launch page to full e-commerce and SaaS platforms.",
    tiers: [
      {
        name: "Launch",
        price: "₹2,999*",
        note: "1 page; responsive UI; WhatsApp/contact; basic SEO; deployment; 1 revision.",
        anniversary: true,
      },
      {
        name: "Business",
        price: "₹5,999*",
        note: "Up to 5 pages; custom UI; forms; WhatsApp; Maps; basic SEO; deployment; 2 revisions.",
        anniversary: true,
      },
      {
        name: "Professional",
        price: "₹11,999*",
        note: "Up to 10 pages; premium UI; animations; advanced forms; analytics; performance work; 3 revisions.",
        anniversary: true,
      },
      {
        name: "E-Commerce",
        price: "₹19,999+",
        note: "Online store with product/catalog and checkout-related functionality.",
      },
      {
        name: "Custom Web App",
        price: "₹29,999+",
        note: "Dashboards, portals, SaaS-style products and custom platforms.",
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    blurb: "Flutter apps that feel native on Android and iOS.",
    tiers: [
      { name: "Prototype / UI App", price: "₹9,999+", note: "UI/demo-focused mobile prototype." },
      { name: "Basic Flutter App", price: "₹24,999+", note: "Small functional application." },
      { name: "Business MVP", price: "₹49,999+", note: "Core business workflow with a backend where required." },
      { name: "Full-Stack App", price: "₹79,999+", note: "App + backend + database + APIs." },
      { name: "Advanced / Marketplace", price: "₹1,49,999+", note: "Complex multi-role or marketplace systems." },
    ],
  },
  {
    id: "ai",
    label: "AI & ML",
    blurb: "Chatbots, computer vision, predictive models and custom AI products.",
    tiers: [
      { name: "AI Chatbot", price: "₹7,999+", note: "Conversational assistant; integrations quoted separately." },
      { name: "AI Document / PDF System", price: "₹9,999+", note: "Extraction, classification, search and document workflows." },
      { name: "Computer Vision System", price: "₹14,999+", note: "Detection, classification, tracking and related CV systems." },
      { name: "Predictive ML System", price: "₹14,999+", note: "Forecasting, classification, recommendation and analytics." },
      { name: "AI Automation", price: "₹9,999+", note: "AI-assisted business workflow automation." },
      { name: "RAG / Knowledge Base", price: "₹19,999+", note: "Custom retrieval and knowledge assistant." },
      { name: "AI Agent / Multi-Agent", price: "₹24,999+", note: "Agentic workflows and multi-step automation." },
      { name: "Custom AI Solution", price: "₹29,999+", note: "Bespoke AI product or complex implementation." },
    ],
  },
  {
    id: "automation",
    label: "Business Automation",
    blurb: "Automate repetitive workflows and let software run the busywork.",
    tiers: [
      { name: "Workflow Automation", price: "₹7,999+", note: "Automate repetitive business workflows." },
      { name: "WhatsApp Automation", price: "₹9,999+", note: "Business messaging and workflow automation." },
      { name: "AI Customer Support", price: "₹14,999+", note: "AI-assisted customer support systems." },
      { name: "Lead Automation", price: "₹14,999+", note: "Lead capture, qualification and routing." },
      { name: "CRM Automation", price: "₹19,999+", note: "Custom CRM workflows and integrations." },
      { name: "AI Business Assistant", price: "₹19,999+", note: "Internal AI assistant and workflows." },
      { name: "Custom Automation System", price: "₹29,999+", note: "Complex automation and integrations." },
    ],
  },
  {
    id: "student",
    label: "Student Projects",
    blurb: "Development support, mentoring and implementation assistance for students.",
    tiers: [
      { name: "Mini Project", price: "₹999+", note: "Simple Python/web/ML implementation." },
      { name: "Basic Project", price: "₹1,499+", note: "Moderate project with improved functionality." },
      { name: "AI / ML Project", price: "₹1,999+", note: "ML implementation + explanation/documentation." },
      { name: "Computer Vision", price: "₹2,499+", note: "Classification/detection/vision projects." },
      { name: "Flutter Project", price: "₹2,999+", note: "Mobile application project." },
      { name: "Full-Stack Project", price: "₹3,499+", note: "Frontend + backend + database." },
      { name: "Major / Final-Year", price: "₹4,999+", note: "Larger project with broader functionality." },
      { name: "Advanced AI / GenAI", price: "₹6,999+", note: "GenAI, RAG, agents or advanced AI." },
      { name: "Research + Implementation", price: "₹7,999+", note: "Research-oriented implementation and technical support." },
    ],
  },
  {
    id: "design",
    label: "Design & Engineering",
    blurb: "Graphic design, presentations, UI/UX and engineering drawings.",
    tiers: [
      { name: "Graphic Design", price: "₹499+", note: "Basic graphics and marketing assets." },
      { name: "Presentation Design", price: "₹999+", note: "Professional presentation design." },
      { name: "UI/UX Design", price: "₹2,999+", note: "Web/mobile interface design." },
      { name: "AutoCAD 2D Drawing", price: "₹999+", note: "Basic 2D drafting." },
      { name: "Engineering Drawing", price: "₹1,499+", note: "Engineering drawing/drafting support." },
      { name: "Custom CAD Work", price: "₹2,999+", note: "Complex/custom CAD requirements." },
    ],
  },
] as const;

export type PricerCategory = {
  id: string;
  label: string;
  example: string;
  base: number;
  contactService: string;
};

export const PRICER_CATEGORIES: PricerCategory[] = [
  { id: "web", label: "Website", example: "Launch website", base: 2999, contactService: "Web Development" },
  { id: "app", label: "Custom Web App", example: "Dashboard / SaaS platform", base: 29999, contactService: "Web Development" },
  { id: "mobile", label: "Mobile App", example: "Basic Flutter app", base: 24999, contactService: "Full Stack Flutter Apps" },
  { id: "ai", label: "AI / ML", example: "Chatbot / ML / CV", base: 7999, contactService: "AI & ML Automation" },
  { id: "automation", label: "Automation", example: "Workflow automation", base: 7999, contactService: "AI & ML Automation" },
  { id: "student", label: "Student Project", example: "Basic project", base: 1999, contactService: "Final Year Project Support" },
  { id: "mini", label: "Mini Project", example: "Simple Python/web/ML", base: 999, contactService: "Final Year Project Support" },
] as const;

export const COMPLEXITY_OPTIONS = [
  { id: "basic", label: "Basic", mult: 1 },
  { id: "standard", label: "Standard", mult: 1.75 },
  { id: "advanced", label: "Advanced", mult: 3 },
] as const;

export const ESTIMATOR_ADDONS = [
  { id: "auth", label: "Authentication", pct: 0.15 },
  { id: "db", label: "Database", pct: 0.15 },
  { id: "pay", label: "Payments", pct: 0.2 },
  { id: "admin", label: "Admin Panel", pct: 0.2 },
  { id: "ai", label: "AI / API Integration", pct: 0.2 },
  { id: "deploy", label: "Deployment & Setup", pct: 0.1 },
] as const;

export const ESTIMATOR_ASSUMPTIONS = [
  "Typical scope for the selected project type and complexity.",
  "1–5 key pages or screens unless the type implies more.",
  "Standard integrations: WhatsApp, basic forms, Maps where listed.",
  "Revisions from the tier (1–3) are included; extra revisions add cost.",
  "Basic SEO and deployment for the website tiers.",
  "Recurring third-party costs are NOT included — see exclusions.",
] as const;

export const PRICING_EXCLUSIONS = [
  "Domain & hosting",
  "Paid third-party APIs",
  "WhatsApp Business API fees",
  "Cloud usage / server costs",
  "App store & developer fees",
  "Third-party subscriptions",
  "Extra revisions & re-scope beyond the tier",
] as const;