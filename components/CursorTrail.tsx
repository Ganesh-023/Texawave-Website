"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// High-performance constant pool size (limits max concurrent DOM nodes to 30)
const POOL_SIZE = 30;

// Premium custom SVG vector paths for the 10 tech icons
const TECH_ICONS_SVG = [
  // 1. Code </>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
  // 2. Braces {}
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"></path><path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"></path></svg>`,
  // 3. AI Brain
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z"></path></svg>`,
  // 4. Cloud
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M17.5 19A5.5 5.5 0 0 0 22 13.5a5.4 5.4 0 0 0-4.14-5.26 6.5 6.5 0 0 0-12.72 1.83A5.5 5.5 0 0 0 2 15.5C2 17.5 3.5 19 5.5 19Z"></path></svg>`,
  // 5. Database
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg>`,
  // 6. API (Network Webhook style)
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z"></path><path d="M6 21a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v12a3 3 0 0 0 3 3z"></path><path d="M12 6a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"></path><path d="M12 12a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"></path></svg>`,
  // 7. Mobile App
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="18"></line></svg>`,
  // 8. Analytics (Trending Up)
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
  // 9. Automation (Workflow Schema)
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><rect x="3" y="3" width="6" height="6" rx="1"></rect><rect x="15" y="15" width="6" height="6" rx="1"></rect><rect x="15" y="3" width="6" height="6" rx="1"></rect><path d="M9 6h6"></path><path d="M6 9v6h9"></path></svg>`,
  // 10. Gear
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`
];

const BINARY_CHARS = ["0", "1", "1010", "0101", "1100"];
const AI_KEYWORDS = ["AI", "ML", "DATA", "CLOUD", "API", "DEVOPS", "AUTOMATION"];

export function CursorTrail() {
  const [enabled, setEnabled] = useState(false);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const customCursorRef = useRef<HTMLDivElement>(null);
  const poolIndex = useRef(0);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const spawnThreshold = useRef(90); // Initial spawn threshold distance in pixels

  // 1. Accessibility and Responsive Verification (Desktop Only + Reduced Motion)
  useEffect(() => {
    const checkStatus = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const shouldEnable = isDesktop && !prefersReducedMotion;
      setEnabled(shouldEnable);
      if (shouldEnable) {
        document.body.classList.add("has-custom-cursor");
      } else {
        document.body.classList.remove("has-custom-cursor");
      }
    };

    checkStatus();
    window.addEventListener("resize", checkStatus, { passive: true });
    return () => {
      window.removeEventListener("resize", checkStatus);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  // 2. Attach Interactive Mouse Trail Event Listeners
  useEffect(() => {
    if (!enabled) return;

    let cursorInitialized = false;

    // Window mouse enter/leave tracking
    const handleMouseLeaveWindow = () => {
      if (customCursorRef.current) {
        gsap.to(customCursorRef.current, { scale: 0, opacity: 0, duration: 0.2 });
      }
    };

    const handleMouseEnterWindow = () => {
      if (customCursorRef.current) {
        gsap.to(customCursorRef.current, { scale: 1, opacity: 1, duration: 0.2 });
      }
    };

    // Event delegation for interactive hovering
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest("a, button, [role='button'], .cursor-pointer, .service-card-premium, .project-card-premium, .cta-magnetic, .btn-premium");
      if (interactive) {
        customCursorRef.current?.classList.add("hovered");
      } else {
        customCursorRef.current?.classList.remove("hovered");
      }
    };

    // Retrieve HTML/CSS definitions based on probability: 70% Icons, 20% Binary, 10% AI Keywords
    const getElementContent = (): { html: string; width: string; height: string } => {
      const rand = Math.random();
      
      if (rand < 0.7) {
        // 70% Tech Icons
        const size = Math.floor(28 + Math.random() * 16); // 28px to 44px
        const iconSvg = TECH_ICONS_SVG[Math.floor(Math.random() * TECH_ICONS_SVG.length)];
        return {
          html: `
            <div class="cursor-trail-particle rounded-xl p-2">
              ${iconSvg}
            </div>
          `,
          width: `${size}px`,
          height: `${size}px`
        };
      } else if (rand < 0.9) {
        // 20% Binary Characters
        const char = BINARY_CHARS[Math.floor(Math.random() * BINARY_CHARS.length)];
        const fontSize = Math.floor(12 + Math.random() * 8); // 12px to 20px
        return {
          html: `
            <div class="cursor-trail-particle font-mono font-black tracking-wider rounded-lg px-2 py-0.5 select-none" style="font-size: ${fontSize}px;">
              ${char}
            </div>
          `,
          width: "auto",
          height: "auto"
        };
      } else {
        // 10% AI Keywords (Capsules)
        const keyword = AI_KEYWORDS[Math.floor(Math.random() * AI_KEYWORDS.length)];
        const fontSize = Math.floor(10 + Math.random() * 3); // 10px to 13px
        return {
          html: `
            <div class="cursor-trail-particle font-sans font-black tracking-widest uppercase rounded-full px-3 py-1 select-none whitespace-nowrap" style="font-size: ${fontSize}px;">
              ${keyword}
            </div>
          `,
          width: "auto",
          height: "auto"
        };
      }
    };

    // Perform an elegant single-node GSAP float and fade trail animation
    const animateNode = (el: HTMLDivElement, startX: number, startY: number, config: { html: string; width: string; height: string }, customOffset?: { x: number; y: number }) => {
      // Apply configured size and internal glass styling dynamically
      el.style.width = config.width;
      el.style.height = config.height;
      el.innerHTML = config.html;

      // Calculate path vectors
      const duration = 1.0 + Math.random() * 0.4; // 1 to 1.4 seconds duration
      const scatterX = customOffset ? customOffset.x : (Math.random() - 0.5) * 120; // scatter horizontal
      const floatY = customOffset ? customOffset.y : 100 + Math.random() * 80;      // float downward
      const rotationTarget = (Math.random() - 0.5) * 720;                          // rotate -360 to 360

      const targetX = startX + scatterX;
      const targetY = startY + floatY;

      // Kill any remaining active animations on this recycled DOM node to prevent memory leak/glitch
      gsap.killTweensOf(el);

      // Pre-position element centered perfectly at client pointer
      gsap.set(el, {
        x: startX,
        y: startY,
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        rotation: (Math.random() - 0.5) * 60,
        opacity: 0.8 + Math.random() * 0.2, // opacity variation
        filter: "blur(5px)", // Motion blur start
        visibility: "visible",
        zIndex: Math.floor(9990 + Math.random() * 10)
      });

      // Construct overlapping premium interactive timelines
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(el, { visibility: "hidden" });
        }
      });

      // Elastic zoom scale-in
      tl.to(el, {
        scale: 1,
        duration: 0.55,
        ease: "elastic.out(1, 0.5)"
      });

      // Gradually resolve motion blur as it floats and slows down
      tl.to(el, {
        filter: "blur(0px)",
        duration: 0.45,
        ease: "power2.out"
      }, 0.12);

      // Downward and outward vector movement
      tl.to(el, {
        x: targetX,
        y: targetY,
        rotation: rotationTarget,
        duration: duration,
        ease: "power2.out"
      }, 0);

      // Elegant shrink fadeout for premium depth feeling
      tl.to(el, {
        opacity: 0,
        scale: 0.5,
        duration: 0.35,
        ease: "power2.in"
      }, `-=${0.35}`);
    };

    // Spawn 1 premium element
    const spawnElement = (x: number, y: number) => {
      const idx = poolIndex.current;
      poolIndex.current = (poolIndex.current + 1) % POOL_SIZE;
      const el = elementsRef.current[idx];
      if (!el) return;

      const config = getElementContent();
      animateNode(el, x, y, config);
    };

    // Spawn mini digital burst cluster (3 to 5 nodes spreading radially)
    const spawnCluster = (x: number, y: number) => {
      const clusterSize = Math.floor(3 + Math.random() * 3); // 3 to 5 elements
      
      for (let i = 0; i < clusterSize; i++) {
        const idx = poolIndex.current;
        poolIndex.current = (poolIndex.current + 1) % POOL_SIZE;
        const el = elementsRef.current[idx];
        if (!el) continue;

        const config = getElementContent();
        
        // Calculate radial burst distribution angle and force
        const angle = (i * (2 * Math.PI) / clusterSize) + (Math.random() - 0.5) * 0.5;
        const radius = 60 + Math.random() * 60;
        
        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius + 50; // add extra downward gravity
        
        animateNode(el, x, y, config, { x: offsetX, y: offsetY });
      }
    };

    // Throttled mouse movement callback
    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      // Update custom cursor circle position smoothly
      if (customCursorRef.current) {
        if (!cursorInitialized) {
          gsap.set(customCursorRef.current, { scale: 1, opacity: 1 });
          cursorInitialized = true;
        }
        gsap.to(customCursorRef.current, {
          x: currentX,
          y: currentY,
          duration: 0.08,
          ease: "power2.out",
          overwrite: "auto"
        });
      }

      if (!lastPos.current) {
        lastPos.current = { x: currentX, y: currentY };
        spawnElement(currentX, currentY);
        return;
      }

      // Calculate path distance
      const dx = currentX - lastPos.current.x;
      const dy = currentY - lastPos.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance >= spawnThreshold.current) {
        // 10% chance to trigger explosive radial digital burst
        if (Math.random() < 0.1) {
          spawnCluster(currentX, currentY);
        } else {
          spawnElement(currentX, currentY);
        }
        
        lastPos.current = { x: currentX, y: currentY };
        
        // Vary spawn distance randomly between 80px and 120px
        spawnThreshold.current = 80 + Math.random() * 40;
      }
    };

    // Attach passive mouse listeners for unhindered browser performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mouseover", handleMouseOver);
      
      // Cleanup all GSAP timelines and restore nodes to memory pool cleanly
      elementsRef.current.forEach((el) => {
        if (el) {
          gsap.killTweensOf(el);
          el.style.visibility = "hidden";
        }
      });

      if (customCursorRef.current) {
        gsap.killTweensOf(customCursorRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden" 
      aria-hidden="true"
    >
      {/* Custom Follower Cursor */}
      <div 
        ref={customCursorRef}
        className="custom-cursor"
      />

      {/* Recycled particle elements pool */}
      {Array.from({ length: POOL_SIZE }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            elementsRef.current[i] = el;
          }}
          className="absolute left-0 top-0 pointer-events-none select-none"
          style={{
            visibility: "hidden",
            willChange: "transform, opacity, filter"
          }}
        />
      ))}
    </div>
  );
}
