"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { PageChrome } from "@/components/PageChrome";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Globe,
  Award,
  ShieldCheck,
  Cpu,
  Wrench,
  PackageCheck,
  ChevronDown,
  Check,
  Upload,
  Heart,
  DollarSign,
  LineChart,
  BookOpen,
  ArrowUpRight,
  Terminal,
  Activity,
  CheckCircle2
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

/* ─── Static Data ────────────────────────────────────────────────────────── */

const DEPARTMENTS = [
  {
    id: "software",
    name: "Software Engineering",
    icon: Terminal,
    desc: "Develop innovative digital solutions, automation systems, and IoT dashboards.",
    skills: ["Next.js / React / TypeScript", "Node.js / Python", "AWS / Cloud Infrastructure", "IoT / Firmware Protocols", "REST & WebSockets"],
    roadmap: ["Trainee Software Dev", "Software Engineer", "Senior Developer", "Tech Lead", "Project Manager / Architect"],
    tech: ["React / Next.js", "Docker", "Node.js", "WebSockets", "AWS IoT Core"],
    color: "rgba(0, 212, 255, 0.2)"
  },
  {
    id: "electrical",
    name: "Electrical Engineering",
    icon: Cpu,
    desc: "Design industrial control, high-speed PCBs, and power solutions.",
    skills: ["Multi-layer PCB Layout", "Embedded C / C++", "Altium Designer / KiCAD", "BoM Cost Optimization", "Firmware Debugging"],
    roadmap: ["Junior PCB Designer", "Embedded Hardware Engineer", "Senior Electrical Specialist", "Lead Hardware Architect", "Engineering Director"],
    tech: ["Altium Designer", "STM32 MCU", "ESP32 / BLE", "Modbus / CAN", "Oscilloscopes"],
    color: "rgba(155, 223, 131, 0.2)"
  },
  {
    id: "mechanical",
    name: "Mechanical Engineering",
    icon: Wrench,
    desc: "Work on advanced mechanical design, enclosure layout, and SPM manufacturing.",
    skills: ["3D CAD Modeling", "Design for Manufacturing (DFM)", "Plastic Injection Molding", "Sheet Metal Detailing", "SPM Automation Design"],
    roadmap: ["CAD Draftsman", "Mechanical Design Engineer", "Senior Structural Designer", "Lead SPM Architect", "Mechanical Program Manager"],
    tech: ["SolidWorks", "Autodesk Fusion 360", "Ansys FEA", "CNC CAM Programming", "Rapid Prototyping"],
    color: "rgba(200, 117, 55, 0.2)"
  },
  {
    id: "procurement",
    name: "Procurement",
    icon: PackageCheck,
    desc: "Connect global supply chains and source critical engineering components.",
    skills: ["Global Supplier Identification", "BoM Pricing Negotiations", "Customs & Freight Clearance", "ERP / Inventory Management", "Quality Vetting & Compliance"],
    roadmap: ["Procurement Coordinator", "Strategic Sourcing Specialist", "Supply Chain Manager", "Lead Sourcing Manager", "Director of Global Operations"],
    tech: ["SAP ERP", "Customs Portals", "Excel Analytics", "Vendor Audits", "Logistics Operations"],
    color: "rgba(128, 128, 128, 0.2)"
  }
];

const CULTURE_CARDS = [
  { id: "01", title: "Innovation First", desc: "We push technical limits and implement advanced architectures." },
  { id: "02", title: "Global Opportunities", desc: "Work with global hardware startups, medical institutions, and manufacturers." },
  { id: "03", title: "Learning & Development", desc: "Regular technical skill workshops and certified development programs." },
  { id: "04", title: "Flexible Work", desc: "Hybrid options and focused productivity outcomes over rigid hours." },
  { id: "05", title: "Engineering Excellence", desc: "Rigorous documentation, component analysis, and precision design review." },
  { id: "06", title: "Collaborative Culture", desc: "Interdisciplinary syncs between software, electrical, and mechanical domains." }
];

