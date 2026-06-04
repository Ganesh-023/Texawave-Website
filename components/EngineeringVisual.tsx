"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { createEaseReverseTimeline } from "@/lib/gsap-utils";

const STAGES = [
  { name: "IDEA", desc: "Digital Concept", label: "idea" },
  { name: "DESIGN", desc: "CAD Blueprint", label: "design" },
  { name: "PCB DEV", desc: "Circuit Routing", label: "pcb" },
  { name: "PROTO", desc: "Component Build", label: "prototype" },
  { name: "TEST", desc: "Manufacturing QA", label: "manufacturing" },
  { name: "READY", desc: "Market Launch", label: "market" }
];

interface TimelineNodeProps {
  stage: typeof STAGES[number];
  idx: number;
  activeStage: number;
  seekToStage: (idx: number) => void;
}

function TimelineNode({ stage, idx, activeStage, seekToStage }: TimelineNodeProps) {
  const isActive = activeStage === idx;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    // Set initial properties: opacity 0, scale 0.7, centered
    gsap.set(tooltip, { opacity: 0, scale: 0.7, transformOrigin: "bottom center", y: -4 });

    const tl = createEaseReverseTimeline({
      reverseTimeScale: 2.2, // faster exit
      easeReverse: "power3.in",
    });

    tl.to(tooltip, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.45,
      ease: "elastic.out(1.1, 0.4)",
    });

    tlRef.current = tl;

    const handleMouseEnter = () => {
      if (tooltip) tooltip.style.display = "block";
      tl.play();
    };

    const handleMouseLeave = () => {
      tl.reverse();
    };

    const btn = buttonRef.current;
    if (btn) {
      btn.addEventListener("mouseenter", handleMouseEnter);
      btn.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (btn) {
        btn.removeEventListener("mouseenter", handleMouseEnter);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      }
      tl.kill();
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={() => seekToStage(idx)}
      className={`group relative flex flex-col items-center justify-center transition-all duration-300 ${
        isActive ? "text-white" : "text-white/40 hover:text-white/70"
      }`}
      aria-label={`Jump lifecycle animation to ${stage.name}`}
    >
      {/* Stage Node Bullet Dot */}
      <span
        className={`mb-1.5 h-2 w-2 rounded-full border transition-all duration-300 ${
          isActive
            ? "border-[#39B54A] bg-[#39B54A] shadow-[0_0_8px_#39B54A] scale-125"
            : "border-white/30 bg-white/10 group-hover:border-white/60"
        }`}
      />
      {/* Stage Code Name */}
      <span className={`font-mono text-[9px] font-bold tracking-wider leading-none transition-all duration-300 ${
        isActive ? "scale-105" : ""
      }`}>
        {stage.name}
      </span>
      {/* Stage Hover Description Tooltip */}
      <span
        ref={tooltipRef}
        style={{ display: "none" }}
        className="absolute bottom-full mb-2 whitespace-nowrap rounded bg-ink px-2 py-0.5 text-[8px] font-medium tracking-wide text-white border border-white/10 shadow-lg pointer-events-none"
      >
        {stage.desc}
      </span>
    </button>
  );
}

