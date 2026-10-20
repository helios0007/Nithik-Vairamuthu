import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Cursor from "../components/Cursor";
import JarvisBg from "../components/JarvisBg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nithik-vairamuthu.vercel.app"),
  title: {
    default: "Nithik Vairamuthu",
    template: "%s — Nithik Vairamuthu",
  },
  description:
    "Portfolio of Nithik Vairamuthu — AI for Architecture, computational design, and urban research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Cursor />
        <JarvisBg />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
