import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nithik-vairamuthu.vercel.app"),
  title: {
    default: "Nithik Vairamuthu",
    template: "%s — Nithik Vairamuthu",
  },
  description:
    "Nithik Vairamuthu — architect and computational designer building AI tools for architects, engineers and urban planners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
