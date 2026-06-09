"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { createEaseReverseTimeline, bindPremiumHover } from "@/lib/gsap-utils";

// Register ScrollTrigger and ScrollToPlugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}
import {
  ChevronDown,
  ArrowUpRight,
  Wrench,
  Layers,
  PenTool,
  RotateCcw,
  Globe,
  Smartphone,
  Palette,
  Cloud,
  Brain,
  Cpu,
  BarChart2,
  Wifi,
  Scissors,
  Zap,
  FlaskConical,
  PackageCheck,
  CircuitBoard,
  RadioTower,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────────── */

type NavItem =
  | { label: string; href: string; hasDropdown?: false }
  | { label: string; href: string; hasDropdown: true; isMega?: boolean };

type DropdownItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  desc: string;
};

/* ─── Data ──────────────────────────────────────────────────────────────── */

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Works", href: "/our-works", hasDropdown: true },
  { label: "Services", href: "/services", hasDropdown: true, isMega: true },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

const MEGA_COLUMNS = [
  {
    title: "Engineering",
    items: [
      { label: "Mechanical Design", href: "/mechanical-engineering", icon: Wrench },
      { label: "Product Development", href: "/services", icon: Layers },
      { label: "CAD Services", href: "/mechanical-engineering", icon: PenTool },
      { label: "Reverse Engineering", href: "/our-works/autoclave-reverse-engineering", icon: RotateCcw },
    ],
  },
  {
    title: "Digital",
    items: [
      { label: "Web Development", href: "/software-iot", icon: Globe },
      { label: "Mobile Development", href: "/software-iot", icon: Smartphone },
      { label: "UI/UX Design", href: "/services", icon: Palette },
      { label: "Cloud Solutions", href: "/software-iot", icon: Cloud },
    ],
  },
  {
    title: "Emerging Tech",
    items: [
      { label: "AI Solutions", href: "/software-iot", icon: Brain },
      { label: "Machine Learning", href: "/software-iot", icon: Cpu },
      { label: "Data Analytics", href: "/software-iot", icon: BarChart2 },
      { label: "IoT", href: "/software-iot", icon: Wifi },
    ],
  },
] as const;

const WORKS: DropdownItem[] = [
  {
    label: "Washer Cutting Machine",
    href: "/our-works/washer-cutting-machine",
    icon: Scissors,
    desc: "Semi-automatic Teflon/Nylon washer cutting SPM",
  },
  {
    label: "Espin Nano Machine",
    href: "/our-works/espin-nano-machine",
    icon: Zap,
    desc: "PLC-driven electrospinning nanofiber platform",
  },
  {
    label: "Autoclave Reverse Engineering",
    href: "/our-works/autoclave-reverse-engineering",
    icon: FlaskConical,
    desc: "Redesigned industrial autoclave for sterilization",
  },
];

const SERVICES: DropdownItem[] = [
  {
    label: "Software Engineering",
    href: "/software-iot",
    icon: RadioTower,
    desc: "IoT, dashboards & connected product software",
  },
  {
    label: "Electrical Engineering",
    href: "/electrical-engineering",
    icon: CircuitBoard,
    desc: "PCB design, firmware & embedded systems",
  },
  {
    label: "Mechanical Engineering",
    href: "/mechanical-engineering",
    icon: Wrench,
    desc: "CAD, assemblies & production-ready systems",
  },
  {
    label: "Procurement",
    href: "/procurement",
    icon: PackageCheck,
    desc: "BOM purchasing, vendor coordination & logistics",
  },
];

/* ─── Hook: scroll threshold ────────────────────────────────────────────── */

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/* ─── Component ─────────────────────────────────────────────────────────── */

interface HeaderProps {
  delayEntrance?: boolean;
}

