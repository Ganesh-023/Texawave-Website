"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface TexawaveLoaderProps {
  onComplete: () => void;
}

export function TexawaveLoader({ onComplete }: TexawaveLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const soundWaveRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const sideTracksRef = useRef<HTMLDivElement>(null);
  
  // SVG refs
  const svgRef = useRef<SVGSVGElement>(null);
  const texaGroupRef = useRef<SVGGElement>(null);
  const waveGroupRef = useRef<SVGGElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const travelingWaveRef = useRef<SVGPathElement>(null);
  const horizontalWaveRef = useRef<SVGPathElement>(null);
  const horizontalWaveGlowRef = useRef<SVGPathElement>(null);
  const gradientRef = useRef<SVGLinearGradientElement>(null);

  useGSAP(() => {
    // 0. Initial set up
    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(soundWaveRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(laserRef.current, { scaleY: 0, opacity: 0 });
    
    const texaPaths = texaGroupRef.current?.querySelectorAll("path") || [];
    const wavePaths = waveGroupRef.current?.querySelectorAll("path") || [];
    const soundBars = soundWaveRef.current?.querySelectorAll(".sound-bar") || [];
    const sideLines = sideTracksRef.current?.querySelectorAll(".track-line") || [];
    
    // Hide letters and wave initially
    gsap.set(texaPaths, { opacity: 0 });
    gsap.set(wavePaths, { opacity: 0 });
    gsap.set(travelingWaveRef.current, { opacity: 0, x: 405 });
    
    // Set horizontal wave dashes (length is approx 800)
    gsap.set([horizontalWaveRef.current, horizontalWaveGlowRef.current], {
      strokeDasharray: 800,
      strokeDashoffset: 800,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        // Trigger completion callback to mount/show main content
        onComplete();
      }
    });

    // ─── Scene 1: Black Screen & Sound Wave Pulse (0.0s - 0.6s) ───
    tl.to(glowRef.current, {
      opacity: 0.45,
      scale: 1.1,
      duration: 0.4,
      ease: "power2.out",
    }, 0.1);
    
    tl.to(soundWaveRef.current, {
      opacity: 1,
      scale: 1.0,
      duration: 0.3,
      ease: "power2.out",
    }, 0.2);

    // Pulse the sound bars
    tl.to(soundBars, {
      scaleY: 1.6,
      duration: 0.3,
      stagger: {
        each: 0.05,
        from: "center",
      },
      repeat: 1,
      yoyo: true,
      ease: "sine.inOut"
    }, 0.2);

    // Fade out Sound Wave
    tl.to(soundWaveRef.current, {
      opacity: 0,
      scale: 0.85,
      duration: 0.25,
      ease: "power2.in",
    }, 0.5);

    tl.to(glowRef.current, {
      opacity: 0,
      scale: 1.3,
      duration: 0.3,
      ease: "power2.in"
    }, 0.5);

    // ─── Scene 2: Vertical Light Sweep (0.6s - 1.1s) ───
    // Rapid vertical expand from center
    tl.fromTo(laserRef.current, 
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.35, ease: "power4.inOut" },
      0.65
    );

    // Side manufacturing accent tracks fade in and slide slightly outwards
    tl.fromTo(sideLines,
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 0.35, duration: 0.4, stagger: 0.06, ease: "power3.out" },
      0.7
    );

    // ─── Scene 3: TEXA Formation (1.0s - 1.8s) ───
    // Animate individual geometric segments of T-E-X-A (as thin wireframes) sliding and rotating into place
    tl.fromTo(texaPaths,
      {
        x: () => gsap.utils.random(-140, 140),
        y: () => gsap.utils.random(-100, 100),
        rotation: () => gsap.utils.random(-90, 90),
        opacity: 0,
        stroke: "#9BDF83",
        strokeWidth: 2,
        transformOrigin: "50% 50%",
        transformBox: "fill-box"
      },
      {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 0.85,
        duration: 0.75,
        stagger: {
          amount: 0.35,
          from: "random"
        },
        ease: "power2.out"
      },
      1.0
    );

    // Solidification of TEXA: thin green lines transform to thick white solid strokes (Space Grotesk bold look)
    tl.to(texaPaths, {
      stroke: "url(#text-sweep-gradient)",
      strokeWidth: 14,
      opacity: 1,
      duration: 0.45,
      ease: "power3.inOut",
      stagger: 0.05
    }, 1.65);

    // Solidification flash/glow pulse
    tl.to(glowRef.current, {
      opacity: 0.55,
      scale: 1.35,
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    }, 1.65);

    // ─── Scene 4: Wave Integration & Accent drawing (1.9s - 2.8s) ───
    // Make the vertical sweeping wave line visible
    tl.set(travelingWaveRef.current, { opacity: 1 }, 1.9);

    // Sweeping data wave from left-to-right (from x=405 to x=800)
    tl.to(travelingWaveRef.current, {
      x: 800,
      duration: 0.9,
      ease: "power2.inOut",
    }, 1.9);

    // Reveal clipping mask for WAVE letters in sync with wave movement
    tl.to(clipRectRef.current, {
      attr: { width: 840 },
      duration: 0.9,
      ease: "power2.inOut",
    }, 1.9);

    // Animate the horizontal wave accent drawing itself (stroke offset moves from 800 to 0)
    tl.to([horizontalWaveRef.current, horizontalWaveGlowRef.current], {
      strokeDashoffset: 0,
      duration: 0.9,
      ease: "power2.inOut",
    }, 1.9);

    // Metallic highlight shine sweep across the entire text
    tl.fromTo(gradientRef.current,
      { attr: { x1: -820, x2: 0 } },
      { attr: { x1: 820, x2: 1640 }, duration: 1.1, ease: "power1.inOut" },
      1.8
    );

    // ─── Scene 5: WAVE Reveal & Solidification (2.0s - 2.8s) ───
    // Letters emerge from the wave as thin green lines, then solidify as the wave passes
    tl.fromTo(wavePaths,
      {
        opacity: 0,
        scale: 0.8,
        y: 15,
        stroke: "#9BDF83",
        strokeWidth: 2,
        transformOrigin: "50% 50%",
        transformBox: "fill-box"
      },
      {
        opacity: 0.85,
        scale: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out"
      },
      2.0
    );

    tl.to(wavePaths, {
      stroke: "url(#text-sweep-gradient)",
      strokeWidth: 14,
      opacity: 1,
      duration: 0.45,
      stagger: 0.08,
      ease: "power3.inOut"
    }, 2.25);

    // ─── Scene 6: Premium Finish (2.8s - 3.8s) ───
    // Hold final logo, fade out vertical scanning line and side tracks
    tl.to(travelingWaveRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.out"
    }, 2.8);

    tl.to(laserRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut"
    }, 2.8);

    tl.to(sideLines, {
      opacity: 0,
      scaleY: 0.8,
      duration: 0.4,
      stagger: 0.04,
      ease: "power2.in"
    }, 2.8);

    // Keep completed logo in high fidelity with glowing backdrop
    tl.to(glowRef.current, {
      opacity: 0.35,
      scale: 1.4,
      duration: 0.8,
      ease: "power2.out"
    }, 2.8);

    // ─── Scene 7: Transition & Logo Scaling (3.8s - 4.5s) ───
    // Smoothly scale down logo slightly
    tl.to(logoWrapperRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.65,
      ease: "power3.inOut"
    }, 3.7);

    // Fade out the full screen container
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.7,
      ease: "power3.inOut"
    }, 3.7);

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black select-none overflow-hidden"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {/* ─── Ambient Glow ─── */}
      <div
        ref={glowRef}
        className="absolute w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none opacity-0"
        style={{
          background: "radial-gradient(circle, rgba(155, 223, 131, 0.4) 0%, rgba(155, 223, 131, 0.1) 50%, rgba(0,0,0,0) 70%)"
        }}
      />

      {/* ─── Scene 1 Sound Wave Glow ─── */}
      <div
        ref={soundWaveRef}
        className="absolute flex items-center justify-center gap-[6px] h-20 opacity-0 pointer-events-none"
      >
        <div className="sound-bar w-[3px] h-[20px] bg-[#2b521e] rounded-full origin-center" />
        <div className="sound-bar w-[3px] h-[35px] bg-[#62ba46] rounded-full origin-center" />
        <div className="sound-bar w-[3px] h-[55px] bg-[#9BDF83] rounded-full origin-center" />
        <div className="sound-bar w-[3px] h-[70px] bg-[#EEEEEE] rounded-full origin-center" />
        <div className="sound-bar w-[3px] h-[55px] bg-[#9BDF83] rounded-full origin-center" />
        <div className="sound-bar w-[3px] h-[35px] bg-[#62ba46] rounded-full origin-center" />
        <div className="sound-bar w-[3px] h-[20px] bg-[#2b521e] rounded-full origin-center" />
      </div>

      {/* ─── Scene 2 Laser scan beam and background engineering tracks ─── */}
      <div
        ref={laserRef}
        className="absolute top-0 bottom-0 w-[1.5px] opacity-0 pointer-events-none origin-center"
        style={{
          left: "50%",
          background: "linear-gradient(to bottom, rgba(155, 223, 131, 0.1), #EEEEEE 20%, #EEEEEE 80%, rgba(155, 223, 131, 0.1))",
          boxShadow: "0 0 15px rgba(155, 223, 131, 0.9), 0 0 30px rgba(155, 223, 131, 0.7)"
        }}
      />
      
      <div ref={sideTracksRef} className="absolute inset-0 pointer-events-none">
        <div className="track-line absolute top-0 bottom-0 w-[1px] bg-[rgba(155,223,131,0.25)] origin-center" style={{ left: "40%" }} />
        <div className="track-line absolute top-0 bottom-0 w-[1px] bg-[rgba(155,223,131,0.15)] origin-center" style={{ left: "45%" }} />
        <div className="track-line absolute top-0 bottom-0 w-[1px] bg-[rgba(155,223,131,0.15)] origin-center" style={{ left: "55%" }} />
        <div className="track-line absolute top-0 bottom-0 w-[1px] bg-[rgba(155,223,131,0.25)] origin-center" style={{ left: "60%" }} />
      </div>

      {/* ─── Main Logo Wrapper ─── */}
      <div
        ref={logoWrapperRef}
        className="relative flex items-center justify-center w-full max-w-[680px] md:max-w-[820px] px-6 h-auto z-10"
      >
        <svg
          ref={svgRef}
          viewBox="0 0 820 130"
          className="w-full h-auto overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>{`
            .loader-path {
              transform-box: fill-box;
              transform-origin: 50% 50%;
            }
          `}</style>
          <defs>
            {/* Soft glow for wave elements */}
            <filter id="wave-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Strong laser glow filter */}
            <filter id="laser-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Sweep Metallic Gradient */}
            <linearGradient id="text-sweep-gradient" ref={gradientRef} gradientUnits="userSpaceOnUse" x1="-820" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#EEEEEE" />
              <stop offset="40%" stopColor="#EEEEEE" />
              <stop offset="50%" stopColor="#9BDF83" />
              <stop offset="65%" stopColor="#EEEEEE" />
              <stop offset="100%" stopColor="#EEEEEE" />
            </linearGradient>

            {/* Reveal Mask for WAVE letters */}
            <clipPath id="reveal-wave-clip">
              <rect ref={clipRectRef} x="0" y="-10" width="405" height="150" />
            </clipPath>
          </defs>

          {/* ─── Horizontal Green Wave Accent ─── */}
          {/* Faint Glow layer */}
          <path
            ref={horizontalWaveGlowRef}
            d="M 20 115 Q 117.5 95, 215 115 T 410 115 T 605 115 T 800 115"
            fill="none"
            stroke="#9BDF83"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#wave-glow)"
            opacity="0.6"
          />
          {/* Main solid path */}
          <path
            ref={horizontalWaveRef}
            d="M 20 115 Q 117.5 95, 215 115 T 410 115 T 605 115 T 800 115"
            fill="none"
            stroke="#2b521e"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* ─── Word "TEXA" (Assembles in Scene 3) ─── */}
          <g ref={texaGroupRef} stroke="#9BDF83" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none">
            {/* Letter T */}
            <g id="loader-letter-t">
              <path className="loader-path" d="M 20 25 L 100 25" />
              <path className="loader-path" d="M 60 25 L 60 95" />
            </g>
            {/* Letter E */}
            <g id="loader-letter-e1">
              <path className="loader-path" d="M 130 25 L 130 95" />
              <path className="loader-path" d="M 130 25 L 190 25" />
              <path className="loader-path" d="M 130 60 L 180 60" />
              <path className="loader-path" d="M 130 95 L 190 95" />
            </g>
            {/* Letter X */}
            <g id="loader-letter-x">
              <path className="loader-path" d="M 220 25 L 290 95" />
              <path className="loader-path" d="M 290 25 L 220 95" />
            </g>
            {/* Letter A */}
            <g id="loader-letter-a1">
              <path className="loader-path" d="M 320 95 L 355 25" />
              <path className="loader-path" d="M 355 25 L 390 95" />
              <path className="loader-path" d="M 333 65 L 377 65" />
            </g>
          </g>

          {/* ─── Word "WAVE" (Emerges via Sweep Mask in Scenes 4-5) ─── */}
          <g clipPath="url(#reveal-wave-clip)">
            <g ref={waveGroupRef} stroke="#9BDF83" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none">
              {/* Letter W */}
              <g id="loader-letter-w">
                <path className="loader-path" d="M 420 25 L 438 95" />
                <path className="loader-path" d="M 438 95 L 455 50" />
                <path className="loader-path" d="M 455 50 L 472 95" />
                <path className="loader-path" d="M 472 95 L 490 25" />
              </g>
              {/* Letter A */}
              <g id="loader-letter-a2">
                <path className="loader-path" d="M 520 95 L 555 25" />
                <path className="loader-path" d="M 555 25 L 590 95" />
                <path className="loader-path" d="M 533 65 L 577 65" />
              </g>
              {/* Letter V */}
              <g id="loader-letter-v">
                <path className="loader-path" d="M 620 25 L 655 95" />
                <path className="loader-path" d="M 655 95 L 690 25" />
              </g>
              {/* Letter E */}
              <g id="loader-letter-e2">
                <path className="loader-path" d="M 720 25 L 720 95" />
                <path className="loader-path" d="M 720 25 L 780 25" />
                <path className="loader-path" d="M 720 60 L 770 60" />
                <path className="loader-path" d="M 720 95 L 780 95" />
              </g>
            </g>
          </g>

          {/* ─── Sweeping Traveling Green Wave Line (Scenes 4-5) ─── */}
          <path
            ref={travelingWaveRef}
            d="M 0 -10 Q 25 30, -25 65 T 0 140"
            fill="none"
            stroke="#9BDF83"
            strokeWidth="3.5"
            filter="url(#laser-glow)"
          />
        </svg>
      </div>
    </div>
  );
}
