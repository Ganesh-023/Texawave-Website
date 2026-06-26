import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageChrome } from "@/components/PageChrome";
import { solutionCategories, featuredProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Engineering Solutions",
  description:
    "Explore Texawave's hardware solutions across Consumer Electronics, Industrial IoT, Medical Devices, and Automotive systems.",
};

export default function SolutionsPage() {
  return (
    <PageChrome>
      {/* ── Hero ── */}
      <section className="relative bg-bg-secondary border-b border-border-primary py-20">
        <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden="true" />
        {/* Radial accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(140, 198, 63, 0.15) 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
          <p className="text-small-text font-bold uppercase tracking-[0.18em] text-signal">Our Solutions</p>
          <h1 className="mt-3 max-w-3xl text-hero text-text-primary">
            Enterprise-Grade Engineering Solutions.
          </h1>
          <p className="mt-5 max-w-2xl text-body-large text-text-secondary">
            Custom hardware engineering, embedded systems, and industrial IoT solutions built to scale. From early concept to high-volume production.
          </p>
        </div>
      </section>

      {/* ── Industries Grid ── */}
      <section className="bg-bg-primary py-20">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
          <div className="mb-12">
            <p className="text-small-text font-bold uppercase tracking-[0.18em] text-signal">Industries We Serve</p>
            <h2 className="mt-3 text-section text-text-primary">Targeted Solutions for Key Sectors</h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {solutionCategories.map((category) => {
              const Icon = category.icon;
              return (
                <article
                  key={category.slug}
                  className="flex flex-col justify-between rounded-2xl border border-border-primary bg-bg-card p-8 shadow-crisp transition duration-300 hover:border-signal/30 hover:shadow-[0_4px_30px_rgba(140,198,63,0.05)]"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg-secondary text-signal">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-[22px] font-bold text-text-primary">{category.title}</h3>
                    </div>

                    <p className="mt-4 text-body-large text-text-secondary">{category.short}</p>

                    {/* Capabilities list */}
                    <div className="mt-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Key Capabilities</p>
                      <ul className="grid grid-cols-2 gap-3">
                        {category.subSolutions.map((sub) => (
                          <li key={sub.title} className="flex items-start gap-2 text-sm text-text-secondary">
                            <CheckCircle2 size={15} className="mt-0.5 text-signal shrink-0" />
                            <span>{sub.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Featured project highlight */}
                    <div className="mt-8 rounded-xl border border-white/5 bg-[#090909] p-4 flex gap-4 items-center">
                      <div className="relative h-16 w-16 rounded bg-[#111] overflow-hidden shrink-0 border border-white/5">
                        <Image
                          src={category.featuredProject.image}
                          alt={category.featuredProject.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-signal">Featured Success</span>
                        <h4 className="text-[14px] font-bold text-text-primary mt-0.5">{category.featuredProject.title}</h4>
                        <p className="text-[11.5px] text-text-muted mt-0.5 line-clamp-1">{category.featuredProject.desc}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <Link
                      href={`/solutions/${category.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-signal hover:opacity-85 transition-opacity"
                    >
                      Explore Industry Solutions <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Projects Section ── */}
      <section className="bg-bg-secondary border-t border-border-primary py-20">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
          <div className="mb-12">
            <p className="text-small-text font-bold uppercase tracking-[0.18em] text-signal font-display">Featured Projects</p>
            <h2 className="mt-3 text-section text-text-primary">Our Hardware Engineering Success Stories</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border-primary bg-bg-card shadow-crisp transition duration-300 hover:border-signal/30"
              >
                {/* Project Image */}
                <div className="relative h-[240px] w-full bg-[#0d0d0d] border-b border-border-primary overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-card text-text-primary group-hover:text-signal transition-colors duration-200">{project.title}</h3>
                  <p className="mt-3 flex-1 text-body-normal text-text-secondary leading-relaxed">{project.desc}</p>
                  
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-signal hover:opacity-80 transition-opacity"
                  >
                    Discuss Project <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-bg-primary border-t border-border-primary py-20 text-text-primary">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center px-[clamp(1rem,4vw,4rem)]">
          <p className="text-small-text font-bold uppercase tracking-[0.18em] text-signal">Engineering Partnership</p>
          <h2 className="mt-3 text-section text-text-primary">Need a Custom Hardware Solution?</h2>
          <p className="mt-5 max-w-xl text-body-large text-text-secondary">
            Get in touch with our design and engineering team to evaluate your project specifications and schedule a feasibility call.
          </p>
          <Link
            href="/contact"
            className="cta-magnetic mt-8 inline-flex items-center gap-2 rounded-xl bg-signal px-6 py-4 font-bold text-white border border-transparent shadow-[0_0_20px_rgba(140,198,63,0.2)] hover:shadow-[0_0_30px_rgba(140,198,63,0.4)] transition-all duration-300"
          >
            Discuss Your Requirements <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </PageChrome>
  );
}