const OPEN_POSITIONS = [
  {
    id: "job-1",
    title: "IoT Firmware & Cloud Engineer",
    deptId: "software",
    deptName: "Software",
    exp: "2 - 4 Yrs",
    loc: "Chennai / Remote",
    link: "#apply-form"
  },
  {
    id: "job-2",
    title: "Lead PCB Design Engineer",
    deptId: "electrical",
    deptName: "Electrical",
    exp: "5 - 8 Yrs",
    loc: "Chennai / Hybrid",
    link: "#apply-form"
  },
  {
    id: "job-3",
    title: "Senior CAD Designer (Plastic & Sheet Metal)",
    deptId: "mechanical",
    deptName: "Mechanical",
    exp: "4 - 6 Yrs",
    loc: "Chennai / Onsite",
    link: "#apply-form"
  },
  {
    id: "job-4",
    title: "Global Supply Chain Specialist",
    deptId: "procurement",
    deptName: "Procurement",
    exp: "3 - 5 Yrs",
    loc: "Chennai / Hybrid",
    link: "#apply-form"
  },
  {
    id: "job-5",
    title: "React / Next.js Web Developer",
    deptId: "software",
    deptName: "Software",
    exp: "1 - 3 Yrs",
    loc: "Remote",
    link: "#apply-form"
  },
  {
    id: "job-6",
    title: "Embedded Control Systems Engineer",
    deptId: "electrical",
    deptName: "Electrical",
    exp: "3 - 5 Yrs",
    loc: "Chennai / Onsite",
    link: "#apply-form"
  },
  {
    id: "job-7",
    title: "SPM Design Engineer",
    deptId: "mechanical",
    deptName: "Mechanical",
    exp: "2 - 5 Yrs",
    loc: "Chennai / Onsite",
    link: "#apply-form"
  },
  {
    id: "job-8",
    title: "Logistics Sourcing Associate",
    deptId: "procurement",
    deptName: "Procurement",
    exp: "1 - 3 Yrs",
    loc: "Chennai / Onsite",
    link: "#apply-form"
  }
];

const BENEFITS = [
  { icon: DollarSign, title: "Competitive Salary", desc: "Industry-leading compensation structure with regular evaluation cycles." },
  { icon: LineChart, title: "Performance Bonus", desc: "Project milestones and annual performance-linked rewards." },
  { icon: BookOpen, title: "Training Programs", desc: "Access to paid courses, technical certifications, and design programs." },
  { icon: Globe, title: "Global Exposure", desc: "Collaborate directly with ambitious international hardware and IoT firms." },
  { icon: Clock, title: "Flexible Working", desc: "Focus on output and design deliverables rather than strict micromanaged hours." },
  { icon: ShieldCheck, title: "Paid Leave", desc: "Generous casual, sick, and medical leave benefits to support balance." },
  { icon: Award, title: "Career Development", desc: "Fast-track promotions and technical leadership advancement paths." },
  { icon: Heart, title: "Health Benefits", desc: "Comprehensive group health insurance coverage for you and your family." }
];

const LIFE_GALLERY = [
  {
    url: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80",
    title: "Product Alignment Meetings",
    heightCls: "h-[260px]"
  },
  {
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    title: "Design Reviews & Schematics",
    heightCls: "h-[380px]"
  },
  {
    url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    title: "Engineering Labs",
    heightCls: "h-[300px]"
  },
  {
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    title: "Cross-Domain Brainstorming",
    heightCls: "h-[340px]"
  },
  {
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    title: "Company & Cultural Events",
    heightCls: "h-[280px]"
  }
];

const FAQS = [
  {
    q: "How does the hiring process work?",
    a: "Our recruitment process has 5 distinct stages designed to gauge core compatibility. It starts with an initial resume screening, followed by a brief technical screening call, a in-depth technical discussion, a short take-home project assessment, and a final roundtable interview."
  },
  {
    q: "Do you offer internships?",
    a: "Yes, we offer structured 3-month and 6-month engineering internships across Software, Electrical, and Mechanical engineering divisions. Many of our high-performing interns convert to full-time engineering roles."
  },
  {
    q: "Can freshers apply?",
    a: "Absolutely! We look for strong foundational engineering principles, enthusiasm for hardware/systems, and hands-on academic or hobby projects. Look for positions marked with 'Trainee' or submit your details to our General Talent Pool."
  },
  {
    q: "Are remote opportunities available?",
    a: "Yes, several software engineering positions offer 100% remote working policies. For hardware, electrical board test, and mechanical fabrication support, roles are hybrid or fully onsite in Chennai to access our hardware lab resources."
  },
  {
    q: "How long does recruitment take?",
    a: "We respect your time and aim to complete the entire sequence from submission to official offer letter within 10 to 14 business days, depending on the speed of candidate response and scheduling availability."
  }
];

