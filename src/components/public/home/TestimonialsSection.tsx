"use client";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "Smart Media's airport advertising at TIA gave our brand unparalleled visibility with every international visitor. The digital screens are high-quality, and the team handled everything from creative to installation seamlessly.",
    author: "Rajesh Shrestha",
    role: "Marketing Director",
    company: "Nepal Telecom",
    initials: "RS",
    color: "blue",
  },
  {
    quote:
      "We ran a 3-month billboard campaign on the Ring Road for our new product launch. The footfall estimates were accurate, and our sales team confirmed strong brand recognition in those corridors. Will definitely book again.",
    author: "Priya Gurung",
    role: "Brand Manager",
    company: "CG Corp Global",
    initials: "PG",
    color: "red",
  },
  {
    quote:
      "The client portal is excellent — we could see proof-of-play for our digital screen campaign in real time. That level of transparency is rare in this market. Smart Media sets the benchmark for professional OOH.",
    author: "Anil Maharjan",
    role: "Head of Marketing",
    company: "Nabil Bank",
    initials: "AM",
    color: "green",
  },
  {
    quote:
      "As an international brand entering Nepal, Smart Media was our go-to partner. They knew exactly which locations would maximise reach for our target demographic and helped us craft a media plan within budget.",
    author: "Sarah Thompson",
    role: "Regional Director South Asia",
    company: "Unilever Nepal",
    initials: "ST",
    color: "purple",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  red: "bg-red-100 text-red-700",
  green: "bg-green-100 text-green-700",
  purple: "bg-purple-100 text-purple-700",
};

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const t = testimonials[current];

  return (
    <section className="section-padding bg-white">
      <div className="container-xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-brand-blue-600 uppercase tracking-widest mb-3">
            Client Testimonials
          </p>
          <h2 className="section-heading">What Our Clients Say</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card p-8 md:p-12 text-center transition-all duration-300">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>

            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold text-base", colorMap[t.color])}>
                {t.initials}
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900">{t.author}</p>
                <p className="text-sm text-gray-500">{t.role}, {t.company}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    i === current ? "w-6 bg-brand-blue-600" : "bg-gray-300"
                  )}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
