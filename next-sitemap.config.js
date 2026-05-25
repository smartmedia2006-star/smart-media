/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://smartmedia.com.np",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    "/admin/*",
    "/api/*",
    "/admin/login",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://smartmedia.com.np"}/sitemap.xml`,
    ],
  },
  additionalPaths: async (config) => [
    await config.transform(config, "/advertising-nepal"),
    await config.transform(config, "/airport-advertising-nepal"),
    await config.transform(config, "/billboard-nepal"),
    await config.transform(config, "/ooh-nepal"),
    await config.transform(config, "/digital-screens-nepal"),
    await config.transform(config, "/transit-advertising-nepal"),
    await config.transform(config, "/mall-advertising-nepal"),
    await config.transform(config, "/about"),
    await config.transform(config, "/contact"),
    await config.transform(config, "/locations"),
    await config.transform(config, "/case-studies"),
    await config.transform(config, "/blog"),
  ],
  transform: async (config, path) => {
    const priorityMap = {
      "/": 1.0,
      "/advertising-nepal": 0.95,
      "/airport-advertising-nepal": 0.95,
      "/billboard-nepal": 0.9,
      "/ooh-nepal": 0.9,
      "/digital-screens-nepal": 0.9,
      "/transit-advertising-nepal": 0.85,
      "/mall-advertising-nepal": 0.85,
      "/about": 0.8,
      "/contact": 0.8,
      "/locations": 0.8,
      "/case-studies": 0.75,
      "/blog": 0.75,
    };

    return {
      loc: path,
      changefreq: path === "/" ? "daily" : config.changefreq,
      priority: priorityMap[path] ?? config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
