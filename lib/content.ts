import {
  BadgeCheck,
  Blocks,
  Box,
  BrainCircuit,
  Cable,
  CircuitBoard,
  Cloud,
  Code2,
  Cog,
  Component,
  Cpu,
  Factory,
  FileText,
  FlaskConical,
  Gauge,
  Globe2,
  Handshake,
  Layers3,
  Lightbulb,
  MonitorSmartphone,
  PackageCheck,
  PenTool,
  Printer,
  RadioTower,
  Repeat,
  Scissors,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Waves,
  Wrench,
  Zap
} from "lucide-react";

export const navItems = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" }
];

export const services = [
  {
    slug: "product-engineering",
    title: "Product Engineering",
    short: "Turn complex concepts into market-ready physical products.",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "Industrial & Mechanical Design",
      "Hardware & PCB Design",
      "Embedded & IoT Solutions",
      "Rapid Prototyping & Validation"
    ],
    subServices: [
      { icon: PenTool,           title: "Industrial & Mechanical Design",      desc: "Market analysis, 3D CAD modelling, CMF, and DFM optimisation for physical products." },
      { icon: CircuitBoard,      title: "Hardware & PCB Design",               desc: "Schematic design, multi-layer PCB layout, and compliance-ready circuit engineering." },
      { icon: Cpu,               title: "Embedded & IoT Solutions",            desc: "Bare-metal firmware, RTOS development, and multi-protocol IoT connectivity." },
      { icon: Box,               title: "Rapid Prototyping & Product Validation", desc: "3D printing, CNC machining, and comprehensive physical and environmental validation." }
    ]
  },
  {
    slug: "software-iot",
    title: "Software & AI Development",
    short: "Bridge physical operations and digital scale with intelligent software.",
    icon: Code2,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "Custom ERP Solutions",
      "Web & Mobile Applications",
      "Cloud & Infrastructure Solutions",
      "AI & Data Analytics"
    ],
    subServices: [
      { icon: Settings,          title: "Custom ERP Solutions",                desc: "Tailor-made ERP platforms unifying inventory, HR, and finance with real-time dashboards." },
      { icon: MonitorSmartphone, title: "Web & Mobile Applications",           desc: "Full-stack web platforms and native iOS/Android apps with enterprise-grade security." },
      { icon: Cloud,             title: "Cloud & Infrastructure Solutions",    desc: "AWS/Azure cloud architecture, CI/CD pipelines, and proactive infrastructure monitoring." },
      { icon: BrainCircuit,      title: "AI & Data Analytics",                 desc: "Custom AI models, intelligent data pipelines, and predictive analytics solutions." }
    ]
  },
  {
    slug: "procurement",
    title: "Procurement Services",
    short: "Strategic component sourcing and resilient supply chain management.",
    icon: PackageCheck,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "Component Sourcing",
      "Supply Chain Management",
      "BOM Optimization",
      "Supplier Quality Control"
    ],
    subServices: [
      { icon: PackageCheck,      title: "Component Sourcing",                  desc: "Global distributor network securing premium long-lifecycle components at optimal price points." },
      { icon: Waves,             title: "Supply Chain Management",             desc: "Resilient logistics pipelines, dual-sourcing strategies, and JIT inventory coordination." },
      { icon: FileText,          title: "BOM Optimization",                    desc: "Strategic BOM cost reduction through vendor negotiation and obsolescence profiling." }
    ]
  },
  {
    slug: "manufacturing-support",
    title: "Manufacturing Support",
    short: "Factory-ready support from prototype to high-volume production.",
    icon: Factory,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "DFM/DFA Optimization",
      "Production Transfer",
      "Production Test Solutions",
      "Scale-Up Support"
    ],
    subServices: [
      { icon: Cog,               title: "DFM/DFA Optimization",                desc: "Part simplification, tolerance analysis, and assembly process refinement before tooling begins." },
      { icon: Repeat,            title: "Production Transfer",                  desc: "End-to-end prototype-to-production handoffs with full manufacturing documentation." },
      { icon: ShieldCheck,       title: "Production Test Solutions",            desc: "Custom test fixtures and automated ICT systems for 100% end-of-line quality control." },
      { icon: Gauge,             title: "Scale-Up Support",                    desc: "Yield optimization, factory auditing, and continuous cost engineering as volumes grow." }
    ]
  }
];

export const processSteps = [
  {
    title: "Requirement Analysis",
    copy: "We clarify product intent, technical constraints, target market, compliance needs, and build priorities before engineering begins."
  },
  {
    title: "Design & Engineering",
    copy: "Mechanical, electrical, embedded, procurement, and software teams convert the brief into manufacturable product architecture."
  },
  {
    title: "Prototyping & Testing",
    copy: "We validate critical assumptions through CAD reviews, PCB iterations, firmware checks, fit trials, and performance testing."
  },
  {
    title: "Delivery & Optimization",
    copy: "Texawave supports documentation, production readiness, vendor coordination, value engineering, and launch improvements."
  }
];