export function Header({ delayEntrance = false }: HeaderProps) {
  const pathname = usePathname();
  const scrolled = useScrolled(40);

  /* refs */
  const headerRef = useRef<HTMLElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const servicesDropRef = useRef<HTMLDivElement>(null);   // Services compact dropdown
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const worksDropdownRef = useRef<HTMLDivElement>(null);
  const worksButtonRef = useRef<HTMLButtonElement>(null);
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const worksTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Custom easeReverse interaction references
  const servicesChevronRef = useRef<SVGSVGElement>(null);
  const worksChevronRef = useRef<SVGSVGElement>(null);
  const activeDropdownRef = useRef<'services' | 'works' | null>(null);

  const servicesTl = useRef<gsap.core.Timeline | null>(null);
  const worksTl = useRef<gsap.core.Timeline | null>(null);
  const mobileTl = useRef<gsap.core.Timeline | null>(null);

  const bookMeetingRef = useRef<HTMLAnchorElement>(null);

  /* state */
  const [megaOpen, setMegaOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMegaOpen, setMobileMegaOpen] = useState(false);
  const [mobileWorksOpen, setMobileWorksOpen] = useState(false);

  /* scroll sync states */
  const [activeNavItem, setActiveNavItem] = useState<string>("Home");
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);

  /* scroll progress & interaction refs */
  const progressLineRef = useRef<HTMLDivElement>(null);
  const verticalProgressRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const logoPulseRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);



  /* ── Set initial opacity=0 synchronously before paint (GSAP entrance) ── */
  useLayoutEffect(() => {
    if (headerRef.current) gsap.set(headerRef.current, { opacity: 0, y: -20 });
  }, []);

  /* ── GSAP entrance animation ─────────────────────────────────────────── */
  useGSAP(() => {
    if (delayEntrance) return;
    gsap.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      delay: 0.12,
    });
  }, [delayEntrance]);

  /* ── GSAP scroll: shrink height + scale logo ─────────────────────────── */
  useEffect(() => {
    const inner = navInnerRef.current;
    const logo = logoRef.current;
    if (!inner || !logo) return;

    if (scrolled) {
      gsap.to(inner, { height: 72, duration: 0.4, ease: "power2.out" });
      gsap.to(logo, { scale: 0.9, duration: 0.4, ease: "power2.out", transformOrigin: "left center" });
    } else {
      gsap.to(inner, { height: 88, duration: 0.4, ease: "power2.out" });
      gsap.to(logo, { scale: 1, duration: 0.4, ease: "power2.out", transformOrigin: "left center" });
    }
  }, [scrolled]);

  // ── Scroll Progress and Section Tracking ──
  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    // 1. Horizontal Scroll Progress
    if (progressLineRef.current) {
      gsap.fromTo(
        progressLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.1,
          },
        }
      );
    }

    // 2. Vertical Scroll Progress
    if (verticalProgressRef.current) {
      gsap.fromTo(
        verticalProgressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.1,
          },
        }
      );
    }

    // 3. Homepage Section Triggers
    if (pathname === "/") {
      const sections = [
        { id: "home", label: "Home" },
        { id: "our-works", label: "Our Works" },
        { id: "services", label: "Services" },
        { id: "about", label: "About Us" },
        { id: "blog", label: "Blog" },
        { id: "contact", label: "Contact" },
      ];

      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveNavItem(sec.label);
            }
          },
        });
      });
    } else {
      // For non-homepage, lock activeNavItem to current route
      const currentItem = NAV_ITEMS.find((item) => isActive(item.href));
      if (currentItem) {
        setActiveNavItem(currentItem.label);
      }
    }
  }, { dependencies: [pathname], scope: headerRef });

  // ── Sliding Underline Animation ──
  useEffect(() => {
    const underline = underlineRef.current;
    const nav = navRef.current;
    if (!underline || !nav) return;

    const targetLabel = hoveredNavItem || activeNavItem;
    const activeEl = nav.querySelector(`[data-nav-label="${targetLabel}"]`) as HTMLElement;

    if (activeEl) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const padding = 16;
      const targetLeft = activeEl.offsetLeft + padding;
      const targetWidth = activeEl.offsetWidth - padding * 2;

      if (reduceMotion) {
        gsap.set(underline, {
          left: targetLeft,
          width: targetWidth,
          opacity: 1,
        });
      } else {
        gsap.to(underline, {
          left: targetLeft,
          width: targetWidth,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    } else {
      gsap.to(underline, {
        opacity: 0,
        duration: 0.35,
        overwrite: "auto",
      });
    }
  }, [activeNavItem, hoveredNavItem]);

  // ── Wave Pulse Logo Ripple Effect on Section Changes ──
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const pulse = logoPulseRef.current;
    if (!pulse) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.killTweensOf(pulse);
    gsap.fromTo(
      pulse,
      { scale: 0.95, opacity: 0.85 },
      { scale: 1.35, opacity: 0, duration: 0.9, ease: "power2.out" }
    );
  }, [activeNavItem]);

  // ── Smooth Scroll Handler for Desktop Navigation on Homepage ──
  const handleNavClick = (e: React.MouseEvent, href: string, label: string) => {
    if (pathname === "/") {
      const sectionId = href === "/" ? "home" : href.replace("/", "");
      const targetEl = document.getElementById(sectionId);
      if (targetEl) {
        e.preventDefault();
        closeMobile();

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
          window.scrollTo({
            top: targetEl.offsetTop - 80,
            behavior: "auto"
          });
          setActiveNavItem(label);
        } else {
          gsap.to(window, {
            scrollTo: { y: targetEl, offsetY: 80, autoKill: false },
            duration: 1.15,
            ease: "power3.out",
          });
        }
      }
    }
  };

  /* ── GSAP Custom easeReverse Timelines setup ─────────────────────────── */
  useGSAP(() => {
    // 1. Services Timeline (elastic.out entry, power3.out easeReverse exit)
    if (servicesDropRef.current) {
      const drop = servicesDropRef.current;
      const items = drop.querySelectorAll(".group\\/svc");
      const footerLink = drop.querySelector(".border-t");

      servicesTl.current = createEaseReverseTimeline({
        reverseTimeScale: 2.5,
        easeReverse: "power3.out",
        onComplete: () => {
          if (servicesDropRef.current) {
            servicesDropRef.current.style.pointerEvents = "auto";
          }
        },
        onReverseComplete: () => {
          if (servicesDropRef.current) {
            servicesDropRef.current.style.pointerEvents = "none";
            servicesDropRef.current.style.display = "none";
          }
        }
      });

      servicesTl.current
        .set(drop, { display: "block" })
        .fromTo(drop,
          { opacity: 0, scale: 0.9, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "elastic.out(1.1, 0.4)" }
        )
        .fromTo(items,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" },
          "<0.1"
        )
        .fromTo(footerLink,
          { opacity: 0 },
          { opacity: 1, duration: 0.25 },
          "<0.2"
        );

      if (servicesChevronRef.current) {
        servicesTl.current.to(servicesChevronRef.current, {
          rotate: 180,
          duration: 0.35,
          ease: "power2.out"
        }, 0);
      }
    }

    // 2. Works Timeline (elastic.out entry, power3.out easeReverse exit)
    if (worksDropdownRef.current) {
      const drop = worksDropdownRef.current;
      const items = drop.querySelectorAll(".group\\/item");
      const footerLink = drop.querySelector(".border-t");

      worksTl.current = createEaseReverseTimeline({
        reverseTimeScale: 2.5,
        easeReverse: "power3.out",
        onComplete: () => {
          if (worksDropdownRef.current) {
            worksDropdownRef.current.style.pointerEvents = "auto";
          }
        },
        onReverseComplete: () => {
          if (worksDropdownRef.current) {
            worksDropdownRef.current.style.pointerEvents = "none";
            worksDropdownRef.current.style.display = "none";
          }
        }
      });

      worksTl.current
        .set(drop, { display: "block" })
        .fromTo(drop,
          { opacity: 0, scale: 0.9, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "elastic.out(1.1, 0.4)" }
        )
        .fromTo(items,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" },
          "<0.1"
        )
        .fromTo(footerLink,
          { opacity: 0 },
          { opacity: 1, duration: 0.25 },
          "<0.2"
        );

      if (worksChevronRef.current) {
        worksTl.current.to(worksChevronRef.current, {
          rotate: 180,
          duration: 0.35,
          ease: "power2.out"
        }, 0);
      }
    }

    // 3. Mobile Menu Timeline (smooth stagger, power4.out quick easeReverse exit)
    if (mobileMenuRef.current) {
      const menu = mobileMenuRef.current;
      const items = menu.querySelectorAll(".mobile-nav-item");

      mobileTl.current = createEaseReverseTimeline({
        reverseTimeScale: 2.8,
        easeReverse: "power4.out",
        onComplete: () => {
          if (mobileMenuRef.current) {
            mobileMenuRef.current.style.pointerEvents = "auto";
          }
        },
        onReverseComplete: () => {
          if (mobileMenuRef.current) {
            mobileMenuRef.current.style.display = "none";
            mobileMenuRef.current.style.pointerEvents = "none";
          }
        }
      });

      mobileTl.current
        .set(menu, { display: "flex", opacity: 0 })
        .to(menu, { opacity: 1, duration: 0.35, ease: "power3.out" })
        .fromTo(items,
          { opacity: 0, y: -18 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", stagger: 0.08 },
          "<0.05"
        );
    }
  }, { scope: headerRef });

  /* ── Dropdown and Mobile Menu State Observers (Prevent Flickering) ────── */
  useEffect(() => {
    const sTl = servicesTl.current;
    if (!sTl) return;

    if (megaOpen) {
      if (activeDropdownRef.current === 'works') {
        // Close works instantly to avoid overlapping transitions
        if (worksTl.current) {
          worksTl.current.progress(0).pause();
          if (worksDropdownRef.current) {
            worksDropdownRef.current.style.display = "none";
            worksDropdownRef.current.style.pointerEvents = "none";
          }
        }
        sTl.progress(1).play();
        if (servicesDropRef.current) {
          servicesDropRef.current.style.display = "block";
          servicesDropRef.current.style.pointerEvents = "auto";
        }
      } else {
        sTl.play();
      }
      activeDropdownRef.current = 'services';
    } else {
      if (activeDropdownRef.current === 'services') {
        if (worksOpen) {
          sTl.progress(0).pause();
          if (servicesDropRef.current) {
            servicesDropRef.current.style.display = "none";
            servicesDropRef.current.style.pointerEvents = "none";
          }
        } else {
          sTl.reverse();
          activeDropdownRef.current = null;
        }
      }
    }
  }, [megaOpen, worksOpen]);

  useEffect(() => {
    const wTl = worksTl.current;
    if (!wTl) return;

    if (worksOpen) {
      if (activeDropdownRef.current === 'services') {
        // Close services instantly to avoid overlapping transitions
        if (servicesTl.current) {
          servicesTl.current.progress(0).pause();
          if (servicesDropRef.current) {
            servicesDropRef.current.style.display = "none";
            servicesDropRef.current.style.pointerEvents = "none";
          }
        }
        wTl.progress(1).play();
        if (worksDropdownRef.current) {
          worksDropdownRef.current.style.display = "block";
          worksDropdownRef.current.style.pointerEvents = "auto";
        }
      } else {
        wTl.play();
      }
      activeDropdownRef.current = 'works';
    } else {
      if (activeDropdownRef.current === 'works') {
        if (megaOpen) {
          wTl.progress(0).pause();
          if (worksDropdownRef.current) {
            worksDropdownRef.current.style.display = "none";
            worksDropdownRef.current.style.pointerEvents = "none";
          }
        } else {
          wTl.reverse();
          activeDropdownRef.current = null;
        }
      }
    }
  }, [worksOpen, megaOpen]);

  useEffect(() => {
    if (!mobileTl.current) return;
    if (mobileOpen) {
      mobileTl.current.play();
    } else {
      mobileTl.current.reverse();
    }
  }, [mobileOpen]);

  // Bind premium magnet CTA to header meeting button
  useEffect(() => {
    const el = bookMeetingRef.current;
    if (!el) return;
    const cleanup = bindPremiumHover(el, {
      magnetic: true,
      scale: 1.07,
      ease: "back.out(2)",
      easeReverse: "power2.out",
    });
    return cleanup;
  }, []);

  /* ── Hover entry/leave with intent delay ─────────────────────────────── */
  const handleServicesEnter = useCallback(() => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    if (worksTimerRef.current) clearTimeout(worksTimerRef.current);
    setWorksOpen(false);
    setMegaOpen(true);
  }, []);

  const handleServicesLeave = useCallback(() => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    megaTimerRef.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  const handleWorksEnter = useCallback(() => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    if (worksTimerRef.current) clearTimeout(worksTimerRef.current);
    setMegaOpen(false);
    setWorksOpen(true);
  }, []);

  const handleWorksLeave = useCallback(() => {
    if (worksTimerRef.current) clearTimeout(worksTimerRef.current);
    worksTimerRef.current = setTimeout(() => setWorksOpen(false), 150);
  }, []);

  /* ── Outside click: works dropdown ──────────────────────────────────── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        worksDropdownRef.current &&
        !worksDropdownRef.current.contains(e.target as Node) &&
        worksButtonRef.current &&
        !worksButtonRef.current.contains(e.target as Node)
      ) setWorksOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Lock body scroll on mobile menu ─────────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Close dropdowns on resize → desktop ─────────────────────────────── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setMegaOpen(false);
        setWorksOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Helpers ─────────────────────────────────────────────────────────── */
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileMegaOpen(false);
    setMobileWorksOpen(false);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  /* ── Themed Background classes ── */
  const headerBgCls = scrolled
    ? "border-b border-[#005900]/20 bg-black/95 backdrop-blur-md shadow-premium"
    : "border-b border-transparent bg-transparent backdrop-blur-none";

  /* ─────────────────────────────── RENDER ──────────────────────────────── */
  return (
    <>
      {/* ══════════════════════════ HEADER BAR ══════════════════════════ */}
      <header
        ref={headerRef}
        className={[
          "fixed left-0 right-0 top-0 z-[10000] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
          headerBgCls,
        ].join(" ")}
        role="banner"
      >
        {/* Continuous horizontal progress bar */}
        <div className="absolute bottom-0 left-0 h-[2.5px] w-full bg-white/5 overflow-hidden">
          <div
            ref={progressLineRef}
            className="h-full w-full bg-[#005900] origin-left scale-x-0 shadow-[0_0_8px_#005900]"
          />
        </div>

        {/* ── Nav inner (GSAP controls height) ── */}
        <div
          ref={navInnerRef}
          className="mx-auto flex max-w-[1440px] items-center justify-between px-6 lg:px-12"
          style={{ height: 88 }}
        >

          {/* ── Logo ── */}
          <Link
            ref={logoRef}
            href="/"
            className="relative z-10 flex flex-shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:rounded"
            aria-label="Texawave home"
            style={{ transformOrigin: "left center" }}
            onClick={(e) => handleNavClick(e, "/", "Home")}
          >
            {/* Wave pulse ripple element */}
            <div
              ref={logoPulseRef}
              className="absolute inset-0 rounded-lg border border-signal/50 pointer-events-none opacity-0 scale-100"
            />
            <Image
              src="/texawave_logo.png"
              alt="Texawave"
              width={180}
              height={60}
              className="h-[56px] w-auto object-contain"
              priority
            />
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav
            ref={navRef}
            className="hidden items-center gap-0.5 lg:flex relative"
            aria-label="Primary navigation"
          >
            {/* Sliding Underline Bar */}
            <div
              ref={underlineRef}
              className="absolute bottom-1.5 h-[2px] bg-signal shadow-[0_0_8px_var(--primary-green)] pointer-events-none rounded-full"
              style={{
                left: 0,
                width: 0,
                opacity: 0,
              }}
            />

            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);

              /* ── Our Works small dropdown ── */
              if (item.label === "Our Works" && item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      handleWorksEnter();
                      setHoveredNavItem("Our Works");
                    }}
                    onMouseLeave={() => {
                      handleWorksLeave();
                      setHoveredNavItem(null);
                    }}
                  >
                    <button
                      ref={worksButtonRef}
                      type="button"
                      className={[
                        "group relative desktop-nav-link flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[14.5px] tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:rounded-xl uppercase transition-all duration-300",
                        active || worksOpen
                          ? "navbar-link-active"
                          : "navbar-link",
                      ].join(" ")}
                      data-nav-label="Our Works"
                      aria-haspopup="true"
                      aria-expanded={worksOpen}
                      onClick={() => setWorksOpen((v) => !v)}
                    >
                      {item.label}
                      <ChevronDown
                      ref={worksChevronRef}
                      size={13}
                      className="opacity-70 group-hover:text-signal transition-colors duration-300"
                      aria-hidden="true"
                      />
                    </button>

                    {/* Works Dropdown Panel */}
                    <div
                      ref={worksDropdownRef}
                      className="absolute left-1/2 top-full pt-[10px] z-[9999] w-[340px] -translate-x-1/2"
                      style={{ display: "none", opacity: 0, pointerEvents: "none" }}
                      role="menu"
                      aria-label="Our Works submenu"
                    >
                      {/* Caret pip */}
                      <div className="mx-auto mb-[-1px] h-3 w-6 overflow-hidden">
                        <div className="mx-auto h-3.5 w-3.5 rotate-45 border-l border-t border-signal/20 bg-black" />
                      </div>
                      <div className="overflow-hidden rounded-2xl border border-signal/20 shadow-premium"
                        style={{
                          background: "rgba(10, 10, 10, 0.98)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(155, 223, 131, 0.25)"
                        }}>
                        <div className="p-2">
                          {WORKS.map((work) => {
                            const Icon = work.icon;
                            return (
                              <Link
                                key={work.href}
                                href={work.href}
                                role="menuitem"
                                onClick={() => setWorksOpen(false)}
                                className="group/item flex items-start gap-3.5 rounded-xl p-3 transition-all duration-300 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                              >
                                <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-signal/10 text-signal transition-colors duration-200 group-hover/item:bg-signal/20">
                                  <Icon size={15} aria-hidden="true" />
                                </span>
                                <div>
                                  <p className="text-[13px] font-semibold text-white group-hover/item:text-signal transition-colors duration-300">
                                    {work.label}
                                  </p>
                                  <p className="mt-0.5 text-[11.5px] leading-snug" style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                                    {work.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        <div className="border-t border-signal/10 px-4 py-3">
                          <Link
                            href="/our-works"
                            onClick={() => setWorksOpen(false)}
                            className="group/link flex items-center gap-1.5 text-[12px] font-bold text-signal transition-all duration-200 hover:opacity-80 focus-visible:outline-none"
                          >
                            View all works
                            <ArrowUpRight
                              size={12}
                              aria-hidden="true"
                              className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              /* ── Services → Compact dropdown (à la Our Works) ── */
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      handleServicesEnter();
                      setHoveredNavItem("Services");
                    }}
                    onMouseLeave={() => {
                      handleServicesLeave();
                      setHoveredNavItem(null);
                    }}
                  >
                    <button
                      type="button"
                      className={[
                        "group relative desktop-nav-link flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[14.5px] tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:rounded-xl uppercase transition-all duration-300",
                        active || megaOpen
                          ? "navbar-link-active"
                          : "navbar-link",
                      ].join(" ")}
                      data-nav-label="Services"
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      onClick={() => setMegaOpen((v) => !v)}
                    >
                      {item.label}
                      <ChevronDown
                        ref={servicesChevronRef}
                        size={13}
                        className="opacity-70 group-hover:text-signal transition-colors duration-300"
                        aria-hidden="true"
                      />
                    </button>

                    {/* ── Services Dropdown Panel ── */}
                    <div
                      ref={servicesDropRef}
                      className="absolute left-1/2 top-full pt-[10px] z-[9999] w-[380px] -translate-x-1/2"
                      style={{ display: "none", opacity: 0, pointerEvents: "none" }}
                      onMouseEnter={() => {
                        if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
                        setMegaOpen(true);
                      }}
                      onMouseLeave={handleServicesLeave}
                      role="menu"
                      aria-label="Services submenu"
                    >
                      {/* Caret pip */}
                      <div className="mx-auto mb-[-1px] h-3 w-6 overflow-hidden">
                        <div className="mx-auto h-3.5 w-3.5 rotate-45 border-l border-t border-signal/20 bg-black" />
                      </div>

                      <div className="overflow-hidden rounded-2xl border border-signal/20 shadow-premium"
                        style={{
                          background: "rgba(10, 10, 10, 0.98)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(0, 89, 0, 0.25)"
                        }}>
                        <div className="p-2">
                          {SERVICES.map((svc) => {
                            const Icon = svc.icon;
                            return (
                              <div
                                key={svc.href}
                                className="group/svc mb-1 last:mb-0 overflow-hidden rounded-xl border border-transparent transition-all duration-200 hover:border-signal/10 hover:bg-white/5"
                              >
                                {/* Card top: icon + title + desc */}
                                <Link
                                  href={svc.href}
                                  role="menuitem"
                                  onClick={() => setMegaOpen(false)}
                                  className="flex items-start gap-3.5 px-3.5 pt-3.5 pb-2.5 focus-visible:outline-none"
                                >
                                  <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-signal/10 text-signal transition-colors duration-200 group-hover/svc:bg-signal/20">
                                    <Icon size={15} aria-hidden="true" />
                                  </span>
                                  <div>
                                    <p className="text-[13px] font-semibold text-white group-hover/svc:text-signal transition-colors duration-200">
                                      {svc.label}
                                    </p>
                                    <p className="mt-0.5 text-[11.5px] leading-snug" style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                                      {svc.desc}
                                    </p>
                                  </div>
                                </Link>

                                {/* Divider + Explore link */}
                                <div className="border-t border-signal/10 px-3.5 py-2">
                                  <Link
                                    href={svc.href}
                                    onClick={() => setMegaOpen(false)}
                                    className="group/explore flex items-center gap-1.5 text-[11.5px] font-bold text-signal transition-all duration-200 hover:gap-2.5 focus-visible:outline-none"
                                  >
                                    Explore
                                    <ArrowUpRight
                                      size={12}
                                      className="transition-transform duration-200 group-hover/explore:translate-x-0.5 group-hover/explore:-translate-y-0.5 text-signal"
                                      aria-hidden="true"
                                    />
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Footer link */}
                        <div className="border-t border-signal/10 px-4 py-3">
                          <Link
                            href="/services"
                            onClick={() => setMegaOpen(false)}
                            className="group/link flex items-center gap-1.5 text-[12px] font-bold text-signal transition-all duration-200 hover:opacity-85 focus-visible:outline-none"
                          >
                            View all services
                            <ArrowUpRight
                              size={12}
                              aria-hidden="true"
                              className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 text-signal"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              /* ── Regular nav link ── */
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "group relative desktop-nav-link rounded-xl px-4 py-2.5 text-[14.5px] tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:rounded-xl uppercase transition-all duration-300",
                    active ? "navbar-link-active" : "navbar-link",
                  ].join(" ")}
                  data-nav-label={item.label}
                  onMouseEnter={() => setHoveredNavItem(item.label)}
                  onMouseLeave={() => setHoveredNavItem(null)}
                  onClick={(e) => handleNavClick(e, item.href, item.label)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2.5">

            {/* Book a Meeting CTA (desktop) */}
            <Link
              ref={bookMeetingRef}
              href="/contact"
              id="header-cta-btn"
              className="group relative hidden h-[38px] items-center justify-center overflow-hidden rounded-full border border-[#005900] bg-transparent px-5 text-[12.5px] font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#005900] hover:text-white hover:shadow-[0_0_24px_rgba(0,89,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005900] focus-visible:ring-offset-2 lg:inline-flex"
              aria-label="Book a meeting with Texawave"
            >
              <div className="relative flex items-center justify-center overflow-hidden">
                {/* Non-hover state */}
                <div className="flex items-center gap-1.5 transition-all duration-300 ease-out group-hover:-translate-x-[110%] group-hover:opacity-0">
                  <span>Book a Meeting</span>
                  <ArrowUpRight size={13} className="transition-transform duration-300 text-[#008000]" />
                </div>

                {/* Hover state (slides in from right) */}
                <div className="absolute flex items-center gap-1.5 transition-all duration-300 ease-out translate-x-[110%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 whitespace-nowrap">
                  <span>Book a Meeting</span>
                  <ArrowUpRight size={13} className="translate-x-0.5 -translate-y-0.5 text-black" />
                </div>
              </div>
            </Link>

            {/* Hamburger (mobile) — 3-bar morph to X */}
            <button
              type="button"
              id="mobile-menu-toggle"
              className="flex h-10 w-10 flex-col items-center justify-center rounded-xl border border-white/20 transition-colors duration-200 hover:bg-white/5 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005900]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span className="flex flex-col items-center justify-center gap-[5px]">
                <span
                  className={[
                    "block h-[1.5px] w-5 bg-white origin-center transition-all duration-300 ease-out",
                    mobileOpen ? "translate-y-[6.5px] rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block h-[1.5px] w-5 bg-white transition-all duration-300 ease-out",
                    mobileOpen ? "opacity-0 scale-x-0" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block h-[1.5px] w-5 bg-white origin-center transition-all duration-300 ease-out",
                    mobileOpen ? "-translate-y-[6.5px] -rotate-45" : "",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>
        </div>

      </header>

      {/* ══════════════════════ MOBILE MENU ══════════════════════════════ */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 flex-col bg-black lg:hidden"
        style={{ display: "none", opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        {/* Spacer that matches header height */}
        <div className="h-[88px] flex-none border-b border-white/10" />

        <div className="flex flex-1 flex-col overflow-y-auto px-5 py-5">
          <nav aria-label="Mobile navigation links">
            <ul className="space-y-1" role="list">
              {/* ── HOME mobile link ── */}
              <li className="mobile-nav-item">
                <Link
                  href="/"
                  onClick={closeMobile}
                  className={[
                    "flex items-center rounded-xl px-4 py-3.5 text-[15.5px] font-semibold transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal uppercase",
                    isActive("/") ? "text-signal" : "text-white hover:text-signal",
                  ].join(" ")}
                >
                  Home
                </Link>
              </li>

              {/* ── Our Works accordion ── */}
              <li className="mobile-nav-item">
                <button
                  type="button"
                  className={[
                    "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15.5px] font-semibold transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal uppercase",
                    mobileWorksOpen ? "text-signal" : "text-white hover:text-signal",
                  ].join(" ")}
                  onClick={() => setMobileWorksOpen((v) => !v)}
                  aria-expanded={mobileWorksOpen}
                >
                  Our Works
                  <ChevronDown
                    size={16}
                    className={[
                      "text-signal transition-transform duration-300",
                      mobileWorksOpen ? "rotate-180" : "",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={[
                    "overflow-hidden transition-all duration-400 ease-out",
                    mobileWorksOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
                  ].join(" ")}
                >
                  <div className="mt-1 space-y-0.5 pl-2">
                    {WORKS.map((work) => {
                      const Icon = work.icon;
                      return (
                        <Link
                          key={work.href}
                          href={work.href}
                          onClick={closeMobile}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                        >
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-signal/15 text-signal">
                            <Icon size={14} aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-[13.5px] font-semibold text-white">
                              {work.label}
                            </p>
                            <p className="text-[11.5px]" style={{ color: "rgba(255, 255, 255, 0.75)" }}>{work.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                    <Link
                      href="/our-works"
                      onClick={closeMobile}
                      className="flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-semibold text-signal hover:opacity-75 focus-visible:outline-none"
                    >
                      All works <ArrowUpRight size={12} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </li>

              {/* ── Services accordion ── */}
              <li className="mobile-nav-item">
                <button
                  type="button"
                  className={[
                    "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15.5px] font-semibold transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal uppercase",
                    mobileMegaOpen ? "text-signal" : "text-white hover:text-signal",
                  ].join(" ")}
                  onClick={() => setMobileMegaOpen((v) => !v)}
                  aria-expanded={mobileMegaOpen}
                >
                  Services
                  <ChevronDown
                    size={16}
                    className={[
                      "text-signal transition-transform duration-300",
                      mobileMegaOpen ? "rotate-180" : "",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={[
                    "overflow-hidden transition-all duration-400 ease-out",
                    mobileMegaOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0",
                  ].join(" ")}
                >
                  <div className="mt-1 space-y-0.5 pl-2">
                    {SERVICES.map((svc) => {
                      const Icon = svc.icon;
                      return (
                        <Link
                          key={svc.href}
                          href={svc.href}
                          onClick={closeMobile}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                        >
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-signal/15 text-signal">
                            <Icon size={14} aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-[13.5px] font-semibold text-white">
                              {svc.label}
                            </p>
                            <p className="text-[11.5px]" style={{ color: "rgba(255, 255, 255, 0.75)" }}>{svc.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                    <Link
                      href="/services"
                      onClick={closeMobile}
                      className="flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-semibold text-signal hover:opacity-75 focus-visible:outline-none"
                    >
                      All services <ArrowUpRight size={12} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </li>

              {/* ── Regular mobile links ── */}
              {([
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
                { label: "Careers", href: "/careers" },
              ] as const).map((item) => (
                <li key={item.href} className="mobile-nav-item">
                  <Link
                    href={item.href}
                    onClick={closeMobile}
                    className={[
                      "flex items-center rounded-xl px-4 py-3.5 text-[15.5px] font-semibold transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal uppercase",
                      isActive(item.href) ? "text-signal font-bold" : "text-white hover:text-signal",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Divider ── */}
          <div className="my-5 h-px w-full border-b border-white/10" />

          {/* ── CTA button (mobile) ── */}
          <div className="mobile-nav-item">
            <Link
              href="/contact"
              onClick={closeMobile}
              className="group flex items-center justify-center gap-2 rounded-2xl bg-signal px-6 py-4 text-[15px] font-bold text-white shadow-[0_0_20px_rgba(155,223,131,0.35)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(155,223,131,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-black uppercase"
            >
              BOOK A MEETING
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* ── Brand tagline ── */}
          <p className="mt-auto pt-8 text-center text-[10.5px] font-medium tracking-[0.2em] text-white/20 uppercase select-none">
            Texawave · Engineering Excellence
          </p>
        </div>
      </div>

      {/* ══════════════════════ VERTICAL PROGRESS INDICATOR (RIGHT) ══════════════════════════ */}
      <div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-[9999] hidden md:flex flex-col items-center gap-6 pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* Telemetry panel */}
        <div className="text-[9px] font-mono text-[#005900] tracking-[0.2em] font-semibold mb-2 rotate-90 origin-center translate-y-4 whitespace-nowrap">
          SYS_PROG_VAL: ACTIVE
        </div>

        <div className="relative h-[320px] w-[20px] flex flex-col justify-between items-center py-2">
          {/* Background Track Line */}
          <div className="absolute top-0 bottom-0 w-[1px] bg-white/10 left-1/2 -translate-x-1/2" />

          {/* Active Fill Line */}
          <div
            ref={verticalProgressRef}
            className="absolute top-0 w-[2px] bg-[#005900] left-1/2 -translate-x-1/2 origin-top scale-y-0 h-full shadow-[0_0_8px_rgba(0,89,0,0.7)]"
          />

          {/* Section indicators/ticks */}
          {[
            { label: "Home", href: "/" },
            { label: "Our Works", href: "/our-works" },
            { label: "Services", href: "/services" },
            { label: "About Us", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
          ].map((sec, idx) => {
            const isCurrent = activeNavItem === sec.label;
            return (
              <button
                key={sec.label}
                onClick={(e) => handleNavClick(e, sec.href, sec.label)}
                className="group/vert relative flex items-center justify-center w-6 h-6 rounded-full border border-transparent hover:border-[#005900]/40 pointer-events-auto cursor-pointer focus:outline-none transition-colors"
                title={sec.label}
              >
                {/* Pulsing ring around active node */}
                {isCurrent && (
                  <span className="absolute inset-0 rounded-full border border-[#005900] animate-ping opacity-60 scale-75" />
                )}

                {/* Central Node Circle */}
                <div
                  className={[
                    "w-2 h-2 rounded-full border transition-all duration-300",
                    isCurrent
                      ? "bg-[#008000] border-[#008000] scale-125 shadow-[0_0_8px_#008000]"
                      : "bg-black border-white/30 group-hover/vert:border-[#005900]"
                  ].join(" ")}
                />

                {/* Tech label to the left */}
                <div className="absolute right-8 opacity-0 group-hover/vert:opacity-100 transition-all duration-300 bg-black/90 border border-[#005900]/30 px-2.5 py-1 rounded text-[10px] font-mono text-[#EEEEEE] whitespace-nowrap pointer-events-none flex items-center gap-1.5 shadow-premium translate-x-2 group-hover/vert:translate-x-0">
                  <span className="text-[#008000]">0{idx + 1}</span>
                  <span className="w-1 h-1 rounded-full bg-[#008000]" />
                  <span>{sec.label.toUpperCase()}</span>
                </div>

                {/* Label displayed on the sidebar continuously in tiny text */}
                <span className={[
                  "absolute left-8 text-[9px] font-mono transition-colors duration-300",
                  isCurrent ? "text-[#008000] font-bold" : "text-white/30"
                ].join(" ")}>
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-[8px] font-mono text-white/20 tracking-widest mt-2 select-none">
          [0xFF]
        </div>
      </div>
    </>
  );
}
