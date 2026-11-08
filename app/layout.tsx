import type { Metadata, Viewport } from "next";
import { DM_Sans, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { siteUrl } from "../data/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

// Handwritten face used for the sketch notes and the hero buttons
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-caveat",
});

const description =
  "Nithik Vairamuthu — architect and computational designer building AI tools for architects, engineers and urban planners. Master's in AI for Architecture at IAAC Barcelona.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nithik Vairamuthu — Architect & Computational Designer",
    template: "%s — Nithik Vairamuthu",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Nithik Vairamuthu",
    locale: "en_GB",
    description,
  },
  twitter: { card: "summary_large_image" },
};

// Colours the browser UI (e.g. the mobile address bar) to match the charcoal background
export const viewport: Viewport = {
  themeColor: "#111214",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        {/* lets CSS know JS is on, so draw-in animations can start hidden without hiding them for no-JS visitors */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
        {/* Cookieless visit counts and page-speed data (Vercel) */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
