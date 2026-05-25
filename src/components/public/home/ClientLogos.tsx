const clients = [
  "Ncell", "Nepal Telecom", "Nabil Bank", "Standard Chartered", "Himalayan Bank",
  "CG Corp", "Goldstar", "Surya Nepal", "Unilever", "Dabur Nepal",
  "Laxmi Group", "IME Group", "Bhat-Bhateni", "Sherpa Brewery", "Fewa Internet",
  "Mega Bank", "NMB Bank", "Global IME", "Muktinath Bikas", "Prabhu Bank",
];

export function ClientLogos() {
  const doubled = [...clients, ...clients];
  return (
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-xl mb-10">
        <div className="text-center">
          <p className="text-sm font-semibold text-brand-blue-600 uppercase tracking-widest mb-2">
            Trusted By
          </p>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-dark">
            300+ Brands That Grew With Smart Media
          </h2>
        </div>
      </div>

      {/* Marquee row 1 */}
      <div className="flex overflow-hidden mb-4" aria-hidden="true">
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {doubled.map((name, i) => (
            <div
              key={`row1-${i}`}
              className="flex-shrink-0 flex items-center justify-center px-8 py-4 bg-white rounded-xl border border-gray-100 shadow-sm min-w-[160px]"
            >
              <span className="text-sm font-semibold text-gray-600">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee row 2 (reverse) */}
      <div className="flex overflow-hidden" aria-hidden="true">
        <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap">
          {[...doubled].reverse().map((name, i) => (
            <div
              key={`row2-${i}`}
              className="flex-shrink-0 flex items-center justify-center px-8 py-4 bg-white rounded-xl border border-gray-100 shadow-sm min-w-[160px]"
            >
              <span className="text-sm font-semibold text-gray-600">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
