import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"]
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"]
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
    icon: "/texawave_logo.webp",
    shortcut: "/texawave_logo.webp",
    apple: "/texawave_logo.webp"
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
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
