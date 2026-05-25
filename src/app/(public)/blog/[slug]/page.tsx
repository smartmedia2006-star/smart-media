import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { buildSEOMeta, buildBreadcrumbSchema, SITE_CONFIG } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

const STATIC_POSTS: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  content: string;
}> = {
  "ooh-advertising-trends-nepal-2025": {
    title: "OOH Advertising Trends in Nepal: What to Expect in 2025",
    excerpt: "From programmatic DOOH to hyperlocal targeting — here's how Nepal's outdoor advertising landscape is evolving.",
    category: "Industry Trends",
    author: "Smart Media Editorial",
    publishedAt: "2025-01-15",
    readTime: 6,
    content: `
## The Shift to Digital OOH

Nepal's outdoor advertising market is undergoing its fastest transformation since the introduction of backlit billboards in the 1990s. Digital Out-of-Home (DOOH) now accounts for an estimated 25% of total OOH spend in Kathmandu Valley — up from just 8% in 2020.

The drivers are clear: falling LED panel costs, improved power infrastructure, and advertiser demand for flexible, measurable campaigns.

## Programmatic DOOH on the Horizon

While Nepal has not yet seen full programmatic DOOH adoption, the foundations are being laid. Smart Media is piloting audience measurement technology at three Kathmandu locations, integrating footfall data to offer CPM-based buying for select digital inventory.

By Q3 2025, we anticipate the first programmatic DOOH transactions in Nepal — initially as private marketplace deals before broader open exchange availability.

## Hyperlocal Campaigns Gaining Traction

Brands are moving away from "cover the city" strategies toward precision placement. A bank will book three screens near its branch openings rather than twenty across the ring road. A restaurant chain will target locations within 500m of its outlets during lunch hours.

This hyperlocal approach delivers better ROI and requires smaller minimum spends, opening DOOH to SMEs for the first time.

## Sustainability and Solar-Powered Sites

Environmental pressure is reshaping site specifications. Smart Media's newest unipoles in Bhaktapur and Lalitpur are solar-hybrid, reducing operational costs and carbon footprint. Expect solar-powered sites to become the standard for new builds by 2026.

## What This Means for Advertisers

- **Book early:** Digital inventory is increasingly scarce, especially around Dashain and Tihar.
- **Think dynamic:** Use DOOH's flexibility to run different creatives at different times of day.
- **Measure everything:** Audience data is finally available — use it to prove OOH's contribution to your media mix.
- **Start small, scale smart:** Pilot a focused hyperlocal campaign before committing to a full network buy.
    `,
  },
  "airport-advertising-guide-nepal": {
    title: "The Complete Guide to Airport Advertising at TIA Nepal",
    excerpt: "Tribhuvan International Airport sees 5M+ passengers annually. Learn how to reach Nepal's most influential travellers.",
    category: "Media Planning",
    author: "Smart Media Editorial",
    publishedAt: "2025-02-08",
    readTime: 8,
    content: `
## Why TIA is Nepal's Most Valuable Advertising Location

Tribhuvan International Airport (TIA) is the gateway to Nepal — and the single most premium advertising environment in the country. With 5.2 million annual passengers (2024 figures), TIA delivers:

- **Captive, affluent audience:** Travellers are decision-makers, business professionals, tourists, and diaspora with disposable income.
- **Extended dwell time:** Average passenger spends 90–120 minutes in the terminal.
- **High international exposure:** 40% of TIA passengers are international travellers or Nepali diaspora.

## Available Formats at TIA

### Arrivals Hall Digital Screens
The first thing international passengers see after immigration. Two 12×6 ft LED displays with 5,000+ daily impressions from a high-income, decision-maker audience.

### Departures Zone Lightboxes
Six premium A1 lightboxes alongside check-in counters. Travellers pass these 2–3 times per journey — during check-in, security queues, and departure lounge access.

### Immigration Corridor Panels
Sequential panels visible during the 8–12 minute immigration process. Exceptionally high dwell-time format ideal for product details, QR codes, and offers.

### Domestic Terminal Banners
Reaching the mid-market domestic traveller — typically business commuters between Kathmandu, Pokhara, and Biratnagar.

### Unipoles — TIA Approach Road
Three large-format unipoles visible from the airport expressway. Reach all 14,000+ daily airport visitors, including the large proportion who use taxi and private vehicle.

## Campaign Planning Tips

1. **Book 6–8 weeks in advance** for peak season (Oct–Nov, March–April, Dec–Jan).
2. **Combine arrival + departure formats** for frequency — the same business traveller sees your brand entering and leaving Nepal.
3. **Use departure zone for detailed messages** (product features, URLs) and arrivals for brand/awareness.
4. **Flight data integration** is possible — align your content with incoming flight origins for maximum relevance.

## Pricing Guide (2025)

| Format | Duration | Estimated Rate |
|---|---|---|
| Arrivals Digital Screen | 1 month | NPR 350,000 |
| Departures Lightbox (set of 3) | 1 month | NPR 280,000 |
| Immigration Panels (set of 4) | 1 month | NPR 220,000 |
| Approach Road Unipole | 1 month | NPR 180,000 |

*Rates vary by season. Contact Smart Media for current availability and packages.*
    `,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.blogPost
    .findUnique({ where: { slug: params.slug } })
    .catch(() => null);

  const staticPost = STATIC_POSTS[params.slug];
  const data = post ?? staticPost;

  if (!data) {
    return buildSEOMeta({
      title: "Post Not Found | Smart Media Blog",
      description: "",
      path: `/blog/${params.slug}`,
    });
  }

  return buildSEOMeta({
    title: `${data.title} | Smart Media Blog`,
    description: data.excerpt ?? "",
    path: `/blog/${params.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const dbPost = await prisma.blogPost
    .findUnique({ where: { slug: params.slug, isPublished: true } })
    .catch(() => null);

  const staticPost = STATIC_POSTS[params.slug];
  if (!dbPost && !staticPost) notFound();

  const post = dbPost ?? staticPost!;
  const publishedDate = new Date(dbPost?.publishedAt ?? staticPost!.publishedAt);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbSchema([
        { name: "Home", url: `${SITE_CONFIG.url}/` },
        { name: "Blog", url: `${SITE_CONFIG.url}/blog` },
        { name: post.title, url: `${SITE_CONFIG.url}/blog/${params.slug}` },
      ]),
      {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        author: { "@type": "Organization", name: SITE_CONFIG.name },
        publisher: { "@type": "Organization", name: SITE_CONFIG.name, url: SITE_CONFIG.url },
        datePublished: publishedDate.toISOString(),
        url: `${SITE_CONFIG.url}/blog/${params.slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="section-padding">
        <div className="container-xl max-w-3xl">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-gray-600">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">{post.title}</span>
          </nav>

          {/* Meta */}
          <div className="mb-8">
            <span className="badge bg-blue-50 text-blue-700 text-xs mb-4 inline-block">{post.category}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>By {post.author}</span>
              <span>·</span>
              <time dateTime={publishedDate.toISOString()}>
                {publishedDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </time>
              <span>·</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-brand-blue-600 prose-a:no-underline hover:prose-a:underline">
            {dbPost?.content ? (
              <div dangerouslySetInnerHTML={{ __html: dbPost.content }} />
            ) : (
              <div className="whitespace-pre-line text-gray-700 leading-relaxed space-y-4">
                {staticPost?.content.split("\n\n").map((para, i) => {
                  if (para.startsWith("## ")) {
                    return <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3">{para.replace("## ", "")}</h2>;
                  }
                  if (para.startsWith("### ")) {
                    return <h3 key={i} className="text-lg font-bold text-gray-900 mt-6 mb-2">{para.replace("### ", "")}</h3>;
                  }
                  if (para.startsWith("- ")) {
                    return (
                      <ul key={i} className="list-disc list-inside space-y-1 text-gray-600">
                        {para.split("\n").map((line, j) => (
                          <li key={j}>{line.replace("- ", "")}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (para.includes("|---|")) {
                    const lines = para.split("\n").filter((l) => l.trim() && !l.includes("|---|"));
                    return (
                      <div key={i} className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              {lines[0].split("|").filter(Boolean).map((h, j) => (
                                <th key={j} className="px-4 py-2 text-left font-semibold text-gray-700">{h.trim()}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {lines.slice(1).map((line, j) => (
                              <tr key={j} className="border-t border-gray-100">
                                {line.split("|").filter(Boolean).map((cell, k) => (
                                  <td key={k} className="px-4 py-2 text-gray-600">{cell.trim()}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  return para.trim() ? <p key={i} className="text-gray-700">{para}</p> : null;
                })}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 bg-brand-blue-50 border border-brand-blue-100 rounded-2xl text-center">
            <h3 className="font-bold text-gray-900 mb-2">Ready to advertise in Nepal?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Smart Media operates Nepal's largest OOH and DOOH network. Get a free site recommendation.
            </p>
            <Link href="/contact" className="btn-primary py-2.5 px-6">
              Get a Free Quote
            </Link>
          </div>

          {/* Back */}
          <div className="mt-8">
            <Link href="/blog" className="text-brand-blue-600 hover:underline text-sm">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
