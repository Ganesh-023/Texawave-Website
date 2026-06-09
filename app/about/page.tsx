import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageChrome } from "@/components/PageChrome";
import { reasons } from "@/lib/content";
import { VisionMission } from "@/components/VisionMission";

export const metadata = {
  title: "About",
  description: "Texawave is a product design company in India serving global clients with software engineering, electrical engineering, mechanical engineering, procurement, and production support."
};

export default function AboutPage() {
  return (
    <PageChrome>
      <section className="relative bg-bg-secondary border-b border-border-primary px-5 py-24 text-text-primary lg:px-8">
        <Image src="https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1800&q=80" alt="Engineering team reviewing hardware design" fill className="object-cover opacity-15 dark:opacity-26" sizes="100vw" priority />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">About Texawave</p>
          <h1 className="mt-3 max-w-5xl text-5xl font-black text-text-primary md:text-7xl">A hardware product development partner for ambitious global teams.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">
            Texawave supports startups, manufacturers, and product companies as they transform hardware ideas into robust, manufacturable products with clear engineering decisions at every stage.
          </p>
        </div>
      </section>
      <VisionMission />
      <section className="bg-bg-primary px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal>
            <h2 className="text-4xl font-black text-text-primary">What makes the engagement different</h2>
            <p className="mt-5 leading-8 text-text-secondary">
              Hardware programs fail when mechanical, electronics, procurement, firmware, and production decisions happen in isolation. Texawave keeps those choices connected, documented, and aligned to cost, timeline, and manufacturability.
            </p>
            <Link href="/contact" className="cta-magnetic mt-7 inline-flex items-center gap-2 rounded bg-signal px-6 py-4 font-bold text-white border border-transparent">
              Book Free Feasibility Call <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map(([label, Icon]) => (
              <div data-reveal key={label} className="service-card-premium rounded-2xl border border-border-primary bg-bg-secondary p-5 transition duration-300">
                <Icon className="text-signal" size={24} />
                <p className="mt-4 font-black text-text-primary">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageChrome>
  );
}
