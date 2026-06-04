"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { createEaseReverseTimeline, bindPremiumHover } from "@/lib/gsap-utils";
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
  Sun,
  Moon,
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
    label: "Mechanical Engineering",
    href: "/mechanical-engineering",
    icon: Wrench,
    desc: "CAD, assemblies & production-ready systems",
  },
  {
    label: "Electrical Engineering",
    href: "/electrical-engineering",
    icon: CircuitBoard,
    desc: "PCB design, firmware & embedded systems",
  },
  {
    label: "Component Sourcing",
    href: "/component-sourcing",
    icon: PackageCheck,
    desc: "Global sourcing for quality & cost control",
  },
  {
    label: "Software Development",
    href: "/software-iot",
    icon: RadioTower,
    desc: "IoT, dashboards & connected product software",
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

export function Header() {
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

  /* Theme state & logic */
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const localTheme = localStorage.getItem('tw-theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const activeTheme = localTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(activeTheme);

    // Ensure correct classes on documentElement at mount
    if (activeTheme === 'dark') {
      document.documentElement.classList.add('dark', 'dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark', 'dark-theme');
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('tw-theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark', 'dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark', 'dark-theme');
    }
  };

  /* ── Set initial opacity=0 synchronously before paint (GSAP entrance) ── */
  useLayoutEffect(() => {
    if (headerRef.current) gsap.set(headerRef.current, { opacity: 0, y: -20 });
  }, []);

  /* ── GSAP entrance animation ─────────────────────────────────────────── */
  useGSAP(() => {
    gsap.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      delay: 0.12,
    });
  });

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
    ? "border-b border-[#00E676]/20 bg-[#0A0A0A]/95 backdrop-blur-md shadow-premium"
    : "border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-sm";

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
          >
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
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);

              /* ── Our Works small dropdown ── */
              if (item.label === "Our Works" && item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={handleWorksEnter}
                    onMouseLeave={handleWorksLeave}
                  >
                    <button
                      ref={worksButtonRef}
                      type="button"
                      className={[
                        "group relative flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[14.5px] tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:rounded-xl uppercase transition-all duration-300",
                        active || worksOpen
                          ? "navbar-link-active"
                          : "navbar-link",
                      ].join(" ")}
                      aria-haspopup="true"
                      aria-expanded={worksOpen}
                      onClick={() => setWorksOpen((v) => !v)}
                    >
                      {item.label}
                      <ChevronDown
                        ref={worksChevronRef}
                        size={13}
                        className="opacity-70 group-hover:text-[#00E676] transition-colors duration-300"
                        aria-hidden="true"
                      />
                      {/* Center-origin underline */}
                      <span
                        className={[
                          "absolute bottom-1.5 left-4 right-4 h-px bg-[#00E676] origin-center transition-transform duration-300",
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100",
                        ].join(" ")}
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
                        <div className="mx-auto h-3.5 w-3.5 rotate-45 border-l border-t border-[#00E676]/20 bg-[#0A0A0A]" />
                      </div>
                      <div className="overflow-hidden rounded-2xl border border-[#00E676]/20 shadow-premium"
                        style={{
                          background: "rgba(10, 10, 10, 0.98)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(0, 230, 118, 0.2)"
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
                                className="group/item flex items-start gap-3.5 rounded-xl p-3 transition-all duration-300 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676]"
                              >
                                <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#00E676]/10 text-[#00E676] transition-colors duration-200 group-hover/item:bg-[#00E676]/20">
                                  <Icon size={15} aria-hidden="true" />
                                </span>
                                <div>
                                  <p className="text-[13px] font-semibold text-white group-hover/item:text-[#00E676] transition-colors duration-300">
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
                        <div className="border-t border-[#00E676]/10 px-4 py-3">
                          <Link
                            href="/our-works"
                            onClick={() => setWorksOpen(false)}
                            className="group/link flex items-center gap-1.5 text-[12px] font-bold text-[#00E676] transition-all duration-200 hover:opacity-80 focus-visible:outline-none"
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
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                  >
                    <button
                      type="button"
                      className={[
                        "group relative flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[14.5px] tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:rounded-xl uppercase transition-all duration-300",
                        active || megaOpen
                          ? "navbar-link-active"
                          : "navbar-link",
                      ].join(" ")}
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      onClick={() => setMegaOpen((v) => !v)}
                    >
                      {item.label}
                      <ChevronDown
                        ref={servicesChevronRef}
                        size={13}
                        className="opacity-70 group-hover:text-[#00E676] transition-colors duration-300"
                        aria-hidden="true"
                      />
                      <span
                        className={[
                          "absolute bottom-1.5 left-4 right-4 h-px bg-[#00E676] origin-center transition-transform duration-300",
                          active || megaOpen
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100",
                        ].join(" ")}
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
                        <div className="mx-auto h-3.5 w-3.5 rotate-45 border-l border-t border-[#00E676]/20 bg-[#0A0A0A]" />
                      </div>

                      <div className="overflow-hidden rounded-2xl border border-[#00E676]/20 shadow-premium"
                        style={{
                          background: "rgba(10, 10, 10, 0.98)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(0, 230, 118, 0.2)"
                        }}>
                        <div className="p-2">
                          {SERVICES.map((svc) => {
                            const Icon = svc.icon;
                            return (
                              <div
                                key={svc.href}
                                className="group/svc mb-1 last:mb-0 overflow-hidden rounded-xl border border-transparent transition-all duration-200 hover:border-[#00E676]/10 hover:bg-white/5"
                              >
                                {/* Card top: icon + title + desc */}
                                <Link
                                  href={svc.href}
                                  role="menuitem"
                                  onClick={() => setMegaOpen(false)}
                                  className="flex items-start gap-3.5 px-3.5 pt-3.5 pb-2.5 focus-visible:outline-none"
                                >
                                  <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#00E676]/10 text-[#00E676] transition-colors duration-200 group-hover/svc:bg-[#00E676]/20">
                                    <Icon size={15} aria-hidden="true" />
                                  </span>
                                  <div>
                                    <p className="text-[13px] font-semibold text-white group-hover/svc:text-[#00E676] transition-colors duration-200">
                                      {svc.label}
                                    </p>
                                    <p className="mt-0.5 text-[11.5px] leading-snug" style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                                      {svc.desc}
                                    </p>
                                  </div>
                                </Link>

                                {/* Divider + Explore link */}
                                <div className="border-t border-[#00E676]/10 px-3.5 py-2">
                                  <Link
                                    href={svc.href}
                                    onClick={() => setMegaOpen(false)}
                                    className="group/explore flex items-center gap-1.5 text-[11.5px] font-bold text-[#00E676] transition-all duration-200 hover:gap-2.5 focus-visible:outline-none"
                                  >
                                    Explore
                                    <ArrowUpRight
                                      size={12}
                                      className="transition-transform duration-200 group-hover/explore:translate-x-0.5 group-hover/explore:-translate-y-0.5 text-[#00E676]"
                                      aria-hidden="true"
                                    />
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Footer link */}
                        <div className="border-t border-[#00E676]/10 px-4 py-3">
                          <Link
                            href="/services"
                            onClick={() => setMegaOpen(false)}
                            className="group/link flex items-center gap-1.5 text-[12px] font-bold text-[#00E676] transition-all duration-200 hover:opacity-85 focus-visible:outline-none"
                          >
                            View all services
                            <ArrowUpRight
                              size={12}
                              aria-hidden="true"
                              className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 text-[#00E676]"
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
                    "group relative rounded-xl px-4 py-2.5 text-[14.5px] tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:rounded-xl uppercase transition-all duration-300",
                    active ? "navbar-link-active" : "navbar-link",
                  ].join(" ")}
                >
                  {item.label}
                  <span
                    className={[
                      "absolute bottom-1.5 left-4 right-4 h-px bg-[#00E676] origin-center transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    ].join(" ")}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              className={[
                "relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676]",
                theme === "dark"
                  ? "border border-white/20 text-white bg-transparent hover:bg-white/5"
                  : "border border-white bg-white text-[#111111] hover:bg-white/90 shadow-crisp"
              ].join(" ")}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {mounted && (
                <>
                  {/* Sun icon */}
                  <span className={`absolute transform transition-all duration-300 ${theme === "dark" ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
                    }`}>
                    <Sun size={18} />
                  </span>
                  {/* Moon icon */}
                  <span className={`absolute transform transition-all duration-300 ${theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
                    }`}>
                    <Moon size={18} />
                  </span>
                </>
              )}
            </button>

            {/* Book a Meeting CTA (desktop) */}
            <Link
              ref={bookMeetingRef}
              href="/contact"
              id="header-cta-btn"
              className="group relative hidden h-[38px] items-center justify-center overflow-hidden rounded-full border border-[#00E676] bg-transparent px-5 text-[12.5px] font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#00E676] hover:text-black hover:shadow-[0_0_24px_rgba(0,230,118,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676] focus-visible:ring-offset-2 lg:inline-flex"
              aria-label="Book a meeting with Texawave"
            >
              <div className="relative flex items-center justify-center overflow-hidden">
                {/* Non-hover state */}
                <div className="flex items-center gap-1.5 transition-all duration-300 ease-out group-hover:-translate-x-[110%] group-hover:opacity-0">
                  <span>Book a Meeting</span>
                  <ArrowUpRight size={13} className="transition-transform duration-300 text-[#00E676]" />
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
              className="flex h-10 w-10 flex-col items-center justify-center rounded-xl border border-white/20 transition-colors duration-200 hover:bg-white/5 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676]"
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
        className="fixed inset-0 z-40 flex-col bg-[#0A0A0A] lg:hidden"
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
                    "flex items-center rounded-xl px-4 py-3.5 text-[15.5px] font-semibold transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676] uppercase",
                    isActive("/") ? "text-[#00E676]" : "text-white hover:text-[#00E676]",
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
                    "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15.5px] font-semibold transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676] uppercase",
                    mobileWorksOpen ? "text-[#00E676]" : "text-white hover:text-[#00E676]",
                  ].join(" ")}
                  onClick={() => setMobileWorksOpen((v) => !v)}
                  aria-expanded={mobileWorksOpen}
                >
                  Our Works
                  <ChevronDown
                    size={16}
                    className={[
                      "text-[#00E676] transition-transform duration-300",
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
                          className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676]"
                        >
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#00E676]/15 text-[#00E676]">
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
                      className="flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-semibold text-[#00E676] hover:opacity-75 focus-visible:outline-none"
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
                    "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15.5px] font-semibold transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676] uppercase",
                    mobileMegaOpen ? "text-[#00E676]" : "text-white hover:text-[#00E676]",
                  ].join(" ")}
                  onClick={() => setMobileMegaOpen((v) => !v)}
                  aria-expanded={mobileMegaOpen}
                >
                  Services
                  <ChevronDown
                    size={16}
                    className={[
                      "text-[#00E676] transition-transform duration-300",
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
                          className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676]"
                        >
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#00E676]/15 text-[#00E676]">
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
                      className="flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-semibold text-[#00E676] hover:opacity-75 focus-visible:outline-none"
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
              ] as const).map((item) => (
                <li key={item.href} className="mobile-nav-item">
                  <Link
                    href={item.href}
                    onClick={closeMobile}
                    className={[
                      "flex items-center rounded-xl px-4 py-3.5 text-[15.5px] font-semibold transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676] uppercase",
                      isActive(item.href) ? "text-[#00E676] font-bold" : "text-white hover:text-[#00E676]",
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
              className="group flex items-center justify-center gap-2 rounded-2xl bg-[#00E676] px-6 py-4 text-[15px] font-bold text-black shadow-[0_0_32px_rgba(0,230,118,0.25)] transition-all duration-300 hover:shadow-[0_0_52px_rgba(0,230,118,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676] focus-visible:ring-offset-2 focus-visible:ring-offset-black uppercase"
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
    </>
  );
}
