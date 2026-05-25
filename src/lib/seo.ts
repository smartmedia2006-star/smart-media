export const SITE_CONFIG = {
  name: "Smart Media Nepal",
  shortName: "Smart Media",
  description:
    "Nepal's largest Digital Out-of-Home (DOOH) advertising network. Airport advertising at TIA, highway billboards, digital screens, mall & transit advertising across Nepal.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://smartmedia.com.np",
  logo: "/images/logo.png",
  ogImage: "/images/og-image.jpg",
  twitter: "@SmartMediaNepal",
  address: {
    street: "Putalisadak",
    city: "Kathmandu",
    region: "Bagmati Province",
    postalCode: "44600",
    country: "NP",
    countryName: "Nepal",
  },
  phone: "+977-1-4444444",
  email: "info@smartmedia.com.np",
  geo: { lat: 27.7041, lng: 85.3145 },
};

export function buildSEOMeta(params: {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}) {
  const { title, description, canonical, ogImage, noIndex } = params;
  const fullTitle = `${title} | Smart Media Nepal`;
  const image = ogImage ?? SITE_CONFIG.ogImage;
  const url = canonical ?? SITE_CONFIG.url;

  return {
    title: fullTitle,
    description,
    canonical: url,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [{ url: `${SITE_CONFIG.url}${image}`, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${SITE_CONFIG.url}${image}`],
      creator: SITE_CONFIG.twitter,
    },
    robots: noIndex ? "noindex, nofollow" : "index, follow",
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.region,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.geo.lat,
      longitude: SITE_CONFIG.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/SmartMediaNepal",
      "https://www.instagram.com/SmartMediaNepal",
      "https://www.linkedin.com/company/smart-media-nepal",
    ],
    areaServed: { "@type": "Country", name: "Nepal" },
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

export function buildServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${SITE_CONFIG.url}${service.url}`,
    image: service.image ? `${SITE_CONFIG.url}${service.image}` : undefined,
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    areaServed: { "@type": "Country", name: "Nepal" },
  };
}

export function buildFAQSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
