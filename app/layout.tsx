import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Texawave",
    template: "%s | Texawave"
  },
  description:
    "Texawave helps global startups and manufacturers design, prototype, source, and launch reliable hardware products through mechanical, electrical, PCB, embedded, IoT, and production support.",
  keywords: [
    "Hardware product development company",
    "Mechanical design services",
    "PCB design and prototyping",
    "Embedded systems development",
    "Procurement services",
    "IoT product development company",
    "Product design company India for global clients"
  ],
  openGraph: {
    title: "Texawave | From Idea to Market-Ready Hardware Product",
    description:
      "End-to-end hardware product development for startups, manufacturers, and product companies serving global markets.",
    url: "https://texawave.com",
    siteName: "Texawave",
    type: "website"
  },
  icons: {
    icon: "/texawave_logo.png",
    shortcut: "/texawave_logo.png",
    apple: "/texawave_logo.png"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark dark-theme" data-theme="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
