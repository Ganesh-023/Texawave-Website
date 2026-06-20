"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronRight, Cpu, Layers, Wrench, ShieldCheck } from "lucide-react";
import { bindPremiumHover } from "@/lib/gsap-utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ADVANTAGES = [
  {
    title: "Consolidated Accountability",
    desc: "No finger-pointing between mechanical casing designers and electrical board engineers. We own the fit, function, and final assembly.",
    icon: ShieldCheck,
    color: "#9BDF83"
  },
  {
    title: "Unified Development Timeline",
    desc: "Parallel tracking of hardware architecture, firmware, and cloud software ensures zero integration delays during final testing.",
    icon: Cpu,
    color: "#00D4FF"
  },
  {
    title: "DFM-First Mindset",
    desc: "Design for Manufacturing is baked in from day one, minimizing board spins and tooling corrections before factory transfer.",
    icon: Wrench,
    color: "#9BDF83"
  },
  {
    title: "Global Supply Chain & BOM",
    desc: "Direct component sourcing, alternate mapping, and vendor coordination to secure your production runs and lower unit costs.",
    icon: Layers,
    color: "#00D4FF"
  }
];

export function OnePartnerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonPrimaryRef = useRef<HTMLAnchorElement>(null);
  const buttonSecondaryRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);
    if (cards.length === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(".animate-fade-in", { opacity: 1, y: 0 });
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    // Scroll trigger for section header
    gsap.fromTo(".animate-fade-in",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%"
        }
      }
    );

    // Scroll trigger for advantages cards
    gsap.fromTo(cards,
      { opacity: 0, y: 45 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cards[0],
          start: "top 85%"
        }
      }
    );

    // Bind premium magnet hovers to CTA buttons
    const btn1 = buttonPrimaryRef.current;
    const btn2 = buttonSecondaryRef.current;
    let cleanup1: (() => void) | undefined;
    let cleanup2: (() => void) | undefined;

    if (btn1) {
      cleanup1 = bindPremiumHover(btn1, {
        magnetic: true,
        scale: 1.05,
        ease: "back.out(2)",
        easeReverse: "power2.out"
      });
    }

    if (btn2) {
      cleanup2 = bindPremiumHover(btn2, {
        magnetic: true,
        scale: 1.05,
        ease: "back.out(2)",
        easeReverse: "power2.out"
      });
    }

    return () => {
      if (cleanup1) cleanup1();
      if (cleanup2) cleanup2();
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="one-partner"
      className="relative bg-black border-b border-border-primary py-24 overflow-hidden z-10"
    >
      {/* Circuit board styling grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0" aria-hidden="true">
        <svg className="w-full h-full text-white/5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="one-partner-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#one-partner-grid)" />
          {/* Subtle PCB trace path */}
          <path d="M 100,50 L 300,50 L 350,100 L 350,400 L 500,550 M 900,100 L 700,100 L 650,150 L 650,450" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-30" />
          <circle cx="300" cy="50" r="3" fill="#9BDF83" />
          <circle cx="350" cy="400" r="3" fill="#00D4FF" />
          <circle cx="700" cy="100" r="3" fill="#9BDF83" />
        </svg>
      </div>

      {/* Radial ambient background glows */}
      <div
        className="absolute left-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(155, 223, 131, 0.2) 0%, transparent 80%)"
        }}
        aria-hidden="true"
      />
      <div
        className="absolute right-1/4 bottom-1/3 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full opacity-15 blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 80%)"
        }}
        aria-hidden="true"
      />

      <div ref={containerRef} className="relative mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)] z-10">
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-[#9BDF83]/30 bg-black/40 px-3.5 py-1.5 text-[10.5px] font-semibold tracking-wider text-[#9BDF83] uppercase backdrop-blur-md shadow-[0_0_15px_rgba(155,223,131,0.15)] mb-6">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#9BDF83]" />
            Full-Scale Lifecycle Delivery
          </span>
          <h2 className="animate-fade-in text-section font-black tracking-tight text-white leading-tight">
            One Partner. Infinite Innovation.
          </h2>
          <p className="animate-fade-in mt-6 text-body-large text-text-secondary leading-relaxed">
            TexaWave combines electronics, embedded systems, software development, mechanical engineering, procurement, and manufacturing expertise to help businesses transform innovative ideas into successful market-ready products.
          </p>
        </div>

        {/* 2x2 Interactive Advantages Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8 mb-16">
          {ADVANTAGES.map((adv, index) => {
            const Icon = adv.icon;
            return (
              <div
                key={adv.title}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-white/[0.12] hover:bg-white/[0.04] hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                {/* Hover inner gradient glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 10% 10%, ${adv.color}15 0%, transparent 60%)`
                  }}
                  aria-hidden="true"
                />

                {/* Left accent indicator line */}
                <div
                  className="absolute left-0 top-8 bottom-8 w-[2px] rounded-r opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ backgroundColor: adv.color }}
                  aria-hidden="true"
                />

                <div className="flex gap-5 items-start">
                  {/* Icon container */}
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] transition-all duration-500 group-hover:scale-105"
                    style={{
                      backgroundColor: `${adv.color}10`,
                      borderColor: `${adv.color}20`,
                      boxShadow: `0 0 15px ${adv.color}08`
                    }}
                  >
                    <Icon size={22} style={{ color: adv.color }} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-body-large font-bold text-white tracking-wide leading-snug">
                      {adv.title}
                    </h3>
                    <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                      {adv.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Actions */}
        <div className="animate-fade-in flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <Link
            ref={buttonPrimaryRef}
            href="/contact"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded bg-[#9BDF83] px-8 py-4 font-bold text-black border border-transparent shadow-[0_0_15px_rgba(155,223,131,0.2)] transition-all duration-300 hover:bg-[#a8eb90] hover:shadow-[0_0_25px_rgba(155,223,131,0.45)]"
          >
            Talk to Our Engineers
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            ref={buttonSecondaryRef}
            href="/services"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 font-bold text-[#EEEEEE] transition-all duration-300 hover:border-[#9BDF83] hover:bg-black/60 hover:text-white"
          >
            View Our Services
            <ChevronRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
