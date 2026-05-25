import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildLocalBusinessSchema, SITE_CONFIG } from "@/lib/seo";
import { HeroSection } from "@/components/public/home/HeroSection";
import { StatsSection } from "@/components/public/home/StatsSection";
import { ServicesGrid } from "@/components/public/home/ServicesGrid";
import { ClientLogos } from "@/components/public/home/ClientLogos";
import { WhySmartMedia } from "@/components/public/home/WhySmartMedia";
import { TestimonialsSection } from "@/components/public/home/TestimonialsSection";
import { MapSection } from "@/components/public/home/MapSection";
import { BlogSnippet } from "@/components/public/home/BlogSnippet";

export const metadata: Metadata = {
  title: "Smart Media Nepal | #1 DOOH Advertising Agency – Airport, Billboard & Digital OOH",
  description:
    "Nepal's leading out-of-home advertising company. Airport ads at TIA, highway billboards, digital screens & transit media. 500+ sites across Nepal. Get a free quote.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Smart Media Nepal | Nepal's #1 DOOH Advertising Network",
    description:
      "Reach millions across Nepal with Smart Media's premier DOOH network – airport advertising, billboards, digital screens & more.",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  const schema = buildLocalBusinessSchema();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HeroSection />
      <StatsSection />
      <ServicesGrid />
      <WhySmartMedia />
      <ClientLogos />
      <TestimonialsSection />
      <MapSection />
      <BlogSnippet />
    </>
  );
}
