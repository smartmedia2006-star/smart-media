import {
  ShieldCheckIcon,
  ChartBarIcon,
  CogIcon,
  GlobeAltIcon,
  BoltIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const reasons = [
  {
    icon: <GlobeAltIcon className="w-6 h-6" />,
    title: "Nepal's Largest Network",
    desc: "500+ owned and operated sites covering every major city, highway, and point of entry in Nepal.",
  },
  {
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    title: "Airport Concession Holder",
    desc: "Exclusive advertising rights at Tribhuvan International Airport — the single most premium OOH location in Nepal.",
  },
  {
    icon: <ChartBarIcon className="w-6 h-6" />,
    title: "Real-Time Campaign Monitoring",
    desc: "Our client portal gives advertisers live proof-of-play reports, footfall analytics, and performance dashboards.",
  },
  {
    icon: <CogIcon className="w-6 h-6" />,
    title: "End-to-End Production",
    desc: "In-house design, printing, and installation teams ensure quality and speed from brief to board.",
  },
  {
    icon: <BoltIcon className="w-6 h-6" />,
    title: "Digital Content Management",
    desc: "Update your digital screen content remotely in real time. Schedule campaigns, daypart ads, and special promotions.",
  },
  {
    icon: <UsersIcon className="w-6 h-6" />,
    title: "300+ Brands Trust Us",
    desc: "From local SMEs to global multinationals — Smart Media has run campaigns for brands across FMCG, banking, telecom, real estate & more.",
  },
];

export function WhySmartMedia() {
  return (
    <section className="section-padding bg-white">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-sm font-semibold text-brand-blue-600 uppercase tracking-widest mb-3">
              Why Smart Media
            </p>
            <h2 className="section-heading mb-4">
              The Strategic Choice for Advertising in Nepal
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Smart Media isn&apos;t just another media owner. We&apos;re your strategic outdoor
              advertising partner — combining Nepal&apos;s largest physical network with
              cutting-edge digital capabilities and a dedicated client success team.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((r) => (
                <div key={r.title} className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-brand-blue-600">
                    {r.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{r.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – visual / mockup */}
          <div className="relative">
            <div className="bg-gradient-to-br from-brand-dark to-brand-blue-700 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold font-heading mb-6">Our Network at a Glance</h3>
              <div className="space-y-4">
                {[
                  { location: "Tribhuvan International Airport", formats: "Digital screens, lightboxes, banners", icon: "✈️" },
                  { location: "Kathmandu Ring Road", formats: "Billboards, unipoles, digital screens", icon: "🛣️" },
                  { location: "Prithvi Highway (KTM–Pokhara)", formats: "Highway billboards, unipoles", icon: "🏔️" },
                  { location: "Kathmandu Valley Malls", formats: "In-mall formats, digital boards", icon: "🏬" },
                  { location: "Public Transport Routes", formats: "Bus wraps, taxi branding", icon: "🚌" },
                ].map((loc) => (
                  <div key={loc.location} className="flex items-start gap-3 p-3 bg-white/10 rounded-xl">
                    <span className="text-2xl">{loc.icon}</span>
                    <div>
                      <p className="text-sm font-semibold">{loc.location}</p>
                      <p className="text-xs text-blue-200 mt-0.5">{loc.formats}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between">
                <p className="text-sm text-blue-200">Expanding to 1000+ sites by 2026</p>
                <span className="text-green-400 font-semibold text-sm">● Growing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
