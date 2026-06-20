"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Settings,
  Factory,
  Check,
  Laptop,
  Sparkles,
  Info,
  Briefcase,
  FileText,
  BookOpen,
  Mail,
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
  { label: "What We Do", href: "/services", hasDropdown: true, isMega: true },
  { label: "What We've Built", href: "/solutions", hasDropdown: true, isMega: true },
  { label: "Resources", href: "/resources", hasDropdown: true },
  { label: "Talk to an Expert", href: "/contact" },
];

const RESOURCES_ITEMS = [
  {
    label: "About Us",
    href: "/about",
    icon: Info,
    desc: "Learn about Texawave, our mission, vision, values, and engineering expertise.",
  },
  {
    label: "Careers",
    href: "/careers",
    icon: Briefcase,
    desc: "Explore internship and career opportunities at Texawave.",
  },
  {
    label: "Case Studies",
    href: "/case-studies",
    icon: FileText,
    desc: "Discover how we help clients transform ideas into successful products.",
  },
  {
    label: "Blog",
    href: "/blog",
    icon: BookOpen,
    desc: "Engineering insights, product development knowledge, and industry trends.",
  },
  {
    label: "Contact Us",
    href: "/contact",
    icon: Mail,
    desc: "Connect with our engineering and business teams.",
  },
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

const MEGA_SERVICES_DATA = [
  {
    id: "product-engineering",
    label: "Product Engineering",
    icon: Settings,
    services: [
      { name: "Industrial Design", href: "/mechanical-engineering", desc: "Form, aesthetics, and user experience design" },
      { name: "Electronics Development", href: "/electrical-engineering", desc: "Schematics, hardware architecture, and circuit design" },
      { name: "PCB Design", href: "/electrical-engineering", desc: "Multi-layer layout, routing, and signal integrity" },
      { name: "Embedded & Firmware", href: "/electrical-engineering", desc: "Microcontroller coding and real-time operating systems" },
      { name: "IoT Development", href: "/software-iot", desc: "Connected sensors, telemetry, and smart devices" },
      { name: "Mechanical Design", href: "/mechanical-engineering", desc: "CAD design, structural analysis, and mechanisms" },
      { name: "Prototyping", href: "/mechanical-engineering", desc: "Rapid 3D printing, CNC machining, and functional mockups" },
      { name: "Testing & Validation", href: "/services", desc: "Reliability testing, environmental tests, and QA" },
    ]
  },
  {
    id: "software-ai",
    label: "Software & AI Development",
    icon: Laptop,
    services: [
      { name: "Custom ERP (Enterprise Resource Planning) Solutions", href: "/software-iot", desc: "Custom enterprise software and backend development" },
      { name: "Web & Mobile Apps", href: "/software-iot", desc: "Modern web platforms and native iOS/Android apps" },
      { name: "Cloud Solutions", href: "/software-iot", desc: "AWS/Azure cloud architecture, serverless, and databases" },
      { name: "AI Solutions", href: "/software-iot", desc: "Custom AI models, integration, and natural language" },
      { name: "Data Analytics", href: "/software-iot", desc: "Data pipelines, visualization, and business intelligence" }
    ]
  },
  {
    id: "procurement",
    label: "Procurement Services",
    icon: PackageCheck,
    services: [
      { name: "Component Sourcing", href: "/procurement", desc: "Global sourcing of components and alternative options" },
      { name: "BOM Optimization", href: "/procurement", desc: "Bill of Materials cost reduction and lifecycle review" },
      { name: "Supply Chain Management", href: "/procurement", desc: "Logistics, inventory management, and risk mitigation" }
    ]
  },
  {
    id: "manufacturing",
    label: "Manufacturing Support",
    icon: Factory,
    services: [
      { name: "DFM/DFA", href: "/procurement", desc: "Design for Manufacturing & Assembly optimization" },
      { name: "Production Transfer", href: "/procurement", desc: "Transition from prototype to high-volume assembly lines" },
      { name: "Production Test Solutions", href: "/electrical-engineering", desc: "Production line functional testers and test jigs" },
      { name: "Scale-up Support", href: "/procurement", desc: "Manufacturing scaling, quality control, and auditing" }
    ]
  }
];

const MEGA_SOLUTIONS_DATA = [
  {
    id: "consumer-electronics",
    label: "Consumer Electronics",
    icon: Smartphone,
    featured: {
      title: "20W PD Charger Design",
      desc: "Ultra-compact USB-C Power Delivery wall charger featuring high-efficiency GaN power stage and thermal protection.",
      image: "/pd-charger.webp",
      cta: "/our-works"
    },
    items: [
      { name: "Smart Devices", href: "/solutions/consumer-electronics" },
      { name: "Wearable Products", href: "/solutions/consumer-electronics" },
      { name: "Home Automation", href: "/solutions/consumer-electronics" },
      { name: "Mobile Accessories", href: "/solutions/consumer-electronics" },
    ]
  },
  {
    id: "industrial-iot",
    label: "Industrial Solutions",
    icon: Factory,
    featured: {
      title: "IoT Industrial Gateway",
      desc: "Rugged multi-protocol edge gateway with RS485, Modbus, Wi-Fi, and LTE connectivity for real-time telemetry.",
      image: "/industrial-gateway.webp",
      cta: "/our-works"
    },
    items: [
      { name: "IoT Monitoring Systems", href: "/solutions/industrial-iot" },
      { name: "Automation Controllers", href: "/solutions/industrial-iot" },
      { name: "Data Acquisition Systems", href: "/solutions/industrial-iot" },
      { name: "Predictive Maintenance", href: "/solutions/industrial-iot" },
    ]
  },
  {
    id: "medical-devices",
    label: "Medical Devices",
    icon: FlaskConical,
    featured: {
      title: "Diabetic Neuropathy Device",
      desc: "Non-invasive diagnostic device for early detection of peripheral neuropathy in diabetic patients.",
      image: "/diabetic-neuropathy.webp",
      cta: "/our-works"
    },
    items: [
      { name: "Diagnostic Equipment", href: "/solutions/medical-devices" },
      { name: "Healthcare IoT", href: "/solutions/medical-devices" },
      { name: "Patient Monitoring", href: "/solutions/medical-devices" },
      { name: "Assistive Devices", href: "/solutions/medical-devices" },
    ]
  },
  {
    id: "automotive-electronics",
    label: "Automotive Electronics",
    icon: CircuitBoard,
    featured: {
      title: "Smart Dashboard Systems",
      desc: "Interactive dashboard console with integrated CAN bus communication, navigation, and vehicle health telemetry.",
      image: "/smart-dashboard.webp",
      cta: "/our-works"
    },
    items: [
      { name: "EV Components", href: "/solutions/automotive-electronics" },
      { name: "Vehicle Monitoring", href: "/solutions/automotive-electronics" },
      { name: "Smart Dashboard Systems", href: "/solutions/automotive-electronics" },
      { name: "Connectivity Solutions", href: "/solutions/automotive-electronics" },
    ]
  },
  {
    id: "featured-projects",
    label: "Featured Projects",
    icon: Sparkles,
    featured: {
      title: "Smart Cane Device",
      desc: "An assistive smart cane with ultrasonic obstacle detection, haptic feedback, and GPS tracking.",
      image: "/smart-cane.webp",
      cta: "/our-works"
    },
    items: [
      { name: "Smart Cane Device", href: "/our-works" },
      { name: "IoT Industrial Gateway", href: "/our-works" },
      { name: "Wireless Smart Switch", href: "/our-works" },
      { name: "Diabetic Neuropathy Device", href: "/our-works" },
      { name: "20W PD Charger Design", href: "/our-works" },
    ]
  }
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
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const worksDropdownRef = useRef<HTMLDivElement>(null);
  const worksButtonRef = useRef<HTMLButtonElement>(null);
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const worksTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const solutionsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resourcesTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Custom easeReverse interaction references
  const worksChevronRef = useRef<SVGSVGElement>(null);

  const worksTl = useRef<gsap.core.Timeline | null>(null);
  const mobileTl = useRef<gsap.core.Timeline | null>(null);

  const bookMeetingRef = useRef<HTMLAnchorElement>(null);

  /* state */
  const [megaOpen, setMegaOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMegaOpen, setMobileMegaOpen] = useState(false);
  const [mobileWorksOpen, setMobileWorksOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("product-engineering");
  const [activeSolutionCategory, setActiveSolutionCategory] = useState<string>("consumer-electronics");
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(null);

  /* scroll sync states */
  const [activeNavItem, setActiveNavItem] = useState<string>("Home");
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);

  /* scroll progress & interaction refs */
  const progressLineRef = useRef<HTMLDivElement>(null);
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

    // 2. Vertical Scroll Progress disabled

    // 3. Homepage Section Triggers
    if (pathname === "/") {
      const sections = [
        { id: "home", label: "Home" },
        { id: "our-works", label: "What We've Built" },
        { id: "services", label: "What We Do" },
        { id: "about", label: "Resources" },
        { id: "contact", label: "Talk to an Expert" },
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
      let sectionId = href === "/" ? "home" : href.replace("/", "");
      if (sectionId === "solutions") sectionId = "our-works";
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

  /* ── Dropdown State Coordination (Services Mega Menu & Works Dropdown) ── */
  useEffect(() => {
    if (megaOpen) {
      setWorksOpen(false);
      setSolutionsOpen(false);
      setResourcesOpen(false);
      if (worksTl.current) {
        worksTl.current.progress(0).pause();
        if (worksDropdownRef.current) {
          worksDropdownRef.current.style.display = "none";
          worksDropdownRef.current.style.pointerEvents = "none";
        }
      }
    }
  }, [megaOpen]);

  useEffect(() => {
    if (solutionsOpen) {
      setMegaOpen(false);
      setWorksOpen(false);
      setResourcesOpen(false);
      if (worksTl.current) {
        worksTl.current.progress(0).pause();
        if (worksDropdownRef.current) {
          worksDropdownRef.current.style.display = "none";
          worksDropdownRef.current.style.pointerEvents = "none";
        }
      }
    }
  }, [solutionsOpen]);

  useEffect(() => {
    if (resourcesOpen) {
      setMegaOpen(false);
      setWorksOpen(false);
      setSolutionsOpen(false);
      if (worksTl.current) {
        worksTl.current.progress(0).pause();
        if (worksDropdownRef.current) {
          worksDropdownRef.current.style.display = "none";
          worksDropdownRef.current.style.pointerEvents = "none";
        }
      }
    }
  }, [resourcesOpen]);

  useEffect(() => {
    const wTl = worksTl.current;
    if (!wTl) return;

    if (worksOpen) {
      setMegaOpen(false);
      setSolutionsOpen(false);
      setResourcesOpen(false);
      wTl.play();
    } else {
      wTl.reverse();
    }
  }, [worksOpen]);

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
    if (solutionsTimerRef.current) clearTimeout(solutionsTimerRef.current);
    if (resourcesTimerRef.current) clearTimeout(resourcesTimerRef.current);
    setWorksOpen(false);
    setSolutionsOpen(false);
    setResourcesOpen(false);
    setMegaOpen(true);
  }, []);

  const handleServicesLeave = useCallback(() => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    megaTimerRef.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  const handleWorksEnter = useCallback(() => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    if (worksTimerRef.current) clearTimeout(worksTimerRef.current);
    if (solutionsTimerRef.current) clearTimeout(solutionsTimerRef.current);
    if (resourcesTimerRef.current) clearTimeout(resourcesTimerRef.current);
    setMegaOpen(false);
    setSolutionsOpen(false);
    setResourcesOpen(false);
    setWorksOpen(true);
  }, []);

  const handleWorksLeave = useCallback(() => {
    if (worksTimerRef.current) clearTimeout(worksTimerRef.current);
    worksTimerRef.current = setTimeout(() => setWorksOpen(false), 150);
  }, []);

  const handleSolutionsEnter = useCallback(() => {
    if (solutionsTimerRef.current) clearTimeout(solutionsTimerRef.current);
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    if (worksTimerRef.current) clearTimeout(worksTimerRef.current);
    if (resourcesTimerRef.current) clearTimeout(resourcesTimerRef.current);
    setMegaOpen(false);
    setWorksOpen(false);
    setResourcesOpen(false);
    setSolutionsOpen(true);
  }, []);

  const handleSolutionsLeave = useCallback(() => {
    if (solutionsTimerRef.current) clearTimeout(solutionsTimerRef.current);
    solutionsTimerRef.current = setTimeout(() => setSolutionsOpen(false), 150);
  }, []);

  const handleResourcesEnter = useCallback(() => {
    if (resourcesTimerRef.current) clearTimeout(resourcesTimerRef.current);
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    if (worksTimerRef.current) clearTimeout(worksTimerRef.current);
    if (solutionsTimerRef.current) clearTimeout(solutionsTimerRef.current);
    setMegaOpen(false);
    setWorksOpen(false);
    setSolutionsOpen(false);
    setResourcesOpen(true);
  }, []);

  const handleResourcesLeave = useCallback(() => {
    if (resourcesTimerRef.current) clearTimeout(resourcesTimerRef.current);
    resourcesTimerRef.current = setTimeout(() => setResourcesOpen(false), 150);
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

  /* ── Keyboard Accessibility: Escape closes menus ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setWorksOpen(false);
        setSolutionsOpen(false);
        setResourcesOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
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
        setSolutionsOpen(false);
        setResourcesOpen(false);
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
    setMobileSolutionsOpen(false);
    setMobileResourcesOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/solutions") {
      return pathname === "/solutions" || pathname.startsWith("/solutions/") || pathname === "/our-works" || pathname.startsWith("/our-works/");
    }
    if (href === "/resources") {
      return (
        pathname === "/about" || pathname.startsWith("/about/") ||
        pathname === "/careers" || pathname.startsWith("/careers/") ||
        pathname === "/case-studies" || pathname.startsWith("/case-studies/") ||
        pathname === "/blog" || pathname.startsWith("/blog/")
      );
    }
    return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
  };

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
          className="mx-auto w-full max-w-[1440px] flex items-center justify-between px-[clamp(1.5rem,4vw,3rem)]"
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
            {/* Wave pulse ripple element */}
            <div
              ref={logoPulseRef}
              className="absolute inset-0 rounded-lg border border-signal/50 pointer-events-none opacity-0 scale-100"
            />
            <Image
              src="/texawave_logo.webp"
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
                        "group relative desktop-nav-link flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[15px] tracking-[0.02em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:rounded-xl uppercase transition-all duration-300",
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

              /* ── Services → Mega Menu Button ── */
              if (item.label === "What We Do") {
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={[
                      "group relative desktop-nav-link flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[14.5px] tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:rounded-xl uppercase transition-all duration-300",
                      active || megaOpen
                        ? "navbar-link-active"
                        : "navbar-link",
                    ].join(" ")}
                    data-nav-label="What We Do"
                    onMouseEnter={() => {
                      handleServicesEnter();
                      setHoveredNavItem("What We Do");
                    }}
                    onMouseLeave={() => {
                      handleServicesLeave();
                      setHoveredNavItem(null);
                    }}
                    onClick={() => {
                      setWorksOpen(false);
                      setSolutionsOpen(false);
                      setMegaOpen((v) => !v);
                    }}
                    aria-haspopup="true"
                    aria-expanded={megaOpen}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={[
                        "opacity-70 group-hover:text-signal transition-transform duration-300",
                        megaOpen ? "rotate-180 text-signal" : "",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </button>
                );
              }

              /* ── Solutions → Mega Menu Link ── */
              if (item.label === "What We've Built") {
                return (
                  <Link
                    key={item.label}
                    href="/solutions"
                    className={[
                      "group relative desktop-nav-link flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[14.5px] tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:rounded-xl uppercase transition-all duration-300",
                      active || solutionsOpen
                        ? "navbar-link-active"
                        : "navbar-link",
                    ].join(" ")}
                    data-nav-label="What We've Built"
                    onMouseEnter={() => {
                      handleSolutionsEnter();
                      setHoveredNavItem("What We've Built");
                    }}
                    onMouseLeave={() => {
                      handleSolutionsLeave();
                      setHoveredNavItem(null);
                    }}
                    onClick={() => {
                      setWorksOpen(false);
                      setMegaOpen(false);
                      setSolutionsOpen(false);
                    }}
                    aria-haspopup="true"
                    aria-expanded={solutionsOpen}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={[
                        "opacity-70 group-hover:text-signal transition-transform duration-300",
                        solutionsOpen ? "rotate-180 text-signal" : "",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </Link>
                );
              }

              /* ── Resources → Dropdown Button ── */
              if (item.label === "Resources") {
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={[
                      "group relative desktop-nav-link flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[14.5px] tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:rounded-xl uppercase transition-all duration-300",
                      active || resourcesOpen
                        ? "navbar-link-active"
                        : "navbar-link",
                    ].join(" ")}
                    data-nav-label="Resources"
                    onMouseEnter={() => {
                      handleResourcesEnter();
                      setHoveredNavItem("Resources");
                    }}
                    onMouseLeave={() => {
                      handleResourcesLeave();
                      setHoveredNavItem(null);
                    }}
                    onClick={() => {
                      setWorksOpen(false);
                      setMegaOpen(false);
                      setSolutionsOpen(false);
                      setResourcesOpen((v) => !v);
                    }}
                    aria-haspopup="true"
                    aria-expanded={resourcesOpen}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={[
                        "opacity-70 group-hover:text-signal transition-transform duration-300",
                        resourcesOpen ? "rotate-180 text-signal" : "",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </button>
                );
              }

              /* ── Regular nav link ── */
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "group relative desktop-nav-link rounded-xl px-4 py-2.5 text-[15px] tracking-[0.02em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:rounded-xl uppercase transition-all duration-300",
                    active ? "navbar-link-active" : "navbar-link",
                  ].join(" ")}
                  data-nav-label={item.label}
                  onMouseEnter={() => setHoveredNavItem(item.label)}
                  onMouseLeave={() => setHoveredNavItem(null)}
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

        {/* ── Desktop Services Mega Menu ── */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-[9999] pointer-events-none">
          <AnimatePresence>
            {megaOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-[1150px] max-w-[95vw] rounded-[20px] border border-white/10 bg-black shadow-[0_24px_50px_-12px_rgba(0,0,0,0.9),0_0_40px_rgba(155,223,131,0.05)] overflow-hidden pointer-events-auto"
                onMouseEnter={() => {
                  if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
                  setMegaOpen(true);
                }}
                onMouseLeave={handleServicesLeave}
              >
                {/* Split layout */}
                <div className="grid grid-cols-12">

                  {/* Left Side: Category Navigation (vertical) */}
                  <div className="col-span-4 border-r border-white/5 bg-[#0a0a0a] p-6 space-y-2">
                    <p className="text-[11px] font-bold tracking-widest text-white/40 uppercase mb-4 px-4">
                      Texawave Offers
                    </p>
                    {MEGA_SERVICES_DATA.map((cat) => {
                      const CategoryIcon = cat.icon;
                      const isActiveCat = activeCategory === cat.id;

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          className={[
                            "flex items-center gap-3.5 w-full px-4 py-3.5 rounded-xl border-l-2 transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal",
                            isActiveCat
                              ? "bg-[#9BDF83]/10 border-[#9BDF83] text-[#9BDF83] font-semibold"
                              : "border-transparent text-white/70 hover:text-white hover:bg-white/5"
                          ].join(" ")}
                          onMouseEnter={() => setActiveCategory(cat.id)}
                        >
                          <CategoryIcon size={18} className={isActiveCat ? "text-[#9BDF83]" : "text-white/40"} />
                          <span className="text-[14px]">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Side: Dynamic Services Card Grid */}
                  <div className="col-span-8 p-8 bg-[#040404]">
                    {/* Wrap the service grid in an motion.div to trigger staggered entry transitions on activeCategory changes */}
                    <motion.div
                      key={activeCategory}
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.04
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-2 gap-4"
                    >
                      {MEGA_SERVICES_DATA.find((cat) => cat.id === activeCategory)?.services.map((svc) => (
                        <motion.div
                          key={svc.name}
                          variants={{
                            hidden: { opacity: 0, y: 8 },
                            show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } }
                          }}
                        >
                          <Link
                            href={svc.href}
                            onClick={() => setMegaOpen(false)}
                            className="group flex flex-col justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-[#9BDF83]/[0.02] hover:border-[#9BDF83]/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(155,223,131,0.08)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal h-full"
                          >
                            <div className="flex justify-between items-start gap-2">
                              <span className="font-semibold text-[14px] text-white group-hover:text-[#9BDF83] transition-colors duration-200">
                                {svc.name}
                              </span>
                              <ArrowUpRight
                                size={14}
                                className="text-[#9BDF83] opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0"
                              />
                            </div>
                            <p className="mt-1 text-[11.5px] leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-200">
                              {svc.desc}
                            </p>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                </div>

                {/* Bottom CTA Section */}
                <div className="border-t border-white/5 px-8 py-5 flex flex-col sm:flex-row justify-between items-center bg-[#0a0a0a] gap-4">

                  {/* Left Side: Checkmarks */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] text-white/60">
                    <span className="flex items-center gap-2 font-medium">
                      <Check size={14} className="text-[#9BDF83] flex-shrink-0" /> End-to-End Product Development
                    </span>
                    <span className="flex items-center gap-2 font-medium">
                      <Check size={14} className="text-[#9BDF83] flex-shrink-0" /> Hardware + Software Expertise
                    </span>
                    <span className="flex items-center gap-2 font-medium">
                      <Check size={14} className="text-[#9BDF83] flex-shrink-0" /> Manufacturing Ready Solutions
                    </span>
                  </div>

                  {/* Right Side: CTA Button */}
                  <Link
                    href="/contact"
                    onClick={() => setMegaOpen(false)}
                    className="flex h-[40px] items-center justify-center rounded-full bg-[#9BDF83] px-6 text-[13px] font-bold text-black hover:scale-105 transition-transform duration-200 hover:shadow-[0_0_20px_rgba(155,223,131,0.4)] whitespace-nowrap"
                  >
                    Book Free Consultation
                  </Link>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Desktop Solutions Mega Menu ── */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-[9999] pointer-events-none">
          <AnimatePresence>
            {solutionsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-[1150px] max-w-[95vw] rounded-[20px] border border-white/10 bg-black shadow-[0_24px_50px_-12px_rgba(0,0,0,0.9),0_0_40px_rgba(155,223,131,0.05)] overflow-hidden pointer-events-auto"
                onMouseEnter={() => {
                  if (solutionsTimerRef.current) clearTimeout(solutionsTimerRef.current);
                  setSolutionsOpen(true);
                }}
                onMouseLeave={handleSolutionsLeave}
              >
                {/* 3-Column Split layout */}
                <div className="grid grid-cols-12">

                  {/* Left Column: Category Navigation (vertical) */}
                  <div className="col-span-4 border-r border-white/5 bg-[#0a0a0a] p-6 space-y-2">
                    <p className="text-[11px] font-bold tracking-widest text-white/40 uppercase mb-4 px-4">
                      Industries & Solutions
                    </p>
                    {MEGA_SOLUTIONS_DATA.map((cat) => {
                      const CategoryIcon = cat.icon;
                      const isActiveCat = activeSolutionCategory === cat.id;

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          className={[
                            "flex items-center gap-3.5 w-full px-4 py-3.5 rounded-xl border-l-2 transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal",
                            isActiveCat
                              ? "bg-[#9BDF83]/10 border-[#9BDF83] text-[#9BDF83] font-semibold"
                              : "border-transparent text-white/70 hover:text-white hover:bg-white/5"
                          ].join(" ")}
                          onMouseEnter={() => setActiveSolutionCategory(cat.id)}
                        >
                          <CategoryIcon size={18} className={isActiveCat ? "text-[#9BDF83]" : "text-white/40"} />
                          <span className="text-[14px]">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Middle Column: Sub-items list */}
                  <div className="col-span-4 p-6 bg-[#040404] border-r border-white/5">
                    <p className="text-[11px] font-bold tracking-widest text-white/40 uppercase mb-4 px-4">
                      Capabilities
                    </p>
                    <motion.div
                      key={activeSolutionCategory}
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.04
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                      className="space-y-1"
                    >
                      {MEGA_SOLUTIONS_DATA.find((cat) => cat.id === activeSolutionCategory)?.items.map((item) => (
                        <motion.div
                          key={item.name}
                          variants={{
                            hidden: { opacity: 0, y: 8 },
                            show: { opacity: 1, y: 0 }
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setSolutionsOpen(false)}
                            className="group flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                          >
                            <span className="text-[13.5px] text-white/70 group-hover:text-[#9BDF83] transition-colors duration-200">
                              {item.name}
                            </span>
                            <ArrowUpRight
                              size={14}
                              className="text-[#9BDF83] opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
                            />
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Right Column: Featured Panel */}
                  <div className="col-span-4 p-6 bg-[#080808]">
                    <p className="text-[11px] font-bold tracking-widest text-white/40 uppercase mb-4">
                      Featured Project
                    </p>
                    {(() => {
                      const activeCatData = MEGA_SOLUTIONS_DATA.find((cat) => cat.id === activeSolutionCategory);
                      if (!activeCatData) return null;
                      const feat = activeCatData.featured;

                      return (
                        <motion.div
                          key={activeSolutionCategory}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="group/feat flex flex-col justify-between h-[280px] rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] p-4 transition-all duration-300"
                        >
                          {/* Image container */}
                          <div className="relative h-[130px] w-full rounded-lg bg-[#111] overflow-hidden border border-white/5">
                            <Image
                              src={feat.image}
                              alt={feat.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover/feat:scale-105"
                            />
                          </div>

                          {/* Info */}
                          <div className="mt-3">
                            <h4 className="text-[14px] font-bold text-white group-hover/feat:text-[#9BDF83] transition-colors duration-200">
                              {feat.title}
                            </h4>
                            <p className="mt-1 text-[11.5px] text-white/50 leading-relaxed line-clamp-2">
                              {feat.desc}
                            </p>
                          </div>

                          {/* Link CTA */}
                          <Link
                            href={feat.cta}
                            onClick={() => setSolutionsOpen(false)}
                            className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold text-[#9BDF83] hover:opacity-80 transition-all duration-200"
                          >
                            View Case Study <ArrowUpRight size={13} />
                          </Link>
                        </motion.div>
                      );
                    })()}
                  </div>

                </div>

                {/* Bottom CTA Section */}
                <div className="border-t border-white/5 px-8 py-5 flex flex-col sm:flex-row justify-between items-center bg-[#0a0a0a] gap-4">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] text-white/60">
                    <span className="flex items-center gap-2 font-medium">
                      <Check size={14} className="text-[#9BDF83] flex-shrink-0" /> Enterprise Engineering Quality
                    </span>
                    <span className="flex items-center gap-2 font-medium">
                      <Check size={14} className="text-[#9BDF83] flex-shrink-0" /> Custom Hardware Prototyping
                    </span>
                    <span className="flex items-center gap-2 font-medium">
                      <Check size={14} className="text-[#9BDF83] flex-shrink-0" /> Production-Ready Designs
                    </span>
                  </div>

                  <Link
                    href="/contact"
                    onClick={() => setSolutionsOpen(false)}
                    className="flex h-[40px] items-center justify-center rounded-full bg-[#9BDF83] px-6 text-[13px] font-bold text-black hover:scale-105 transition-transform duration-200 hover:shadow-[0_0_20px_rgba(155,223,131,0.4)] whitespace-nowrap"
                  >
                    Request a Solution Demo
                  </Link>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Desktop Resources Dropdown ── */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-[9999] pointer-events-none">
          <AnimatePresence>
            {resourcesOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-[800px] max-w-[95vw] rounded-[20px] border border-white/10 bg-black shadow-[0_24px_50px_-12px_rgba(0,0,0,0.9),0_0_40px_rgba(155,223,131,0.05)] overflow-hidden pointer-events-auto"
                onMouseEnter={() => {
                  if (resourcesTimerRef.current) clearTimeout(resourcesTimerRef.current);
                  setResourcesOpen(true);
                }}
                onMouseLeave={handleResourcesLeave}
              >
                <div className="grid grid-cols-12">
                  {/* Left Side: Header Info */}
                  <div className="col-span-5 bg-[#0a0a0a] border-r border-white/5 p-8 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-bold tracking-widest text-[#9BDF83] uppercase mb-2">
                        Resources
                      </p>
                      <h3 className="text-[20px] font-extrabold text-white tracking-tight leading-snug">
                        Texawave Insights
                      </h3>
                      <p className="mt-4 text-[12.5px] leading-relaxed text-white/50">
                        Explore Texawave&apos;s company information, career opportunities, technical insights, and customer success stories.
                      </p>
                    </div>
                    {/* Subtle branding or graphic */}
                    <div className="mt-8 relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.01] p-4">
                      <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#9BDF83]/10 rounded-full blur-xl pointer-events-none" />
                      <p className="text-[10px] font-bold tracking-wider text-white/40 uppercase">
                        Engineering Center
                      </p>
                      <p className="mt-1 text-[11px] text-[#9BDF83] font-medium">
                        Innovate. Build. Scale.
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Resources Menu Items Grid */}
                  <div className="col-span-7 p-6 bg-[#040404] flex flex-col gap-2">
                    {RESOURCES_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setResourcesOpen(false)}
                          className={[
                            "group flex items-start gap-4 rounded-xl p-3.5 transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal",
                            active
                              ? "bg-[#9BDF83]/10 border-[#9BDF83]/20"
                              : "bg-transparent border-transparent hover:bg-white/[0.03] hover:border-white/5 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                          ].join(" ")}
                        >
                          <span className={[
                            "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
                            active
                              ? "bg-[#9BDF83]/20 text-[#9BDF83]"
                              : "bg-[#9BDF83]/10 text-white/70 group-hover:bg-[#9BDF83]/20 group-hover:text-[#9BDF83]"
                          ].join(" ")}>
                            <Icon size={16} aria-hidden="true" />
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={[
                                "text-[13.5px] font-bold transition-colors duration-200",
                                active ? "text-[#9BDF83]" : "text-white group-hover:text-[#9BDF83]"
                              ].join(" ")}>
                                {item.label}
                              </span>
                              <ArrowUpRight
                                size={13}
                                className={[
                                  "transition-all duration-300",
                                  active
                                    ? "text-[#9BDF83] opacity-100"
                                    : "text-[#9BDF83] opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0"
                                ].join(" ")}
                              />
                            </div>
                            <p className="mt-1 text-[11.5px] leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-200">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

        <div className="flex flex-1 flex-col overflow-y-auto px-5 pt-5 pb-16">
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
                  What We Do
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
                    mobileMegaOpen ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0",
                  ].join(" ")}
                >
                  <div className="mt-1 space-y-1.5 pl-2">
                    {MEGA_SERVICES_DATA.map((category) => {
                      const CategoryIcon = category.icon;
                      const isCatOpen = mobileCategoryOpen === category.id;

                      return (
                        <div key={category.id} className="rounded-xl overflow-hidden">
                          <button
                            type="button"
                            className={[
                              "flex w-full items-center justify-between px-4 py-3 text-[14px] font-semibold transition-colors duration-200 hover:bg-white/5",
                              isCatOpen ? "text-[#9BDF83] bg-[#9BDF83]/5" : "text-white/80"
                            ].join(" ")}
                            onClick={() => setMobileCategoryOpen(isCatOpen ? null : category.id)}
                            aria-expanded={isCatOpen}
                          >
                            <span className="flex items-center gap-2.5">
                              <CategoryIcon size={16} className={isCatOpen ? "text-[#9BDF83]" : "text-white/60"} />
                              {category.label}
                            </span>
                            <ChevronDown
                              size={14}
                              className={[
                                "transition-transform duration-300",
                                isCatOpen ? "rotate-180 text-[#9BDF83]" : "text-white/40",
                              ].join(" ")}
                            />
                          </button>

                          {/* Nested services list */}
                          <div
                            className={[
                              "overflow-hidden transition-all duration-300 ease-out pl-6",
                              isCatOpen ? "max-h-[500px] opacity-100 py-1" : "max-h-0 opacity-0",
                            ].join(" ")}
                          >
                            <div className="space-y-0.5 border-l border-white/10 pl-3 py-1">
                              {category.services.map((svc) => (
                                <Link
                                  key={svc.name}
                                  href={svc.href}
                                  onClick={closeMobile}
                                  className="block py-2 text-[13px] text-white/70 hover:text-[#9BDF83] transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
                                >
                                  {svc.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
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

              {/* ── Solutions accordion ── */}
              <li className="mobile-nav-item">
                <button
                  type="button"
                  className={[
                    "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15.5px] font-semibold transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal uppercase",
                    mobileSolutionsOpen ? "text-signal" : "text-white hover:text-signal",
                  ].join(" ")}
                  onClick={() => setMobileSolutionsOpen((v) => !v)}
                  aria-expanded={mobileSolutionsOpen}
                >
                  What We&apos;ve Built
                  <ChevronDown
                    size={16}
                    className={[
                      "text-signal transition-transform duration-300",
                      mobileSolutionsOpen ? "rotate-180" : "",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={[
                    "overflow-hidden transition-all duration-400 ease-out",
                    mobileSolutionsOpen ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0",
                  ].join(" ")}
                >
                  <div className="mt-1 space-y-1.5 pl-2">
                    {MEGA_SOLUTIONS_DATA.map((category) => {
                      const CategoryIcon = category.icon;
                      const isCatOpen = mobileCategoryOpen === category.id;

                      return (
                        <div key={category.id} className="rounded-xl overflow-hidden">
                          <button
                            type="button"
                            className={[
                              "flex w-full items-center justify-between px-4 py-3 text-[14px] font-semibold transition-colors duration-200 hover:bg-white/5",
                              isCatOpen ? "text-[#9BDF83] bg-[#9BDF83]/5" : "text-white/80"
                            ].join(" ")}
                            onClick={() => setMobileCategoryOpen(isCatOpen ? null : category.id)}
                            aria-expanded={isCatOpen}
                          >
                            <span className="flex items-center gap-2.5">
                              <CategoryIcon size={16} className={isCatOpen ? "text-[#9BDF83]" : "text-white/60"} />
                              {category.label}
                            </span>
                            <ChevronDown
                              size={14}
                              className={[
                                "transition-transform duration-300",
                                isCatOpen ? "rotate-180 text-[#9BDF83]" : "text-white/40",
                              ].join(" ")}
                            />
                          </button>

                          {/* Nested solutions list */}
                          <div
                            className={[
                              "overflow-hidden transition-all duration-300 ease-out pl-6",
                              isCatOpen ? "max-h-[500px] opacity-100 py-1" : "max-h-0 opacity-0",
                            ].join(" ")}
                          >
                            <div className="space-y-0.5 border-l border-white/10 pl-3 py-1">
                              {category.items.map((svc) => (
                                <Link
                                  key={svc.name}
                                  href={svc.href}
                                  onClick={closeMobile}
                                  className="block py-2 text-[13px] text-white/70 hover:text-[#9BDF83] transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
                                >
                                  {svc.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <Link
                      href="/solutions"
                      onClick={closeMobile}
                      className="flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-semibold text-signal hover:opacity-75 focus-visible:outline-none"
                    >
                      All solutions <ArrowUpRight size={12} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </li>

              {/* ── Resources accordion ── */}
              <li className="mobile-nav-item">
                <button
                  type="button"
                  className={[
                    "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15.5px] font-semibold transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal uppercase",
                    mobileResourcesOpen ? "text-signal" : "text-white hover:text-signal",
                  ].join(" ")}
                  onClick={() => setMobileResourcesOpen((v) => !v)}
                  aria-expanded={mobileResourcesOpen}
                >
                  Resources
                  <ChevronDown
                    size={16}
                    className={[
                      "text-signal transition-transform duration-300",
                      mobileResourcesOpen ? "rotate-180" : "",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={[
                    "overflow-hidden transition-all duration-400 ease-out",
                    mobileResourcesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
                  ].join(" ")}
                >
                  <div className="mt-1 space-y-0.5 pl-2">
                    {RESOURCES_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMobile}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                        >
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-signal/15 text-signal">
                            <Icon size={14} aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-[13.5px] font-semibold text-white">
                              {item.label}
                            </p>
                            <p className="text-[11.5px]" style={{ color: "rgba(255, 255, 255, 0.75)" }}>{item.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </li>

              {/* ── Regular mobile links ── */}
              {([
                { label: "Talk to an Expert", href: "/contact" },
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
    </>
  );
}