export function EngineeringVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // 3D Parallax Tilt Hover Physics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current || !cardRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smoothly tilt card up to 12 degrees
    gsap.to(cardRef.current, {
      rotateY: (x / rect.width) * 12,
      rotateX: -(y / rect.height) * 12,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  const seekToStage = (index: number) => {
    if (!timelineRef.current) return;
    const stage = STAGES[index];
    // Smooth transition to selected stage label
    timelineRef.current.play(stage.label);
  };

  useGSAP(() => {
    if (prefersReducedMotion) {
      // In reduced motion mode, skip timeline and show final market ready state
      gsap.set("#stage-1-idea", { opacity: 0 });
      gsap.set("#stage-2-design", { opacity: 0 });
      gsap.set("#stage-3-pcb", { opacity: 1 });
      gsap.set("#stage-4-prototype", { opacity: 1, y: 0 });
      gsap.set("#stage-5-manufacturing", { opacity: 1 });
      gsap.set("#stage-6-market-glows", { opacity: 1 });
      gsap.set(".pcb-internal-trace, [data-trace]", { strokeDashoffset: 0 });
      gsap.set(".pcb-pad", { scale: 1, opacity: 1 });
      gsap.set("#chip-lid", { y: 0, opacity: 1 });
      gsap.set(".smd-component", { scale: 1, opacity: 1 });
      setActiveStage(5);
      
      // Still apply a simple floating loop if desired, but extremely subtle and slow
      gsap.to("#stage-4-prototype", {
        y: -4,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      return;
    }

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut" }
    });
    timelineRef.current = tl;

    // Reset all elements initially to clear states
    gsap.set("#stage-1-idea", { opacity: 0 });
    gsap.set("#stage-2-design", { opacity: 0 });
    gsap.set("#stage-3-pcb", { opacity: 0 });
    gsap.set("#stage-4-prototype", { opacity: 0, y: 0 });
    gsap.set("#stage-5-manufacturing", { opacity: 0 });
    gsap.set("#stage-6-market-glows", { opacity: 0 });

    // Setup initial dasharrays for sketches
    gsap.set("#wireframe-cube-visible, #wireframe-cube-hidden, #wireframe-details path", {
      strokeDasharray: 400,
      strokeDashoffset: 400
    });
    gsap.set("#cad-lines path, #cad-dimensions path", {
      strokeDasharray: 500,
      strokeDashoffset: 500
    });
    gsap.set(".pcb-internal-trace", {
      strokeDasharray: 300,
      strokeDashoffset: 300
    });

    // ══════════════ STAGE 1: IDEA (1.5s) ══════════════
    tl.addLabel("idea")
      .call(() => setActiveStage(0))
      .to("#stage-1-idea", { opacity: 1, duration: 0.3 })
      .to("#wireframe-cube-visible", { strokeDashoffset: 0, duration: 1.0, ease: "power2.out" }, "<")
      .to("#wireframe-cube-hidden", { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" }, "<0.2")
      .to("#wireframe-details path", { strokeDashoffset: 0, duration: 0.8, stagger: 0.1, ease: "power1.out" }, "<0.3")
      .to(".grid-pattern", { opacity: 0.45, duration: 0.6 }, "<")
      .to({}, { duration: 0.3 }); // hold buffer

    // ══════════════ STAGE 2: DESIGN (2.0s) ══════════════
    tl.addLabel("design")
      .call(() => setActiveStage(1))
      .to("#stage-1-idea", { opacity: 0.4, duration: 0.4 })
      .to("#stage-2-design", { opacity: 1, duration: 0.3 }, "<")
      .to("#cad-lines path", { strokeDashoffset: 0, duration: 1.2, stagger: 0.1, ease: "power1.inOut" }, "<")
      .to("#cad-dimensions path", { strokeDashoffset: 0, duration: 0.8, stagger: 0.08 }, "<0.4")
      .fromTo(".cad-txt", { opacity: 0, y: 4 }, { opacity: 0.8, y: 0, duration: 0.4, stagger: 0.05 }, "<0.5")
      .to({}, { duration: 0.4 }); // hold buffer

    // ══════════════ STAGE 3: PCB DEV (2.0s) ══════════════
    tl.addLabel("pcb")
      .call(() => setActiveStage(2))
      .to(["#stage-1-idea", "#stage-2-design"], { opacity: 0.08, duration: 0.4 })
      .to("#stage-3-pcb", { opacity: 1, duration: 0.4 }, "<")
      .fromTo("#pcb-board-shape", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.3)" }, "<")
      .to(".pcb-internal-trace", { strokeDashoffset: 0, duration: 1.1, stagger: 0.08, ease: "power2.out" }, "<0.2")
      .fromTo(".pcb-pad", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.03, ease: "back.out(1.5)" }, "<0.5")
      .to({}, { duration: 0.3 }); // hold buffer

    // ══════════════ STAGE 4: PROTOTYPE (2.0s) ══════════════
    tl.addLabel("prototype")
      .call(() => setActiveStage(3))
      .to("#stage-4-prototype", { opacity: 1, duration: 0.3 })
      .fromTo("#chip-substrate", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)" }, "<")
      .fromTo("#silicon-die", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, "<0.2")
      .fromTo(".bond-wire", { strokeDasharray: 50, strokeDashoffset: 50 }, { strokeDashoffset: 0, duration: 0.4, stagger: 0.02 }, "<0.1")
      .fromTo("#chip-lid", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "bounce.out" }, "<0.3")
      .fromTo(".smd-component", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.4)" }, "<0.2")
      .to({}, { duration: 0.3 }); // hold buffer

    // ══════════════ STAGE 5: MANUFACTURING (2.0s) ══════════════
    tl.addLabel("manufacturing")
      .call(() => setActiveStage(4))
      .to("#stage-5-manufacturing", { opacity: 1, duration: 0.3 })
      // Laser scan sweep
      .fromTo("#manufacturing-laser", { y: 110, opacity: 0 }, { y: 370, opacity: 1, duration: 1.4, ease: "sine.inOut" }, "<")
      .to("#manufacturing-laser", { opacity: 0, duration: 0.2 })
      // Blinking LEDs
      .fromTo(".indicator-led", { opacity: 0.2 }, { opacity: 1, duration: 0.2, repeat: 5, yoyo: true, stagger: 0.1 }, "<0.1")
      .to(".pcb-internal-trace", { stroke: "#39B54A", strokeWidth: 3, duration: 0.3, repeat: 3, yoyo: true }, "<0.3")
      .to({}, { duration: 0.3 }); // hold buffer

    // ══════════════ STAGE 6: MARKET READY (2.0s) ══════════════
    tl.addLabel("market")
      .call(() => setActiveStage(5))
      .to("#stage-6-market-glows", { opacity: 1, duration: 0.4 })
      .fromTo("#success-pulse-ring", { r: 10, opacity: 0.8 }, { r: 240, opacity: 0, duration: 1.5, ease: "power2.out" }, "<")
      // Start floating the assembled hardware
      .to("#stage-4-prototype", {
        y: -8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      }, "<")
      .to({}, { duration: 1.6 }); // main showcase display hold

    // ══════════════ LOOP TRANSITION (1.5s) ══════════════
    tl.to(".grid-pattern", { opacity: 0.2, duration: 1.0 })
      .to("#stage-6-market-glows", { opacity: 0, duration: 0.8 }, "<")
      .to("#stage-5-manufacturing", { opacity: 0, duration: 0.8 }, "<")
      // Fade out prototype and components while resetting the float offset
      .to("#stage-4-prototype", { opacity: 0, duration: 0.8, y: 0 }, "<")
      .to("#stage-3-pcb", { opacity: 0, duration: 0.8 }, "<")
      .to(["#stage-1-idea", "#stage-2-design"], { opacity: 0, duration: 0.8 }, "<")
      // Reset path offsets
      .set("#wireframe-cube-visible, #wireframe-cube-hidden, #wireframe-details path", { strokeDashoffset: 400 })
      .set("#cad-lines path, #cad-dimensions path", { strokeDashoffset: 500 })
      .set(".pcb-internal-trace", { strokeDashoffset: 300 })
      .set("#stage-4-prototype", { y: 0 }); // hard stop float
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      data-hero-visual
      className="relative mx-auto aspect-[1.02] w-full max-w-[560px] overflow-hidden rounded border border-white/18 pcb-trace p-4 md:p-6 shadow-premium transition-all duration-300 hover:shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      {/* 3D Tilting Card Wrapper */}
      <div
        ref={cardRef}
        className="relative flex h-full flex-col justify-between rounded border border-white/14 bg-white/6 p-4 md:p-5 backdrop-blur-sm transition-shadow duration-300"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Background Grid System */}
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none rounded" aria-hidden="true" />
        
        {/* Scanning Laser Line */}
        <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#39B54A]/40 to-transparent animate-pulse opacity-30 top-1/4 pointer-events-none" />

        {/* Primary SVG Animation Canvas */}
        <div className="relative flex-1 flex items-center justify-center min-h-[300px] md:min-h-[360px] w-full" style={{ transform: "translateZ(30px)" }}>
          <svg
            viewBox="0 0 520 520"
            className="h-full w-full max-h-[380px] md:max-h-[420px]"
            role="img"
            aria-label="Texawave Interactive Hardware Product Development Lifecycle Animation"
          >
            <defs>
              <linearGradient id="metal-grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#f3f4f6" />
                <stop offset="40%" stopColor="#d1d5db" />
                <stop offset="100%" stopColor="#9ca3af" />
              </linearGradient>
              <linearGradient id="copper-grad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
              <linearGradient id="silicon-grad" x1="0" x2="0" y1="1" y2="0">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="gold-grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              
              {/* Green Glow Filter */}
              <filter id="green-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ══════════════ STAGE 1: IDEA (WIRE FRAME CUBE) ══════════════ */}
            <g id="stage-1-idea">
              {/* Grid axes blueprint lines */}
              <g stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.3" fill="none">
                <line x1="260" y1="80" x2="260" y2="400" />
                <line x1="80" y1="240" x2="440" y2="240" />
                <line x1="120" y1="170" x2="400" y2="310" />
                <line x1="120" y1="310" x2="400" y2="170" />
                {/* Tech target rings */}
                <ellipse cx="260" cy="240" rx="160" ry="80" strokeDasharray="3 6" />
                <ellipse cx="260" cy="240" rx="90" ry="45" strokeDasharray="4 4" />
              </g>

              {/* Blueprint coordinate numbers & notations */}
              <g fill="#38bdf8" fillOpacity="0.4" className="font-mono text-[8px]" style={{ userSelect: "none" }}>
                <text x="270" y="90">Z_AXIS: +1.000</text>
                <text x="410" y="250">X_AXIS</text>
                <text x="75" y="250">Y_AXIS</text>
                <text x="365" y="325">R: 42.5mm</text>
                <text x="145" y="325">ANGLE: 45°</text>
                <text x="210" y="120">CONCEPT_BLOCK v0.1</text>
              </g>

              {/* Glowing Wireframe Isometric Cube */}
              <g stroke="#38bdf8" strokeWidth="1.25" fill="none">
                {/* Visible cube contours */}
                <path
                  id="wireframe-cube-visible"
                  d="M 260 180 L 310 205 L 260 230 L 210 205 Z M 210 205 L 210 275 L 260 300 L 310 275 L 310 205 M 260 230 L 260 300"
                />
                {/* Hidden inner lines (slightly transparent) */}
                <path
                  id="wireframe-cube-hidden"
                  strokeOpacity="0.45"
                  strokeDasharray="3 3"
                  d="M 210 275 L 260 250 L 310 275 M 260 250 L 260 180"
                />
              </g>
              {/* Additional coordinate pointers */}
              <g id="wireframe-details" stroke="#06b6d4" strokeWidth="1" fill="none">
                <path d="M 210 205 L 180 190 M 310 205 L 340 190 M 260 300 L 260 325" />
                <circle cx="180" cy="190" r="2.5" fill="#06b6d4" />
                <circle cx="340" cy="190" r="2.5" fill="#06b6d4" />
                <circle cx="260" cy="325" r="2.5" fill="#06b6d4" />
              </g>
            </g>

            {/* ══════════════ STAGE 2: DESIGN (CAD DRAWING) ══════════════ */}
            <g id="stage-2-design">
              {/* Sketched mechanical outline shapes */}
              <g id="cad-lines" stroke="#e0f2fe" strokeWidth="1.5" strokeOpacity="0.8" fill="none">
                {/* Outer enclosure limit */}
                <rect x="141" y="121" width="238" height="238" rx="20" strokeDasharray="6 6" strokeOpacity="0.3" />
                {/* Internal layout limits */}
                <rect x="151" y="132" width="220" height="220" rx="18" />
                {/* Mounting holes & mechanical bounds */}
                <circle cx="170" cy="151" r="8" />
                <circle cx="352" cy="151" r="8" />
                <circle cx="170" cy="333" r="8" />
                <circle cx="352" cy="333" r="8" />
                {/* Board subdivision layout */}
                <path d="M 180 132 V 352 M 340 132 V 352 M 151 310 H 369" strokeOpacity="0.4" />
              </g>

              {/* Engineering dimension lines and labels */}
              <g id="cad-dimensions" stroke="#38bdf8" strokeWidth="0.8" fill="none" opacity="0.85">
                {/* Horizontal width constraint indicator */}
                <path d="M 151 110 H 371 M 151 106 V 114 M 371 106 V 114" />
                {/* Vertical height constraint indicator */}
                <path d="M 395 132 V 352 M 391 132 H 399 M 391 352 H 399" />
              </g>
              <g className="font-mono text-[9px] font-semibold" fill="#e0f2fe" style={{ userSelect: "none" }}>
                <text className="cad-txt" x="236" y="104">50.00 mm</text>
                <text className="cad-txt" x="406" y="246" transform="rotate(90, 406, 246)" textAnchor="middle">50.00 mm</text>
                <text className="cad-txt" x="195" y="165">R8.00</text>
                <text className="cad-txt" x="180" y="325">ENCLOSURE_MAX</text>
              </g>
            </g>

            {/* ══════════════ STAGE 3: PCB DEVELOPMENT (GREEN/COPPER ROUTING) ══════════════ */}
            <g id="stage-3-pcb">
              {/* PCB Base Substrate Card */}
              <rect
                id="pcb-board-shape"
                x="151"
                y="132"
                width="220"
                height="220"
                rx="18"
                fill="#0f2635"
                stroke="#1e3a5f"
                strokeWidth="2.5"
                style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" }}
              />

              {/* Copper mounting pad outlines */}
              <g stroke="url(#copper-grad)" strokeWidth="1.5" fill="none">
                <circle cx="170" cy="151" r="10" />
                <circle cx="352" cy="151" r="10" />
                <circle cx="170" cy="333" r="10" />
                <circle cx="352" cy="333" r="10" />
              </g>

              {/* Elaborate PCB Circuit Traces drawing outward from center (260, 240) */}
              <g strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                {/* Copper traces (Orange) */}
                <g stroke="url(#copper-grad)">
                  <path className="pcb-internal-trace" d="M 260 200 V 165 H 200" />
                  <path className="pcb-internal-trace" d="M 290 240 H 330 V 180" />
                  <path className="pcb-internal-trace" d="M 260 280 V 315 H 320" />
                  <path className="pcb-internal-trace" d="M 230 240 H 180 V 290" />
                </g>
                
                {/* Green/Teal traces (Texawave secondary color palette) */}
                <g stroke="#39B54A">
                  <path className="pcb-internal-trace" d="M 280 220 L 325 175 H 340" />
                  <path className="pcb-internal-trace" d="M 240 220 L 195 175 H 185" />
                  <path className="pcb-internal-trace" d="M 280 260 L 325 305 H 335" />
                  <path className="pcb-internal-trace" d="M 240 260 L 195 305 H 190" />
                </g>
              </g>

              {/* Connection pads (tiny gold solder rings) */}
              <g className="pcb-pad">
                <circle cx="200" cy="165" r="4.5" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" />
                <circle cx="330" cy="180" r="4.5" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" />
                <circle cx="320" cy="315" r="4.5" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" />
                <circle cx="180" cy="290" r="4.5" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" />
                <circle cx="340" cy="175" r="4.5" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" />
                <circle cx="185" cy="175" r="4.5" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" />
                <circle cx="335" cy="305" r="4.5" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" />
                <circle cx="190" cy="305" r="4.5" fill="none" stroke="url(#gold-grad)" strokeWidth="1.5" />
              </g>
            </g>

            {/* ══════════════ EXISTING HERO TRACES (INTEGRATED AND ANIMATED) ══════════════ */}
            {/* These represent the outer structural traces that anchor the illustration */}
            <g id="hero-structural-traces" opacity="0.6">
              <path
                data-trace
                d="M66 110 H190 C230 110 224 170 264 170 H454"
                fill="none"
                stroke="#39B54A"
                strokeWidth="3.5"
                strokeDasharray="520"
                strokeDashoffset="520"
                strokeOpacity="0.85"
              />
              <path
                data-trace
                d="M78 390 H174 C226 390 220 314 276 314 H448"
                fill="none"
                stroke="url(#copper-grad)"
                strokeWidth="3.5"
                strokeDasharray="520"
                strokeDashoffset="520"
                strokeOpacity="0.85"
              />
              <path
                data-trace
                d="M132 66 V210 C132 252 178 254 178 296 V452"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2.5"
                strokeDasharray="520"
                strokeDashoffset="520"
                strokeOpacity="0.75"
              />

              {/* Anchoring terminal pads */}
              <circle cx="66" cy="110" r="7" fill="#39B54A" />
              <circle cx="454" cy="170" r="7" fill="#39B54A" />
              <circle cx="78" cy="390" r="7" fill="#ea580c" />
              <circle cx="448" cy="314" r="7" fill="#ea580c" />
            </g>

            {/* ══════════════ ANIMATED DATA FLOW PARTICLES (ON TRACES) ══════════════ */}
            {/* Highly performant SVG particles using strokeDasharray looping */}
            <g id="pcb-flow-particles" strokeLinecap="round" fill="none" opacity="0.8">
              {/* Outer Trace 1 Green Particle */}
              <path
                d="M66 110 H190 C230 110 224 170 264 170 H454"
                stroke="#ffffff"
                strokeWidth="4"
                strokeDasharray="12 120"
                className="animate-flow-fast"
              />
              {/* Outer Trace 2 Copper Particle */}
              <path
                d="M78 390 H174 C226 390 220 314 276 314 H448"
                stroke="#ffedd5"
                strokeWidth="4"
                strokeDasharray="14 140"
                className="animate-flow-reverse"
              />
              {/* Internal Traces Particles */}
              <path
                d="M 280 220 L 325 175 H 340"
                stroke="#ffffff"
                strokeWidth="3"
                strokeDasharray="10 80"
                className="animate-flow-medium"
              />
              <path
                d="M 230 240 H 180 V 290"
                stroke="#fda4af"
                strokeWidth="3"
                strokeDasharray="10 80"
                className="animate-flow-medium"
              />
            </g>

            {/* ══════════════ STAGE 4: PROTOTYPE (COMPONENTS ASSEMBLY) ══════════════ */}
            {/* The primary 3D chip and surrounding components assembly */}
            <g id="stage-4-prototype">
              {/* Surrounding SMD capacitors & resistors */}
              {/* Gold/Silver terminals, dark bodies */}
              <g className="smd-component" id="smd-1">
                <rect x="175" y="180" width="16" height="8" rx="1.5" fill="#374151" stroke="#9ca3af" strokeWidth="1" />
                <rect x="175" y="180" width="4" height="8" rx="0.5" fill="#d1d5db" />
                <rect x="187" y="180" width="4" height="8" rx="0.5" fill="#d1d5db" />
              </g>
              <g className="smd-component" id="smd-2">
                <rect x="325" y="195" width="16" height="8" rx="1.5" fill="#ea580c" stroke="#f97316" strokeWidth="1" />
                <rect x="325" y="195" width="4" height="8" rx="0.5" fill="#fed7aa" />
                <rect x="337" y="195" width="4" height="8" rx="0.5" fill="#fed7aa" />
              </g>
              <g className="smd-component" id="smd-3">
                <rect x="185" y="270" width="8" height="16" rx="1.5" fill="#374151" stroke="#9ca3af" strokeWidth="1" />
                <rect x="185" y="270" width="8" height="4" rx="0.5" fill="#d1d5db" />
                <rect x="185" y="282" width="8" height="4" rx="0.5" fill="#d1d5db" />
              </g>
              <g className="smd-component" id="smd-4">
                <rect x="315" y="270" width="16" height="8" rx="1.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
                <rect x="315" y="270" width="4" height="8" rx="0.5" fill="#e0f2fe" />
                <rect x="327" y="270" width="4" height="8" rx="0.5" fill="#e0f2fe" />
              </g>

              {/* Central Processor Socket/Substrate */}
              <rect
                id="chip-substrate"
                x="200"
                y="180"
                width="120"
                height="120"
                rx="14"
                fill="#0a1724"
                stroke="url(#copper-grad)"
                strokeWidth="2.5"
                style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.4))" }}
              />

              {/* Surrounding gold pin leads */}
              {Array.from({ length: 7 }).map((_, index) => (
                <rect key={`pin-top-${index}`} x={212 + index * 14} y="172" width="6" height="10" rx="1" fill="url(#gold-grad)" />
              ))}
              {Array.from({ length: 7 }).map((_, index) => (
                <rect key={`pin-bottom-${index}`} x={212 + index * 14} y="298" width="6" height="10" rx="1" fill="url(#gold-grad)" />
              ))}
              {Array.from({ length: 5 }).map((_, index) => (
                <rect key={`pin-left-${index}`} x="192" y={196 + index * 18} width="10" height="6" rx="1" fill="url(#gold-grad)" />
              ))}
              {Array.from({ length: 5 }).map((_, index) => (
                <rect key={`pin-right-${index}`} x="318" y={196 + index * 18} width="10" height="6" rx="1" fill="url(#gold-grad)" />
              ))}

              {/* Silicon Die (Central microchip brain) */}
              <rect
                id="silicon-die"
                x="232"
                y="212"
                width="56"
                height="56"
                rx="6"
                fill="url(#silicon-grad)"
                stroke="#39B54A"
                strokeWidth="1.2"
              />

              {/* Gold wire bonds extending from die to socket substrate */}
              <g stroke="url(#gold-grad)" strokeWidth="0.8" fill="none">
                <path className="bond-wire" d="M 232 220 H 216" />
                <path className="bond-wire" d="M 232 230 H 216" />
                <path className="bond-wire" d="M 232 240 H 216" />
                <path className="bond-wire" d="M 232 250 H 216" />
                <path className="bond-wire" d="M 232 260 H 216" />
                
                <path className="bond-wire" d="M 288 220 H 304" />
                <path className="bond-wire" d="M 288 230 H 304" />
                <path className="bond-wire" d="M 288 240 H 304" />
                <path className="bond-wire" d="M 288 250 H 304" />
                <path className="bond-wire" d="M 288 260 H 304" />

                <path className="bond-wire" d="M 242 212 V 196" />
                <path className="bond-wire" d="M 252 212 V 196" />
                <path className="bond-wire" d="M 268 212 V 196" />
                <path className="bond-wire" d="M 278 212 V 196" />

                <path className="bond-wire" d="M 242 268 V 284" />
                <path className="bond-wire" d="M 252 268 V 284" />
                <path className="bond-wire" d="M 268 268 V 284" />
                <path className="bond-wire" d="M 278 268 V 284" />
              </g>

              {/* Premium Metallic Shield/Lid (dropped onto chip in prototype stage) */}
              <g id="chip-lid">
                {/* Base Metal Body */}
                <rect
                  x="208"
                  y="188"
                  width="104"
                  height="104"
                  rx="10"
                  fill="url(#metal-grad)"
                  stroke="#ffffff"
                  strokeOpacity="0.4"
                  strokeWidth="1.2"
                  style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }}
                />
                {/* Shiny specular diagonal reflections */}
                <path d="M 214 194 L 298 278" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="6" strokeLinecap="round" />
                <path d="M 226 194 L 298 266" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="3" strokeLinecap="round" />
                
                {/* Central heatspreader indentation */}
                <rect x="224" y="204" width="72" height="72" rx="6" fill="#1f2937" fillOpacity="0.08" stroke="#000000" strokeOpacity="0.15" />
                
                {/* Silkscreen text on metal */}
                <g fill="#1f2937" fillOpacity="0.8" className="font-sans font-extrabold tracking-widest text-[9px]" textAnchor="middle" style={{ userSelect: "none" }}>
                  <text x="260" y="235">TEXAWAVE</text>
                  <text x="260" y="248" className="font-mono font-medium tracking-normal text-[6px]">T-CORE INTEGRITY</text>
                  <text x="260" y="258" className="font-mono font-semibold text-[5px]" fillOpacity="0.5">REV 2.4</text>
                </g>
              </g>
            </g>

            {/* ══════════════ STAGE 5: MANUFACTURING (QUALITY TESTS & CALIBRATION) ══════════════ */}
            <g id="stage-5-manufacturing">
              {/* Laser sweep scanner bar */}
              <g id="manufacturing-laser">
                <line x1="140" y1="0" x2="380" y2="0" stroke="#39B54A" strokeWidth="2.5" style={{ filter: "url(#green-glow-filter)" }} />
                <line x1="140" y1="0" x2="380" y2="0" stroke="#ffffff" strokeWidth="1" />
              </g>

              {/* Status Indicator LEDs on the board */}
              {/* Spawns green, blue, and amber blinked flares */}
              <g>
                {/* LED 1: Power indicator (Green) */}
                <circle cx="170" cy="188" r="3.5" fill="#1f2937" />
                <circle className="indicator-led" cx="170" cy="188" r="2.5" fill="#39B54A" style={{ filter: "drop-shadow(0 0 3px #39B54A)" }} />

                {/* LED 2: Status indicator (Blue) */}
                <circle cx="170" cy="204" r="3.5" fill="#1f2937" />
                <circle className="indicator-led" cx="170" cy="204" r="2.5" fill="#38bdf8" style={{ filter: "drop-shadow(0 0 3px #38bdf8)" }} />

                {/* LED 3: TX/RX activity (Orange) */}
                <circle cx="170" cy="220" r="3.5" fill="#1f2937" />
                <circle className="indicator-led" cx="170" cy="220" r="2.5" fill="#f97316" style={{ filter: "drop-shadow(0 0 3px #f97316)" }} />
              </g>
            </g>

            {/* ══════════════ STAGE 6: MARKET READY PRODUCT (PREMIUM FINISH GLOW) ══════════════ */}
            <g id="stage-6-market-glows" opacity="0">
              {/* Emerald Green Core Halo Glow centered on the main CPU */}
              <circle
                id="chip-lid-glow"
                cx="260"
                y="240"
                cy="240"
                r="70"
                fill="#39B54A"
                fillOpacity="0.22"
                style={{ filter: "url(#green-glow-filter)" }}
                pointerEvents="none"
              />

              {/* Success Radiating Pulse Wave */}
              <circle
                id="success-pulse-ring"
                cx="260"
                cy="240"
                r="10"
                fill="none"
                stroke="#39B54A"
                strokeWidth="2.5"
                opacity="0.8"
              />
            </g>
          </svg>
        </div>

        {/* ══════════════ SLEEK STAGE PROGRESS INDICATOR HUD BAR ══════════════ */}
        <div className="relative z-20 mt-4 rounded-xl border border-white/8 bg-black/40 px-3 py-3 backdrop-blur-md">
          {/* Timeline Node Flex Row */}
          <div className="grid grid-cols-6 gap-0.5 text-center relative z-10">
            {STAGES.map((stage, idx) => (
              <TimelineNode
                key={stage.name}
                stage={stage}
                idx={idx}
                activeStage={activeStage}
                seekToStage={seekToStage}
              />
            ))}
          </div>

          {/* Underlying Connecting Timeline Progress Bar */}
          <div className="absolute top-[21px] left-[8.33%] right-[8.33%] h-[1px] bg-white/12 pointer-events-none">
            {/* Active filled line width driven by react activeStage index */}
            <div
              className="h-full bg-gradient-to-r from-[#39B54A] to-[#22d3ee] transition-all duration-500 ease-out shadow-[0_0_4px_#39B54A]"
              style={{ width: `${(activeStage / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Global CSS Inject for performance particles flow */}
      <style jsx global>{`
        @keyframes flowFast {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -264; }
        }
        @keyframes flowReverse {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 280; }
        }
        @keyframes flowMedium {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -180; }
        }

        .animate-flow-fast {
          animation: flowFast 2.4s linear infinite;
        }
        .animate-flow-reverse {
          animation: flowReverse 3.2s linear infinite;
        }
        .animate-flow-medium {
          animation: flowMedium 3.6s linear infinite;
        }
      `}</style>
    </div>
  );
}
