export const AMBASSADOR_TIERS = [
  {
    tier: "Bronze",
    threshold: "Refer your first project",
    rate: 2,
    label: "2%",
    perks: ["2% commission on every closed project", "Official ambassador referral link", "Payout within 7 days of client payment"],
    highlight: false,
  },
  {
    tier: "Silver",
    threshold: "₹80,000+ referred in 90 days",
    rate: 5,
    label: "5%",
    perks: ["5% commission on every closed project", "Priority project status", "Exclusive Zenera swag kit", "Quarterly ambassador meetups"],
    highlight: true,
  },
  {
    tier: "Gold",
    threshold: "₹2,50,000+ referred in 90 days",
    rate: 8,
    label: "8%",
    perks: ["8% commission on every closed project", "Your own referral dashboard", "Direct line to the founder", "Co-branded opportunities"],
    highlight: false,
  },
] as const;

export const AMBASSADOR_STEPS = [
  {
    num: "01",
    title: "Apply to join",
    desc: "Send us a quick WhatsApp or use the form. Let us know your college, field, and why you'd make a great ambassador.",
  },
  {
    num: "02",
    title: "Get your referral link",
    desc: "You'll get a unique referral link and a ready-to-share kit. Share it with your campus, friends, and LinkedIn network.",
  },
  {
    num: "03",
    title: "Earn on every project",
    desc: "When a referred client closes a project, you earn commission. Paid out within 7 days of the client's payment.",
  },
] as const;

export const AMBASSADOR_FAQS = [
  {
    q: "Who can become an ambassador?",
    a: "Any student, working professional, or freelancer — anyone with a network that could use our services. Students and campus leaders are especially welcome.",
  },
  {
    q: "How is a referral tracked?",
    a: "Every ambassador gets a unique referral link. Projects that come through your link are attributed to you automatically. For conversations started via WhatsApp, just mention your ambassador ID.",
  },
  {
    q: "When do I get paid?",
    a: "Commission is paid out within 7 days after the referred client's payment is received and the project is confirmed, regardless of project duration.",
  },
  {
    q: "Are there any limits on how much I can earn?",
    a: "None. The more projects you refer, the more you earn — and as your monthly referred value grows, you move up tiers to a higher commission rate.",
  },
  {
    q: "Can I promote Zenera Labs on campus?",
    a: "Yes! That's exactly what we want. We'll provide posters, slide decks, and sample posts. Some of our best ambassadors are college representatives.",
  },
  {
    q: "Do I need to do any technical work?",
    a: "No. Your job is simply to connect us with people who need websites, apps, AI automation, or project help. Our team handles the delivery.",
  },
] as const;

export function commissionFor(projectValue: number): { rate: number; commission: number } {
  const rate = projectValue >= 250000 ? 8 : projectValue >= 80000 ? 5 : 2;
  return { rate, commission: (projectValue * rate) / 100 };
}
