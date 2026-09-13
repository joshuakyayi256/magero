import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Urbanist } from 'next/font/google';
import localFont from 'next/font/local';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/sections/Footer';
import LenisProvider from '@/components/ui/LenisProvider';
import { siteConfig } from '@/lib/site';

const satoshi = localFont({
  src: '../fonts/Satoshi-Variable.woff2', // Correct: goes up to src, then into fonts/
  variable: '--font-satoshi',
  display: 'swap', // Optimization: shows fallback font until Satoshi loads
});

const sen = Urbanist({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-sen',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  verification: {
    // Paste the Google Search Console HTML-tag verification code here once
    // you've added the property, e.g. google: "abc123...".
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author,
  url: siteConfig.url,
  jobTitle: "Founder & Systems Architect",
  worksFor: { "@type": "Organization", name: "MUA Insurance" },
  founder: [
    { "@type": "Organization", name: "Soma" },
    { "@type": "Organization", name: "Synsify" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kampala",
    addressCountry: "UG",
  },
  email: siteConfig.email,
  sameAs: [siteConfig.social.github, siteConfig.social.linkedin, siteConfig.social.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${satoshi.variable} ${sen.variable} font-sen antialiased bg-bg-primary text-text-primary`}
        suppressHydrationWarning
      >
        <LenisProvider />
        <ThemeToggle />
        <Navbar />

        {/* Global Grain/Noise Overlay (Wirkus Style) */}
        <div className="fixed inset-0 z-9999 pointer-events-none opacity-[0.03] mix-blend-overlay">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        {/* Layout Wrapper */}
        <main className="relative z-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}