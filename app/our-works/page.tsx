import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AnimatedShell } from "@/components/AnimatedShell";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { works } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Works",
  description:
    "Explore Texawave's real-world engineering projects — from custom SPM machines and electrospinning platforms to reverse-engineered industrial autoclaves.",
};

export default function OurWorksPage() {
  return (
    <AnimatedShell>
      <Header />
      <main className="overflow-hidden pt-[110px]">
        {/* ── Hero ── */}
        <section className="relative bg-bg-secondary border-b border-border-primary py-20">
          <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
            <p className="text-small-text font-bold uppercase tracking-[0.18em] text-signal">Our Works</p>
            <h1 className="mt-3 max-w-3xl text-hero text-text-primary">
              Real Engineering. Real Results.
            </h1>
            <p className="mt-5 max-w-2xl text-body-large text-text-secondary">
              A curated selection of hardware and machine projects we have designed, engineered, and delivered for clients across industries.
            </p>
          </div>
        </section>

        {/* ── Works Grid ── */}
        <section className="bg-bg-primary py-20">
          <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
            <div className="grid gap-8 lg:grid-cols-3">
              {works.map((work) => {
                const Icon = work.icon;
                return (
                  <article
                    key={work.slug}
                    data-reveal
                    className="project-card-premium group flex flex-col overflow-hidden rounded-2xl border border-border-primary bg-bg-card shadow-crisp transition duration-300"
                  >
                    {/* Project Image */}
                    <div className="relative h-[280px] w-full flex items-center justify-center bg-bg-secondary border-b border-border-primary overflow-hidden">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="project-card-image object-contain p-4 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Premium Green Overlay */}
                      <div className="project-card-overlay absolute inset-0 bg-signal opacity-0 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    {/* Card body */}
                    <div className="project-card-body flex flex-1 flex-col p-6">
                      {/* Icon + client + category row */}
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-bg-secondary text-text-primary transition duration-300 group-hover:bg-signal group-hover:text-white">
                          <Icon size={19} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="rounded-full border border-signal/30 bg-signal/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-signal">
                            {work.category}
                          </span>
                          <p className="text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                            Client: <span className="text-text-primary">{work.client}</span>
                          </p>
                        </div>
                      </div>

                      <h2 className="text-card text-text-primary">{work.title}</h2>
                      <p className="mt-3 flex-1 text-body-normal text-text-secondary">{work.short}</p>

                      {/* Services tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {work.services.map((svc) => (
                          <span
                            key={svc}
                            className="flex items-center gap-1.5 text-small-text font-semibold text-text-secondary"
                          >
                            <CheckCircle2 className="shrink-0 text-signal" size={13} />
                            {svc}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/our-works/${work.slug}`}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-black text-signal"
                      >
                        View project <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-bg-secondary border-t border-border-primary py-16 text-text-primary">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center px-[clamp(1rem,4vw,4rem)]">
            <p className="text-small-text font-bold uppercase tracking-[0.18em] text-signal">Start a project</p>
            <h2 className="mt-3 text-section text-text-primary">Have a product in mind?</h2>
            <p className="mt-5 max-w-xl text-body-large text-text-secondary">
              Let&apos;s talk about your engineering requirements and build something remarkable together.
            </p>
            <Link
              href="/contact"
              className="cta-magnetic mt-8 inline-flex items-center gap-2 rounded bg-signal px-6 py-4 font-bold text-white border border-transparent"
            >
              Book Free Feasibility Call <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </AnimatedShell>
  );
}