export default function CareersPage() {
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineFillRef = useRef<HTMLDivElement>(null);

  // States
  const [selectedDept, setSelectedDept] = useState("software");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form states
  const [formType, setFormType] = useState<"role" | "general">("role");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: ""
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Find department helper variables
  const currentDeptObj = DEPARTMENTS.find((d) => d.id === selectedDept) || DEPARTMENTS[0];

  // GSAP Animations
  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    // 1. Horizontal Scroll for Culture cards (Desktop only >= 1024px)
    const track = horizontalTrackRef.current;
    if (track) {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 80),
          ease: "none",
          scrollTrigger: {
            trigger: "#culture-section",
            pin: true,
            scrub: 1.2,
            start: "top 10%",
            end: () => `+=${track.scrollWidth - 100}`,
            anticipatePin: 1
          }
        });
      });
      return () => mm.revert();
    }
  }, { scope: pageContainerRef });

  // GSAP Vertical Journey Timeline Fill Animation
  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timeline = timelineRef.current;
    const fill = timelineFillRef.current;
    if (timeline && fill) {
      gsap.fromTo(fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 0.3
          }
        }
      );

      // Light up timeline nodes on entry
      const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node");
      nodes.forEach((node) => {
        gsap.fromTo(node,
          { borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(0, 0, 0, 0.9)" },
          {
            borderColor: "rgba(155, 223, 131, 0.8)",
            backgroundColor: "rgba(155, 223, 131, 0.2)",
            duration: 0.45,
            scrollTrigger: {
              trigger: node,
              start: "top 60%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });
    }
  }, { scope: pageContainerRef });

  // Custom function to smooth-scroll using GSAP
  const handleScrollTo = (targetSelector: string) => {
    const el = document.querySelector(targetSelector);
    if (el) {
      gsap.to(window, {
        scrollTo: { y: el, offsetY: 90 },
        duration: 1.0,
        ease: "power3.out"
      });
    }
  };

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", position: "", message: "" });
      setResumeFile(null);
    }, 1500);
  };

  const filteredJobs = OPEN_POSITIONS.filter((job) => {
    if (activeFilter === "All") return true;
    return job.deptId === activeFilter.toLowerCase();
  });

  return (
    <PageChrome>
      <div ref={pageContainerRef} className="relative w-full overflow-hidden bg-black text-text-primary">
        
        {/* ══════════════════════════ 1. HERO SECTION ══════════════════════════ */}
        <section className="relative min-h-[85vh] flex items-center justify-center px-6 py-20 border-b border-border-primary overflow-hidden">
          {/* Blueprint Engineering Grid Background */}
          <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" aria-hidden="true" />
          
          {/* Subtle Floating Dots and Tech Circle */}
          <div className="absolute left-[15%] top-[25%] w-[400px] h-[400px] rounded-full bg-[var(--primary-green)]/8 blur-3xl pointer-events-none" />
          <div className="absolute right-[10%] bottom-[20%] w-[350px] h-[350px] rounded-full bg-[#00D4FF]/3 blur-3xl pointer-events-none" />
          
          {/* Wave SVG Animation Path (similar to main loader screen) */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none h-40 opacity-30 select-none">
            <svg className="relative block w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0 C150,90 350,120 600,60 C850,0 1050,30 1200,10 L1200,120 L0,120 Z" fill="url(#hero-gradient)" />
              <defs>
                <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#000000" />
                  <stop offset="50%" stopColor="#2b521e" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-signal/30 bg-signal/10 text-xs font-semibold tracking-wider text-accent-light uppercase mb-6" data-reveal>
              <Activity size={12} className="animate-pulse" />
              Careers at Texawave
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-none text-white max-w-4xl mx-auto" data-reveal>
              Build the Future of Engineering with TEXAWAVE
            </h1>
            
            <p className="mt-6 text-base md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed" data-reveal>
              Join a team that delivers Software, Electrical, Mechanical, and Procurement solutions for global industries.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4" data-reveal>
              <button
                onClick={() => handleScrollTo("#open-positions")}
                className="cta-magnetic inline-flex items-center justify-center gap-2 rounded bg-signal px-7 py-4 font-bold text-white shadow-crisp border border-transparent w-full sm:w-auto"
              >
                View Open Positions <ArrowRight size={16} />
              </button>
              
              <button
                onClick={() => handleScrollTo("#apply-form")}
                className="btn-premium inline-flex items-center justify-center gap-2 rounded border border-border-primary bg-black/40 backdrop-blur-sm px-7 py-4 font-bold text-text-primary transition hover:border-signal w-full sm:w-auto"
              >
                Submit Resume
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════ 2. WHY JOIN TEXAWAVE ══════════════════════════ */}
        <section className="px-6 py-24 border-b border-border-primary bg-bg-secondary" id="why-join">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16" data-reveal>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Purpose</span>
              <h2 className="text-3xl md:text-5xl font-black text-text-primary mt-3">Why Join TEXAWAVE?</h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm md:text-base">
                We design hardware solutions with interdisciplinary depth. Each domain is an pillar in our engineering ecosystem.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "💻 Software Engineering", desc: "Develop innovative digital solutions, automation systems, and device cloud platforms.", glow: "rgba(0, 212, 255, 0.12)" },
                { title: "⚡ Electrical Engineering", desc: "Design industrial control, high-speed PCB layouts, and firmware solutions.", glow: "rgba(155, 223, 131, 0.12)" },
                { title: "⚙️ Mechanical Engineering", desc: "Work on advanced CAD mechanical design, custom enclosures, and manufacturing SPM systems.", glow: "rgba(200, 117, 55, 0.12)" },
                { title: "📦 Procurement", desc: "Connect global supply chains and source critical components safely and efficiently.", glow: "rgba(255, 255, 255, 0.08)" }
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="service-card-premium rounded-2xl border border-border-primary bg-bg-card p-6 shadow-crisp transition duration-300 relative group overflow-hidden"
                  data-reveal
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 120%, ${card.glow}, transparent 60%)` }} />
                  <h3 className="text-lg font-black text-text-primary group-hover:text-accent-light transition-colors">{card.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════ 3. COMPANY CULTURE SECTION ══════════════════════════ */}
        <section className="relative py-20 border-b border-border-primary" id="culture-section">
          {/* Header */}
          <div className="max-w-7xl mx-auto px-6 mb-12 lg:mb-0 lg:absolute lg:top-20 lg:left-12 lg:z-20">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Culture</span>
            <h2 className="text-3xl md:text-5xl font-black text-text-primary mt-3">Company Culture</h2>
            <p className="text-text-secondary mt-3 max-w-[280px] text-sm md:text-base">
              Swipe or scroll to explore our core work culture dynamics.
            </p>
          </div>

          {/* Desktop Horizontal Scroll Track / Mobile Swiper list */}
          <div className="lg:h-[75vh] flex items-center lg:pt-24 overflow-x-auto lg:overflow-x-hidden scrollbar-none px-6">
            <div ref={horizontalTrackRef} className="flex gap-6 pb-6 lg:pb-0 whitespace-nowrap min-w-max lg:pl-[380px]">
              {CULTURE_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="culture-card inline-block w-[280px] md:w-[360px] rounded-2xl border border-border-primary bg-bg-card p-8 shadow-crisp whitespace-normal"
                >
                  <span className="text-xs font-mono font-bold text-signal">{card.id} {"// SYS_VAL"}</span>
                  <h3 className="text-xl font-black text-white mt-4">{card.title}</h3>
                  <p className="text-sm text-text-secondary mt-4 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════ 4. EMPLOYEE JOURNEY TIMELINE ══════════════════════════ */}
        <section className="px-6 py-24 border-b border-border-primary bg-bg-secondary" id="journey">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16" data-reveal>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Process</span>
              <h2 className="text-3xl md:text-5xl font-black text-text-primary mt-3">Employee Journey Timeline</h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm md:text-base">
                How we onboard exceptional engineers to deliver premium solutions.
              </p>
            </div>

            <div ref={timelineRef} className="relative pl-8 md:pl-0 md:grid md:grid-cols-[1fr_20px_1fr] gap-6">
              {/* Center Track Line */}
              <div className="absolute left-[13px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-neutral-900" />
              {/* Filled active timeline line */}
              <div
                ref={timelineFillRef}
                className="absolute left-[13px] md:left-1/2 md:-translate-x-1/2 top-4 w-[2px] bg-signal origin-top scale-y-0 h-full shadow-[0_0_8px_rgba(155,223,131,0.6)]"
              />

              {[
                { title: "1. Apply", desc: "Submit your resume through our listings or General Talent Pool." },
                { title: "2. Screening", desc: "A brief conversational assessment of experience and alignment." },
                { title: "3. Technical Discussion", desc: "In-depth dialog about your core engineering design decisions." },
                { title: "4. Project Assessment", desc: "A practical, small-scale design or code challenge matching live tasks." },
                { title: "5. Final Interview", desc: "A roundtable meet with leadership and engineering heads." },
                { title: "6. Welcome to TEXAWAVE", desc: "Receive your offer, complete onboarding, and start engineering!" }
              ].map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <React.Fragment key={idx}>
                    {/* Left block */}
                    <div className={`hidden md:block text-right pr-6 self-center ${isEven ? "opacity-100" : "opacity-0"}`}>
                      {isEven && (
                        <div data-reveal>
                          <h3 className="text-lg font-black text-white">{step.title}</h3>
                          <p className="text-sm text-text-secondary mt-2">{step.desc}</p>
                        </div>
                      )}
                    </div>

                    {/* Middle dot */}
                    <div className="relative flex justify-center items-center h-16 w-8 md:w-5">
                      <div className="timeline-node absolute w-3.5 h-3.5 rounded-full border border-neutral-700 bg-black z-10 transition-colors" />
                    </div>

                    {/* Right block / Mobile block */}
                    <div className="pl-6 md:pl-6 self-center text-left">
                      <div data-reveal={!isEven ? "" : undefined}>
                        {(!isEven || typeof window !== "undefined" && window.innerWidth < 768) && (
                          <div>
                            <h3 className="text-lg font-black text-white">{step.title}</h3>
                            <p className="text-sm text-text-secondary mt-2">{step.desc}</p>
                          </div>
                        )}
                        {isEven && (
                          <div className="md:hidden">
                            <h3 className="text-lg font-black text-white">{step.title}</h3>
                            <p className="text-sm text-text-secondary mt-2">{step.desc}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════ ⭐ EXTRA PREMIUM FEATURE: FIND YOUR DEPARTMENT ══════════════════════════ */}
        <section className="px-6 py-24 border-b border-border-primary bg-black" id="find-dept">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16" data-reveal>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Interactive Matchmaker</span>
              <h2 className="text-3xl md:text-5xl font-black text-text-primary mt-3">Find Your Department</h2>
              <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-sm md:text-base">
                Select your engineering discipline to view matching openings, tools, and technical parameters.
              </p>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.8fr] gap-8 items-start">
              {/* Department Selector Cards */}
              <div className="flex flex-col gap-4">
                {DEPARTMENTS.map((dept) => {
                  const DeptIcon = dept.icon;
                  const isSelected = selectedDept === dept.id;
                  return (
                    <button
                      key={dept.id}
                      onClick={() => {
                        setSelectedDept(dept.id);
                        // Automatically update job filters as a premium feature synch
                        const filterLabel = dept.name.split(" ")[0]; // Software, Electrical, Mechanical, Procurement
                        setActiveFilter(filterLabel);
                      }}
                      className={`flex items-center gap-4 rounded-xl p-5 text-left border transition-all duration-300 ${
                        isSelected
                          ? "border-signal bg-signal/10 shadow-[0_0_15px_rgba(155,223,131,0.15)]"
                          : "border-border-primary bg-bg-card hover:border-neutral-700"
                      }`}
                    >
                      <span className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors ${
                        isSelected ? "bg-signal/25 text-white border-signal" : "bg-bg-primary text-text-secondary border-border-primary"
                      }`}>
                        <DeptIcon size={20} />
                      </span>
                      <div>
                        <h3 className={`font-black text-sm uppercase tracking-wide ${isSelected ? "text-signal" : "text-white"}`}>
                          {dept.name}
                        </h3>
                        <p className="text-xs text-text-secondary mt-1 line-clamp-1">{dept.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Department Insights Details panel */}
              <div className="rounded-2xl border border-border-primary bg-bg-secondary p-8 relative overflow-hidden" style={{ minHeight: "360px" }}>
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                  <currentDeptObj.icon size={360} className="absolute -right-20 -bottom-20" />
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-signal">Insight Dashboard</span>
                    <h3 className="text-2xl font-black mt-2 text-white">{currentDeptObj.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{currentDeptObj.desc}</p>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-signal mb-3">Required Core Skills</h4>
                        <ul className="space-y-2">
                          {currentDeptObj.skills.map((skill, idx) => (
                            <li key={idx} className="flex gap-2 text-xs font-semibold text-text-primary items-center">
                              <CheckCircle2 size={12} className="text-signal shrink-0" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-signal mb-3">Technologies We Use</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentDeptObj.tech.map((t, idx) => (
                            <span key={idx} className="px-2 py-1 text-[10px] font-semibold font-mono rounded bg-black/60 border border-border-primary text-text-secondary">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border-primary pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-xs text-text-secondary">
                      Active matching positions: <span className="font-bold text-white font-mono">{OPEN_POSITIONS.filter(j => j.deptId === selectedDept).length}</span>
                    </div>
                    <button
                      onClick={() => handleScrollTo("#open-positions")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-signal hover:underline"
                    >
                      View vacancies <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════ 5. OPEN POSITIONS SECTION ══════════════════════════ */}
        <section className="px-6 py-24 border-b border-border-primary bg-bg-secondary" id="open-positions">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16" data-reveal>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Vacancy</span>
              <h2 className="text-3xl md:text-5xl font-black text-text-primary mt-3">Open Positions</h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm md:text-base">
                Discover your next engineering opportunity and join our core delivery teams.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-10" data-reveal>
              {["All", "Software", "Electrical", "Mechanical", "Procurement"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all duration-300 ${
                    activeFilter === tab
                      ? "bg-signal text-white"
                      : "bg-black text-text-secondary border border-border-primary hover:border-neutral-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Jobs List Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-border-primary bg-bg-card p-6 shadow-crisp relative hover:border-signal hover:shadow-[0_0_15px_rgba(155,223,131,0.1)] transition-all duration-300 group flex flex-col justify-between"
                  data-reveal
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-light bg-signal/15 border border-signal/30 rounded">
                        {job.deptName}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-text-secondary font-semibold">
                        <MapPin size={12} />
                        {job.loc}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white group-hover:text-signal transition-colors">{job.title}</h3>
                    
                    <div className="flex items-center gap-3 mt-4 text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Briefcase size={12} />
                        Experience: {job.exp}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border-primary pt-4 mt-6 flex justify-between items-center">
                    <button
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, position: job.title }));
                        setFormType("role");
                        handleScrollTo("#apply-form");
                      }}
                      className="inline-flex items-center gap-2 text-xs font-bold text-accent-light group-hover:gap-3 transition-all"
                    >
                      Apply Now <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="col-span-2 text-center py-12 rounded border border-border-primary bg-bg-card">
                  <p className="text-text-secondary text-sm">No vacancies listed in this department right now.</p>
                  <button
                    onClick={() => {
                      setFormType("general");
                      handleScrollTo("#apply-form");
                    }}
                    className="mt-4 text-xs font-bold text-signal hover:underline"
                  >
                    Submit details to our General Talent Pool
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════ 6. ENGINEERING GROWTH SECTION ══════════════════════════ */}
        <section className="px-6 py-24 border-b border-border-primary bg-black" id="growth">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16" data-reveal>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Roadmap</span>
              <h2 className="text-3xl md:text-5xl font-black text-text-primary mt-3">Engineering Growth</h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm md:text-base">
                How we cultivate and advance our technical leaders.
              </p>
            </div>

            {/* Progression Paths Connectors */}
            <div className="grid md:grid-cols-5 gap-4 relative">
              {/* Connecting paths for desktop */}
              <div className="absolute hidden md:block top-10 left-10 right-10 h-[2px] bg-neutral-900 pointer-events-none" />

              {[
                { step: "01", name: "Trainee", desc: "Solidify structural concepts and core engineering mechanics." },
                { step: "02", name: "Engineer", desc: "Take ownership of individual board layouts, code structures, or component CADs." },
                { step: "03", name: "Senior Engineer", desc: "Drive product design architectures and lead key project modules." },
                { step: "04", name: "Lead Engineer", desc: "Oversee complete cross-functional development cycles and client integration." },
                { step: "05", name: "Project Manager", desc: "Lead interdisciplinary product programs and orchestrate direct market launches." }
              ].map((prog, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border-primary bg-bg-card p-5 relative z-10 hover:border-signal transition-colors"
                  data-reveal
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono font-bold text-signal">{"// STAGE_"}{prog.step}</span>
                    <span className="h-6 w-6 rounded-full bg-black border border-signal/40 flex items-center justify-center text-[10px] font-bold text-accent-light">
                      {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white">{prog.name}</h3>
                  <p className="text-xs text-text-secondary mt-3 leading-relaxed">{prog.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════ 7. BENEFITS SECTION ══════════════════════════ */}
        <section className="px-6 py-24 border-b border-border-primary bg-bg-secondary" id="benefits">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16" data-reveal>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Perks</span>
              <h2 className="text-3xl md:text-5xl font-black text-text-primary mt-3">Benefits & Perks</h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm md:text-base">
                Supporting your professional growth and overall operational balance.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-border-primary bg-bg-card p-6 shadow-crisp hover:border-signal hover:-translate-y-1 transition-all duration-300"
                    data-reveal
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-signal/15 text-signal mb-4">
                      <Icon size={16} />
                    </span>
                    <h3 className="text-sm font-black text-white uppercase tracking-wide">{benefit.title}</h3>
                    <p className="text-xs text-text-secondary mt-3 leading-relaxed">{benefit.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════ 8. LIFE AT TEXAWAVE ══════════════════════════ */}
        <section className="px-6 py-24 border-b border-border-primary bg-black" id="life-gallery">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16" data-reveal>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Community</span>
              <h2 className="text-3xl md:text-5xl font-black text-text-primary mt-3">Life at TEXAWAVE</h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto text-sm md:text-base">
                A visual overview of our collaborative work environments, labs, and team events.
              </p>
            </div>

            {/* Pinterest Style Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {LIFE_GALLERY.map((pic, idx) => (
                <div
                  key={idx}
                  className={`relative rounded-xl overflow-hidden border border-border-primary bg-bg-card break-inside-avoid ${pic.heightCls} group shadow-crisp`}
                  data-reveal
                >
                  <Image
                    src={pic.url}
                    alt={pic.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-w-768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-5 left-5 right-5 text-left">
                    <p className="text-xs font-mono font-bold text-accent-light uppercase">{"// TEXAWAVE_VIBES"}</p>
                    <h4 className="text-sm font-black text-white mt-1">{pic.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════ 9. RESUME SUBMISSION SECTION ══════════════════════════ */}
        <section className="px-6 py-24 border-b border-border-primary bg-bg-secondary" id="apply-form">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12" data-reveal>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Apply</span>
              <h2 className="text-3xl md:text-5xl font-black text-text-primary mt-3">Ready to Join Us?</h2>
              <p className="text-text-secondary mt-4 text-sm md:text-base">
                Apply for an active opening or submit your resume to our general talent database.
              </p>
            </div>

            <div className="rounded-2xl border border-border-primary bg-bg-card p-6 md:p-10 shadow-premium relative overflow-hidden" data-reveal>
              
              {/* Option Selector tabs */}
              <div className="flex border-b border-border-primary pb-6 mb-8 gap-4">
                <button
                  type="button"
                  onClick={() => setFormType("role")}
                  className={`text-sm font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
                    formType === "role" ? "border-signal text-white" : "border-transparent text-text-secondary hover:text-white"
                  }`}
                >
                  Apply for Open Position
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormType("general");
                    setFormData((p) => ({ ...p, position: "General Sourcing / Talent Pool" }));
                  }}
                  className={`text-sm font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
                    formType === "general" ? "border-signal text-white" : "border-transparent text-text-secondary hover:text-white"
                  }`}
                >
                  General Talent Pool
                </button>
              </div>

              {isSuccess ? (
                <div className="text-center py-10">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-signal/15 text-signal mb-6">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white">Application Received!</h3>
                  <p className="text-text-secondary mt-4 max-w-md mx-auto text-sm leading-relaxed">
                    Thank you for submitting your profile. Our recruiting managers will review your experience and connect with you within 3-5 working days.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-xs font-bold uppercase tracking-wider text-accent-light hover:underline"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="w-full bg-black/50 border border-border-primary rounded px-4 py-3 text-sm focus:outline-none focus:border-signal text-white"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className="w-full bg-black/50 border border-border-primary rounded px-4 py-3 text-sm focus:outline-none focus:border-signal text-white"
                        placeholder="yourname@domain.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full bg-black/50 border border-border-primary rounded px-4 py-3 text-sm focus:outline-none focus:border-signal text-white"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Target Position *</label>
                      <input
                        type="text"
                        required
                        disabled={formType === "general"}
                        value={formData.position}
                        onChange={(e) => setFormData((p) => ({ ...p, position: e.target.value }))}
                        className="w-full bg-black/50 border border-border-primary rounded px-4 py-3 text-sm focus:outline-none focus:border-signal text-white disabled:opacity-50"
                        placeholder={formType === "general" ? "General Talent Pool" : "e.g., Firmware Developer"}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Resume Upload *</label>
                    <div className="border border-dashed border-border-primary hover:border-signal transition-colors rounded-lg p-6 text-center cursor-pointer relative bg-black/25">
                      <input
                        type="file"
                        required={!resumeFile}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setResumeFile(e.target.files[0]);
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept=".pdf,.doc,.docx"
                      />
                      <div className="flex flex-col items-center justify-center">
                        <Upload size={24} className="text-signal mb-3" />
                        {resumeFile ? (
                          <p className="text-sm font-semibold text-white">{resumeFile.name}</p>
                        ) : (
                          <>
                            <p className="text-sm font-semibold text-text-primary">Click to select files or drag-and-drop</p>
                            <p className="text-xs text-text-secondary mt-1">Accepts PDF, DOC, DOCX up to 5MB</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Short Introduction / Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      rows={4}
                      className="w-full bg-black/50 border border-border-primary rounded px-4 py-3 text-sm focus:outline-none focus:border-signal text-white resize-none"
                      placeholder="Tell us briefly about your primary designs, projects, or interests..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cta-magnetic w-full rounded bg-signal py-4 font-bold text-white shadow-crisp border border-transparent flex justify-center items-center gap-2 hover:bg-opacity-90 transition-opacity"
                  >
                    {isSubmitting ? "Uploading Profile..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════ 10. FAQ SECTION ══════════════════════════ */}
        <section className="px-6 py-24 border-b border-border-primary bg-black" id="faq">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16" data-reveal>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-signal">FAQ</span>
              <h2 className="text-3xl md:text-5xl font-black text-text-primary mt-3">Frequently Asked Questions</h2>
              <p className="text-text-secondary mt-4 text-sm md:text-base">
                Got questions? We have clear answers regarding the operational and evaluation cycles.
              </p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-border-primary bg-bg-card overflow-hidden transition-all duration-300"
                    data-reveal
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none group"
                    >
                      <span className="text-sm md:text-base font-black text-white group-hover:text-accent-light transition-colors">
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-accent-light transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    
                    {/* Collapsible panel body */}
                    <div className={`transition-all duration-400 ease-out overflow-hidden ${isOpen ? "max-h-[300px] opacity-100 border-t border-border-primary" : "max-h-0 opacity-0"}`}>
                      <p className="p-6 text-sm text-text-secondary leading-relaxed bg-black/30">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════ 11. FINAL CTA SECTION ══════════════════════════ */}
        <section className="relative px-6 py-28 text-center bg-bg-secondary overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-15" aria-hidden="true">
            {/* Glowing trace background circles */}
            <div className="absolute left-[30%] top-[-20%] w-[500px] h-[500px] rounded-full bg-signal/15 blur-3xl" />
            <div className="absolute right-[30%] bottom-[-20%] w-[500px] h-[500px] rounded-full bg-[#00D4FF]/10 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-signal">Get In Touch</span>
            <h2 className="mt-3 text-3xl md:text-6xl font-black text-text-primary">Ready to Engineer the Future?</h2>
            <p className="mt-5 max-w-xl text-sm md:text-base text-text-secondary leading-relaxed">
              Accelerate your engineering path and build complex hardware solutions with us.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
              <button
                onClick={() => handleScrollTo("#apply-form")}
                className="cta-magnetic inline-flex items-center justify-center gap-2 rounded bg-signal px-7 py-4 font-bold text-white shadow-crisp border border-transparent w-full sm:w-auto"
              >
                Apply Now <ArrowRight size={16} />
              </button>
              
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded border border-border-primary bg-black/40 backdrop-blur-sm px-7 py-4 font-bold text-text-primary transition hover:border-signal w-full sm:w-auto"
              >
                Contact HR <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageChrome>
  );
}
