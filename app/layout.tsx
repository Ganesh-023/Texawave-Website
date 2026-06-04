import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    "Component sourcing services",
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
    <html lang="en" suppressHydrationWarning>
      {/* Anti-flash: reads localStorage before React hydrates */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('tw-theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;var theme=(t==='dark'||(t===null&&d))?'dark':'light';document.documentElement.setAttribute('data-theme',theme);if(theme==='dark'){document.documentElement.classList.add('dark','dark-theme');document.documentElement.classList.remove('light-theme')}else{document.documentElement.classList.add('light-theme');document.documentElement.classList.remove('dark','dark-theme')}}catch(e){}})();`
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
