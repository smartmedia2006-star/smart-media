import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { ContactForm } from "@/components/public/ContactForm";
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Smart Media Nepal | Get a Free OOH Advertising Quote",
  description:
    "Contact Smart Media Nepal for billboard, airport, digital screen & transit advertising enquiries. Get a free customised media plan within 24 hours. Call, email, or fill our enquiry form.",
  alternates: { canonical: "/contact" },
};

const contactInfo = [
  {
    icon: <PhoneIcon className="w-6 h-6" />,
    label: "Phone",
    value: "+977-1-4444444",
    href: "tel:+97714444444",
    sub: "Sun–Fri, 9:00 AM – 6:00 PM",
  },
  {
    icon: <EnvelopeIcon className="w-6 h-6" />,
    label: "Email",
    value: "info@smartmedia.com.np",
    href: "mailto:info@smartmedia.com.np",
    sub: "We reply within 4 business hours",
  },
  {
    icon: <MapPinIcon className="w-6 h-6" />,
    label: "Office",
    value: "Putalisadak, Kathmandu",
    href: "https://maps.google.com/?q=Putalisadak+Kathmandu+Nepal",
    sub: "Nepal 44600",
  },
  {
    icon: <ClockIcon className="w-6 h-6" />,
    label: "Hours",
    value: "Sun–Fri: 9 AM – 6 PM",
    href: null,
    sub: "Sat: Closed",
  },
];

export default function ContactPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark to-brand-blue-700 py-20">
        <div className="container-xl">
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-blue-100 max-w-xl">
            Ready to reach millions of Nepalis? Send us your brief and our team will prepare
            a custom media plan within 24 hours — free of charge.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info sidebar */}
            <div className="space-y-5">
              {contactInfo.map((info) => (
                <div key={info.label} className="card p-5 flex items-start gap-4">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue-600 flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-semibold text-gray-900 hover:text-brand-blue-600 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-gray-900">{info.value}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-0.5">{info.sub}</p>
                  </div>
                </div>
              ))}

              {/* WhatsApp quick contact */}
              <a
                href="https://wa.me/9771XXXXXXXX?text=Hi%20Smart%20Media%2C%20I%27d%20like%20to%20enquire%20about%20outdoor%20advertising."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors shadow-sm"
              >
                <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <p className="font-semibold text-sm">Chat on WhatsApp</p>
                  <p className="text-xs text-green-100">Fastest response</p>
                </div>
              </a>

              {/* Map embed placeholder */}
              <div className="card overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-brand-dark to-brand-blue-800 flex items-center justify-center">
                  <a
                    href="https://maps.google.com/?q=Putalisadak+Kathmandu+Nepal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-white"
                  >
                    <div className="text-4xl mb-2">📍</div>
                    <p className="font-semibold text-sm">View on Google Maps</p>
                    <p className="text-xs text-blue-200">Putalisadak, Kathmandu</p>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                  Send Us an Enquiry
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Fill in the form below and our team will get back to you within 4 business hours with
                  site recommendations and pricing.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
