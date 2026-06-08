import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { AnimatedShell } from "@/components/AnimatedShell";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { works } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return {};
  return {
    title: work.title,
    description: work.short,
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  const Icon = work.icon;
  const currentIndex = works.indexOf(work);
  const nextWork = works[(currentIndex + 1) % works.length];

  return (
    <AnimatedShell>
      <Header />
      <main className="overflow-hidden pt-[110px]">

        {/* ── Hero ── */}
        <section className="relative bg-bg-secondary border-b border-border-primary px-5 py-20 text-text-primary lg:px-8">
          <div className="absolute inset-0 grid-pattern opacity-10" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl">
            <Link
              href="/our-works"
              className="btn-premium mb-8 inline-flex items-center gap-2 text-sm font-bold text-text-secondary"
            >
              <ArrowLeft size={15} /> Back to Our Works
            </Link>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-signal">
                    {work.category}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
                    Client: {work.client}
                  </span>
                </div>
                <h1 className="text-4xl font-black leading-tight text-text-primary md:text-5xl">{work.title}</h1>
                <p className="mt-5 text-lg leading-8 text-text-secondary">{work.short}</p>
              </div>

              {/* Icon block */}
              <div className="flex-shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-signal text-white shadow-[0_0_48px_rgba(0,89,0,0.45)]">
                  <Icon size={36} />
                </div>
              </div>
            </div>

            {/* Services pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              {work.services.map((svc) => (
                <span
                  key={svc}
                  className="rounded-full border border-border-primary bg-bg-secondary px-4 py-1.5 text-sm font-semibold text-text-secondary"
                >
                  {svc}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Project Image ── */}
        <section className="bg-bg-primary px-5 py-8 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="relative h-[260px] w-full overflow-hidden rounded-2xl border border-border-primary bg-bg-card shadow-crisp sm:h-[380px] lg:h-[480px]">
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-contain p-6"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                priority
              />
            </div>
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="bg-bg-primary px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">Overview</p>
              <h2 className="mt-3 text-3xl font-black text-text-primary md:text-4xl">Project Summary</h2>
              <p className="mt-5 text-lg leading-9 text-text-secondary">{work.overview}</p>
            </div>
          </div>
        </section>

        {/* ── Challenge + Solution ── */}
        <section className="bg-bg-secondary border-y border-border-primary px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-2">
              {/* Challenges */}
              <div data-reveal>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">The Challenge</p>
                <h2 className="mt-3 text-3xl font-black text-text-primary">What the client needed</h2>
                <ul className="mt-6 space-y-4">
                  {work.challenges.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-signal/15 text-[11px] font-black text-signal">
                        {i + 1}
                      </span>
                      <p className="text-base leading-7 text-text-secondary">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div data-reveal>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">Our Solution</p>
                <h2 className="mt-3 text-3xl font-black text-text-primary">How we solved it</h2>
                <div className="mt-6 space-y-5">
                  {work.solutions.map((sol, i) => (
                    <div key={i} className="service-card-premium rounded border border-border-primary bg-bg-card p-5 shadow-crisp">
                      <h3 className="font-black text-text-primary">{sol.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-text-secondary">{sol.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Results ── */}
        <section className="bg-bg-secondary border-b border-border-primary px-5 py-16 text-text-primary lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">Results</p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl text-text-primary">What we delivered</h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {work.results.map((result, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded border border-border-primary bg-bg-card p-4 shadow-crisp"
                  >
                    <CheckCircle2 className="mt-0.5 shrink-0 text-signal" size={18} />
                    <p className="text-sm leading-7 text-text-secondary">{result}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Conclusion ── */}
        <section className="bg-bg-primary px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl rounded border border-border-primary bg-bg-secondary p-8 shadow-crisp">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">Conclusion</p>
              <p className="mt-4 text-lg leading-9 text-text-secondary">{work.conclusion}</p>
            </div>
          </div>
        </section>

        {/* ── Next Project ── */}
        <section className="border-t border-border-primary bg-bg-secondary px-5 py-12 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">Next Project</p>
              <h3 className="mt-1 text-xl font-black text-text-primary">{nextWork.title}</h3>
            </div>
            <Link
              href={`/our-works/${nextWork.slug}`}
              className="cta-magnetic inline-flex items-center gap-2 rounded bg-signal px-6 py-3 font-bold text-white border border-transparent"
            >
              View project <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-bg-secondary border-t border-border-primary px-5 py-16 text-text-primary lg:px-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">Work with us</p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl text-text-primary">Ready to build your product?</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-text-secondary">
              Book a free feasibility call with Texawave&apos;s engineering team.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="cta-magnetic inline-flex items-center gap-2 rounded bg-signal px-6 py-4 font-bold text-white border border-transparent"
              >
                Book Free Feasibility Call <ArrowRight size={18} />
              </Link>
              <Link
                href="/our-works"
                className="btn-premium inline-flex items-center gap-2 rounded border border-border-primary px-6 py-4 font-bold text-text-primary"
              >
                See all works <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </AnimatedShell>
  );
}
