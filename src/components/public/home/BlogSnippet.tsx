import Link from "next/link";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";

const posts = [
  {
    slug: "airport-advertising-nepal-guide",
    category: "Airport Advertising",
    title: "The Complete Guide to Airport Advertising at TIA Kathmandu",
    excerpt:
      "Tribhuvan International Airport handles over 5 million passengers annually. Here's how to leverage this captive, premium audience for maximum brand impact.",
    date: "15 Jan 2025",
    readTime: "8 min read",
    color: "blue",
  },
  {
    slug: "ooh-vs-digital-nepal",
    category: "OOH Insights",
    title: "OOH vs Digital: Why Nepali Brands Need an Integrated Outdoor Strategy",
    excerpt:
      "Digital ads get scrolled past. Outdoor advertising occupies physical space. Here's why the best Nepali campaigns combine both — and how to do it effectively.",
    date: "8 Jan 2025",
    readTime: "6 min read",
    color: "purple",
  },
  {
    slug: "billboard-design-tips-nepal",
    category: "Creative Guide",
    title: "7 Billboard Design Principles That Drive Results in Nepal",
    excerpt:
      "Effective billboard design in Nepal requires understanding local viewing conditions, literacy rates, and cultural cues. Our creative team shares hard-won insights.",
    date: "2 Jan 2025",
    readTime: "5 min read",
    color: "green",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  green: "bg-green-100 text-green-700",
};

export function BlogSnippet() {
  return (
    <section className="section-padding bg-white">
      <div className="container-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <p className="text-sm font-semibold text-brand-blue-600 uppercase tracking-widest mb-2">
              Insights & News
            </p>
            <h2 className="section-heading">DOOH Advertising Insights</h2>
          </div>
          <Link href="/blog" className="btn-outline flex-shrink-0">
            View All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="card group overflow-hidden flex flex-col">
              <div className="h-40 bg-gradient-to-br from-brand-dark to-brand-blue-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.3)_0%,transparent_70%)]" />
                <div className="absolute bottom-4 left-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colorMap[post.color]}`}>
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-brand-blue-600 transition-colors leading-snug mb-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
