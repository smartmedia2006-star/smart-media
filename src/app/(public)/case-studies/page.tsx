import type { Metadata } from "next";
import { buildSEOMeta, buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = buildSEOMeta({
  title: "Advertising Case Studies Nepal | OOH Campaign Results",
  description: "Real results from Smart Media's OOH campaigns in Nepal. See how leading brands like Nabil Bank, Ncell, and Unilever used outdoor advertising to drive awareness and sales.",
  path: "/case-studies",
  keywords: ["advertising case studies Nepal", "OOH campaign results Nepal", "billboard advertising results", "DOOH campaign Nepal", "outdoor advertising ROI Nepal"],
});

const caseStudies = [
  {
    id: "nabil-bank-product-launch",
    client: "Nabil Bank",
    industry: "Banking & Finance",
    campaign: "Digital Loan Product Launch",
    duration: "3 months",
    sites: ["TIA Digital Screen", "Kalanki Unipole", "Durbar Marg Digital Screen"],
    challenge: "Nabil Bank needed to reach the urban, digitally-active demographic for their new instant digital loan product with a tight launch window.",
    solution: "Smart Media deployed a co-ordinated DOOH campaign across Kathmandu's premium digital network, with contextual dayparting (9am–10pm) and branch proximity targeting to drive footfall.",
    results: [
      { metric: "Brand Awareness Lift", value: "+38%", note: "Among 25–45 urban demographic" },
      { metric: "Branch Enquiries", value: "+52%", note: "During campaign period vs prior quarter" },
      { metric: "Digital Loan Applications", value: "+23%", note: "Direct attribution via campaign QR tracking" },
      { metric: "Total Impressions", value: "4.2M", note: "Over 90-day campaign" },
    ],
    quote: "Smart Media's digital network gave us the reach and frequency we needed for a product launch. The targeting flexibility was a game-changer.",
    quotePerson: "Marketing Director, Nabil Bank",
    tags: ["Digital Screens", "Finance", "Product Launch", "Kathmandu"],
  },
  {
    id: "ncell-brand-refresh",
    client: "Ncell",
    industry: "Telecommunications",
    campaign: "Brand Refresh — 'My Nepal, My Ncell'",
    duration: "6 months",
    sites: ["Kalanki Unipole", "Maitighar Billboard", "Pokhara Lakeside", "Bharatpur Highway"],
    challenge: "Ncell's brand refresh required simultaneous national presence to signal a new identity across Nepal's diverse geography.",
    solution: "A multi-city static + digital OOH rollout, anchored by the high-visibility Kalanki Unipole in Kathmandu, supported by highway and tourism-adjacent sites in Pokhara and Bharatpur.",
    results: [
      { metric: "National Recall Score", value: "+29%", note: "Post-campaign brand tracker" },
      { metric: "Net Promoter Score", value: "+11 pts", note: "Improvement vs pre-campaign baseline" },
      { metric: "Total Impressions", value: "18M+", note: "Across 6-month multi-city campaign" },
      { metric: "Sites Deployed", value: "12", note: "Across 4 cities" },
    ],
    quote: "The geographic spread Smart Media achieved gave our rebrand a truly national feel — from Kathmandu to Pokhara to the Terai.",
    quotePerson: "Brand Manager, Ncell",
    tags: ["National Campaign", "Telecom", "Brand Refresh", "Multi-City"],
  },
  {
    id: "unilever-sunsilk-festive",
    client: "Unilever Nepal",
    industry: "FMCG",
    campaign: "Sunsilk Dashain Campaign",
    duration: "45 days",
    sites: ["Civil Mall Atrium", "TIA Digital Screen", "Durbar Marg Digital Screen"],
    challenge: "Sunsilk needed to maximise share-of-voice during the highly competitive Dashain festive season against aggressive competitive spend.",
    solution: "High-frequency digital slots at premium shopping and airport locations, timed to peak gifting weeks. Creative rotated between 4 variants to avoid ad fatigue.",
    results: [
      { metric: "Festive Period Sales Lift", value: "+31%", note: "Against Dashain 2023 baseline" },
      { metric: "Awareness vs. Competitors", value: "#1", note: "In spontaneous OOH recall survey" },
      { metric: "Total Impressions", value: "6.8M", note: "Over 45-day Dashain burst" },
      { metric: "Campaign ROI", value: "3.4×", note: "Revenue per NPR spent on OOH" },
    ],
    quote: "Smart Media helped us own Dashain. The mall and airport combination was perfect for reaching shoppers and returning travellers simultaneously.",
    quotePerson: "Trade Marketing Manager, Unilever Nepal",
    tags: ["FMCG", "Festive Campaign", "Dashain", "Mall + Airport"],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "https://smartmedia.com.np/" },
      { name: "Case Studies", url: "https://smartmedia.com.np/case-studies" },
    ]),
  ],
};

export default function CaseStudiesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-brand-blue-900 text-white section-padding">
        <div className="container-xl">
          <nav className="text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Case Studies</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold font-heading leading-tight mb-4">
              Campaign Results That Speak
            </h1>
            <p className="text-xl text-white/80">
              Real brands, real campaigns, real metrics. See how Nepal's leading companies use Smart Media OOH to drive awareness, footfall, and sales.
            </p>
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="section-padding">
        <div className="container-xl space-y-16">
          {caseStudies.map((cs, i) => (
            <div key={cs.id} className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              {/* Left — context */}
              <div className={`lg:col-span-2 space-y-4 ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                <div>
                  <span className="badge bg-blue-50 text-blue-700 text-xs mb-2 inline-block">{cs.industry}</span>
                  <h2 className="text-2xl font-bold font-heading text-gray-900">{cs.client}</h2>
                  <p className="text-lg text-gray-600 mt-1">{cs.campaign}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cs.tags.map((tag) => (
                    <span key={tag} className="badge bg-gray-100 text-gray-600 text-xs">{tag}</span>
                  ))}
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong className="text-gray-900">Duration:</strong> {cs.duration}</p>
                  <p><strong className="text-gray-900">Sites:</strong> {cs.sites.join(", ")}</p>
                </div>
                <div className="border-l-4 border-brand-blue-600 pl-4">
                  <p className="text-sm italic text-gray-600">"{cs.quote}"</p>
                  <p className="text-xs text-gray-400 mt-1">— {cs.quotePerson}</p>
                </div>
              </div>

              {/* Right — challenge/solution/results */}
              <div className={`lg:col-span-3 space-y-5 ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                <div className="card p-5 space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-500 text-xs uppercase tracking-wide mb-1">Challenge</h3>
                    <p className="text-sm text-gray-700">{cs.challenge}</p>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <h3 className="font-semibold text-gray-500 text-xs uppercase tracking-wide mb-1">Solution</h3>
                    <p className="text-sm text-gray-700">{cs.solution}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {cs.results.map((r) => (
                    <div key={r.metric} className="card p-4 text-center">
                      <p className="text-2xl font-extrabold font-heading text-brand-blue-700">{r.value}</p>
                      <p className="text-xs font-semibold text-gray-900 mt-1">{r.metric}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{r.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-blue-700 text-white text-center">
        <div className="container-xl max-w-2xl">
          <h2 className="text-3xl font-extrabold font-heading mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-white/80 mb-8">
            Join Nepal's top brands in building campaigns that deliver measurable results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary bg-white text-brand-blue-700 hover:bg-gray-100 py-3 px-8">
              Start Planning
            </Link>
            <Link href="/advertising-nepal" className="btn-outline border-white/40 text-white hover:bg-white/10 py-3 px-8">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
