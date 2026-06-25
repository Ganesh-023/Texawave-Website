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
import { EngineeringExcellence } from "@/components/EngineeringExcellence";
import { OnePartnerSection } from "@/components/OnePartnerSection";
import { TexawaveLoader } from "@/components/TexawaveLoader";
import { AboutWhyTexawave } from "@/components/AboutWhyTexawave";
import { IndustriesSection } from "@/components/IndustriesSection";
import {
  bindPremiumHover,
  bindServiceCardHover,
  bindProjectCardHover
} from "@/lib/gsap-utils";
import {
  caseStudies,
  clients,
  stats
} from "@/lib/content";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isLoaderActive, setIsLoaderActive] = useState(true);

  useEffect(() => {
    if (!isLoaderActive && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Failed to autoplay video after loader complete:", err);
      });
    }
  }, [isLoaderActive]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    // If reduced-motion is requested, skip loader immediately
    if (mediaQuery.matches) {
      setShowLoader(false);
      setIsLoaderActive(false);
    }

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Load dynamic case studies for the homepage
  const [csList, setCsList] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/case-studies")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCsList(data.caseStudies.slice(0, 3));
        }
      })
      .catch((err) => {
        console.error("Failed to load case studies for homepage", err);
      });
  }, []);

  // Global premium GSAP bindings for hovers
  useGSAP(() => {
    if (isLoaderActive) return;

    // 1. Bind Service Cards
    const serviceCards = document.querySelectorAll(".service-card-premium");
    const serviceCleanups = Array.from(serviceCards).map((card) =>
      bindServiceCardHover(card as HTMLElement, {
        glowColor: "rgba(140, 198, 63, 0.25)"
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
      gsap.set(".hero-subheading, .hero-title-line, .hero-description, .hero-ctas", {
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
            className="relative bg-bg-primary border-b border-border-primary overflow-hidden z-[1] min-h-[calc(100vh-110px)] flex items-center"
          >
            {/* Video / Poster Background */}
            {prefersReducedMotion || videoError ? (
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out z-0 hero-video-bg"
                style={{ backgroundImage: `url('/hero_video_poster.webp')`, transform: 'scale(1.02)' }}
              />
            ) : (
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 hero-video-bg transition-transform duration-1000 ease-out"
                preload="auto"
                loop
                muted
                playsInline
                poster="/hero_video_poster.webp"
                onError={() => setVideoError(true)}
                style={{ transform: 'scale(1.02)' }}
                aria-hidden="true"
              >
                <source src="/Create_a_Cinematic_Hero_Video.webm" type="video/webm" />
              </video>
            )}

            {/* Subtle dark overlay for text readability (55% opacity) */}
            <div className="absolute inset-0 bg-black/55 z-[2] pointer-events-none" aria-hidden="true" />

            {/* Grid pattern overlay (very subtle, z-2) */}
            <div className="absolute inset-0 grid-pattern opacity-25 z-[2] pointer-events-none" aria-hidden="true" />

            {/* Interactive Floating Glowing Shapes (z-3) */}
            <div className="hero-floating-element pointer-events-none absolute left-[8%] top-[15%] h-56 w-56 rounded-full bg-[var(--primary-green)]/12 blur-3xl z-[3]" />
            <div className="hero-floating-element pointer-events-none absolute right-[12%] bottom-[10%] h-72 w-72 rounded-full bg-[#14B8A6]/4 blur-3xl z-[3]" />

            {/* Left-aligned Content Container (z-10) */}
            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)] py-20 md:py-28">
              <div className="flex w-full flex-col items-start text-left md:max-w-[60%] lg:max-w-[50%]">
                {/* Eyebrow Badge */}
                <div className="hero-subheading opacity-0 inline-flex items-center gap-2 rounded-full border border-[#8CC63F]/30 bg-bg-primary/40 px-3.5 py-1.5 text-[10.5px] font-semibold tracking-wider text-[#8CC63F] uppercase backdrop-blur-md shadow-[0_0_15px_rgba(140,198,63,0.15)] transition-all duration-300 hover:border-[#8CC63F] hover:shadow-[0_0_20px_rgba(140,198,63,0.25)]">
                  <span className="flex h-2 w-2 rounded-full bg-[#8CC63F] animate-pulse" />
                  <span>Trusted Engineering Partner for Startups & Enterprises</span>
                </div>

                {/* Headline */}
                <h1 className="text-balance text-hero text-[#EEEEEE] font-black tracking-tight leading-[1.05] mt-6">
                  <span className="hero-title-line block opacity-0" data-text="Transform Your Idea">Transform Your Idea</span>
                  <span className="hero-title-line block text-[#8CC63F] opacity-0" data-text="into a Market-Ready Product">into a Market-Ready Product</span>
                </h1>

                {/* Supporting Text */}
                <p className="hero-description opacity-0 mt-6 max-w-xl text-body-large text-[#EEEEEE]/85 leading-relaxed">
                  Texawave helps you scale your ideas from concept to <span className="font-semibold text-white">launch</span>, specializing in <span className="font-semibold text-white">custom software</span>, <span className="font-semibold text-white">cloud IoT</span>, and advanced <span className="font-semibold text-white">electronics integrated with mechanical design and manufacturing support.</span>
                </p>

                {/* CTA Buttons */}
                <div className="hero-ctas opacity-0 mt-10 flex flex-wrap gap-4 items-center justify-start w-full sm:w-auto">
                  <Link
                    href="/contact"
                    className="cta-magnetic group inline-flex items-center justify-center gap-2 rounded bg-[#8CC63F] px-6 py-4 font-bold text-black border border-transparent shadow-[0_0_15px_rgba(140,198,63,0.2)] transition-all duration-300 hover:bg-[#a8eb90] hover:shadow-[0_0_25px_rgba(140,198,63,0.45)]"
                  >
                    Book a consultation
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded border border-[#8CC63F]/30 bg-bg-primary/40 backdrop-blur-sm px-6 py-4 font-bold text-[#EEEEEE] transition-all duration-300 hover:border-[#8CC63F] hover:bg-bg-primary/60 hover:text-white"
                  >
                    Get Project Estimate <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="relative z-20 px-5 lg:px-8 -mt-12 sm:-mt-14 md:-mt-16">
            <div className="mx-auto max-w-[1200px] w-full rounded-2xl border border-[#8CC63F]/30 bg-bg-primary/60 backdrop-blur-md shadow-2xl py-6 px-4">
              <div className="grid grid-cols-4 items-center divide-x divide-white/10">
                {stats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="text-center px-1">
                    <p className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-text-primary whitespace-nowrap">
                      <span data-count={stat.value}>0</span>
                      {stat.suffix}
                    </p>
                    <p className="mt-1.5 text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wider text-text-secondary">{stat.label}</p>
                  </div>
                ))}
                <div className="text-center px-1">
                  <p className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-text-primary whitespace-nowrap">Global</p>
                  <p className="mt-1.5 text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wider text-text-secondary">Engineering Support</p>
                </div>
                <div className="text-center px-1">
                  <p className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-text-primary whitespace-nowrap">End-to-End</p>
                  <p className="mt-1.5 text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wider text-text-secondary">Product Development</p>
                </div>
              </div>
            </div>
          </section>

          {/* About & Why TexaWave Section */}
          <AboutWhyTexawave />

          {/* Engineering Solutions Across Industries */}
          <IndustriesSection />


          {/* Engineering Excellence Section */}
          <EngineeringExcellence />



          {/* Case Studies Section */}
          <section className="bg-bg-secondary py-20 border-b border-border-primary">
            <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
              <div data-reveal className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div className="max-w-2xl text-left">
                  <p className="text-small-text font-bold uppercase tracking-[0.18em] text-signal font-mono">Case studies</p>
                  <h2 className="mt-3 text-section text-text-primary">Practical engineering outcomes for real programs.</h2>
                </div>
                <Link
                  href="/case-studies"
                  className="btn-premium inline-flex items-center gap-2 text-xs font-bold text-[#8CC63F] uppercase tracking-wider shrink-0 transition-colors hover:text-white"
                >
                  Explore All Case Studies <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {csList.length > 0 ? (
                  csList.map((study) => (
                    <article
                      data-reveal
                      key={study.id}
                      className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111] overflow-hidden transition-all duration-300 hover:border-[#8CC63F]/30 hover:scale-[1.01] shadow-crisp text-left"
                    >
                      <div>
                        {/* Cover Image */}
                        <div className="relative h-48 w-full overflow-hidden border-b border-white/5 bg-black">
                          <Image
                            src={study.heroImage}
                            alt={study.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                          <span className="absolute top-4 left-4 rounded-full border border-signal/30 bg-black/60 backdrop-blur-md px-3 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#8CC63F]">
                            {study.category}
                          </span>
                        </div>

                        {/* Text Body */}
                        <div className="p-7">
                          <h3 className="text-lg font-bold font-display text-white group-hover:text-[#8CC63F] transition-colors leading-snug">
                            {study.title}
                          </h3>
                          <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-[#8CC63F] font-mono">
                            Problem
                          </p>
                          <p className="mt-1 text-xs text-text-secondary line-clamp-3 leading-relaxed">
                            {study.problemStatement}
                          </p>
                        </div>
                      </div>

                      {/* Footer Row */}
                      <div className="p-7 pt-0 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                        <span className="text-[10px] text-text-secondary font-mono">
                          VIEWS: <strong className="text-white">{study.views || 0}</strong>
                        </span>
                        <Link
                          href={`/case-studies/${study.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-white group-hover:text-[#8CC63F] transition-all"
                        >
                          Read Study <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  ))
                ) : (
                  // Fallback during load / offline
                  caseStudies.map((study) => (
                    <article data-reveal key={study.title} className="rounded-2xl border border-border-primary bg-bg-card p-7 shadow-crisp text-left">
                      <h3 className="text-card text-text-primary leading-tight font-display">{study.title}</h3>
                      <div className="mt-5">
                        <p className="text-small-text font-black uppercase tracking-[0.16em] text-signal font-mono">Problem</p>
                        <p className="mt-1.5 text-xs text-text-secondary line-clamp-3 leading-relaxed">{study.problem}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                        <Link href="/case-studies" className="text-xs font-bold text-signal inline-flex items-center gap-1">
                          Explore More <ArrowRight size={13} />
                        </Link>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </section>



          <section className="border-y border-border-primary bg-bg-secondary py-16">
            <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)] mb-10 text-center" data-reveal>
              <h2 className="text-section text-text-primary">
                Our Trusted Companies
              </h2>
            </div>
            <div className="overflow-hidden">
              <div className="logo-marquee flex w-max gap-6 py-6">
                {[...clients, ...clients].map((client, index) => (
                  <div
                    key={`${client.name}-${index}`}
                    className="group relative flex h-32 w-64 items-center justify-center rounded border border-neutral-200 bg-white px-8 shadow-crisp transition-all duration-300 hover:border-signal/50 hover:shadow-[0_0_25px_rgba(140,198,63,0.3)] hover:-translate-y-1"
                  >
                    <div className="relative h-20 w-full">
                      <Image
                        src={client.logo}
                        alt={`${client.name} logo`}
                        fill
                        sizes="200px"
                        className="object-contain opacity-85 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <TestimonialSlider />

          {/* One Partner Complete Product Development Section */}
          <OnePartnerSection />


        </main>
        <Footer />
      </AnimatedShell>
    </>
  );
}