export const caseStudies = [
  {
    title: "Semi-Automatic Washer Cutting Machine",
    problem:
      "The client needed a repeatable washer cutting workflow that reduced manual variation and improved throughput.",
    solution:
      "Texawave engineered a semi-automatic machine concept with guided cutting, fixture control, operator-safe ergonomics, and production-ready drawings.",
    deliverables: "Machine design, 3D CAD, assemblies, BOM, fabrication drawings, prototype support.",
    result: "Improved cutting consistency, reduced operator dependency, and a clearer path to batch manufacturing."
  },
  {
    title: "SPM Machine Design and Manufacturing",
    problem:
      "A manufacturing team required a custom special purpose machine for a constrained industrial operation.",
    solution:
      "We developed the mechanical architecture, selected core components, prepared manufacturing documentation, and supported build coordination.",
    deliverables: "SPM design, motion layout, component selection, manufacturing drawings, production support.",
    result: "A purpose-built machine aligned to the client process, footprint, and cost objectives."
  },
  {
    title: "Sterilization Performance Improvement",
    problem:
      "A medical-adjacent product needed better sterilization performance without overhauling the entire product platform.",
    solution:
      "Texawave reviewed the system architecture, identified performance gaps, and refined mechanical and electrical factors affecting sterilization output.",
    deliverables: "Engineering review, design optimization, test support, documentation, implementation guidance.",
    result: "Higher performance reliability and a more controlled validation path for production teams."
  }
];

export const reasons = [
  ["Certified Engineers", BadgeCheck],
  ["Dedicated Support", Handshake],
  ["Cost Efficient Solutions", Gauge],
  ["AI-Driven Solutions", BrainCircuit],
  ["Transparent Project Communication", Globe2],
  ["End-to-End Execution", Layers3],
  ["Subject Matter Experts", ShieldCheck],
  ["Custom Build Approach", PenTool]
] as const;

export interface Client {
  name: string;
  logo: string;
}

export const clients: Client[] = [
  { name: "HBT", logo: "/hbt_logo.webp" },
  { name: "AtumX", logo: "/atumX_logo.webp" },
  { name: "IHL", logo: "/ihl_logo.webp" },
  { name: "R2D2 IIT Madras", logo: "/R2D2_logo.webp" },
  { name: "Auckam Technologies", logo: "/auckum_logo.webp" },
  { name: "Srushty", logo: "/srushty_logo.webp" },
  { name: "FCS", logo: "/fcs_logo.webp" },
  { name: "United Industries", logo: "/united_industries_logo.webp" },
  { name: "Salem Technologies", logo: "/salem_technologies_logo.webp" },
  { name: "Phoenix Medical", logo: "/Phoenix_logo.webp" }
];

export const testimonials = [
  {
    quote:
      "Our product prototype was completed faster than expected. The Texawave team provided clear communication and exceptional engineering support throughout the project.",
    name: "Alexander Chen",
    designation: "Product Development Manager",
    company: "AeroTech Solutions",
    initials: "AC",
    blueprintId: "TXW-TS-01",
    accentColor: "#8CC63F",
  },
  {
    quote:
      "Texawave helped us source critical electronic components during supply chain challenges. Their network and responsiveness saved us valuable time.",
    name: "Sarah Jenkins",
    designation: "Procurement Head",
    company: "Vortex Electronics",
    initials: "SJ",
    blueprintId: "TXW-TS-02",
    accentColor: "#14B8A6",
  },
  {
    quote:
      "The PCB design and manufacturing guidance was outstanding. Every milestone was delivered professionally and on schedule.",
    name: "Marcus Sterling",
    designation: "Hardware Engineer",
    company: "Lumen Robotics",
    initials: "MS",
    blueprintId: "TXW-TS-03",
    accentColor: "#8CC63F",
  },
  {
    quote:
      "We needed a rapid proof-of-concept. Texawave transformed our requirements into a working prototype with remarkable speed.",
    name: "Elena Rostova",
    designation: "Startup Founder",
    company: "Kinetix IoT",
    initials: "ER",
    blueprintId: "TXW-TS-04",
    accentColor: "#14B8A6",
  },
  {
    quote:
      "The team understood our technical requirements immediately and provided practical engineering solutions that reduced development costs.",
    name: "Robert Chen",
    designation: "Manufacturing Director",
    company: "Apex Automations",
    initials: "RC",
    blueprintId: "TXW-TS-05",
    accentColor: "#8CC63F",
  }
];


export const blogPosts = [
  {
    slug: "hardware-product-development-process-2025",
    title: "Hardware Product Development Process: From Concept to Prototype in 2025",
    excerpt:
      "A practical roadmap for turning early product intent into CAD, electronics, firmware, prototypes, and supplier-ready documentation.",
    category: "Industry Insights"
  },
  {
    slug: "mechanical-design-smart-devices",
    title: "Mechanical Design for Smart Devices: 5 Key Factors in Hardware Product Development",
    excerpt:
      "How enclosure strategy, material choices, thermal behavior, assembly, and manufacturing constraints shape connected products.",
    category: "Mechanical"
  },
  {
    slug: "iot-software-development-smart-hardware",
    title: "IoT Software Development for Smart Hardware: How Connected Devices Work Seamlessly",
    excerpt:
      "What global product teams should align across firmware, cloud, dashboards, mobile apps, and device monitoring.",
    category: "Software"
  }
];

export const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "", label: "Clutch Reviews" },
  { value: 4.9, suffix: "/5", label: "Average Rating" }
];

export const capabilityIcons = [Blocks, Cpu, Factory, MonitorSmartphone, Sparkles, Cable];


