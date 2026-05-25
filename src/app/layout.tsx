import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { SITE_CONFIG } from "@/lib/seo";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Smart Media Nepal | #1 DOOH Advertising Agency in Nepal",
    template: "%s | Smart Media Nepal",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "advertising Nepal",
    "airport advertising Nepal",
    "OOH Nepal",
    "billboard Nepal",
    "DOOH Nepal",
    "digital out of home advertising Nepal",
    "TIA advertising",
    "Kathmandu billboard",
    "outdoor advertising Nepal",
    "Smart Media Nepal",
  ],
  authors: [{ name: "Smart Media Pvt. Ltd." }],
  creator: "Smart Media Nepal",
  publisher: "Smart Media Nepal",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "Smart Media Nepal | #1 DOOH Advertising Agency in Nepal",
    description: SITE_CONFIG.description,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Smart Media Nepal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Media Nepal | #1 DOOH Advertising Agency in Nepal",
    description: SITE_CONFIG.description,
    creator: "@SmartMediaNepal",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1d4ed8" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { borderRadius: "8px", fontFamily: "Inter, sans-serif", fontSize: "14px" },
            success: { iconTheme: { primary: "#1d4ed8", secondary: "#fff" } },
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
