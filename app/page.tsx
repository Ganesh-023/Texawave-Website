"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AnimatedShell } from "@/components/AnimatedShell";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { ServicesSection } from "@/components/ServicesSection";
import { OurWorksPCB } from "@/components/OurWorksPCB";
import { TexawaveLoader } from "@/components/TexawaveLoader";
import {
  bindPremiumHover,
  bindServiceCardHover,
  bindProjectCardHover
} from "@/lib/gsap-utils";
import {
  blogPosts,
  caseStudies,
  clients,
  processSteps,
  reasons,
  stats
} from "@/lib/content";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Skip loading animation on subsequent session visits or if reduced-motion is requested
    const skipLoader = sessionStorage.getItem("texawave-loaded") === "true" || mediaQuery.matches;
    if (!skipLoader) {
      setShowLoader(true);
      setIsLoaderActive(true);
    }

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Global premium GSAP bindings for hovers
  useGSAP(() => {
    if (isLoaderActive) return;

    // 1. Bind Service Cards
    const serviceCards = document.querySelectorAll(".service-card-premium");
    const serviceCleanups = Array.from(serviceCards).map((card) =>
      bindServiceCardHover(card as HTMLElement, {
        glowColor: "rgba(155, 223, 131, 0.25)"
      })
    );

    // 2. Bind Project Cards
    const projectCards = document.querySelectorAll(".project-card-premium");
    const projectCleanups = Array.from(projectCards).map((card) =>
      bindProjectCardHover(card as HTMLElement)
    );

    // 3. Bind Primary magnetic CTAs
    const ctas = document.querySelectorAll(".cta-magnetic");
    const ctaCleanups = Array.from(ctas).map((cta) =>
      bindPremiumHover(cta as HTMLElement, {
        magnetic: true,
        scale: 1.06,
        ease: "back.out(2)",
        easeReverse: "power2.out"
      })
    );

    // Count animations on stats
    const counters = document.querySelectorAll("[data-count]");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count") || "0", 10);
      gsap.fromTo(counter,
        { textContent: "0" },
        {
          textContent: target.toString(),
          duration: 2.0,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 85%"
          }
        }
      );
    });

    // 4. Custom Hero Entrance Timeline Sequence
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(".hero-subheading, .hero-title-line, .hero-description, .hero-ctas, .hero-tags", {
        opacity: 1,
        y: 0,
        scale: 1,
        clearProps: "all"
      });
    } else {
      const tl = gsap.timeline();

      // Subheading fades in and slides up
      tl.fromTo(".hero-subheading",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.4
      );

      // Heading lines fade and slide up sequentially
      tl.fromTo(".hero-title-line",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15
        },
        "-=0.25"
      );

      // Description fades in
      tl.fromTo(".hero-description",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );

      // CTA buttons slide up
      tl.fromTo(".hero-ctas",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      // Tech tags fade in
      tl.fromTo(".hero-tags",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }

    return () => {
      serviceCleanups.forEach((cleanup) => cleanup && cleanup());
      projectCleanups.forEach((cleanup) => cleanup && cleanup());
      ctaCleanups.forEach((cleanup) => cleanup && cleanup());
    };
  }, [isLoaderActive]);

  // Parallax floating coordinates inside hero section
  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(".hero-floating-element", {
      x: (x / rect.width) * 45,
      y: (y / rect.height) * 45,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.12
    });

    if (!prefersReducedMotion) {
      gsap.to(".hero-video-bg", {
        x: (x / rect.width) * -15,
        y: (y / rect.height) * -15,
        scale: 1.05,
        duration: 1.2,
        ease: "power2.out"
      });
    }
  };

  const handleHeroMouseLeave = () => {
    gsap.to(".hero-floating-element", {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    });

    if (!prefersReducedMotion) {
      gsap.to(".hero-video-bg", {
        x: 0,
        y: 0,
        scale: 1.02,
        duration: 1.8,
        ease: "power3.out"
      });
    }
  };

  return (
    <>
      {showLoader && isLoaderActive && (
        <TexawaveLoader
          onComplete={() => {
            setIsLoaderActive(false);
            sessionStorage.setItem("texawave-loaded", "true");
          }}
        />
      )}
      <AnimatedShell>
        <Header delayEntrance={showLoader && isLoaderActive} />
        <main className="overflow-hidden pt-[110px]">
        {/* Hero Section */}
        <section
          id="home"
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          className="relative bg-black border-b border-border-primary overflow-hidden z-[1] min-h-[calc(100vh-110px)] flex items-center"
        >
          {/* Video / Poster Background */}
          {prefersReducedMotion || videoError ? (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out z-0 hero-video-bg"
              style={{ backgroundImage: `url('/hero_video_poster.png')`, transform: 'scale(1.02)' }}
            />
          ) : (
            <video
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 hero-video-bg transition-transform duration-1000 ease-out"
              autoPlay
              loop
              muted
              playsInline
              poster="/hero_video_poster.png"
              onError={() => setVideoError(true)}
              style={{ transform: 'scale(1.02)' }}
              aria-hidden="true"
            >
              <source src="/Create_a_Cinematic_Hero_Video.mp4" type="video/mp4" />
            </video>
          )}

          {/* Subtle dark overlay for text readability (55% opacity) */}
          <div className="absolute inset-0 bg-black/55 z-[2] pointer-events-none" aria-hidden="true" />

          {/* Grid pattern overlay (very subtle, z-2) */}
          <div className="absolute inset-0 grid-pattern opacity-25 z-[2] pointer-events-none" aria-hidden="true" />

          {/* Interactive Floating Glowing Shapes (z-3) */}
          <div className="hero-floating-element pointer-events-none absolute left-[8%] top-[15%] h-56 w-56 rounded-full bg-[var(--primary-green)]/12 blur-3xl z-[3]" />
          <div className="hero-floating-element pointer-events-none absolute right-[12%] bottom-[10%] h-72 w-72 rounded-full bg-[#00D4FF]/4 blur-3xl z-[3]" />

          {/* Left-aligned Content Container (z-10) */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 md:py-28 lg:px-8">
            <div className="flex w-full flex-col items-start text-left md:max-w-[60%] lg:max-w-[50%]">
              <p className="hero-subheading opacity-0 mb-6 inline-flex rounded-full border border-border-primary bg-black/80 px-4 py-2 text-sm font-bold text-text-primary shadow-crisp backdrop-blur-md">
                Hardware product development for global clients
              </p>
              <h1 className="text-balance text-5xl font-black leading-[1.05] text-[#EEEEEE] md:text-7xl">
                <span className="hero-title-line block opacity-0" data-text="From Idea to">From Idea to</span>
                <span className="hero-title-line block opacity-0" data-text="Market-Ready">Market-Ready</span>
                <span className="hero-title-line block opacity-0" data-text="Hardware Product">Hardware Product</span>
              </h1>
              <p className="hero-description opacity-0 mt-6 max-w-2xl text-lg leading-8 text-[#EEEEEE]/85 md:text-xl">
                Texawave helps global startups and manufacturers design, prototype, source, and launch reliable hardware products.
              </p>
              <div className="hero-ctas opacity-0 mt-10 flex flex-col gap-4 sm:flex-row justify-start w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="cta-magnetic inline-flex items-center justify-center gap-2 rounded bg-signal px-6 py-4 font-bold text-white shadow-crisp border border-transparent"
                >
                  Book Free Feasibility Call <ArrowRight size={18} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded border border-border-primary bg-black/40 backdrop-blur-sm px-6 py-4 font-bold text-text-primary transition hover:border-signal"
                >
                  Explore Services <ChevronRight size={18} />
                </Link>
              </div>
              <div className="hero-tags opacity-0 mt-10 flex flex-wrap justify-start gap-4 text-sm font-semibold text-steel">
                <span className="px-3 py-1.5 rounded border border-white/5 bg-white/2">Software Engineering</span>
                <span className="px-3 py-1.5 rounded border border-white/5 bg-white/2">Electrical Engineering</span>
                <span className="px-3 py-1.5 rounded border border-white/5 bg-white/2">Mechanical Engineering</span>
                <span className="px-3 py-1.5 rounded border border-white/5 bg-white/2">Procurement</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border-primary bg-bg-primary">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border-primary px-5 lg:grid-cols-4 lg:px-8">
            {stats.slice(0, 2).map((stat) => (
              <div key={stat.label} className="bg-bg-primary py-8 text-center">
                <p className="text-3xl font-black text-text-primary">
                  <span data-count={stat.value}>0</span>
                  {stat.suffix}
                </p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-text-secondary">{stat.label}</p>
              </div>
            ))}
            <div className="bg-bg-primary py-8 text-center">
              <p className="text-3xl font-black text-text-primary">Global</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-text-secondary">Engineering Support</p>
            </div>
            <div className="bg-bg-primary py-8 text-center">
              <p className="text-3xl font-black text-text-primary">End-to-End</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-text-secondary">Product Development</p>
            </div>
          </div>
        </section>

        {/* Our Works Section */}
        <OurWorksPCB />

        {/* Services Section */}
        <ServicesSection />

        {/* Process Section */}
        <section id="process" className="bg-bg-secondary border-y border-border-primary px-5 py-20 text-text-primary lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div data-reveal className="lg:sticky lg:top-28 lg:h-fit">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">Process</p>
              <h2 className="mt-3 text-4xl font-black text-text-primary md:text-5xl">A disciplined path from technical uncertainty to launch readiness.</h2>
              <p className="mt-5 leading-8 text-text-secondary">Clear milestones, engineering reviews, prototype learning, and production documentation keep international teams aligned.</p>
            </div>
            <div className="relative grid gap-5 border-l border-border-primary pl-6">
              {processSteps.map((step, index) => (
                <div data-step key={step.title} className="relative rounded border border-border-primary bg-bg-card p-6 shadow-crisp">
                  <span className="absolute -left-[36px] top-[26px] grid h-[22px] w-[22px] place-items-center rounded-full bg-signal text-[11px] font-black text-white">{index + 1}</span>
                  <h3 className="text-2xl font-black text-text-primary">{step.title}</h3>
                  <p className="mt-3 leading-8 text-text-secondary">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="bg-bg-secondary px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div data-reveal className="mb-10 max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">Case studies</p>
              <h2 className="mt-3 text-4xl font-black text-text-primary md:text-5xl">Practical engineering outcomes for real hardware programs.</h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <article data-reveal key={study.title} className="rounded border border-border-primary bg-bg-card p-6 shadow-crisp">
                  <h3 className="text-xl font-black text-text-primary">{study.title}</h3>
                  {[
                    ["Problem", study.problem],
                    ["Solution", study.solution],
                    ["Deliverables", study.deliverables],
                    ["Result", study.result]
                  ].map(([label, copy]) => (
                    <div key={label} className="mt-5">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-signal">{label}</p>
                      <p className="mt-2 text-sm leading-7 text-text-secondary">{copy}</p>
                    </div>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Texawave Section */}
        <section id="about" className="bg-bg-primary px-5 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div data-reveal>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">Why Texawave</p>
              <h2 className="mt-3 text-4xl font-black text-text-primary md:text-5xl">Built for founders and manufacturers who need dependable execution.</h2>
              <p className="mt-5 leading-8 text-text-secondary">Texawave combines product thinking, engineering depth, procurement awareness, and launch support so decisions stay connected across the full hardware lifecycle.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {reasons.map(([label, Icon]) => (
                <div data-reveal key={label} className="flex items-center gap-4 rounded border border-border-primary bg-bg-secondary p-5 shadow-crisp">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded bg-bg-primary text-signal shadow-crisp">
                    <Icon size={21} />
                  </span>
                  <p className="font-black text-text-primary">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="border-y border-border-primary bg-bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-5 mb-10 lg:px-8 text-center" data-reveal>
            <h2 className="text-2xl font-black tracking-tight text-text-primary sm:text-3xl md:text-4xl">
              Our Trusted Companies
            </h2>
          </div>
          <div className="overflow-hidden">
            <div className="logo-marquee flex w-max gap-4">
              {[...clients, ...clients].map((client, index) => (
                <div key={`${client}-${index}`} className="grid h-16 min-w-56 place-items-center rounded border border-border-primary bg-bg-card px-7 text-center text-sm font-black text-text-primary shadow-crisp">
                  {client}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialSlider />

        {/* Insights/Blog Section */}
        <section id="blog" className="bg-bg-secondary border-b border-border-primary px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div data-reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">Insights</p>
                <h2 className="mt-3 text-4xl font-black text-text-primary md:text-5xl">Hardware development thinking for modern product teams.</h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 font-bold text-signal transition hover:opacity-85">
                Read blog <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link data-reveal key={post.slug} href={`/blog/${post.slug}`} className="rounded border border-border-primary bg-bg-card p-6 shadow-crisp transition hover:-translate-y-1 hover:shadow-premium">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-copper">{post.category}</p>
                  <h3 className="mt-4 text-xl font-black leading-7 text-text-primary">{post.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Feasibility CTA Section */}
        <section id="contact" className="relative bg-bg-secondary border-t border-border-primary px-5 py-20 text-text-primary lg:px-8">
          <Image
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1800&q=80"
            alt="Engineering workspace with hardware product prototype"
            fill
            className="object-cover opacity-10 dark:opacity-22"
            sizes="100vw"
          />
          <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">Free feasibility call</p>
            <h2 className="mt-3 text-4xl font-black md:text-6xl text-text-primary">Ready to Validate Your Hardware Idea?</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-text-secondary">Book a free feasibility call with Texawave&apos;s engineering team.</p>
            <Link
              href="/contact"
              className="cta-magnetic mt-8 inline-flex items-center gap-2 rounded bg-signal px-6 py-4 font-bold text-white shadow-crisp border border-transparent"
            >
              Book Free Feasibility Call <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      </AnimatedShell>
    </>
  );
}
