import type { Metadata } from "next";
import { buildSEOMeta, buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildSEOMeta({
  title: "Advertising Blog Nepal | OOH & Digital Marketing Insights",
  description: "Expert insights on outdoor advertising, DOOH, and marketing in Nepal. Tips, trends, and case studies from Smart Media's advertising specialists.",
  path: "/blog",
  keywords: ["advertising blog Nepal", "OOH marketing Nepal", "billboard advertising tips", "digital advertising Nepal insights", "marketing Nepal"],
});

async function getPosts() {
  return prisma.blogPost.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      coverImage: true,
      publishedAt: true,
      readTime: true,
      author: true,
    },
    orderBy: { publishedAt: "desc" },
  });
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "https://smartmedia.com.np/" },
      { name: "Blog", url: "https://smartmedia.com.np/blog" },
    ]),
  ],
};

export default async function BlogPage() {
  const posts = await getPosts();

  const staticPosts = [
    {
      slug: "ooh-advertising-trends-nepal-2025",
      title: "OOH Advertising Trends in Nepal: What to Expect in 2025",
      excerpt: "From programmatic DOOH to hyperlocal targeting — here's how Nepal's outdoor advertising landscape is evolving and what brands should plan for.",
      category: "Industry Trends",
      publishedAt: new Date("2025-01-15"),
      readTime: 6,
      author: "Smart Media Editorial",
    },
    {
      slug: "airport-advertising-guide-nepal",
      title: "The Complete Guide to Airport Advertising at TIA Nepal",
      excerpt: "Tribhuvan International Airport sees 5M+ passengers annually. Learn how to use its premium advertising inventory to reach Nepal's most influential travellers.",
      category: "Media Planning",
      publishedAt: new Date("2025-02-08"),
      readTime: 8,
      author: "Smart Media Editorial",
    },
    {
      slug: "dooh-vs-static-nepal",
      title: "DOOH vs Static Billboard: Which Works Better for Nepal's Brands?",
      excerpt: "A data-driven comparison of digital and static OOH advertising performance across Kathmandu's top locations — and how to choose the right format for your objective.",
      category: "Strategy",
      publishedAt: new Date("2025-03-22"),
      readTime: 7,
      author: "Smart Media Editorial",
    },
    {
      slug: "dashain-advertising-nepal",
      title: "How to Win Dashain: Nepal's Most Competitive Advertising Season",
      excerpt: "Dashain drives 40% of annual retail sales in Nepal. Here's how to secure the right OOH placements and creative to out-shout the competition.",
      category: "Campaign Planning",
      publishedAt: new Date("2025-04-10"),
      readTime: 5,
      author: "Smart Media Editorial",
    },
    {
      slug: "measuring-ooh-roi-nepal",
      title: "How to Measure OOH Advertising ROI in Nepal",
      excerpt: "Proof of performance was once OOH's Achilles heel. Today, with audience surveys, QR tracking, and sales uplift studies, ROI measurement has become measurable.",
      category: "Analytics",
      publishedAt: new Date("2025-05-01"),
      readTime: 9,
      author: "Smart Media Editorial",
    },
    {
      slug: "kathmandu-billboard-locations-2025",
      title: "The 10 Most Impactful Billboard Locations in Kathmandu (2025)",
      excerpt: "Not all billboards are equal. Based on traffic data and impression counts, here are the top 10 outdoor advertising sites in the capital right now.",
      category: "Locations",
      publishedAt: new Date("2025-05-20"),
      readTime: 6,
      author: "Smart Media Editorial",
    },
  ];

  const allPosts = posts.length > 0 ? posts : staticPosts;
  const categories = [...new Set(allPosts.map((p) => p.category).filter(Boolean))];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-brand-blue-900 to-brand-blue-700 text-white section-padding">
        <div className="container-xl">
          <nav className="text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Blog</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold font-heading leading-tight mb-4">
              Advertising Insights
            </h1>
            <p className="text-xl text-white/80">
              OOH trends, media planning guides, and campaign strategies for Nepal's advertising market.
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="section-padding">
        <div className="container-xl">
          {/* Featured post */}
          {allPosts.length > 0 && (
            <div className="mb-12">
              <div className="card overflow-hidden grid grid-cols-1 md:grid-cols-2">
                <div className="bg-gradient-to-br from-brand-blue-600 to-brand-blue-800 aspect-[16/9] md:aspect-auto flex items-center justify-center">
                  <span className="text-6xl">📰</span>
                </div>
                <div className="p-8 flex flex-col justify-center space-y-4">
                  <span className="badge bg-blue-50 text-blue-700 text-xs w-fit">{allPosts[0].category}</span>
                  <h2 className="text-2xl font-bold font-heading text-gray-900 leading-snug">
                    <Link href={`/blog/${allPosts[0].slug}`} className="hover:text-brand-blue-600 transition-colors">
                      {allPosts[0].title}
                    </Link>
                  </h2>
                  <p className="text-gray-600">{allPosts[0].excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{allPosts[0].author}</span>
                    <span>·</span>
                    <span>{new Date(allPosts[0].publishedAt ?? "").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                    <span>·</span>
                    <span>{allPosts[0].readTime} min read</span>
                  </div>
                  <Link href={`/blog/${allPosts[0].slug}`} className="text-brand-blue-600 font-semibold hover:underline text-sm">
                    Read article →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.slice(1).map((post) => (
              <article key={post.slug} className="card overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-40 flex items-center justify-center">
                  <span className="text-4xl">
                    {post.category === "Industry Trends" ? "📈" :
                     post.category === "Media Planning" ? "🗺️" :
                     post.category === "Strategy" ? "🎯" :
                     post.category === "Campaign Planning" ? "📅" :
                     post.category === "Analytics" ? "📊" :
                     post.category === "Locations" ? "📍" : "📄"}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <span className="badge bg-gray-100 text-gray-600 text-xs">{post.category}</span>
                  <h3 className="font-bold text-gray-900 leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:text-brand-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>
                      {new Date(post.publishedAt ?? "").toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {allPosts.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No posts yet — check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-xl max-w-xl text-center">
          <h2 className="text-2xl font-bold font-heading text-gray-900 mb-3">
            Stay Ahead of Nepal's Ad Market
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Monthly insights on OOH trends, media rates, and campaign strategies — delivered to your inbox.
          </p>
          <Link href="/contact" className="btn-primary py-3 px-8">
            Subscribe to Updates
          </Link>
        </div>
      </section>
    </>
  );
}
