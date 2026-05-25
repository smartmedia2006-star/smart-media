"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Prime Ad Locations", desc: "Across Nepal" },
  { value: 10, suffix: "M+", label: "Daily Impressions", desc: "Verified reach" },
  { value: 15, suffix: "+", label: "Years in DOOH", desc: "Industry leader" },
  { value: 300, suffix: "+", label: "Brands Served", desc: "Local & international" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatItem({ value, suffix, label, desc, started }: typeof stats[0] & { started: boolean }) {
  const count = useCountUp(value, 1800, started);
  return (
    <div className="text-center px-8 py-6">
      <p className="text-4xl md:text-5xl font-extrabold font-heading text-brand-blue-600">
        {count}{suffix}
      </p>
      <p className="text-lg font-semibold text-gray-900 mt-2">{label}</p>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white border-b border-gray-100 py-4">
      <div className="container-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
