"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRightIcon, PlayIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

const slides = [
  {
    headline: "Nepal's Largest",
    highlight: "DOOH Advertising",
    subhead: "Network",
    description:
      "Connect your brand with 10+ million Nepalis daily through 500+ premium outdoor locations — from Tribhuvan International Airport to highway billboards.",
    ctaText: "Get a Free Quote",
    ctaHref: "/contact",
    badge: "🏆 #1 in Nepal",
    bg: "from-brand-dark via-brand-blue-900 to-brand-blue-700",
  },
  {
    headline: "Dominate",
    highlight: "Airport Advertising",
    subhead: "at TIA Kathmandu",
    description:
      "Reach 5+ million arriving & departing passengers per year. Prime locations in International & Domestic terminals — the first impression for every visitor to Nepal.",
    ctaText: "View Airport Media",
    ctaHref: "/airport-advertising-nepal",
    badge: "✈️ TIA Exclusive",
    bg: "from-[#0a1628] via-brand-dark to-brand-blue-800",
  },
  {
    headline: "High-Impact",
    highlight: "Digital Screens",
    subhead: "Across Kathmandu",
    description:
      "Dynamic digital out-of-home screens in prime commercial areas. Real-time content updates, HD resolution, and verified audience metrics.",
    ctaText: "Explore Digital OOH",
    ctaHref: "/digital-screens-nepal",
    badge: "📺 HD Digital",
    bg: "from-[#071528] via-brand-blue-950 to-brand-dark",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section
      className={cn(
        "relative min-h-[92vh] flex items-center bg-gradient-to-br overflow-hidden",
        slide.bg
      )}
      aria-label="Hero"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-brand-red-600/15 rounded-full blur-3xl" />

      <div className="container-xl relative z-10 py-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20 animate-fade-in">
            <span>{slide.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 animate-slide-up">
            {slide.headline}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
              {slide.highlight}
            </span>
            <br />
            {slide.subhead}
          </h1>

          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed animate-slide-up">
            {slide.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 animate-slide-up">
            <Link
              href={slide.ctaHref}
              className="inline-flex items-center gap-2 bg-brand-red-600 hover:bg-brand-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {slide.ctaText}
              <ChevronRightIcon className="w-5 h-5" />
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl border border-white/30 transition-all duration-200"
            >
              <PlayIcon className="w-5 h-5" />
              View Our Locations
            </Link>
          </div>

          {/* Key stats strip */}
          <div className="grid grid-cols-3 gap-6 mt-14 pt-8 border-t border-white/20">
            {[
              { value: "500+", label: "Ad Locations" },
              { value: "10M+", label: "Daily Impressions" },
              { value: "15+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-white font-heading">{stat.value}</p>
                <p className="text-sm text-blue-200 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === current ? "w-8 bg-white" : "w-2 bg-white/40"
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 text-white/50 text-xs flex flex-col items-center gap-1 hidden md:flex">
        <div className="w-0.5 h-8 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 w-full h-4 bg-white/60 animate-bounce" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
