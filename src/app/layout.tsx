import type { Metadata } from "next";
import "./globals.css";
import { Sen } from 'next/font/google';
import localFont from 'next/font/local';

const satoshi = localFont({
  src: '../fonts/Satoshi-Variable.woff2', // Correct: goes up to src, then into fonts/
  variable: '--font-satoshi',
  display: 'swap', // Optimization: shows fallback font until Satoshi loads
});

const sen = Sen({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-sen',
});

export const metadata: Metadata = {
  title: "Magero Kyayi Joshua | Software Engineer & Digital Strategist",
  description: "Architecting scalable systems and authority-based digital growth strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${satoshi.variable} ${sen.variable} font-sen antialiased bg-[#0a0a0a] text-white selection:bg-white selection:text-black`}
      >
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
      </body>
    </html>
  );
}