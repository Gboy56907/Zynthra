import { useLocation } from "@tanstack/react-router";

const SITE_URL = "https://zynthra.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zynthra",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: "Sovereign AI + cloud platform for enterprise-grade automation. Unified AI agents, voice intelligence, cloud communication, and automation.",
  sameAs: [
    "https://twitter.com/Zynthra",
    "https://linkedin.com/company/zynthra",
    "https://github.com/zynthra",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-555-ZYNTHRA",
    contactType: "sales",
    availableLanguage: "English",
  },
  foundingDate: "2024",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 50,
    maxValue: 200,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zynthra",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Zynthra",
  operatingSystem: "Web, Cloud",
  applicationCategory: "BusinessApplication",
  description: "Unified AI + cloud platform for enterprise-grade automation. Includes AI agents, voice bots, chat, telephony, and developer tools.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "200",
    bestRating: "5",
  },
  author: {
    "@type": "Organization",
    name: "Zynthra",
  },
};

export function SchemaMarkup() {
  const location = useLocation();
  const pathname = location.pathname;
  
  const isHomepage = pathname === "/" || pathname === "";
  
  const schemas = [
    organizationSchema,
    websiteSchema,
    ...(isHomepage ? [softwareApplicationSchema] : []),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
