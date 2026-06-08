"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Quote, ShieldCheck, Star, Rocket, Factory } from "lucide-react";
import { testimonials } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/* ─── Types ──────────────────────────────────────────────────────────────── */

type Testimonial = (typeof testimonials)[number];

/* ─── Initials Avatar ─────────────────────────────────────────────────────── */

function InitialsAvatar({
  initials,
  accent,
  id,
  size = 52,
}: {
  initials: string;
  accent: string;
  id: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      style={{ borderRadius: "50%", flexShrink: 0 }}
    >
      <defs>
        <radialGradient id={`avatar-glow-${id}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="1" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill={`url(#avatar-glow-${id})`} />
      <circle cx="32" cy="32" r="31" fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity="0.4" />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontSize="18"
        fontWeight="800"
        fontFamily="monospace"
        fill={accent}
        letterSpacing="0.5"
      >
        {initials}
      </text>
    </svg>
  );
}

/* ─── Deterministic Drifting Particles ───────────────────────────────────── */

const PARTICLES_DATA = [
  { left: "5%", top: "40%", size: 6, driftX: 40, driftY: -80, duration: "12s", delay: "0s", opacity: 0.4, color: "#008000" },
  { left: "15%", top: "70%", size: 4, driftX: -30, driftY: -60, duration: "16s", delay: "3s", opacity: 0.3, color: "#00D4FF" },
  { left: "25%", top: "20%", size: 5, driftX: 50, driftY: -100, duration: "14s", delay: "1s", opacity: 0.4, color: "#008000" },
  { left: "40%", top: "85%", size: 7, driftX: 20, driftY: -70, duration: "18s", delay: "5s", opacity: 0.3, color: "#00D4FF" },
  { left: "50%", top: "15%", size: 4, driftX: -20, driftY: -90, duration: "15s", delay: "2s", opacity: 0.5, color: "#008000" },
  { left: "60%", top: "75%", size: 5, driftX: 30, driftY: -50, duration: "13s", delay: "4s", opacity: 0.4, color: "#00D4FF" },
  { left: "75%", top: "30%", size: 6, driftX: -40, driftY: -80, duration: "17s", delay: "6s", opacity: 0.3, color: "#008000" },
  { left: "85%", top: "80%", size: 5, driftX: 20, driftY: -60, duration: "14s", delay: "2.5s", opacity: 0.4, color: "#00D4FF" },
  { left: "95%", top: "45%", size: 4, driftX: -30, driftY: -70, duration: "15.5s", delay: "1.5s", opacity: 0.3, color: "#008000" },
  { left: "30%", top: "50%", size: 5, driftX: 30, driftY: -90, duration: "13.5s", delay: "4.5s", opacity: 0.4, color: "#00D4FF" }
];

/* ─── Individual Testimonial Card ────────────────────────────────────────── */

function TestimonialCard({
  testimonial,
  position, // normPos range -2..2
  isMobile,
  isTablet,
  onClick,
}: {
  testimonial: Testimonial;
  position: number;
  isMobile: boolean;
  isTablet: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isActive = position === 0;

  // Compute scale and translation based on responsiveness check
  let translateX = 0;
  let opacity = 0;
  let scale = 0.9;
  let zIndex = 10;
  let pointerEvents: "auto" | "none" = "none";
  let rotateY = 0;

  if (position === 0) {
    translateX = 0;
    scale = 1.05;
    opacity = 1.0;
    zIndex = 30;
    pointerEvents = "auto";
  } else if (position === -1) {
    translateX = isMobile ? -100 : isTablet ? -58 : -95;
    scale = 0.9;
    opacity = isMobile ? 0 : isTablet ? 0.55 : 0.65;
    zIndex = 20;
    pointerEvents = isMobile ? "none" : "auto";
    rotateY = isMobile ? 0 : 15;
  } else if (position === 1) {
    translateX = isMobile ? 100 : isTablet ? 58 : 95;
    scale = 0.9;
    opacity = isMobile ? 0 : isTablet ? 0.55 : 0.65;
    zIndex = 20;
    pointerEvents = isMobile ? "none" : "auto";
    rotateY = isMobile ? 0 : -15;
  } else if (position === -2) {
    translateX = isMobile ? -160 : isTablet ? -110 : -150;
    scale = 0.8;
    opacity = 0;
    zIndex = 10;
    pointerEvents = "none";
    rotateY = isMobile ? 0 : 25;
  } else if (position === 2) {
    translateX = isMobile ? 160 : isTablet ? 110 : 150;
    scale = 0.8;
    opacity = 0;
    zIndex = 10;
    pointerEvents = "none";
    rotateY = isMobile ? 0 : -25;
  } else {
    translateX = position * 120;
    scale = 0.75;
    opacity = 0;
    zIndex = 5;
    pointerEvents = "none";
  }

  const accent = testimonial.accentColor;

  // Integrate hover translation offset in Y coordinate
  const isHoverActive = isActive && hovered;
  const translateYFactor = isHoverActive ? "calc(-50% - 10px)" : "-50%";

  return (
    <div
      onClick={!isActive ? onClick : undefined}
      onMouseEnter={() => isActive && setHovered(true)}
      onMouseLeave={() => isActive && setHovered(false)}
      className={`absolute left-1/2 top-1/2 w-[min(520px,88vw)] select-none ${
        isActive ? "" : "cursor-pointer"
      }`}
      style={{
        transform: `
          translate(-50%, ${translateYFactor})
          translateX(${translateX}%)
          scale(${scale})
          perspective(1200px)
          rotateY(${rotateY}deg)
        `,
        opacity,
        zIndex,
        transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
        pointerEvents,
      }}
    >
      <div
        className="relative overflow-hidden rounded-3xl p-7 md:p-8 backdrop-blur-xl"
        style={{
          background: "var(--testimonial-card-bg)",
          border: isHoverActive
            ? "1px solid #008000"
            : isActive
              ? "1px solid rgba(0, 89, 0, 0.45)"
              : "var(--conveyor-card-border)",
          boxShadow: isHoverActive
            ? "0 20px 40px rgba(0, 89, 0, 0.45), 0 0 15px rgba(0, 89, 0, 0.3), 0 0 0 1px rgba(0, 89, 0, 0.35)"
            : isActive
              ? "0 10px 30px rgba(0, 89, 0, 0.3), 0 0 0 1px rgba(0, 89, 0, 0.2)"
              : "var(--conveyor-card-shadow)",
        }}
      >
        {/* Blueprint corner brackets for engineering identity */}
        {isActive && (
          <>
            <svg className="pointer-events-none absolute left-3.5 top-3.5" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <polyline points="0,16 0,0 16,0" fill="none" stroke="#008000" strokeWidth="1.5" strokeOpacity="0.75" />
            </svg>
            <svg className="pointer-events-none absolute right-3.5 top-3.5" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <polyline points="0,0 16,0 16,16" fill="none" stroke="#008000" strokeWidth="1.5" strokeOpacity="0.75" />
            </svg>
            <svg className="pointer-events-none absolute bottom-3.5 left-3.5" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <polyline points="0,0 0,16 16,16" fill="none" stroke="#008000" strokeWidth="1.5" strokeOpacity="0.75" />
            </svg>
            <svg className="pointer-events-none absolute bottom-3.5 right-3.5" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <polyline points="16,0 16,16 0,16" fill="none" stroke="#008000" strokeWidth="1.5" strokeOpacity="0.75" />
            </svg>
          </>
        )}

        {/* Blueprint ID and Client Badge */}
        <div className="mb-5 flex items-center justify-between">
          <span
            className="font-mono text-[10px] font-bold tracking-[0.2em]"
            style={{ color: isActive ? "#008000" : "var(--text-secondary)", opacity: isActive ? 1 : 0.6 }}
          >
            {testimonial.blueprintId}
          </span>
          {isActive && (
            <span
              className="flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#005900]/15 border border-[#005900]/30 text-[#008000]"
            >
              <ShieldCheck size={11} /> Verified Partner
            </span>
          )}
        </div>

        {/* Stars */}
        <div className="mb-4 flex items-center gap-0.5" aria-label="5 star rating">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              size={13}
              aria-hidden="true"
              style={{ color: "#008000", fill: "#008000", opacity: isActive ? 1 : 0.4 }}
            />
          ))}
        </div>

        {/* Quote symbol */}
        <Quote
          size={24}
          style={{ color: accent, opacity: isActive ? 0.3 : 0.1, marginBottom: "10px" }}
          aria-hidden="true"
        />

        {/* Quote Text */}
        <p
          className="text-[14px] leading-7 md:text-[15px] font-medium"
          style={{
            color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
            transition: "color 0.4s ease",
          }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Technical connection line */}
        <div
          className="my-5 h-px w-full"
          style={{
            background: isActive
              ? "linear-gradient(90deg, transparent, rgba(0, 230, 118, 0.4), transparent)"
              : "linear-gradient(90deg, transparent, var(--border-color), transparent)",
            transition: "background 0.4s ease",
          }}
        />

        {/* Author info */}
        <div className="flex items-center gap-3.5">
          <InitialsAvatar initials={testimonial.initials} accent={accent} id={testimonial.blueprintId} size={44} />
          <div>
            <p className="font-bold text-[14px] text-text-primary leading-tight">{testimonial.name}</p>
            <p className="mt-0.5 text-[11px] font-mono text-text-secondary leading-tight">
              {testimonial.designation}
            </p>
            <p className="mt-0.5 text-[11px] font-bold tracking-wide" style={{ color: accent }}>
              {testimonial.company}
            </p>
          </div>
        </div>

        {/* Hologram active sheen overlay */}
        {isActive && (
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              background: `radial-gradient(ellipse at 20% 20%, ${accent}08 0%, transparent 60%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Main Slider Component ──────────────────────────────────────────────── */

export function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const total = testimonials.length;

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Responsive boundary detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Timer configuration
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % total);
    }, 6000);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = (idx: number) => {
    setActive((idx + total) % total);
    startTimer();
  };

  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  // Touch handlers for responsive swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // GSAP scroll trigger entries and count-up counters
  useGSAP(
    () => {
      // Fade headings on scroll
      gsap.fromTo(
        ".testimonial-fade-el",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testimonial-scroll-trigger",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Count-up stats counters
      const counters = gsap.utils.toArray(".stat-counter-value") as HTMLElement[];
      counters.forEach((counter) => {
        const targetVal = parseFloat(counter.getAttribute("data-target") || "0");
        const isFloat = counter.getAttribute("data-float") === "true";
        const valObj = { value: 0 };
        gsap.to(valObj, {
          value: targetVal,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (isFloat) {
              counter.textContent = valObj.value.toFixed(1);
            } else {
              counter.textContent = Math.floor(valObj.value).toString();
            }
          },
        });
      });
    },
    { scope: statsContainerRef }
  );

  return (
    <div
      ref={statsContainerRef}
      className="relative overflow-hidden testimonial-scroll-trigger border-b border-border-primary"
      style={{ background: "var(--testimonial-bg)" }}
    >
      {/* CSS style block for component specific keyframe animations to keep build self-contained */}
      <style>{`
        @keyframes flow {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulseOpacityFast {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.95; filter: drop-shadow(0 0 6px #008000); }
        }
        @keyframes pulseOpacitySlow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; filter: drop-shadow(0 0 6px #00D4FF); }
        }
        @keyframes drift {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: var(--max-opacity); }
          80% { opacity: var(--max-opacity); }
          100% { transform: translate(var(--drift-x), var(--drift-y)); opacity: 0; }
        }
        .flow-line-1 {
          stroke-dasharray: 12 36;
          animation: flow 9s linear infinite;
        }
        .flow-line-2 {
          stroke-dasharray: 8 24;
          animation: flow 13s linear infinite;
        }
        .node-pulse-fast {
          animation: pulseOpacityFast 1.4s ease-in-out infinite;
        }
        .node-pulse-slow {
          animation: pulseOpacitySlow 2.2s ease-in-out infinite;
        }
        .particle-glow {
          animation: drift var(--duration) linear infinite;
          animation-delay: var(--delay);
        }
      `}</style>

      {/* Blueprint grid (coarse green layout) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 89, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 89, 0, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Blueprint grid (fine cyan layout) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 212, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.02) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />

      {/* Drifting Glow Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {PARTICLES_DATA.map((p, i) => (
          <div
            key={i}
            className="particle-glow absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              filter: `blur(${p.size >= 6 ? "2px" : "1px"})`,
              "--drift-x": `${p.driftX}px`,
              "--drift-y": `${p.driftY}px`,
              "--duration": p.duration,
              "--delay": p.delay,
              "--max-opacity": p.opacity,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Circuit lines behind testimonials cards */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 select-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1400 400"
          preserveAspectRatio="xMidYMid slice"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px]"
        >
          <defs>
            <linearGradient id="glow-line-grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#005900" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="glow-line-grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#005900" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#005900" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Connection trace 1: Main track */}
          <path
            d="M 50,220 L 380,220 L 440,280 L 960,280 L 1020,220 L 1350,220"
            fill="none"
            stroke="url(#glow-line-grad1)"
            strokeWidth="1.5"
            className="flow-line-1"
          />
          {/* Connection trace 2: Secondary offset */}
          <path
            d="M 100,160 L 350,160 L 410,100 L 990,100 L 1050,160 L 1300,160"
            fill="none"
            stroke="url(#glow-line-grad2)"
            strokeWidth="1"
            className="flow-line-2"
          />

          {/* Circuit nodes (dots at key path intersections) */}
          <circle cx="380" cy="220" r="4.5" fill="#008000" className="node-pulse-fast" />
          <circle cx="440" cy="280" r="4" fill="#00D4FF" className="node-pulse-slow" />
          <circle cx="960" cy="280" r="4" fill="#008000" className="node-pulse-fast" />
          <circle cx="1020" cy="220" r="4.5" fill="#00D4FF" className="node-pulse-slow" />

          <circle cx="350" cy="160" r="3.5" fill="#00D4FF" className="node-pulse-slow" />
          <circle cx="410" cy="100" r="4" fill="#008000" className="node-pulse-fast" />
          <circle cx="990" cy="100" r="4" fill="#00D4FF" className="node-pulse-slow" />
          <circle cx="1050" cy="160" r="3.5" fill="#008000" className="node-pulse-fast" />

          {/* Running electrical currents */}
          <circle r="3" fill="#008000">
            <animateMotion dur="6s" repeatCount="indefinite" path="M 50,220 L 380,220 L 440,280 L 960,280 L 1020,220 L 1350,220" />
          </circle>
          <circle r="2.5" fill="#00D4FF">
            <animateMotion dur="8s" repeatCount="indefinite" path="M 1300,160 L 1050,160 L 990,100 L 410,100 L 350,160 L 100,160" />
          </circle>
        </svg>
      </div>

      {/* Content wrapper */}
      <div className="relative mx-auto max-w-[1400px] px-5 py-14 lg:px-8 lg:py-16 z-10 flex flex-col justify-between">
        
        {/* Section heading */}
        <div className="mb-10 text-center">
          <div
            className="testimonial-fade-el mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.22em] border border-[#005900]/30 text-[#008000] bg-[#005900]/15"
          >
            Client Success Stories
          </div>
          <h2 className="testimonial-fade-el mx-auto mt-2 max-w-4xl text-3xl font-black leading-tight text-text-primary md:text-5xl tracking-tight">
            Engineering Partnerships That{" "}
            <span className="text-[#008000] inline-block font-black">
              Deliver Results
            </span>
          </h2>
          <p className="testimonial-fade-el mx-auto mt-4 max-w-3xl text-sm leading-7 md:text-base text-text-secondary">
            From concept development and PCB design to manufacturing support and product sourcing, Texawave helps businesses transform ideas into market-ready products.
          </p>
        </div>

        {/* Compact stats row */}
        <div className="testimonial-fade-el mx-auto mb-12 flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-14 border-y border-border-primary/50 py-5 max-w-4xl w-full">
          {/* Stat 1 */}
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#005900]/15 text-[#008000]">
              <Star size={17} fill="#008000" />
            </span>
            <div>
              <p className="text-xl md:text-2xl font-black text-text-primary font-mono leading-none">
                <span className="stat-counter-value" data-target="5.0" data-float="true">0.0</span>
              </p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary">Client Satisfaction</p>
            </div>
          </div>
          
          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-border-primary/40 self-center" />

          {/* Stat 2 */}
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00D4FF]/10 text-[#00D4FF]">
              <Rocket size={17} />
            </span>
            <div>
              <p className="text-xl md:text-2xl font-black text-text-primary font-mono leading-none">
                <span className="stat-counter-value" data-target="150" data-float="false">0</span>+
              </p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary">Projects Delivered</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-border-primary/40 self-center" />

          {/* Stat 3 */}
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#005900]/15 text-[#008000]">
              <Factory size={17} />
            </span>
            <div>
              <p className="text-xl md:text-2xl font-black text-text-primary font-mono leading-none">
                <span className="stat-counter-value" data-target="50" data-float="false">0</span>+
              </p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary">Manufacturing Partners</p>
            </div>
          </div>
        </div>

        {/* Card slider viewport */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full overflow-visible"
          style={{ height: "350px" }}
        >
          {/* Soft green gradient glow behind active card */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full opacity-35 blur-[90px] transition-all duration-800"
            style={{
              background: "radial-gradient(circle, #005900 0%, transparent 70%)",
            }}
          />

          {testimonials.map((t, idx) => {
            const pos = (idx - active + total) % total;
            const normPos = pos > total / 2 ? pos - total : pos;
            return (
              <TestimonialCard
                key={t.blueprintId}
                testimonial={t}
                position={normPos}
                isMobile={isMobile}
                isTablet={isTablet}
                onClick={() => goTo(idx)}
              />
            );
          })}
        </div>

        {/* Carousel controls indicator and triggers */}
        <div className="mt-4 flex flex-col items-center gap-5">
          {/* Custom Nav dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((t, idx) => (
              <button
                key={t.blueprintId}
                role="tab"
                aria-selected={idx === active}
                aria-label={`Show testimonial ${idx + 1}`}
                onClick={() => goTo(idx)}
                className="rounded-full transition-all duration-500"
                style={{
                  width: idx === active ? "32px" : "8px",
                  height: "8px",
                  background: idx === active
                    ? "#008000"
                    : "rgba(128,128,128,0.25)",
                  boxShadow: idx === active
                    ? "0 0 10px rgba(0, 89, 0, 0.65)"
                    : "none",
                }}
              />
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-bg-card/30 backdrop-blur-sm text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-[#008000]/40 hover:text-[#008000] hover:shadow-[0_0_12px_rgba(0,89,0,0.25)]"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-mono text-xs text-text-secondary opacity-60">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-primary bg-bg-card/30 backdrop-blur-sm text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00D4FF]/40 hover:text-[#00D4FF] hover:shadow-[0_0_12px_rgba(0,212,255,0.15)]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
