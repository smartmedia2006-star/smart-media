import Link from "next/link";
import {
  BuildingOffice2Icon,
  SignalIcon,
  TruckIcon,
  ShoppingBagIcon,
  WrenchScrewdriverIcon,
  MapPinIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    icon: <BuildingOffice2Icon className="w-7 h-7" />,
    name: "Airport Advertising",
    desc: "TIA International & Domestic terminals – Nepal's premium advertising space reaching every international visitor.",
    href: "/airport-advertising-nepal",
    color: "blue",
    badge: "Flagship",
    stats: "5M+ annual passengers",
  },
  {
    icon: <MapPinIcon className="w-7 h-7" />,
    name: "Highway Billboards",
    desc: "Large-format static & backlit billboards on Kathmandu Ring Road, Prithvi Highway, Araniko Highway & more.",
    href: "/billboard-nepal",
    color: "red",
    stats: "200+ locations",
  },
  {
    icon: <SignalIcon className="w-7 h-7" />,
    name: "Digital Screens",
    desc: "LED & LCD digital OOH displays in high footfall zones – real-time content, multiple ad slots, measurable results.",
    href: "/digital-screens-nepal",
    color: "purple",
    stats: "HD resolution",
  },
  {
    icon: <TruckIcon className="w-7 h-7" />,
    name: "Transit Advertising",
    desc: "Bus wraps, taxi branding, and metro advertising that follows your audience throughout the city.",
    href: "/transit-advertising-nepal",
    color: "green",
    stats: "City-wide reach",
  },
  {
    icon: <ShoppingBagIcon className="w-7 h-7" />,
    name: "Mall Advertising",
    desc: "Premium in-mall formats at Civil Mall, Labim Mall, Sherpa Mall – targeting high-income shoppers.",
    href: "/mall-advertising-nepal",
    color: "yellow",
    stats: "Top malls covered",
  },
  {
    icon: <WrenchScrewdriverIcon className="w-7 h-7" />,
    name: "Street Furniture",
    desc: "Bus shelters, kiosks, lamp post banners & pavement signs placed strategically in high footfall areas.",
    href: "/services/street-furniture",
    color: "orange",
    stats: "Urban & suburban",
  },
  {
    icon: <PrinterIcon className="w-7 h-7" />,
    name: "Production & Printing",
    desc: "In-house large-format printing, fabrication & installation. From design to display – end-to-end service.",
    href: "/services/production",
    color: "teal",
    stats: "Turnkey service",
  },
];

const colorMap: Record<string, { bg: string; icon: string; badge: string }> = {
  blue: { bg: "bg-blue-50", icon: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
  red: { bg: "bg-red-50", icon: "text-red-600", badge: "bg-red-100 text-red-700" },
  purple: { bg: "bg-purple-50", icon: "text-purple-600", badge: "bg-purple-100 text-purple-700" },
  green: { bg: "bg-green-50", icon: "text-green-600", badge: "bg-green-100 text-green-700" },
  yellow: { bg: "bg-yellow-50", icon: "text-yellow-600", badge: "bg-yellow-100 text-yellow-700" },
  orange: { bg: "bg-orange-50", icon: "text-orange-600", badge: "bg-orange-100 text-orange-700" },
  teal: { bg: "bg-teal-50", icon: "text-teal-600", badge: "bg-teal-100 text-teal-700" },
};

export function ServicesGrid() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-brand-blue-600 uppercase tracking-widest mb-3">
            Our Services
          </p>
          <h2 className="section-heading">
            Complete Outdoor Advertising Solutions
          </h2>
          <p className="section-subheading mx-auto">
            From Nepal's busiest airport to its most-travelled highways — Smart Media delivers
            end-to-end DOOH solutions that put your brand in front of the right audiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const colors = colorMap[service.color];
            return (
              <Link
                key={service.href}
                href={service.href}
                className="card p-6 group flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center ${colors.icon} flex-shrink-0`}>
                    {service.icon}
                  </div>
                  {service.badge && (
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colors.badge}`}>
                      {service.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold font-heading text-gray-900 mb-2 group-hover:text-brand-blue-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{service.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">{service.stats}</span>
                  <span className="text-sm font-semibold text-brand-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Learn more →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/services" className="btn-outline">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
