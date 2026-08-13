import { PRICING_CATEGORIES } from "@/lib/pricing";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zenera Labs",
  alternateName: "Zenera Labs India",
  url: "https://zeneralabs.in",
  logo: "https://zeneralabs.in/assets/logo.png",
  description:
    "Zenera Labs is a Bangalore-based digital solutions agency specialising in AI automation, full stack web & mobile development, and final year project support for engineering students.",
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "Puneeth Punacha",
    email: "puneethpunacha@zeneralabs.in",
    jobTitle: "Founder & AI Engineer",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-80733-78278",
      contactType: "customer service",
      availableLanguage: ["English", "Kannada", "Hindi"],
      contactOption: "TollFree",
    },
    {
      "@type": "ContactPoint",
      email: "zeneralabs@gmail.com",
      contactType: "sales",
    },
  ],
  sameAs: ["https://wa.me/918073378278"],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Flutter App Development",
    "Backend Systems",
    "AutoCAD",
    "Final Year Projects",
    "Research Papers",
    "IEEE Papers",
  ],
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  priceRange: "₹₹",
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Zenera Labs",
  image: "https://zeneralabs.in/assets/logo.png",
  url: "https://zeneralabs.in",
  telephone: "+918073378278",
  email: "zeneralabs@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.9716,
    longitude: 77.5946,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "23:00",
  },
  priceRange: "₹₹",
  description:
    "Zenera Labs — AI automation, web & app development agency in Bangalore. Helping businesses and 100+ final year students.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Zenera Labs Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI & ML Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Full Stack Flutter App Development" },
      },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Backend Systems & APIs" } },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "AutoCAD 2D/3D & Graphic Design" },
      },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Final Year Project Support" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IEEE Research Paper Writing" } },
    ],
  },
};

export const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zenera Labs",
  url: "https://zeneralabs.in",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://zeneralabs.in/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const homeBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://zeneralabs.in/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://zeneralabs.in/#services",
    },
    { "@type": "ListItem", position: 3, name: "Team", item: "https://zeneralabs.in/#team" },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contact",
      item: "https://zeneralabs.in/contact.html",
    },
  ],
};

export const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Zenera Labs",
  url: "https://zeneralabs.in/contact.html",
  description:
    "Contact Zenera Labs for AI automation, web development, Flutter apps, or final year project support.",
  mainEntity: {
    "@type": "Organization",
    name: "Zenera Labs",
    telephone: "+918073378278",
    email: "zeneralabs@gmail.com",
    founder: { "@type": "Person", name: "Puneeth Punacha", email: "puneethpunacha@zeneralabs.in" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.linkedin.com/company/zenera-labs/",
      "https://www.instagram.com/zeneralabs",
    ],
  },
};

export const contactBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://zeneralabs.in/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact",
      item: "https://zeneralabs.in/contact.html",
    },
  ],
};

const catalogPrice = (price: string) => Number(price.replace(/[₹,*+\s]/g, ""));

export const pricingPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Zenera Labs — Development & AI Pricing",
  url: "https://zeneralabs.in/pricing",
  description:
    "Transparent starting prices for web development, mobile apps, AI & ML, business automation, student projects and design & engineering from Zenera Labs.",
  provider: {
    "@type": "Organization",
    name: "Zenera Labs",
    url: "https://zeneralabs.in",
    telephone: "+918073378278",
  },
  areaServed: { "@type": "Country", name: "India" },
  offers: PRICING_CATEGORIES.flatMap((cat) =>
    cat.tiers.map((tier) => ({
      "@type": "Offer",
      name: `${cat.label} — ${tier.name}`,
      description: tier.note,
      priceCurrency: "INR",
      price: catalogPrice(tier.price),
    })),
  ),
};

export const pricingBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://zeneralabs.in/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pricing",
      item: "https://zeneralabs.in/pricing",
    },
  ],
};

export const ambassadorJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Zenera Labs Student Ambassador Program",
  url: "https://zeneralabs.in/ambassador",
  description:
    "Refer clients to Zenera Labs and earn 20–30% commission on every project. Free to join, fast payouts.",
  isPartOf: { "@type": "WebSite", name: "Zenera Labs", url: "https://zeneralabs.in" },
  about: {
    "@type": "Organization",
    name: "Zenera Labs",
    url: "https://zeneralabs.in",
    email: "ambassador@zeneralabs.in",
  },
};