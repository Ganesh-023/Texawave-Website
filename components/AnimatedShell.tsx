"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import {
  createEaseReverseTimeline,
  bindPremiumHover,
  bindServiceCardHover,
  bindProjectCardHover
} from "@/lib/gsap-utils";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedShell({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    // 1. Scroll-linked viewport entry/exits with easeReverse
    const reveal = gsap.utils.toArray<HTMLElement>("[data-reveal]", container);
    const revealTimelines: gsap.core.Timeline[] = [];

    reveal.forEach((element) => {
      const tl = createEaseReverseTimeline({
        reverseTimeScale: 2.5,
        easeReverse: "power3.out"
      });

      tl.fromTo(
        element,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out"
        }
      );

      revealTimelines.push(tl);

      ScrollTrigger.create({
        trigger: element,
        start: "top 82%",
        onEnter: () => tl.play(),
        onLeave: () => tl.reverse(),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => tl.reverse()
      });
    });

    // Hero timeline elements entry
    gsap.fromTo(
      gsap.utils.toArray("[data-hero-line]", container),
      { y: 34, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" }
    );
    
    // Floating animations (properly scoped and will be cleaned up by useGSAP context)
    gsap.to(gsap.utils.toArray("[data-hero-visual]", container), {
      y: -16,
      rotate: 1.5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to(gsap.utils.toArray("[data-trace]", container), {
      strokeDashoffset: 0,
      duration: 2.2,
      stagger: 0.12,
      ease: "power2.out"
    });

    // Counter triggers
    gsap.utils.toArray<HTMLElement>("[data-count]", container).forEach((element) => {
      const end = Number(element.dataset.count || "0");
      const value = { current: 0 };
      gsap.to(value, {
        current: end,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%"
        },
        onUpdate: () => {
          element.textContent = end % 1 === 0 ? Math.round(value.current).toString() : value.current.toFixed(1);
        }
      });
    });

    // Stepper scroll progress
    gsap.utils.toArray<HTMLElement>("[data-step]", container).forEach((element) => {
      gsap.fromTo(
        element,
        { autoAlpha: 0.35, x: -18 },
        {
          autoAlpha: 1,
          x: 0,
          scrollTrigger: {
            trigger: element,
            start: "top 78%",
            end: "bottom 45%",
            scrub: 0.6
          }
        }
      );
    });

    // 2. Global Hover Bindings (Active on mount/SPA changes)
    // 2a. Service Cards
    const serviceCards = container.querySelectorAll(".service-card-premium");
    const serviceCleanups = Array.from(serviceCards).map((card) =>
      bindServiceCardHover(card as HTMLElement, {
        glowColor: "rgba(0, 255, 136, 0.18)"
      })
    );

    // 2b. Project Cards
    const projectCards = container.querySelectorAll(".project-card-premium");
    const projectCleanups = Array.from(projectCards).map((card) =>
      bindProjectCardHover(card as HTMLElement)
    );

    // 2c. Primary Magnetic CTAs
    const ctas = container.querySelectorAll(".cta-magnetic");
    const ctaCleanups = Array.from(ctas).map((cta) =>
      bindPremiumHover(cta as HTMLElement, {
        magnetic: true,
        scale: 1.06,
        ease: "back.out(2)",
        easeReverse: "power2.out"
      })
    );

    // 2d. Standard Premium Buttons
    const btns = container.querySelectorAll(".btn-premium");
    const btnCleanups = Array.from(btns).map((btn) =>
      bindPremiumHover(btn as HTMLElement, {
        magnetic: false,
        scale: 1.05,
        y: -2,
        ease: "back.out(2)",
        easeReverse: "power2.out",
        duration: 0.35
      })
    );

    // Teardowns for custom hover bindings (other timelines/triggers are auto-reverted by useGSAP context)
    return () => {
      revealTimelines.forEach((tl) => tl.kill());
      serviceCleanups.forEach((cleanup) => cleanup && cleanup());
      projectCleanups.forEach((cleanup) => cleanup && cleanup());
      ctaCleanups.forEach((cleanup) => cleanup && cleanup());
      btnCleanups.forEach((cleanup) => cleanup && cleanup());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="gpu-accelerated">
      {children}
    </div>
  );
}
