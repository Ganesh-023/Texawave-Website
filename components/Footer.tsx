import Link from "next/link";
import Image from "next/image";
import { clients, navItems, services } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-primary text-text-secondary">
      <div className="mx-auto w-full max-w-[1400px] grid gap-10 px-[clamp(1rem,4vw,4rem)] py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
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
            Hardware product development for global startups, manufacturers, and product companies that need practical engineering, fast iteration, and production support.
          </p>
          <p className="mt-6 text-body-normal font-semibold text-text-primary">Trusted by {clients.slice(0, 4).map(c => c.name).join(", ")} and growing product teams worldwide.</p>
        </div>
        <div>
          <h2 className="mb-4 text-small-text font-bold uppercase tracking-[0.18em] text-text-primary font-display">Services</h2>
          <div className="grid gap-3">
            {services.map((service) => (
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
      </div>
      <div className="border-t border-border-primary px-5 py-5">
        <div className="mx-auto w-full max-w-[1400px] flex flex-col gap-2 text-body-normal text-text-secondary md:flex-row md:items-center md:justify-between px-[clamp(1rem,4vw,4rem)]">
          <p>Copyright 2026 Texawave Technologies. All rights reserved.</p>
          <p>contact@texawave.com | +91 8680845604</p>
        </div>
      </div>
    </footer>
  );
}
