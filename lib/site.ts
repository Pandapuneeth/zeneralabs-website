export const SITE = {
  name: "Zenera Labs",
  tagline: "Build Better. Ship Faster.",
  domain: "https://zeneralabs.in",
  phoneDisplay: "+91 80733 78278",
  phoneE164: "+918073378278",
  phoneWa: "+91 80733 78278",
  whatsapp: "https://wa.me/918073378278",
  email: "zeneralabs@gmail.com",
  founderEmail: "puneethpunacha@zeneralabs.in",
  linkedin: "https://www.linkedin.com/company/zenera-labs/",
  instagram: "https://www.instagram.com/zeneralabs",
  address: "Bangalore, Karnataka, India",
};

export const NAV_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Work", href: "#work" },
  { label: "Impact", href: "#impact" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Hiring", href: "/hiring" },
  { label: "Ambassador", href: "/ambassador" },
  { label: "Contact", href: "/contact" },
] as const;

export const HERO_TRUST = [
  { num: "100+", label: "Projects" },
  { num: "20+", label: "AI Automations" },
  { num: "11+", label: "Websites" },
  { num: "30+", label: "Research Papers" },
] as const;

export const MARQUEE_ITEMS = [
  "AI Automation",
  "Web Development",
  "Flutter Apps",
  "Backend Systems",
  "Final Year Projects",
  "Research Papers",
  "AutoCAD & Design",
] as const;

export const IMPACT_STATS = [
  {
    emoji: "🎓",
    target: 100,
    plus: true,
    label: "Final Year Students Guided",
    desc: "From idea to submission — 100+ students shipped final year projects they're proud of.",
  },
  {
    emoji: "🤖",
    target: 20,
    plus: false,
    label: "AI Automations Deployed",
    desc: "Custom AI pipelines, chatbots, and ML models built and shipped for real clients.",
  },
  {
    emoji: "📱",
    target: 3,
    plus: false,
    label: "Flutter Apps Live",
    desc: "Full stack cross-platform apps — from UI to database to deployment, we ship complete products.",
  },
  {
    emoji: "📄",
    target: 30,
    plus: false,
    label: "Research Papers",
    desc: "IEEE, Springer, and journal papers co-authored and formatted to publication standards.",
  },
  {
    emoji: "🌐",
    target: 11,
    plus: false,
    label: "Websites Deployed",
    desc: "Pixel-perfect, fast, and responsive websites that make businesses look premium.",
  },
] as const;

export const SERVICES = [
  {
    id: "ai",
    num: "01",
    title: "AI & ML Automation",
    desc: "Intelligent systems that learn, adapt and work 24/7. Chatbots, predictive models, workflow automation — the AI that works while you sleep.",
    tags: ["LLMs", "ML Models", "Chatbots", "Pipelines"],
  },
  {
    id: "web",
    num: "02",
    title: "Web Development",
    desc: "Modern, blazing-fast websites designed to convert. Pixel-perfect responsive UI with the latest tech stack — built for performance and results.",
    tags: ["React", "Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: "flutter",
    num: "03",
    title: "Full Stack Flutter Apps",
    desc: "Cross-platform apps that feel native on Android and iOS. From auth to payments to deployment — end to end, we ship complete products.",
    tags: ["Flutter", "Firebase", "REST APIs", "Dart"],
  },
  {
    id: "backend",
    num: "04",
    title: "Backend Systems",
    desc: "Rock-solid APIs and server architecture that scale. Secure, fast, and maintainable architecture for your growing product or platform.",
    tags: ["Node.js", "Python", "PostgreSQL", "Docker"],
  },
  {
    id: "design",
    num: "05",
    title: "AutoCAD & Graphic Design",
    desc: "Precise 2D/3D technical drawings and eye-catching graphic design. From architectural plans to brand identities — built with pixel-perfect accuracy.",
    tags: ["AutoCAD", "2D/3D", "Branding", "Graphics"],
  },
] as const;

export const SERVICE_STUDENT = {
  num: "06",
  title: "Final Year Project Support",
  desc: "100+ students helped across engineering, CS, and data science. Full support from ideation to final presentation — we make sure you submit something you're proud of.",
  tags: ["Project Dev", "Research Papers", "Documentation", "IEEE Format", "Presentations"],
  bigNum: "100+",
  bigLabel: "Students Helped",
} as const;

export type TeamMember = {
  name: string;
  role: string;
  badge?: "Founder" | "Co-Founder";
  photo?: string;
  email?: string;
  initials?: string;
  color?: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Puneeth Punacha",
    role: "Founder & AI Engineer",
    badge: "Founder",
    photo: "assets/puneeth punacha.jpeg",
    email: "puneethpunacha@zeneralabs.in",
  },
  {
    name: "Vighnesh M",
    role: "Data Science & ML Engineer",
    badge: "Co-Founder",
    photo: "assets/vighnesh m.jpeg",
  },
  {
    name: "Hamsini SY",
    role: "ML Engineer",
    photo: "assets/hamsini sy.jpeg",
  },
  { name: "Anya R", role: "Full Stack Developer", initials: "AR", color: "#7c3aed" },
  {
    name: "Naman AU",
    role: "AI Developer Intern",
    photo: "assets/naman au.jpeg",
  },
  {
    name: "Pragna R",
    role: "Cybersecurity Engineer Intern",
    photo: "assets/pragna r.jpeg",
  },
  {
    name: "Subhraneel Goswami",
    role: "AI Engineer",
    photo: "assets/subhraneel_goswami.jpeg",
  },
  {
    name: "Sanjay S",
    role: "Software Developer Intern",
    photo: "assets/sanjays.jpg",
  },
  {
    name: "Priyanka M",
    role: "ML Engineer & Data Analyst Intern",
    photo: "assets/priyankam.jpeg",
  },
  {
    name: "Dhyuthi Shree KS",
    role: "Machine Learning Engineer Intern",
    photo: "assets/dhyuti.png",
  },
] as const;

export const CONTACT_CHIPS = [
  { value: "AI & ML Automation", label: "🤖 AI & ML" },
  { value: "Web Development", label: "🌐 Web Dev" },
  { value: "Full Stack Flutter Apps", label: "📱 Flutter Apps" },
  { value: "Backend Systems", label: "⚙️ Backend" },
  { value: "AutoCAD & Graphic Design", label: "✏️ AutoCAD / Design" },
  { value: "Final Year Project Support", label: "🎓 Final Year Project" },
  { value: "Other", label: "💡 Other" },
] as const;

export const FAQS = [
  {
    q: "How soon can you start?",
    a: "Usually within 24–48 hours of confirming the project scope and requirements.",
  },
  {
    q: "Do you help with IEEE paper formatting?",
    a: "Yes — we've written and formatted 10+ research papers for IEEE, Springer, and other journals. We handle everything from abstract to references.",
  },
  {
    q: "What's your payment process?",
    a: "We typically work with 50% upfront and 50% on delivery. For students, we offer flexible payment arrangements — just ask.",
  },
  {
    q: "Can you work within a tight deadline?",
    a: "Absolutely. We understand project submissions and business deadlines. Tell us your date and we'll make a plan.",
  },
] as const;

export const TRUST_BADGES = [
  { icon: "⚡", label: "Fast Delivery" },
  { icon: "🛡️", label: "Quality First" },
  { icon: "🎓", label: "Student-Friendly Pricing" },
  { icon: "🌙", label: "24/7 Available" },
] as const;