import Link from "next/link";
import Image from "next/image";
import { clients, navItems } from "@/lib/content";

const footerServices = [
  { title: "Product Engineering", slug: "product-engineering" },
  { title: "Software & AI Development", slug: "software-iot" },
  { title: "Procurement Services", slug: "procurement" },
  { title: "Manufacturing Support", slug: "manufacturing-support" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/109956903/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590668282253",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/texawaveinnovations/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@texawaveinnovations?si=ql2sYALoSyE0s6mr",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-primary text-text-secondary">
      <div className="mx-auto w-full max-w-[1400px] grid gap-10 px-[clamp(1rem,4vw,4rem)] py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
        <div>
          <Link href="/" className="mb-4 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:rounded">
            <Image
              src="/texawave_logo.webp"
              alt="Texawave"
              width={130}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="max-w-md text-body-normal text-text-secondary">
            Transforming innovative ideas into market-ready products. We engineer the intelligent software, cloud IoT platforms, and advanced electronics driving modern industry.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-small-text font-bold uppercase tracking-[0.18em] text-text-primary font-display">Services</h2>
          <div className="grid gap-3">
            {footerServices.map((service) => (
              <Link key={service.slug} href={`/${service.slug}`} className="text-body-normal text-text-secondary transition hover:text-signal">
                {service.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-small-text font-bold uppercase tracking-[0.18em] text-text-primary font-display">Company</h2>
          <div className="grid gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-body-normal text-text-secondary transition hover:text-signal">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Column — was the red box */}
        <div>
          <h2 className="mb-4 text-small-text font-bold uppercase tracking-[0.18em] text-text-primary font-display">Contact</h2>
          <div className="grid gap-4">
            <a
              href="mailto:contact@texawave.com"
              className="flex items-center gap-3 text-body-normal text-text-secondary transition hover:text-signal group"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-border-primary group-hover:border-signal/40 group-hover:bg-signal/10 transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M1.5 8.067v7.933A2.5 2.5 0 0 0 4 18.5h16a2.5 2.5 0 0 0 2.5-2.5V8.067l-9.954 5.977a1 1 0 0 1-1.092 0L1.5 8.067z"/>
                  <path d="M21.971 6.533A2.5 2.5 0 0 0 20 5.5H4a2.5 2.5 0 0 0-1.971 1.033L12 12.54l9.971-5.007z"/>
                </svg>
              </span>
              <span className="break-all">contact@texawave.com</span>
            </a>
            <a
              href="tel:+918680845604"
              className="flex items-center gap-3 text-body-normal text-text-secondary transition hover:text-signal group"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-border-primary group-hover:border-signal/40 group-hover:bg-signal/10 transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd"/>
                </svg>
              </span>
              <span>+91 8680845604</span>
            </a>

            {/* Social Media Icons */}
            <div className="mt-2">
              <p className="mb-3 text-small-text font-semibold uppercase tracking-widest text-text-primary/60">Follow Us</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-border-primary text-text-secondary transition hover:text-signal hover:border-signal/40 hover:bg-signal/10"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border-primary px-5 py-5">
        <div className="mx-auto w-full max-w-[1400px] flex flex-col gap-3 text-body-normal text-text-secondary md:flex-row md:items-center md:justify-between px-[clamp(1rem,4vw,4rem)]">
          <p>Copyright 2026 Texawave Technologies. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
}