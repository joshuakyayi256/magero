import type { Metadata } from "next";
import "./globals.css";
import { Urbanist } from 'next/font/google';
import localFont from 'next/font/local';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/sections/Footer';
import LenisProvider from '@/components/ui/LenisProvider';

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

export const metadata: Metadata = {
  title: "Magero Kyayi Joshua | Founder, Digital Infrastructure for East African Institutions",
  description: "Founder of Soma & Synsify. Building institutional-grade systems — insurance, edtech, fintech — for East African conditions.",
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