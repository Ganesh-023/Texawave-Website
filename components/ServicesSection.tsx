"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Wrench, CircuitBoard, PackageCheck, RadioTower } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SERVICES_DATA = [
  {
    slug: "software-iot",
    title: "Software Engineering",
    desc: "End-to-end device connectivity. We develop responsive mobile apps, secure web dashboards, cloud infrastructure, and device-management software.",
    icon: RadioTower,
    deliverables: [
      "Mobile App Development",
      "Website Development",
      "Cloud Platform Management",
      "IoT Platform Management"
    ]
  },
  {
    slug: "electrical-engineering",
    title: "Electrical Engineering",
    desc: "Multi-layer PCB layout, component selection, signal integrity analysis, and optimized embedded firmware for power-efficient smart hardware.",
    icon: CircuitBoard,
    deliverables: [
      "Multi-layer PCB Design",
      "Embedded Firmware",
      "BOM Optimization",
      "Enclosure Design"
    ]
  },
  {
    slug: "mechanical-engineering",
    title: "Mechanical Engineering",
    desc: "From concept CAD to DFM-ready assembly drawings. We design plastic, sheet metal, and electromechanical components for robust performance.",
    icon: Wrench,
    deliverables: [
      "New Product Development",
      "3D & 2D CAD Design",
      "Plastic & Sheet Metal Design",
      "BOM Generation"
    ]
  },
  {
    slug: "procurement",
    title: "Procurement",
    desc: "Mitigate supply chain risks and optimize BOM costs. We handle supplier identification, vendor coordination, BOM-based purchasing, and logistics support.",
    icon: PackageCheck,
    deliverables: [
      "Supplier Identification",
      "Vendor Coordination",
      "BOM-based Purchasing",
      "Supply Chain & Logistics"
    ]
  }
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // Pinned layout for screens >= 768px (Tablet & Desktop)
    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card-stack");
      const navTexts = gsap.utils.toArray<HTMLElement>(".service-nav-text");
      const navDots = gsap.utils.toArray<HTMLElement>(".service-nav-dot");

      // Initial card and nav states
      gsap.set(cards, { opacity: 0, scale: 0.9, zIndex: 1, filter: "brightness(0.85)" });
      gsap.set(cards[0], { opacity: 1, scale: 1.05, zIndex: 10, filter: "brightness(1.1)" });
      
      gsap.set(navTexts, { color: "#888888" });
      gsap.set(navTexts[0], { color: "var(--accent)" });

      gsap.set(navDots, { backgroundColor: "rgba(136, 136, 136, 0.3)", scale: 1.0 });
      gsap.set(navDots[0], { backgroundColor: "var(--accent)", scale: 1.3 });

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "services-trigger",
          trigger: section,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // 1. Animate progress bar fill height
      tl.to(progressFillRef.current, {
        height: "100%",
        ease: "none"
      }, 0);

      // 2. Timeline card transition and focus highlights
      // Transition Card 0 -> Card 1 (around t = 0.5)
      tl.to(cards[0], { opacity: 0, scale: 0.9, zIndex: 1, filter: "brightness(0.85)", duration: 0.3 }, 0.35)
        .to(cards[1], { opacity: 1, scale: 1.05, zIndex: 10, filter: "brightness(1.1)", duration: 0.3 }, 0.35)
        .to(navTexts[0], { color: "#888888", duration: 0.2 }, 0.35)
        .to(navTexts[1], { color: "var(--accent)", duration: 0.2 }, 0.35)
        .to(navDots[0], { backgroundColor: "rgba(136, 136, 136, 0.3)", scale: 1.0, duration: 0.2 }, 0.35)
        .to(navDots[1], { backgroundColor: "var(--accent)", scale: 1.3, duration: 0.2 }, 0.35);

      // Transition Card 1 -> Card 2 (around t = 1.5)
      tl.to(cards[1], { opacity: 0, scale: 0.9, zIndex: 1, filter: "brightness(0.85)", duration: 0.3 }, 1.35)
        .to(cards[2], { opacity: 1, scale: 1.05, zIndex: 10, filter: "brightness(1.1)", duration: 0.3 }, 1.35)
        .to(navTexts[1], { color: "#888888", duration: 0.2 }, 1.35)
        .to(navTexts[2], { color: "var(--accent)", duration: 0.2 }, 1.35)
        .to(navDots[1], { backgroundColor: "rgba(136, 136, 136, 0.3)", scale: 1.0, duration: 0.2 }, 1.35)
        .to(navDots[2], { backgroundColor: "var(--accent)", scale: 1.3, duration: 0.2 }, 1.35);

      // Transition Card 2 -> Card 3 (around t = 2.5)
      tl.to(cards[2], { opacity: 0, scale: 0.9, zIndex: 1, filter: "brightness(0.85)", duration: 0.3 }, 2.35)
        .to(cards[3], { opacity: 1, scale: 1.05, zIndex: 10, filter: "brightness(1.1)", duration: 0.3 }, 2.35)
        .to(navTexts[2], { color: "#888888", duration: 0.2 }, 2.35)
        .to(navTexts[3], { color: "var(--accent)", duration: 0.2 }, 2.35)
        .to(navDots[2], { backgroundColor: "rgba(136, 136, 136, 0.3)", scale: 1.0, duration: 0.2 }, 2.35)
        .to(navDots[3], { backgroundColor: "var(--accent)", scale: 1.3, duration: 0.2 }, 2.35);

      // Add small blank time at the end to allow holding Card 3
      tl.to({}, { duration: 0.35 });
    });

    return () => {
      mm.revert();
    };
  }, { scope: sectionRef });

  const handleNavClick = (index: number) => {
    const trigger = ScrollTrigger.getById("services-trigger");
    if (!trigger) return;

    const start = trigger.start;
    const end = trigger.end;
    // Map index (0-3) to respective progress point (0, 0.333, 0.666, 1.0)
    const progress = index / 3;
    const targetScroll = start + progress * (end - start);

    gsap.to(window, {
      scrollTo: { y: targetScroll, autoKill: false },
      duration: 0.8,
      ease: "power2.out"
    });
  };

  return (
    <section 
      ref={sectionRef} 
      id="services" 
      className="services-section relative px-5 lg:px-8 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Top Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-[clamp(24px,4vh,48px)] gap-6">
          <div>
            <span className="text-[var(--accent)] font-bold text-sm tracking-widest uppercase">
              SERVICES
            </span>
            <h2 
              className="font-black mt-2 leading-[0.95]"
              style={{ fontSize: "clamp(2.5rem, 4vw, 5rem)", letterSpacing: "-0.03em" }}
            >
              Engineering teams for every stage of hardware launch.
            </h2>
          </div>
          <div className="hidden lg:block shrink-0">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 font-bold text-[var(--accent)] hover:opacity-85 transition-opacity"
            >
              View all services <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Tablet & Desktop Pinned Interactive Layout (min-width: 768px) */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-[clamp(40px,5vw,100px)] items-center relative z-10 w-full">
          {/* Navigation - Stacked on tablet, side-by-side on desktop */}
          <div 
            className="relative flex flex-col justify-center py-2 w-full max-w-[320px] mx-auto lg:mx-0" 
            style={{ gap: "24px" }}
          >
            {/* Background Line Track - starts at center of first dot, ends at center of last */}
            <div className="absolute left-[7px] top-[24px] bottom-[24px] w-[2px] bg-neutral-200 dark:bg-neutral-800" />
            {/* Active Green Progress Line */}
            <div 
              ref={progressFillRef} 
              className="absolute left-[7px] top-[24px] w-[2px] bg-[var(--accent)] origin-top" 
              style={{ height: "0%" }} 
            />
            
            {SERVICES_DATA.map((service, idx) => (
              <button 
                key={idx}
                onClick={() => handleNavClick(idx)}
                className="service-nav-item relative pl-8 text-left group focus:outline-none flex items-center min-h-[32px]"
              >
                {/* Custom dot positioned on the track */}
                <div 
                  className="service-nav-dot absolute left-[7px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-[var(--bg)] -translate-x-[4px] transition-all duration-300 group-hover:scale-120" 
                />
                <span 
                  className="service-nav-text font-black transition-colors duration-300"
                  style={{ fontSize: "clamp(1rem, 1.4vw, 1.5rem)" }}
                >
                  {service.title}
                </span>
              </button>
            ))}
          </div>

          {/* Cards Stack */}
          <div ref={cardsContainerRef} className="relative h-[400px] w-full flex items-center justify-center">
            {SERVICES_DATA.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div 
                  key={idx}
                  className="service-card-stack services-card-custom absolute w-full max-w-[650px] rounded-[32px] border border-neutral-200 dark:border-neutral-850 shadow-crisp flex flex-col justify-between overflow-hidden"
                  style={{
                    padding: "clamp(24px, 2vw, 40px)",
                    borderRadius: "32px",
                    height: "auto",
                    willChange: "transform, opacity"
                  }}
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -right-12 -bottom-12 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                    <Icon size={240} />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div 
                        className="flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{
                          background: "rgba(155, 223, 131, 0.15)",
                          border: "1px solid rgba(155, 223, 131, 0.45)",
                          color: "var(--accent)"
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                        0{idx + 1} / 04
                      </span>
                    </div>

                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                      Category
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-black mt-1">
                      {service.title}
                    </h3>
                    
                    <p className="mt-3 text-sm lg:text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {service.desc}
                    </p>

                    {/* Content List with 2-Column responsive grid */}
                    <ul 
                      className="mt-6 w-full"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        gap: "12px 24px"
                      }}
                    >
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 items-start">
                          <CheckCircle2 className="shrink-0 text-[var(--accent)] mt-0.5" size={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-neutral-200 dark:border-neutral-800 pt-5 mt-6 flex items-center justify-between">
                    <Link
                      href={`/${service.slug}`}
                      className="open-service-link inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)]"
                    >
                      Open Service <ArrowRight className="arrow-icon" size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout (max-width: 767px) - Disable pinning, convert to standard vertical cards */}
        <div className="md:hidden flex flex-col gap-6 relative z-10">
          {SERVICES_DATA.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx}
                className="services-card-custom rounded-[32px] border border-neutral-200 dark:border-neutral-850 p-6 shadow-crisp flex flex-col justify-between overflow-hidden relative bg-[var(--card)]"
                style={{ height: "auto" }}
              >
                {/* Decorative Background Icon */}
                <div className="absolute -right-8 -bottom-8 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                  <Icon size={180} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{
                        background: "rgba(155, 223, 131, 0.15)",
                        border: "1px solid rgba(155, 223, 131, 0.45)",
                        color: "var(--accent)"
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                      0{idx + 1} / 04
                    </span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                    Category
                  </span>
                  <h3 className="text-xl font-black mt-1">
                    {service.title}
                  </h3>
                  
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {service.desc}
                  </p>

                  <ul 
                    className="mt-4 w-full"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: "8px 16px"
                    }}
                  >
                    {service.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 items-start">
                        <CheckCircle2 className="shrink-0 text-[var(--accent)] mt-0.5" size={14} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 mt-5">
                  <Link
                    href={`/${service.slug}`}
                    className="open-service-link inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)]"
                  >
                    Open Service <ArrowRight className="arrow-icon" size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
          
          {/* Mobile View all link */}
          <div className="text-center mt-4">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 font-bold text-[var(--accent)] hover:opacity-85 transition-opacity"
            >
              View all services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
