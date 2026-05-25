import Link from "next/link";
import { MapPinIcon } from "@heroicons/react/24/solid";

const locations = [
  { city: "Kathmandu", count: 180, highlight: "TIA, Ring Road, Durbar Marg" },
  { city: "Lalitpur (Patan)", count: 45, highlight: "Satdobato, Pulchowk, Jawalakhel" },
  { city: "Bhaktapur", count: 20, highlight: "Suryabinayak, Katunje" },
  { city: "Pokhara", count: 55, highlight: "Lakeside, Prithvi Chowk, airport" },
  { city: "Chitwan", count: 35, highlight: "Bharatpur, Narayangarh" },
  { city: "Butwal / Bhairahawa", count: 40, highlight: "Buddha Highway, Siddhartha" },
  { city: "Hetauda", count: 15, highlight: "Hetauda Industrial Corridor" },
  { city: "Dharan / Biratnagar", count: 30, highlight: "East Nepal corridor" },
  { city: "Highways", count: 80, highlight: "Prithvi, Araniko, Mahendra highways" },
];

export function MapSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-brand-blue-600 uppercase tracking-widest mb-3">
            Our Coverage
          </p>
          <h2 className="section-heading">Nationwide Presence Across Nepal</h2>
          <p className="section-subheading mx-auto">
            From Kathmandu Valley to the Terai, our network spans every major population
            centre and arterial route in Nepal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Location cards */}
          <div className="lg:col-span-1 space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
            {locations.map((loc) => (
              <div key={loc.city} className="card p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-5 h-5 text-brand-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900 text-sm">{loc.city}</p>
                    <span className="text-xs font-bold text-brand-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {loc.count}+
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{loc.highlight}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="lg:col-span-2 relative">
            <div className="bg-brand-dark rounded-3xl overflow-hidden" style={{ height: "500px" }}>
              {/* Nepal map SVG placeholder with dots */}
              <div className="relative h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-900 to-brand-dark opacity-95" />
                <div className="relative z-10 text-center px-8">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-white text-xl font-bold font-heading mb-2">
                    Interactive Map
                  </p>
                  <p className="text-blue-200 text-sm mb-6">
                    View all 500+ ad locations across Nepal with filters by format, city, and availability.
                  </p>
                  <Link
                    href="/locations"
                    className="inline-flex items-center gap-2 bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                  >
                    <MapPinIcon className="w-5 h-5" />
                    Explore All Locations
                  </Link>
                </div>
                {/* Decorative dots simulating map pins */}
                {[
                  { top: "30%", left: "48%", size: "w-3 h-3", pulse: true },
                  { top: "38%", left: "44%", size: "w-2 h-2", pulse: false },
                  { top: "42%", left: "52%", size: "w-2 h-2", pulse: false },
                  { top: "55%", left: "35%", size: "w-2 h-2", pulse: false },
                  { top: "60%", left: "58%", size: "w-2 h-2", pulse: false },
                  { top: "65%", left: "45%", size: "w-2 h-2", pulse: false },
                  { top: "70%", left: "30%", size: "w-2 h-2", pulse: false },
                  { top: "72%", left: "65%", size: "w-2 h-2", pulse: false },
                ].map((dot, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{ top: dot.top, left: dot.left }}
                  >
                    <div className={`${dot.size} bg-brand-red-500 rounded-full ${dot.pulse ? "animate-ping" : ""}`} />
                    {dot.pulse && (
                      <div className="absolute inset-0 w-3 h-3 bg-brand-red-500 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
