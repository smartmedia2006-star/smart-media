import type { Metadata } from "next";
import Link from "next/link";
import { buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Smart Media Nepal | Nepal's Pioneer DOOH Advertising Company",
  description:
    "Smart Media Pvt. Ltd. — Nepal's leading digital out-of-home advertising company. Founded in 2008, we operate 500+ premium OOH sites including exclusive TIA airport concession. Meet our team.",
  alternates: { canonical: "/about" },
};

const team = [
  { name: "Anil Shrestha", role: "Chief Executive Officer", desc: "15+ years in Nepal's advertising industry. Former head of media at CG Corp.", initials: "AS", color: "blue" },
  { name: "Puja Maharjan", role: "Chief Operating Officer", desc: "Operations & logistics expert with background in large-format media installation.", initials: "PM", color: "red" },
  { name: "Suraj Tamang", role: "Head of Sales & Marketing", desc: "Strategic media planner with expertise in integrated OOH campaigns.", initials: "ST", color: "green" },
  { name: "Nisha Rana", role: "Head of Creative & Production", desc: "Creative director with 10+ years in advertising design and large-format print.", initials: "NR", color: "purple" },
  { name: "Bikash Thapa", role: "Head of Technology & Digital", desc: "Digital OOH specialist managing content delivery systems and client portals.", initials: "BT", color: "orange" },
  { name: "Anjali Gurung", role: "Client Relations Manager", desc: "Dedicated client success manager ensuring campaign delivery and renewal.", initials: "AG", color: "teal" },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  red: "bg-red-100 text-red-700",
  green: "bg-green-100 text-green-700",
  purple: "bg-purple-100 text-purple-700",
  orange: "bg-orange-100 text-orange-700",
  teal: "bg-teal-100 text-teal-700",
};

const milestones = [
  { year: "2008", event: "Smart Media founded in Kathmandu with 10 billboard sites" },
  { year: "2012", event: "Expanded to 100+ locations across Kathmandu Valley" },
  { year: "2015", event: "Won exclusive TIA Kathmandu airport advertising concession" },
  { year: "2017", event: "Launched Nepal's first programmatic DOOH network" },
  { year: "2019", event: "Expanded to Pokhara, Chitwan, and Terai corridor" },
  { year: "2021", event: "Launched real-time client portal with campaign tracking" },
  { year: "2023", event: "Reached 500+ sites; named Nepal's #1 OOH media owner" },
  { year: "2025", event: "Targeting 1000 sites and international DOOH partnerships" },
];

export default function AboutPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark to-brand-blue-700 py-20 md:py-28">
        <div className="container-xl">
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-white max-w-3xl mb-6">
            Nepal&apos;s Pioneer in Out-of-Home Advertising
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Since 2008, Smart Media has been building Nepal&apos;s most powerful outdoor advertising
            infrastructure — connecting brands with consumers at every touchpoint across the country.
          </p>
        </div>
      </section>

      {/* Company story */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Smart Media was founded in 2008 in Kathmandu with a single belief: that Nepal&apos;s
                  businesses deserved world-class outdoor advertising infrastructure. Starting with 10 billboard
                  sites in the Kathmandu Valley, we grew rapidly by combining premium site selection with
                  reliable service delivery — a rarity in Nepal&apos;s early OOH market.
                </p>
                <p>
                  The pivotal moment came in 2015, when we won the exclusive advertising concession
                  at Tribhuvan International Airport — Nepal&apos;s busiest and most premium public space.
                  This concession gave us unrivalled access to Nepal&apos;s highest-value audience and
                  established Smart Media as the undisputed leader in premium OOH.
                </p>
                <p>
                  Today, Smart Media operates 500+ advertising locations across Nepal, runs digital
                  DOOH networks in major cities, and serves 300+ brands from local SMEs to global
                  multinationals. Our in-house production facility handles everything from artwork
                  adaptation to installation, making us Nepal&apos;s only truly end-to-end OOH partner.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "2008", l: "Founded", c: "blue" },
                { v: "500+", l: "OOH Sites", c: "red" },
                { v: "300+", l: "Brands Served", c: "green" },
                { v: "15+", l: "Years Leading", c: "purple" },
              ].map((s) => (
                <div key={s.l} className={`card p-8 text-center border-t-4 ${s.c === "blue" ? "border-brand-blue-600" : s.c === "red" ? "border-brand-red-600" : s.c === "green" ? "border-green-500" : "border-purple-500"}`}>
                  <p className="text-4xl font-extrabold font-heading text-gray-900">{s.v}</p>
                  <p className="text-sm text-gray-500 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl max-w-3xl">
          <h2 className="text-3xl font-bold font-heading text-brand-dark mb-10 text-center">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-[28px] top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-brand-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs z-10">
                    {m.year}
                  </div>
                  <div className="pt-3">
                    <p className="text-gray-700 font-medium">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="section-heading">Meet Our Leadership Team</h2>
            <p className="section-subheading mx-auto">
              Experienced professionals committed to delivering measurable advertising results for every client.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card p-6 flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 ${colorMap[member.color]}`}>
                  {member.initials}
                </div>
                <h3 className="font-bold text-gray-900 font-heading">{member.name}</h3>
                <p className="text-sm text-brand-blue-600 font-semibold mt-0.5 mb-2">{member.role}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-brand-dark text-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-white">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🎯", title: "Results-First", desc: "We measure our success by the results our clients achieve. Every media plan starts with your marketing objective, not our inventory." },
              { icon: "🤝", title: "Transparency", desc: "Clear pricing, honest availability, and verifiable proof-of-display. No hidden fees. No overpromised impressions." },
              { icon: "🚀", title: "Innovation", desc: "We were first to launch digital OOH in Nepal. We continue to invest in technology that gives our clients a competitive edge." },
            ].map((v) => (
              <div key={v.title} className="text-center p-6">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                <p className="text-blue-200 leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-xl text-center">
          <h2 className="section-heading mb-4">Let&apos;s Work Together</h2>
          <p className="section-subheading mx-auto mb-8">
            Join 300+ brands that trust Smart Media to deliver their message to Nepal&apos;s consumers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">Get a Free Media Plan</Link>
            <Link href="/case-studies" className="btn-outline">View Case Studies</Link>
          </div>
        </div>
      </section>
    </>
  );
}
