"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Globe2, 
  Factory, 
  Repeat, 
  PhoneCall, 
  Zap, 
  Workflow
} from "lucide-react";
import { works } from "@/lib/content";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function OurWorksPCB() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for ScrollTrigger triggers
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const metrics1Ref = useRef<HTMLDivElement>(null);
  const metrics2Ref = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);

  // States to keep track of active cards/nodes for hover enhancements (state-based triggers)
  const [activeHoveredCard, setActiveHoveredCard] = useState<number | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // If prefers-reduced-motion, set everything to visible instantly
      gsap.set(".pcb-project-card, .pcb-trace-path, .pcb-flow-path, .pcb-node, .glassmorphism-hub-panel", {
        opacity: 1,
        scale: 1,
        strokeDashoffset: 0,
        y: 0,
        clearProps: "all"
      });
      return;
    }

    /* ─── Scroll-Based Drawing & Reveal Timelines ──────────────────────── */

    // Desktop SVG drawing timelines
    // Draw Path 1 (Top to Card 1)
    gsap.fromTo("#dt-path-1", 
      { strokeDasharray: "1000", strokeDashoffset: "1000" },
      {
        strokeDashoffset: "0",
        scrollTrigger: {
          trigger: row1Ref.current,
          start: "top 80%",
          end: "top 45%",
          scrub: 1,
          onEnter: () => {
            gsap.to("#dt-node-1", { scale: 1.25, duration: 0.4 });
            document.getElementById("dt-node-1")?.classList.add("is-active");
            document.getElementById("dt-path-1")?.classList.add("is-active");
          },
          onLeaveBack: () => {
            document.getElementById("dt-node-1")?.classList.remove("is-active");
            document.getElementById("dt-path-1")?.classList.remove("is-active");
          }
        }
      }
    );

    // Reveal Card 1
    gsap.fromTo("#card-1",
      { opacity: 0.3, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: row1Ref.current,
          start: "top 60%",
          end: "bottom 30%",
          toggleClass: { targets: "#card-1", className: "is-active" },
          onEnter: () => {
            document.getElementById("dt-flow-1")?.classList.add("is-active");
          },
          onLeaveBack: () => {
            document.getElementById("dt-flow-1")?.classList.remove("is-active");
          }
        }
      }
    );

    // Draw Path 2 (Card 1 to Metrics 1)
    gsap.fromTo("#dt-path-2",
      { strokeDasharray: "1000", strokeDashoffset: "1000" },
      {
        strokeDashoffset: "0",
        scrollTrigger: {
          trigger: metrics1Ref.current,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
          onEnter: () => {
            document.getElementById("dt-node-m1")?.classList.add("is-active");
            document.getElementById("dt-path-2")?.classList.add("is-active");
          },
          onLeaveBack: () => {
            document.getElementById("dt-node-m1")?.classList.remove("is-active");
            document.getElementById("dt-path-2")?.classList.remove("is-active");
          }
        }
      }
    );

    // Metrics 1 Count-up & Pulse
    const m1Counter1 = document.getElementById("metric-delivered");
    const m1Counter2 = document.getElementById("metric-success");
    if (m1Counter1 && m1Counter2) {
      gsap.fromTo(m1Counter1,
        { textContent: "0" },
        {
          textContent: "50",
          duration: 1.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: metrics1Ref.current,
            start: "top 75%",
            onEnter: () => {
              document.getElementById("dt-flow-2")?.classList.add("is-active");
              gsap.fromTo(metrics1Ref.current, 
                { boxShadow: "0 0 0px rgba(0, 89, 0, 0)" },
                { boxShadow: "0 0 25px rgba(0, 89, 0, 0.25)", duration: 0.6, yoyo: true, repeat: 1 }
              );
            }
          }
        }
      );
      gsap.fromTo(m1Counter2,
        { textContent: "0" },
        {
          textContent: "99",
          duration: 1.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: metrics1Ref.current,
            start: "top 75%"
          }
        }
      );
    }

    // Draw Path 3 (Metrics 1 to Card 2)
    gsap.fromTo("#dt-path-3",
      { strokeDasharray: "1000", strokeDashoffset: "1000" },
      {
        strokeDashoffset: "0",
        scrollTrigger: {
          trigger: row2Ref.current,
          start: "top 80%",
          end: "top 45%",
          scrub: 1,
          onEnter: () => {
            document.getElementById("dt-node-2")?.classList.add("is-active");
            document.getElementById("dt-path-3")?.classList.add("is-active");
          },
          onLeaveBack: () => {
            document.getElementById("dt-node-2")?.classList.remove("is-active");
            document.getElementById("dt-path-3")?.classList.remove("is-active");
          }
        }
      }
    );

    // Reveal Card 2
    gsap.fromTo("#card-2",
      { opacity: 0.3, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: row2Ref.current,
          start: "top 60%",
          end: "bottom 30%",
          toggleClass: { targets: "#card-2", className: "is-active" },
          onEnter: () => {
            document.getElementById("dt-flow-3")?.classList.add("is-active");
          },
          onLeaveBack: () => {
            document.getElementById("dt-flow-3")?.classList.remove("is-active");
          }
        }
      }
    );

    // Draw Path 4 (Card 2 to Metrics 2)
    gsap.fromTo("#dt-path-4",
      { strokeDasharray: "1000", strokeDashoffset: "1000" },
      {
        strokeDashoffset: "0",
        scrollTrigger: {
          trigger: metrics2Ref.current,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
          onEnter: () => {
            document.getElementById("dt-node-m2")?.classList.add("is-active");
            document.getElementById("dt-path-4")?.classList.add("is-active");
          },
          onLeaveBack: () => {
            document.getElementById("dt-node-m2")?.classList.remove("is-active");
            document.getElementById("dt-path-4")?.classList.remove("is-active");
          }
        }
      }
    );

    // Metrics 2 Count-up
    const m2Counter1 = document.getElementById("metric-hours");
    const m2Counter2 = document.getElementById("metric-industries");
    if (m2Counter1 && m2Counter2) {
      gsap.fromTo(m2Counter1,
        { textContent: "0" },
        {
          textContent: "10000",
          duration: 1.8,
          ease: "power2.out",
          snap: { textContent: 100 },
          scrollTrigger: {
            trigger: metrics2Ref.current,
            start: "top 75%",
            onEnter: () => {
              document.getElementById("dt-flow-4")?.classList.add("is-active");
              gsap.fromTo(metrics2Ref.current, 
                { boxShadow: "0 0 0px rgba(0, 89, 0, 0)" },
                { boxShadow: "0 0 25px rgba(0, 89, 0, 0.25)", duration: 0.6, yoyo: true, repeat: 1 }
              );
            }
          }
        }
      );
      gsap.fromTo(m2Counter2,
        { textContent: "0" },
        {
          textContent: "12",
          duration: 1.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: metrics2Ref.current,
            start: "top 75%"
          }
        }
      );
    }

    // Draw Path 5 (Metrics 2 to Card 3)
    gsap.fromTo("#dt-path-5",
      { strokeDasharray: "1000", strokeDashoffset: "1000" },
      {
        strokeDashoffset: "0",
        scrollTrigger: {
          trigger: row3Ref.current,
          start: "top 80%",
          end: "top 45%",
          scrub: 1,
          onEnter: () => {
            document.getElementById("dt-node-3")?.classList.add("is-active");
            document.getElementById("dt-path-5")?.classList.add("is-active");
          },
          onLeaveBack: () => {
            document.getElementById("dt-node-3")?.classList.remove("is-active");
            document.getElementById("dt-path-5")?.classList.remove("is-active");
          }
        }
      }
    );

    // Reveal Card 3
    gsap.fromTo("#card-3",
      { opacity: 0.3, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: row3Ref.current,
          start: "top 60%",
          end: "bottom 30%",
          toggleClass: { targets: "#card-3", className: "is-active" },
          onEnter: () => {
            document.getElementById("dt-flow-5")?.classList.add("is-active");
          },
          onLeaveBack: () => {
            document.getElementById("dt-flow-5")?.classList.remove("is-active");
          }
        }
      }
    );

    // Draw Path 6 (Card 3 to Hub)
    gsap.fromTo("#dt-path-6",
      { strokeDasharray: "1000", strokeDashoffset: "1000" },
      {
        strokeDashoffset: "0",
        scrollTrigger: {
          trigger: hubRef.current,
          start: "top 95%",
          end: "top 65%",
          scrub: 1,
          onEnter: () => {
            document.getElementById("dt-path-6")?.classList.add("is-active");
            document.getElementById("dt-path-7")?.classList.add("is-active");
            document.getElementById("dt-path-8")?.classList.add("is-active");
          },
          onLeaveBack: () => {
            document.getElementById("dt-path-6")?.classList.remove("is-active");
            document.getElementById("dt-path-7")?.classList.remove("is-active");
            document.getElementById("dt-path-8")?.classList.remove("is-active");
          }
        }
      }
    );

    // Hub Convergence timeline
    const hubTl = gsap.timeline({
      scrollTrigger: {
        trigger: hubRef.current,
        start: "top 65%",
      }
    });

    hubTl.to("#dt-node-hub", {
      scale: 1.4,
      duration: 0.6,
      ease: "back.out(2.5)",
      onComplete: () => {
        document.getElementById("dt-node-hub")?.classList.add("is-active");
        document.getElementById("hub-glow-circle")?.classList.add("is-active");
        document.getElementById("dt-flow-6")?.classList.add("is-active");
      }
    })
    .fromTo(".glassmorphism-hub-panel",
      { opacity: 0, y: -40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
      "-=0.2"
    );


    /* ─── Mobile SVG Scroll Drawing ────────────────────────────────────── */

    gsap.fromTo(".mob-path-draw", 
      { strokeDasharray: "1500", strokeDashoffset: "1500" },
      {
        strokeDashoffset: "0",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 80%",
          scrub: 1,
          onUpdate: (self) => {
            // Activate nodes on mobile based on scroll progress
            const progress = self.progress;
            
            const n1 = document.getElementById("mob-node-1");
            const n2 = document.getElementById("mob-node-2");
            const n3 = document.getElementById("mob-node-3");
            const nh = document.getElementById("mob-node-hub");
            const glow = document.getElementById("hub-glow-circle-mob");

            if (progress > 0.08) { n1?.classList.add("is-active"); } else { n1?.classList.remove("is-active"); }
            if (progress > 0.42) { n2?.classList.add("is-active"); } else { n2?.classList.remove("is-active"); }
            if (progress > 0.72) { n3?.classList.add("is-active"); } else { n3?.classList.remove("is-active"); }
            
            if (progress > 0.90) { 
              nh?.classList.add("is-active"); 
              glow?.classList.add("is-active");
            } else { 
              nh?.classList.remove("is-active"); 
              glow?.classList.remove("is-active");
            }
          }
        }
      }
    );

    // Active classes toggling for mobile cards
    works.forEach((_, idx) => {
      gsap.fromTo(`#card-${idx + 1}`,
        { opacity: 0.3, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: `#card-${idx + 1}`,
            start: "top 75%",
            end: "bottom 25%",
            toggleClass: { targets: `#card-${idx + 1}`, className: "is-active" }
          }
        }
      );
    });

  }, []);

  return (
    <section 
      id="our-works" 
      ref={containerRef} 
      className="pcb-experience border-b border-border-primary px-5 py-24 lg:px-8"
    >
      {/* Background System */}
      <div className="absolute inset-0 pcb-grid-overlay opacity-80 pointer-events-none" />
      <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-accent/3 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-accent/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-20 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-small-text font-bold uppercase tracking-[0.2em] text-signal flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
              Our Works
            </p>
            <h2 className="mt-3 max-w-3xl text-section text-[#EEEEEE]">
              Real projects. Proven engineering outcomes.
            </h2>
          </div>
          <Link 
            href="/our-works" 
            className="inline-flex items-center gap-2 font-bold text-signal transition duration-300 hover:text-signal/80 hover:translate-x-1"
          >
            View all works <ArrowRight size={18} />
          </Link>
        </div>

        {/* ─── DESKTOP PCB SVG NETWORK OVERLAY (visible on lg screens) ─── */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" 
          viewBox="0 0 1200 2400" 
          preserveAspectRatio="none"
          style={{ zIndex: 10 }}
        >
          {/* Defs for gradients & filters */}
          <defs>
            <filter id="pcb-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* MAIN VERTICAL PCB TRACE PATHS */}
          
          {/* Path 1: Top to Card 1 (Left) */}
          <path 
            id="dt-path-1" 
            className={`pcb-trace-path ${activeHoveredCard === 1 ? 'is-hovered' : ''}`}
            d="M 600 0 L 600 80 L 530 150 L 450 150 L 420 180" 
          />
          <path 
            id="dt-flow-1" 
            className={`pcb-flow-path ${activeHoveredCard === 1 ? 'is-hovered' : ''}`}
            d="M 600 0 L 600 80 L 530 150 L 450 150 L 420 180" 
          />

          {/* Path 2: Card 1 to Metrics 1 (Center) */}
          <path 
            id="dt-path-2" 
            className={`pcb-trace-path ${activeHoveredCard === 1 ? 'is-hovered' : ''}`}
            d="M 420 480 L 450 510 L 500 510 L 600 610 L 600 660" 
          />
          <path 
            id="dt-flow-2" 
            className={`pcb-flow-path ${activeHoveredCard === 1 ? 'is-hovered' : ''}`}
            d="M 420 480 L 450 510 L 500 510 L 600 610 L 600 660" 
          />

          {/* Path 3: Metrics 1 to Card 2 (Right) */}
          <path 
            id="dt-path-3" 
            className={`pcb-trace-path ${activeHoveredCard === 2 ? 'is-hovered' : ''}`}
            d="M 600 780 L 600 840 L 670 910 L 750 910 L 780 940" 
          />
          <path 
            id="dt-flow-3" 
            className={`pcb-flow-path ${activeHoveredCard === 2 ? 'is-hovered' : ''}`}
            d="M 600 780 L 600 840 L 670 910 L 750 910 L 780 940" 
          />

          {/* Path 4: Card 2 to Metrics 2 (Center) */}
          <path 
            id="dt-path-4" 
            className={`pcb-trace-path ${activeHoveredCard === 2 ? 'is-hovered' : ''}`}
            d="M 780 1240 L 750 1270 L 700 1270 L 600 1370 L 600 1410" 
          />
          <path 
            id="dt-flow-4" 
            className={`pcb-flow-path ${activeHoveredCard === 2 ? 'is-hovered' : ''}`}
            d="M 780 1240 L 750 1270 L 700 1270 L 600 1370 L 600 1410" 
          />

          {/* Path 5: Metrics 2 to Card 3 (Left) */}
          <path 
            id="dt-path-5" 
            className={`pcb-trace-path ${activeHoveredCard === 3 ? 'is-hovered' : ''}`}
            d="M 600 1530 L 600 1590 L 530 1660 L 450 1660 L 420 1690" 
          />
          <path 
            id="dt-flow-5" 
            className={`pcb-flow-path ${activeHoveredCard === 3 ? 'is-hovered' : ''}`}
            d="M 600 1530 L 600 1590 L 530 1660 L 450 1660 L 420 1690" 
          />

          {/* Path 6: Card 3 to Hub (Center Convergence) */}
          <path 
            id="dt-path-6" 
            className={`pcb-trace-path ${activeHoveredCard === 3 ? 'is-hovered' : ''}`}
            d="M 420 1990 L 450 2020 L 500 2020 L 600 2120 L 600 2190" 
          />
          <path 
            id="dt-flow-6" 
            className={`pcb-flow-path ${activeHoveredCard === 3 ? 'is-hovered' : ''}`}
            d="M 420 1990 L 450 2020 L 500 2020 L 600 2120 L 600 2190" 
          />

          {/* Symmetrical converging paths for cinematic visual effects in the hub */}
          <path 
            id="dt-path-7" 
            className="pcb-trace-path" 
            d="M 200 2100 L 300 2100 L 400 2190 L 570 2190 Q 600 2190 600 2200" 
          />
          <path 
            id="dt-path-8" 
            className="pcb-trace-path" 
            d="M 1000 2100 L 900 2100 L 800 2190 L 630 2190 Q 600 2190 600 2200" 
          />

          {/* INTERACTIVE NODES */}
          
          {/* Node 1 */}
          <circle 
            id="dt-node-1" 
            className={`pcb-node ${activeHoveredCard === 1 ? 'is-hovered' : ''}`}
            cx="420" cy="180" r="7" 
          />

          {/* Metrics 1 Node */}
          <circle 
            id="dt-node-m1" 
            className="pcb-node" 
            cx="600" cy="660" r="7" 
          />

          {/* Node 2 */}
          <circle 
            id="dt-node-2" 
            className={`pcb-node ${activeHoveredCard === 2 ? 'is-hovered' : ''}`}
            cx="780" cy="940" r="7" 
          />

          {/* Metrics 2 Node */}
          <circle 
            id="dt-node-m2" 
            className="pcb-node" 
            cx="600" cy="1410" r="7" 
          />

          {/* Node 3 */}
          <circle 
            id="dt-node-3" 
            className={`pcb-node ${activeHoveredCard === 3 ? 'is-hovered' : ''}`}
            cx="420" cy="1690" r="7" 
          />

          {/* Hub Node (Central) */}
          <circle 
            id="dt-node-hub" 
            className="pcb-node" 
            cx="600" cy="2200" r="10" 
          />
        </svg>

        {/* ─── MOBILE PCB SVG NETWORK OVERLAY (visible on mobile/tablet) ─── */}
        <svg 
          className="absolute top-0 bottom-0 left-[24px] w-[60px] h-full pointer-events-none lg:hidden" 
          preserveAspectRatio="none"
          viewBox="0 0 60 2400"
          style={{ zIndex: 10 }}
        >
          {/* Main timeline trace running down */}
          <path 
            className="pcb-trace-path mob-path-draw" 
            d="M 10 0 L 10 2380" 
            style={{ stroke: 'rgba(140, 198, 63, 0.25)', strokeWidth: '3px' }}
          />

          {/* Flow path */}
          <path 
            className="pcb-flow-path is-active" 
            d="M 10 0 L 10 2380" 
            style={{ stroke: 'var(--primary-green)', strokeWidth: '2.5px' }}
          />

          {/* Branch Traces shooting to nodes */}
          <path className="pcb-trace-path mob-path-draw" d="M 10 180 L 40 180" />
          <path className="pcb-trace-path mob-path-draw" d="M 10 890 L 40 890" />
          <path className="pcb-trace-path mob-path-draw" d="M 10 1620 L 40 1620" />
          
          {/* Hub Convergence Branch */}
          <path className="pcb-trace-path mob-path-draw" d="M 10 2200 L 30 2200" />

          {/* Mobile Nodes */}
          <circle id="mob-node-1" className="pcb-node" cx="40" cy="180" r="6" />
          <circle id="mob-node-2" className="pcb-node" cx="40" cy="890" r="6" />
          <circle id="mob-node-3" className="pcb-node" cx="40" cy="1620" r="6" />
          <circle id="mob-node-hub" className="pcb-node" cx="30" cy="2200" r="8" />
        </svg>

        {/* ─── STAGGERED LAYOUT CONTENT ─── */}

        {/* Project 1 Row */}
        <div ref={row1Ref} className="relative z-20 mb-20 lg:mb-32">
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Left Column: Project Card */}
            <div className="col-span-12 lg:col-span-5 pl-10 lg:pl-0">
              <ProjectCard 
                work={works[0]} 
                index={1} 
                isActiveHover={activeHoveredCard === 1}
                setActiveHover={(val) => setActiveHoveredCard(val ? 1 : null)}
              />
            </div>
            
            {/* Center spacing column for desktop trace alignment */}
            <div className="hidden lg:block lg:col-span-2" />

            {/* Right Column: Schema/Specs visual panel */}
            <div className="hidden lg:block lg:col-span-5">
              <SchemaVisual 
                title="Embedded Mechanical Integration" 
                subtitle="SPM SYSTEM #TXW-WASHER-01"
                specs={[
                  "Teflon/Nylon Cutting Architecture",
                  "Automated Clamping Force Control",
                  "Safety Interlocks Design Pattern",
                  "Angles: Multi-Angle Cutter Guides"
                ]}
                isActive={activeHoveredCard === 1}
              />
            </div>
          </div>
        </div>

        {/* METRICS MODULE 1 */}
        <div 
          ref={metrics1Ref} 
          id="metrics-container-1"
          className="relative z-20 mx-auto max-w-xl my-24 lg:my-32 p-6 lg:p-8 rounded-xl border border-border-primary bg-[#080808]/90 backdrop-blur-md transition-all duration-500 hover:border-accent/40"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-bg-primary border border-border-primary text-[10px] tracking-[0.2em] font-mono text-signal rounded-full uppercase">
            BUS MONITOR 01
          </div>
          <div className="grid grid-cols-2 gap-6 text-center">
            <div className="border-r border-border-primary/50">
              <p className="font-display font-extrabold text-[56px] leading-none text-[#EEEEEE]">
                <span id="metric-delivered">0</span>+
              </p>
              <p className="mt-2 text-[16px] font-medium uppercase tracking-[0.08em] text-[#999999]">Projects Delivered</p>
            </div>
            <div>
              <p className="font-display font-extrabold text-[56px] leading-none text-[#EEEEEE]">
                <span id="metric-success">0</span>%
              </p>
              <p className="mt-2 text-[16px] font-medium uppercase tracking-[0.08em] text-[#999999]">Prototype Success Rate</p>
            </div>
          </div>
        </div>

        {/* Project 2 Row */}
        <div ref={row2Ref} className="relative z-20 mb-20 lg:mb-32">
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Left Column: Schema visual panel (desktop) */}
            <div className="hidden lg:block lg:col-span-5">
              <SchemaVisual 
                title="Nanofiber Process Controller" 
                subtitle="REVERSE ENGINEERING #TXW-ESPIN-02"
                specs={[
                  "PLC-Driven High-Voltage Controls",
                  "Environmental Chamber Stabilization",
                  "Nanometer Precision Jet Tracking",
                  "Dynamic Flow Regulation Systems"
                ]}
                isActive={activeHoveredCard === 2}
              />
            </div>
            
            {/* Center spacing column */}
            <div className="hidden lg:block lg:col-span-2" />

            {/* Right Column: Project Card */}
            <div className="col-span-12 lg:col-span-5 pl-10 lg:pl-0">
              <ProjectCard 
                work={works[1]} 
                index={2} 
                isActiveHover={activeHoveredCard === 2}
                setActiveHover={(val) => setActiveHoveredCard(val ? 2 : null)}
              />
            </div>
          </div>
        </div>

        {/* METRICS MODULE 2 */}
        <div 
          ref={metrics2Ref} 
          id="metrics-container-2"
          className="relative z-20 mx-auto max-w-xl my-24 lg:my-32 p-6 lg:p-8 rounded-xl border border-border-primary bg-[#080808]/90 backdrop-blur-md transition-all duration-500 hover:border-accent/40"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-bg-primary border border-border-primary text-[10px] tracking-[0.2em] font-mono text-signal rounded-full uppercase">
            BUS MONITOR 02
          </div>
          <div className="grid grid-cols-2 gap-6 text-center">
            <div className="border-r border-border-primary/50">
              <p className="font-display font-extrabold text-[56px] leading-none text-[#EEEEEE]">
                <span id="metric-hours">0</span>+
              </p>
              <p className="mt-2 text-[16px] font-medium uppercase tracking-[0.08em] text-[#999999]">Engineering Hours</p>
            </div>
            <div>
              <p className="font-display font-extrabold text-[56px] leading-none text-[#EEEEEE]">
                <span id="metric-industries">0</span>+
              </p>
              <p className="mt-2 text-[16px] font-medium uppercase tracking-[0.08em] text-[#999999]">Industries Served</p>
            </div>
          </div>
        </div>

        {/* Project 3 Row */}
        <div ref={row3Ref} className="relative z-20 mb-24 lg:mb-36">
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Left Column: Project Card */}
            <div className="col-span-12 lg:col-span-5 pl-10 lg:pl-0">
              <ProjectCard 
                work={works[2]} 
                index={3} 
                isActiveHover={activeHoveredCard === 3}
                setActiveHover={(val) => setActiveHoveredCard(val ? 3 : null)}
              />
            </div>
            
            {/* Center spacing column */}
            <div className="hidden lg:block lg:col-span-2" />

            {/* Right Column: Schema/Specs visual panel */}
            <div className="hidden lg:block lg:col-span-5">
              <SchemaVisual 
                title="Sterilization Thermal Analysis" 
                subtitle="SYSTEM REDESIGN #TXW-AUTOCLAVE-03"
                specs={[
                  "Chamber Thermal Profile Maps",
                  "Vessel Pressure Seals Design",
                  "Standardized Core Components BOM",
                  "High-Accuracy Temperature Sinks"
                ]}
                isActive={activeHoveredCard === 3}
              />
            </div>
          </div>
        </div>

        {/* ─── FINAL ENGINEERING HUB CONVERGENCE ─── */}
        <div ref={hubRef} className="relative z-20 flex flex-col items-center pt-10">
          
          {/* Pulsing hub glow helper */}
          <div id="hub-glow-circle" className="pcb-hub-glow w-64 h-64 -translate-y-[80px]" />
          <div id="hub-glow-circle-mob" className="pcb-hub-glow w-44 h-44 lg:hidden" />

          {/* Central convergence node label */}
          <div className="mb-12 text-center relative">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-signal bg-bg-primary/80 px-4 py-1.5 border border-accent/20 rounded-md">
              SYSTEM CONVERGENCE NODE
            </span>
          </div>

          {/* Premium Glassmorphic CTA Panel */}
          <div className="glassmorphism-hub-panel w-full max-w-4xl p-8 md:p-12 rounded-2xl flex flex-col items-center text-center opacity-0 scale-95 transition-all duration-300">
            <div className="w-12 h-12 rounded-full border border-accent/40 bg-accent/5 flex items-center justify-center mb-6">
              <Workflow className="text-signal animate-spin-slow" size={24} />
            </div>

            <h3 className="text-section text-[#EEEEEE]">
              What Are You Building Next?
            </h3>
            
            <p className="mt-4 max-w-2xl text-body-large text-[#999999]">
              Connect with Texawave&apos;s multi-disciplinary team. Select a core track to route your request directly to the engineering team.
            </p>

            {/* Hub CTA options grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {[
                { label: "Embedded Systems", icon: Cpu, href: "/electrical-engineering" },
                { label: "IoT Solutions", icon: Globe2, href: "/software-iot" },
                { label: "AI & Automation", icon: Zap, href: "/services" },
                { label: "Product Development", icon: Factory, href: "/mechanical-engineering" },
                { label: "Reverse Engineering", icon: Repeat, href: "/services" },
                { label: "Talk to an Engineer", icon: PhoneCall, href: "/contact", highlight: true },
              ].map((option) => {
                const OptionIcon = option.icon;
                return (
                  <Link 
                    key={option.label}
                    href={option.href}
                    className={`hub-option-btn p-5 rounded-lg flex flex-col items-center justify-center gap-3 text-center ${
                      option.highlight 
                        ? 'border-accent/40 bg-accent/5 hover:bg-accent/15 !text-signal' 
                        : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-bg-primary border border-border-primary flex items-center justify-center text-signal">
                      <OptionIcon size={18} />
                    </div>
                    <span className="text-sm font-bold tracking-wide">{option.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── SUB-COMPONENTS ─── */

interface ProjectCardProps {
  work: typeof works[0];
  index: number;
  isActiveHover: boolean;
  setActiveHover: (hover: boolean) => void;
}

function ProjectCard({ work, index, setActiveHover }: ProjectCardProps) {
  const Icon = work.icon;
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setActiveHover(true)}
      onMouseLeave={() => setActiveHover(false)}
    >
      <Link
        id={`card-${index}`}
        href={`/our-works/${work.slug}`}
        className="pcb-project-card group flex flex-col overflow-hidden rounded-2xl border bg-[#111111] w-full"
      >
        {/* Project Image */}
        <div className="relative h-[250px] sm:h-[280px] w-full flex items-center justify-center bg-[#080808] border-b border-border-primary overflow-hidden">
          <Image
            src={work.image}
            alt={work.title}
            fill
            className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Subtle Accent Glow Overlay */}
          <div className="absolute inset-0 bg-signal opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-[0.03]" />
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col p-6">
          {/* Category Tag & Client */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#080808] text-[#EEEEEE] border border-border-primary transition duration-300 group-hover:bg-signal group-hover:text-black">
              <Icon size={19} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="pcb-tag rounded-full border border-accent/20 bg-accent/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-signal">
                {work.category}
              </span>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#999999]">
                Client: <span className="text-[#EEEEEE]">{work.client}</span>
              </p>
            </div>
          </div>

          <h3 className="text-card text-[#EEEEEE] group-hover:text-signal transition-colors duration-300">
            {work.title}
          </h3>
          <p className="mt-3 flex-1 text-body-normal text-[#999999]">
            {work.short}
          </p>

          {/* Service tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {work.services.map((svc) => (
              <span 
                key={svc} 
                className="pcb-tag flex items-center gap-1.5 border border-border-primary bg-bg-primary/40 px-2 py-1 rounded text-small-text font-semibold text-[#999999]"
              >
                <CheckCircle2 className="shrink-0 text-signal group-hover:text-signal" size={12} />
                {svc}
              </span>
            ))}
          </div>

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-signal group-hover:text-signal transition-colors duration-300">
            View project <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </div>
  );
}

interface SchemaVisualProps {
  title: string;
  subtitle: string;
  specs: string[];
  isActive: boolean;
}

function SchemaVisual({ title, subtitle, specs, isActive }: SchemaVisualProps) {
  return (
    <div className={`border border-border-primary rounded-xl p-6 bg-[#080808]/40 backdrop-blur-sm transition-all duration-700 ${
      isActive 
        ? 'border-accent/40 bg-accent/[0.02] shadow-[0_0_20px_rgba(140,198,63,0.15)]' 
        : 'opacity-50'
    }`}>
      {/* Dynamic tech terminal bar */}
      <div className="flex items-center justify-between border-b border-border-primary pb-3 mb-4">
        <span className="text-[10px] font-mono text-[#999999] tracking-wider">{subtitle}</span>
        <div className="flex gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-signal animate-pulse' : 'bg-zinc-800'}`} />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
        </div>
      </div>

      <h4 className={`text-base font-black tracking-wide font-mono transition-colors duration-500 ${
        isActive ? 'text-signal' : 'text-[#EEEEEE]'
      }`}>
        {title}
      </h4>

      {/* Schematic style lines list */}
      <ul className="mt-4 flex flex-col gap-2 font-mono text-xs">
        {specs.map((spec, i) => (
          <li key={i} className="flex items-start gap-2.5 py-1 text-[#999999]">
            <span className="text-signal font-bold">0{i+1}_</span>
            <span className="tracking-tight text-zinc-400">{spec}</span>
          </li>
        ))}
      </ul>

      {/* Decorative technical line drawing */}
      <div className="mt-5 pt-3 border-t border-border-primary/40 flex justify-between items-center text-[9px] font-mono text-zinc-600">
        <span>STATUS: {isActive ? 'ENG_FLOW_ACTIVE' : 'STANDBY'}</span>
        <span>SYS_REV_2.0</span>
      </div>
    </div>
  );
}
