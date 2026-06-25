import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { PageChrome } from "@/components/PageChrome";
import { solutionCategories } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const category = solutionCategories.find((item) => item.slug === resolvedParams.slug);
  if (!category) return {};

  return {
    title: `${category.title} Solutions`,
    description: category.short,
  };
}

// Pre-render static paths for performance
export async function generateStaticParams() {
  return solutionCategories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function SolutionDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const category = solutionCategories.find((item) => item.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const Icon = category.icon;

  return (
    <PageChrome>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-bg-secondary border-b border-border-primary px-5 py-20 text-text-primary lg:px-8">
        {/* Blueprint grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--blueprint-grid) 1px, transparent 1px), linear-gradient(90deg, var(--blueprint-grid) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Radial accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(140, 198, 63, 0.2) 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(140, 198, 63, 0.1) 0%, transparent 70%)" }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          {/* Left: Info */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1">
              <Icon size={14} className="text-signal" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-signal">
                Texawave Solutions
              </span>
            </div>
            <h1 className="mt-2 text-hero text-text-primary">
              {category.title}
            </h1>
            <p className="mt-5 max-w-2xl text-body-large text-text-secondary">{category.short}</p>
            <Link
              href="/contact"
              className="cta-magnetic mt-8 inline-flex items-center gap-2 rounded-xl bg-signal px-6 py-3.5 font-bold text-white border border-transparent shadow-[0_0_20px_rgba(140,198,63,0.2)] hover:scale-105 transition-transform duration-200"
            >
              Discuss your requirements <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right: Breadcrumbs box */}
          <div className="w-full rounded-2xl border border-border-primary bg-bg-card p-6 shadow-crisp lg:w-80">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-text-muted">Navigation</span>
            <div className="mt-4 flex flex-col gap-3.5 text-sm">
              <Link href="/solutions" className="flex items-center gap-2 text-text-secondary hover:text-signal transition-colors duration-200">
                Solutions <ChevronRight size={14} />
              </Link>
              <span className="font-bold text-signal">{category.title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sub-solutions Grid ── */}
      <section className="bg-bg-primary px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-small-text font-bold uppercase tracking-[0.18em] text-signal">Capabilities & Services</p>
            <h2 className="mt-3 text-section text-text-primary">Custom Solutions We Engineer</h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-large text-text-secondary">
              We leverage specialized electrical, mechanical, and software engineering capabilities to design and deliver reliable results.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {category.subSolutions.map((sub, idx) => (
              <div
                key={idx}
                className="group flex flex-col justify-between rounded-2xl border border-border-primary bg-bg-card p-6 shadow-crisp transition duration-300 hover:border-signal/30 hover:shadow-[0_4px_20px_rgba(140,198,63,0.04)]"
              >
                <div>
                  <h3 className="text-card font-bold text-text-primary group-hover:text-signal transition-colors duration-200">
                    {sub.title}
                  </h3>
                  <p className="mt-3 text-body-normal text-text-secondary leading-relaxed">
                    {sub.desc}
                  </p>
                </div>
                
                {/* Accent line */}
                <div className="mt-6 h-0.5 w-0 rounded-full bg-signal transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Project Highlight Case Study ── */}
      <section className="bg-bg-secondary border-t border-b border-border-primary px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Project Image */}
            <div className="lg:col-span-6 relative h-[360px] w-full rounded-2xl bg-[#0b0b0b] overflow-hidden border border-border-primary shadow-crisp">
              <Image
                src={category.featuredProject.image}
                alt={category.featuredProject.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Project Info */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-small-text font-bold uppercase tracking-[0.18em] text-signal">Featured Case Study</span>
              <h2 className="mt-3 text-section text-text-primary font-bold">{category.featuredProject.title}</h2>
              <p className="mt-5 text-body-large text-text-secondary leading-relaxed">
                {category.featuredProject.desc}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <CheckCircle2 size={16} className="text-signal" />
                  <span>Verified reliability testing & structural validation</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <CheckCircle2 size={16} className="text-signal" />
                  <span>Production-ready design transfer and documentation</span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href={category.featuredProject.cta}
                  className="inline-flex items-center gap-2 rounded bg-signal px-5 py-3 font-bold text-white hover:opacity-85 transition-opacity"
                >
                  View Case Study <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="bg-bg-primary px-5 py-20 text-text-primary lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="text-small-text font-bold uppercase tracking-[0.18em] text-signal">Discuss your prototype</p>
          <h2 className="text-section text-text-primary mt-3">Ready to engineer your hardware?</h2>
          <p className="mt-4 max-w-xl text-body-large text-text-secondary">
            Book a free feasibility call and our engineering team will evaluate your requirements within 24 hours.
          </p>
          <Link
            href="/contact"
            className="cta-magnetic mt-8 inline-flex items-center gap-2 rounded-xl bg-signal px-7 py-4 font-bold text-white border border-transparent shadow-[0_0_20px_rgba(140,198,63,0.2)] hover:shadow-[0_0_30px_rgba(140,198,63,0.4)] transition-all duration-300"
          >
            Book Free Feasibility Call <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </PageChrome>
  );
}
