"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Rocket,
  Globe,
  Code2,
  Radio,
  Zap,
  Settings,
  Cloud,
  BrainCircuit,
  ArrowRight,
  Shield,
  CheckCircle2,
  Workflow,
  Sparkles,
  Layers
} from "lucide-react";
import { PageChrome } from "@/components/PageChrome";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. HERO CANVAS ENGINEERING VISUALIZATION
// ==========================================
function EngineeringCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    // Dynamic resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    window.addEventListener("resize", handleResize);

    // Mesh network nodes
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];
    const nodeCount = 35;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    // Code particles
    const codeParticles: Array<{
      x: number;
      y: number;
      text: string;
      speed: number;
      opacity: number;
      fontSize: number;
    }> = [];
    const snippets = [
      "import { PageChrome } from '@/components/PageChrome';",
      "const nodes = new Float32Array(count * 3);",
      "gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);",
      "const float = Math.sin(time + index) * 15;",
      "sys.iot.connect({ protocol: 'mqtt' });",
      "pcb.layout.routeTraces({ clearance: 0.15 });",
      "thermal.analyze({ ambient: 25, power: 12.5 });",
      "model.predict({ input: rawTelemetry });",
      "transform: translateZ(0); will-change: transform;"
    ];
    const particleCount = 12;
    for (let i = 0; i < particleCount; i++) {
      codeParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        text: snippets[Math.floor(Math.random() * snippets.length)],
        speed: 0.2 + Math.random() * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        fontSize: Math.floor(Math.random() * 3) + 9,
      });
    }

    // Circuit Traces
    const traces: Array<{
      points: Array<{ x: number; y: number }>;
      currentIdx: number;
      progress: number;
      speed: number;
      color: string;
    }> = [];

    const createTrace = () => {
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      const points = [{ x: startX, y: startY }];
      let curX = startX;
      let curY = startY;

      // Create a path with 3-4 right-angle segments
      const segments = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < segments; i++) {
        const length = Math.random() * 80 + 30;
        const dir = Math.random() > 0.5 ? "H" : "V";
        if (dir === "H") {
          curX += Math.random() > 0.5 ? length : -length;
        } else {
          curY += Math.random() > 0.5 ? length : -length;
        }
        points.push({ x: curX, y: curY });
      }

      return {
        points,
        currentIdx: 0,
        progress: 0,
        speed: 0.02 + Math.random() * 0.03,
        color: Math.random() > 0.4 ? "rgba(140, 198, 63, 0.4)" : "rgba(63, 174, 73, 0.4)"
      };
    };

    for (let i = 0; i < 6; i++) {
      traces.push(createTrace());
    }

    // Rotating 3D Wireframe Cube
    const cubeCenter = { x: width * 0.5, y: height * 0.5 };
    const vertices = [
      { x: -100, y: -100, z: -100 },
      { x: 100, y: -100, z: -100 },
      { x: 100, y: 100, z: -100 },
      { x: -100, y: 100, z: -100 },
      { x: -100, y: -100, z: 100 },
      { x: 100, y: -100, z: 100 },
      { x: 100, y: 100, z: 100 },
      { x: -100, y: 100, z: 100 }
    ];
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back face
      [4, 5], [5, 6], [6, 7], [7, 4], // Front face
      [0, 4], [1, 5], [2, 6], [3, 7]  // Connectors
    ];
    let angleX = 0.003;
    let angleY = 0.005;

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Mesh Nodes & Links
      ctx.strokeStyle = "rgba(140, 198, 63, 0.12)";
      ctx.lineWidth = 1;
      for (let i = 0; i < nodeCount; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;

        // Bounce
        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        ctx.fillStyle = "rgba(140, 198, 63, 0.25)";
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect close nodes
        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw Code Particles
      ctx.font = "italic monospace 10px";
      for (let i = 0; i < codeParticles.length; i++) {
        const cp = codeParticles[i];
        cp.y -= cp.speed;
        cp.opacity -= 0.001;

        if (cp.y < -20 || cp.opacity <= 0) {
          cp.y = height + 20;
          cp.x = Math.random() * width;
          cp.opacity = Math.random() * 0.5 + 0.15;
          cp.text = snippets[Math.floor(Math.random() * snippets.length)];
        }

        ctx.fillStyle = `rgba(140, 198, 63, ${cp.opacity})`;
        ctx.font = `${cp.fontSize}px monospace`;
        ctx.fillText(cp.text, cp.x, cp.y);
      }

      // 3. Draw 3D Rotating Cube
      cubeCenter.x = width * 0.5;
      cubeCenter.y = height * 0.5;

      // Rotate vertices
      const rotated = vertices.map((v) => {
        // Rotate around Y
        let x1 = v.x * Math.cos(angleY) - v.z * Math.sin(angleY);
        let z1 = v.x * Math.sin(angleY) + v.z * Math.cos(angleY);
        // Rotate around X
        let y2 = v.y * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = v.y * Math.sin(angleX) + z1 * Math.cos(angleX);

        // Project
        const d = 500;
        const scaleFactor = d / (z2 + 350);
        return {
          x: x1 * scaleFactor + cubeCenter.x,
          y: y2 * scaleFactor + cubeCenter.y
        };
      });

      // Update angles
      angleX += 0.0015;
      angleY += 0.0025;

      // Draw cube lines
      ctx.strokeStyle = "rgba(140, 198, 63, 0.18)";
      ctx.lineWidth = 1.5;
      edges.forEach(([start, end]) => {
        ctx.beginPath();
        ctx.moveTo(rotated[start].x, rotated[start].y);
        ctx.lineTo(rotated[end].x, rotated[end].y);
        ctx.stroke();
      });

      // 4. Draw Circuit Traces
      traces.forEach((t, idx) => {
        ctx.strokeStyle = t.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        // Draw completed segments
        for (let i = 0; i < t.currentIdx; i++) {
          ctx.moveTo(t.points[i].x, t.points[i].y);
          ctx.lineTo(t.points[i + 1].x, t.points[i + 1].y);
        }

        // Draw active segment
        const pStart = t.points[t.currentIdx];
        const pEnd = t.points[t.currentIdx + 1];
        if (pStart && pEnd) {
          const dx = pEnd.x - pStart.x;
          const dy = pEnd.y - pStart.y;
          const nextX = pStart.x + dx * t.progress;
          const nextY = pStart.y + dy * t.progress;

          ctx.moveTo(pStart.x, pStart.y);
          ctx.lineTo(nextX, nextY);
          ctx.stroke();

          // Draw a glowing head at the trace tip
          ctx.fillStyle = "rgba(140, 198, 63, 0.9)";
          ctx.beginPath();
          ctx.arc(nextX, nextY, 2.5, 0, Math.PI * 2);
          ctx.fill();

          t.progress += t.speed;
          if (t.progress >= 1) {
            t.progress = 0;
            t.currentIdx++;
            if (t.currentIdx >= t.points.length - 1) {
              traces[idx] = createTrace();
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-65 pointer-events-none" />;
}

// ==========================================
// 2. MISSION & VISION CARD & 3D TILT
// ==========================================
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hasTilt?: boolean;
}

function GlassCard({ children, className = "", hasTilt = false }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 18;
    const angleY = (x - xc) / 18;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!hasTilt || !cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: "translateZ(0)",
        willChange: "transform",
        backfaceVisibility: "hidden"
      }}
      className={`relative overflow-hidden rounded-2xl border border-neutral-800 bg-[#060606]/40 p-8 backdrop-blur-xl transition-all duration-500 hover:border-[#8CC63F]/80 hover:shadow-[0_0_40px_rgba(140,198,63,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}

// ==========================================
// 3. STATS COUNT-UP VISUALIZATION
// ==========================================
interface StatCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function StatCounter({ target, suffix = "", prefix = "", duration = 1.5 }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = target;
          const totalFrames = Math.round(duration * 60);
          let frame = 0;

          const counter = () => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out formula
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = start + easeProgress * (end - start);
            setCount(currentCount);

            if (frame < totalFrames) {
              requestAnimationFrame(counter);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(counter);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, duration]);

  // Handle floats or rounded ints
  const displayVal = target % 1 === 0 ? Math.round(count) : count.toFixed(1);
  const formattedVal = Number(displayVal).toLocaleString("en-US");

  return <span ref={elementRef}>{prefix}{formattedVal}{suffix}</span>;
}

// ==========================================
// 4. MAIN ABOUT PAGE
// ==========================================
export default function AboutPage() {
  const [hoveredOrbitIdx, setHoveredOrbitIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);

  // GSAP Entrance Animations
  useGSAP(() => {
    // Reveal text
    gsap.fromTo(
      ".reveal-hero-text",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top 80%"
        }
      }
    );

    // Staggered cards reveal
    gsap.fromTo(
      ".reveal-mission-cards > div",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".mission-section",
          start: "top 75%"
        }
      }
    );

    // Staggered stats reveal
    gsap.fromTo(
      ".reveal-stat-cards",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%"
        }
      }
    );

    // Workflow steps reveal
    gsap.fromTo(
      ".reveal-timeline-step",
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top 75%"
        }
      }
    );
  }, { scope: containerRef });

  // CTA Magnetic Button Effect
  useEffect(() => {
    const btn = ctaButtonRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.38,
        y: y * 0.38,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Orbiting Domains Data
  const domains = [
    {
      title: "Software Engineering",
      icon: Code2,
      color: "from-blue-500/20 to-[#1E3A0E]/20",
      details: ["Architecture Design", "Web Applications", "Mobile Applications", "Enterprise Software", "High-performance Systems"]
    },
    {
      title: "IoT & Connected Systems",
      icon: Radio,
      color: "from-purple-500/20 to-[#1E3A0E]/20",
      details: ["Smart Device Connectivity", "Edge Computing", "Real-time Data Systems", "Sensor Networks", "Industrial IoT"]
    },
    {
      title: "Electrical Engineering",
      icon: Zap,
      color: "from-yellow-500/20 to-[#1E3A0E]/20",
      details: ["Circuit Design", "PCB Development", "Power Electronics", "Embedded Systems", "Energy Optimization"]
    },
    {
      title: "Mechanical Engineering",
      icon: Settings,
      color: "from-orange-500/20 to-[#1E3A0E]/20",
      details: ["Product Design", "Structural Analysis", "Thermal Engineering", "Manufacturing Design", "Industrial Components"]
    },
    {
      title: "Cloud & Infrastructure",
      icon: Cloud,
      color: "from-cyan-500/20 to-[#1E3A0E]/20",
      details: ["Cloud Architecture", "DevOps", "CI/CD", "Infrastructure Automation", "Scalability Optimization"]
    },
    {
      title: "Data & AI Integration",
      icon: BrainCircuit,
      color: "from-emerald-500/20 to-[#1E3A0E]/20",
      details: ["Artificial Intelligence", "Machine Learning", "Predictive Analytics", "Industrial Intelligence", "Business Automation"]
    }
  ];

  // Orbiting layout floating coords (slow loop)
  const [orbitOffsets, setOrbitOffsets] = useState(domains.map(() => ({ x: 0, y: 0 })));
  useEffect(() => {
    let animationFrameId: number;
    let start = Date.now();

    const loop = () => {
      const elapsed = (Date.now() - start) * 0.001;
      setOrbitOffsets(
        domains.map((_, i) => {
          // If hovered, hold float still
          if (hoveredOrbitIdx === i) return { x: 0, y: 0 };
          const angle = (i * Math.PI) / 3;
          const driftX = Math.sin(elapsed + i * 1.5) * 8;
          const driftY = Math.cos(elapsed * 1.2 + i * 2.1) * 8;
          return { x: driftX, y: driftY };
        })
      );
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [hoveredOrbitIdx]);

  return (
    <PageChrome>
      {/* Set theme layout matching homepage */}
      <div
        ref={containerRef}
        style={{ contentVisibility: "auto" }}
        className="bg-[#0F1115] text-[#EEEEEE] font-sans antialiased overflow-hidden min-h-screen relative z-10"
      >
        {/* Subtle Cyber Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Dynamic Glow Orbs matching homepage */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#8CC63F]/12 blur-[130px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#14B8A6]/4 blur-[150px] pointer-events-none" />

        {/* ==========================================
            SECTION 1 — HERO INTRODUCTION
            ========================================== */}
        <section className="hero-section relative min-h-[calc(100vh-110px)] flex items-center py-20 px-[clamp(1rem,4vw,4rem)] max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 z-20 flex flex-col justify-center">
            <span className="reveal-hero-text text-[12px] font-black uppercase tracking-[0.25em] text-[#8CC63F] inline-block mb-4">
              About Texawave
            </span>
            <h1 className="reveal-hero-text font-display font-bold text-hero leading-[1.05] tracking-tight text-white mb-6">
              Shaping the Future <br />
              Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EEEEEE] to-[#8CC63F]">Engineering</span> <br />
              Excellence
            </h1>
            <p className="reveal-hero-text text-body-large text-[#CCCCCC] leading-relaxed max-w-xl">
              Welcome to Texawave. We are a team of visionary builders, problem solvers, and technologists dedicated to transforming complex challenges into seamless digital realities. By combining deep technical mastery with a passion for innovation, we empower businesses to navigate the evolving digital landscape and scale efficiently.
            </p>
          </div>

          <div className="lg:col-span-6 relative w-full h-[350px] sm:h-[450px] lg:h-[550px] flex items-center justify-center border border-neutral-900 rounded-3xl bg-neutral-950/20 backdrop-blur-sm overflow-hidden group shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
            {/* Absolute overlay visual details */}
            <div className="absolute top-4 left-4 font-mono text-[9px] text-neutral-600 tracking-wider uppercase select-none">
              Texawave Engine // Vis_Active
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[9px] text-neutral-600 select-none">
              [SYSTEM_STATUS: NOMINAL]
            </div>
            {/* Engineering Canvas rendering */}
            <EngineeringCanvas />
          </div>
        </section>

        {/* ==========================================
            SECTION 2 — MISSION & VISION
            ========================================== */}
        <section className="mission-section py-24 px-[clamp(1rem,4vw,4rem)] max-w-[1400px] mx-auto border-t border-neutral-900/50">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display font-bold text-section text-white mb-4">Core Principles</h2>
            <p className="text-[#AAAAAA]">The principles that drive our engineering decisions and project lifecycle support.</p>
          </div>

          <div className="reveal-mission-cards grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <GlassCard hasTilt={true} className="flex flex-col h-full justify-between group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#1E3A0E]/15 rounded-bl-full blur-xl group-hover:bg-[#8CC63F]/10 transition-all duration-500" />
              <div>
                <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 text-white mb-8 group-hover:border-[#8CC63F] group-hover:text-[#8CC63F] transition-colors duration-500 shadow-md">
                  <Rocket size={24} className="group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
                <h3 className="font-display font-bold text-card text-white mb-4">Our Mission</h3>
                <p className="text-[#EEEEEE] text-[15px] leading-relaxed">
                  To engineer high-performance, scalable technology solutions that drive measurable business impact. We build software and systems that don&apos;t just solve today&apos;s problems but unlock tomorrow&apos;s opportunities.
                </p>
              </div>
              <div className="mt-8 border-t border-neutral-900 pt-4 flex items-center gap-2 text-xs font-mono text-neutral-500 group-hover:text-[#8CC63F] transition-colors duration-300">
                <span>[ACTIVATE MISSION ENGINE]</span>
              </div>
            </GlassCard>

            {/* Vision Card */}
            <GlassCard hasTilt={false} className="flex flex-col h-full justify-between group relative">
              {/* Laser border running path */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="15"
                    fill="none"
                    stroke="#8CC63F"
                    strokeWidth="1.5"
                    strokeDasharray="160 500"
                    className="animate-[marquee_6s_linear_infinite]"
                  />
                </svg>
              </div>
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#1E3A0E]/15 rounded-bl-full blur-xl group-hover:bg-[#8CC63F]/10 transition-all duration-500" />
              <div>
                <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 text-white mb-8 group-hover:border-[#8CC63F] group-hover:text-[#8CC63F] transition-colors duration-500 shadow-md">
                  <Globe size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h3 className="font-display font-bold text-card text-white mb-4">Our Vision</h3>
                <p className="text-[#EEEEEE] text-[15px] leading-relaxed">
                  To be the global benchmark for technical innovation and a trusted partner for enterprises looking to redefine their industries through cutting-edge engineering.
                </p>
              </div>
              <div className="mt-8 border-t border-neutral-900 pt-4 flex items-center gap-2 text-xs font-mono text-neutral-500 group-hover:text-[#8CC63F] transition-colors duration-300">
                <span>[GLOBAL BLUEPRINT VISUAL]</span>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ==========================================
            SECTION 3 — ENGINEERING EXPERTISE
            ========================================== */}
        <section className="py-28 px-[clamp(1rem,4vw,4rem)] max-w-[1400px] mx-auto border-t border-neutral-900/50">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#8CC63F] inline-block mb-3">Ecosystem</span>
            <h2 className="font-display font-bold text-section text-white mb-4">Engineering Expertise</h2>
            <p className="text-[#AAAAAA]">A multi-disciplinary stack designed to build, scale, and secure complex hardware and software systems.</p>
          </div>

          {/* Desktop Orbit Component */}
          <div className="hidden lg:block relative w-full h-[700px] flex items-center justify-center select-none">
            {/* Connector Lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E3A0E" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#8CC63F" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#1E3A0E" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {domains.map((_, i) => {
                const angle = (i * Math.PI) / 3;
                const radiusX = 350;
                const radiusY = 240;
                const targetX = 500 + radiusX * Math.cos(angle);
                const targetY = 350 + radiusY * Math.sin(angle);
                const isHovered = hoveredOrbitIdx === i;

                return (
                  <g key={i}>
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${(targetX / 1000) * 100}%`}
                      y2={`${(targetY / 700) * 100}%`}
                      stroke={isHovered ? "url(#glowGrad)" : "rgba(140, 198, 63, 0.15)"}
                      strokeWidth={isHovered ? 2.5 : 1}
                      className="transition-all duration-300"
                    />
                    {isHovered && (
                      <circle
                        cx={`${(targetX / 1000) * 100}%`}
                        cy={`${(targetY / 700) * 100}%`}
                        r="5"
                        fill="#8CC63F"
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Central pulsator */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full z-10 flex flex-col items-center justify-center text-center">
              <div className={`absolute inset-0 bg-[#1E3A0E]/30 rounded-full blur-2xl transition-transform duration-500 ${hoveredOrbitIdx !== null ? "scale-125 bg-[var(--primary-green)]/15" : "scale-100"}`} />
              <div className="relative w-full h-full flex flex-col items-center justify-center border border-[#8CC63F]/30 rounded-full bg-black/90 backdrop-blur-md shadow-[0_0_30px_rgba(140,198,63,0.25)]">
                <div className="font-display font-black tracking-[0.25em] text-[10px] text-[#8CC63F] mb-1">TEXAWAVE</div>
                <div className="font-display font-black tracking-widest text-[13px] text-white">ENGINEERING</div>
                <div className="absolute inset-2 border border-dashed border-[#8CC63F]/20 rounded-full animate-[spin_40s_linear_infinite]" />
                <div className="absolute -inset-2 border border-dashed border-[#8CC63F]/15 rounded-full animate-[spin_60s_linear_infinite_reverse]" />
              </div>
            </div>

            {/* Orbit cards */}
            {domains.map((domain, i) => {
              const Icon = domain.icon;
              const angle = (i * Math.PI) / 3;
              const radiusX = 35;
              const radiusY = 32;
              const isHovered = hoveredOrbitIdx === i;

              // Left/Top percentage coords
              const leftPercent = 50 + radiusX * Math.cos(angle);
              const topPercent = 50 + radiusY * Math.sin(angle);

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredOrbitIdx(i)}
                  onMouseLeave={() => setHoveredOrbitIdx(null)}
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: `translate3d(calc(-50% + ${orbitOffsets[i].x}px), calc(-50% + ${orbitOffsets[i].y}px), 0)`,
                    willChange: "transform, opacity",
                    backfaceVisibility: "hidden"
                  }}
                  className={`absolute z-20 w-[240px] rounded-xl border p-5 backdrop-blur-md transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? "border-[#8CC63F] bg-neutral-950 shadow-[0_0_30px_rgba(140,198,63,0.25)] scale-[1.05]"
                      : hoveredOrbitIdx !== null
                      ? "border-neutral-900 bg-neutral-950/20 opacity-35 scale-[0.96]"
                      : "border-neutral-800 bg-neutral-950/65"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg border transition-colors duration-300 ${isHovered ? "border-[#8CC63F]/40 bg-[#1E3A0E]/30 text-[#8CC63F]" : "border-neutral-800 bg-neutral-900 text-[#EEEEEE]"}`}>
                      <Icon size={18} />
                    </div>
                    <h4 className="font-display font-bold text-sm text-white">{domain.title}</h4>
                  </div>
                  
                  {/* Expanded lists on hover */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isHovered ? "max-h-[160px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                    <ul className="space-y-1.5 border-t border-neutral-900 pt-3">
                      {domain.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-[11px] text-[#BBBBBB]">
                          <span className="w-1.5 h-1.5 bg-[#8CC63F] rounded-full shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Orbit Fallback Accordion */}
          <div className="lg:hidden space-y-4">
            {domains.map((domain, i) => {
              const Icon = domain.icon;
              const isHovered = hoveredOrbitIdx === i;
              return (
                <div
                  key={i}
                  onClick={() => setHoveredOrbitIdx(isHovered ? null : i)}
                  className={`rounded-xl border p-5 bg-neutral-950/60 border-neutral-800 transition-all duration-300 ${isHovered ? "border-[#8CC63F] shadow-[0_0_20px_rgba(140,198,63,0.15)]" : ""}`}
                >
                  <div className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg border ${isHovered ? "border-[#8CC63F] text-[#8CC63F] bg-[#1E3A0E]/20" : "border-neutral-800 text-neutral-400 bg-neutral-900"}`}>
                        <Icon size={20} />
                      </div>
                      <h4 className="font-display font-bold text-base text-white">{domain.title}</h4>
                    </div>
                    <span className={`text-xs text-[#8CC63F] font-mono transition-transform duration-300 ${isHovered ? "rotate-90" : ""}`}>
                      ❯
                    </span>
                  </div>
                  
                  <AnimatePresence initial={false}>
                    {isHovered && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-neutral-900">
                          {domain.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-[#CCCCCC]">
                              <span className="w-1.5 h-1.5 bg-[#8CC63F] rounded-full shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            SECTION 4 — WHY TEXAWAVE
            ========================================== */}
        <section className="stats-section py-24 px-[clamp(1rem,4vw,4rem)] max-w-[1400px] mx-auto border-t border-neutral-900/50">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#8CC63F] inline-block mb-3">Distinction</span>
              <h2 className="font-display font-bold text-section text-white mb-5 leading-[1.1]">Why Leading Enterprises Trust Texawave</h2>
              <p className="text-[#AAAAAA] leading-relaxed mb-6">
                Hardware development demands unity across mechanics, electronics, procurement, and code. We eliminate structural isolation to align speed, cost, and manufacturability from day one.
              </p>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              {[
                {
                  id: "01",
                  title: "Multi-disciplinary Engineering",
                  desc: "Mechanical, electrical, embedded, and cloud streams unified under cohesive design management.",
                  stat: 15,
                  statSuffix: "+ Fields"
                },
                {
                  id: "02",
                  title: "End-to-End Product Development",
                  desc: "Complete project ownership from initial feasibility analysis down to physical factory floor handoffs.",
                  stat: 50,
                  statSuffix: "+ Products"
                },
                {
                  id: "03",
                  title: "Hardware + Software Expertise",
                  desc: "Intelligent software layers matched with custom high-speed board development and telemetry connectivity.",
                  stat: 10,
                  statSuffix: "M+ Lines of Code"
                },
                {
                  id: "04",
                  title: "Scalable Industrial Solutions",
                  desc: "Robust architecture, components validation, and certifications aligned to international ISO criteria.",
                  stat: 99.9,
                  statSuffix: "% Uptime"
                }
              ].map((card, i) => (
                <div
                  key={i}
                  className="reveal-stat-cards relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/40 p-6 transition-all duration-300 hover:border-[#8CC63F] hover:shadow-[0_0_25px_rgba(140,198,63,0.15)] group"
                >
                  <div className="absolute top-4 right-6 font-mono text-[24px] font-black text-neutral-800 select-none group-hover:text-[#8CC63F]/20 transition-colors duration-300">
                    {card.id}
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-[28px] font-display font-black text-[#8CC63F] drop-shadow-[0_0_10px_rgba(140,198,63,0.2)]">
                      <StatCounter target={card.stat} suffix={card.statSuffix} />
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-[17px] text-white mb-2">{card.title}</h4>
                  <p className="text-xs text-[#AAAAAA] leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 5 — ENGINEERING WORKFLOW TIMELINE
            ========================================== */}
        <section className="timeline-section py-28 px-[clamp(1rem,4vw,4rem)] max-w-[1400px] mx-auto border-t border-neutral-900/50">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#8CC63F] inline-block mb-3">Workflow</span>
            <h2 className="font-display font-bold text-section text-white mb-4">Engineering Workflow Timeline</h2>
            <p className="text-[#AAAAAA]">A systematic approach designed to guide projects from abstract design blueprints to validated deployment.</p>
          </div>

          {/* Timeline Steps Layout */}
          <div className="relative">
            {/* Running Glowing Connection Line (Desktop) */}
            <div className="hidden lg:block absolute top-[44px] left-[6%] right-[6%] h-[2px] bg-neutral-900 pointer-events-none z-0">
              <div className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-transparent via-[#8CC63F] to-transparent animate-[marquee_4s_linear_infinite]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-4 relative z-10">
              {[
                { step: "01", name: "Discovery", desc: "Target definitions & technical constraint analysis." },
                { step: "02", name: "Research", desc: "Component exploration & architecture planning." },
                { step: "03", name: "Engineering", desc: "CAD development, hardware board design & software routing." },
                { step: "04", name: "Prototyping", desc: "Physically building initial boards & validation enclosures." },
                { step: "05", name: "Testing", desc: "Rigorous thermal, hardware board & code load evaluation." },
                { step: "06", name: "Production", desc: "Supplier procurement, board yields & DFM scaling." },
                { step: "07", name: "Deployment", desc: "Final launch, field telemetry & system optimizations." }
              ].map((step, idx) => (
                <div key={idx} className="reveal-timeline-step flex lg:flex-col items-center lg:text-center group relative">
                  {/* Glow circle indicator */}
                  <div className="relative w-20 h-20 rounded-full border border-neutral-800 bg-[#060606] flex items-center justify-center mb-0 lg:mb-6 shrink-0 z-15 group-hover:border-[#8CC63F] group-hover:shadow-[0_0_18px_rgba(140,198,63,0.25)] transition-all duration-300 mr-5 lg:mr-0">
                    <span className="text-[13px] font-mono font-bold text-[#8CC63F]">{step.step}</span>
                    <div className="absolute inset-1 border border-dashed border-neutral-900 rounded-full group-hover:border-[#8CC63F]/30 group-hover:rotate-45 transition-all duration-500" />
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-sm text-white mb-1.5 group-hover:text-[#8CC63F] transition-colors duration-300">{step.name}</h4>
                    <p className="text-[11px] text-[#999999] leading-relaxed max-w-[160px] lg:mx-auto">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            SECTION 6 — FINAL CTA SECTION
            ========================================== */}
        <section className="relative py-32 px-[clamp(1rem,4vw,4rem)] border-t border-neutral-900/50 bg-[radial-gradient(ellipse_at_center,rgba(140,198,63,0.08)_0%,transparent_70%)] overflow-hidden">
          <div className="max-w-[1400px] mx-auto text-center relative z-20">
            <h2 className="font-display font-bold text-section text-white mb-6 leading-tight max-w-2xl mx-auto">
              Ready to Elevate Your Technology?
            </h2>
            <p className="text-body-large text-[#CCCCCC] max-w-xl mx-auto mb-10 leading-relaxed">
              Whether you are looking to modernize legacy systems, build a groundbreaking new product, or scale your infrastructure, Texawave has the engineering expertise to get you there.
            </p>

            <a
              ref={ctaButtonRef}
              href="/contact"
              style={{
                willChange: "transform",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden"
              }}
              className="inline-flex items-center justify-center gap-2 rounded bg-[#8CC63F] px-8 py-5 font-bold text-black border border-transparent shadow-[0_0_15px_rgba(140,198,63,0.2)] hover:bg-[#a8eb90] hover:shadow-[0_0_25px_rgba(140,198,63,0.45)] transition-all duration-300"
            >
              Partner With Us Today <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </div>
    </PageChrome>
  );
}
