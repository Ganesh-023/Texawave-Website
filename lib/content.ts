import {
  BadgeCheck,
  Blocks,
  Box,
  BrainCircuit,
  Cable,
  CircuitBoard,
  Cloud,
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
    slug: "software-iot",
    title: "Software Engineering",
    short:
      "Connected product software, dashboards, mobile apps, cloud platforms, and IoT operations for smart devices.",
    icon: RadioTower,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "Custom Enterprise Resource Planning (ERP) solutions",
      "Website Development",
      "Cloud Platform Management",
      "IoT Platform Management",
      "Device Dashboards",
      "Connected Product Software"
    ],
    subServices: [
      { icon: Smartphone,        title: "Mobile App Development",             desc: "Develop scalable iOS and Android applications with intuitive user experiences and high performance." },
      { icon: Globe2,            title: "Website Development",                desc: "Build responsive, secure, and modern websites and web applications using the latest technologies." },
      { icon: Cloud,             title: "Cloud & IoT Platform Management",    desc: "Manage cloud infrastructure and IoT ecosystems with seamless integration, automation, and monitoring." },
    ]
  },
  {
    slug: "electrical-engineering",
    title: "Electrical Engineering",
    short:
      "PCB design, embedded firmware, prototyping, assembly support, and control systems built for reliable products.",
    icon: CircuitBoard,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "Multi-layer PCB Design",
      "Embedded Firmware",
      "BOM Optimization",
      "Enclosure Design",
      "Casing Design",
      "PCB Fabrication",
      "PCB Assembly Support",
      "Prototyping",
      "Production",
      "PLC Programming"
    ],
    subServices: [
      { icon: CircuitBoard,      title: "Multi-layer PCB Design",             desc: "We create compact, high-speed, multi-layer PCB layouts optimized for signal integrity and manufacturability." },
      { icon: Cpu,               title: "Embedded Firmware",                  desc: "Seamless firmware development for microcontrollers and embedded systems, ensuring hardware-software synchronization and optimized performance." },
      { icon: SlidersHorizontal, title: "BoM Optimization & Estimation",      desc: "Minimize cost and risk with component-level optimization, vendor mapping, and accurate BoM cost projections." },
      { icon: Box,               title: "Enclosure Design",                   desc: "Custom enclosure design balancing aesthetics, thermal management, component layout, and durability." },
      { icon: Layers3,           title: "Casing Design",                      desc: "User-focused casing designs with smart detailing, ruggedness, and modularity for industrial and consumer products." },
      { icon: Printer,           title: "PCB Board Fabrication",              desc: "End-to-end fabrication support with verified manufacturing partners ensuring quality and reliability." },
      { icon: Settings,          title: "PCB Assembly Support",               desc: "Assembly-ready PCB support with documentation, component validation, and manufacturing coordination." },
      { icon: Sparkles,          title: "Prototyping & Production",            desc: "Rapid prototyping and scalable production support including testing and vendor management." },
      { icon: Zap,               title: "PLC Programming",                    desc: "Efficient and scalable PLC programming solutions for industrial automation systems." },
    ]
  },
  {
    slug: "mechanical-engineering",
    title: "Mechanical Engineering",
    short:
      "With a focus on innovation and quality, our team delivers end-to-end hardware and design solutions that exceed expectations.",
    icon: Wrench,
    image:
      "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "New Product Development",
      "3D & 2D CAD Design",
      "Plastic and Sheet Metal Design",
      "BOM Generation",
      "Assembly Drawings",
      "Reverse Engineering",
      "Value Engineering",
      "SPM Design",
      "Prototyping",
      "Production Support"
    ],
    subServices: [
      { icon: PenTool,           title: "3D & 2D CAD Design",                  desc: "Our expert team creates detailed 3D models and precise 2D drawings that align with industry standards. We ensure accuracy, clarity, and manufacturability in every design." },
      { icon: Layers3,           title: "Plastic & Sheet Metal Design",        desc: "We design efficient, cost-effective plastic and sheet metal parts tailored to manufacturing processes. Optimized for injection molding, stamping, bending, and more." },
      { icon: FileText,          title: "BOM Generation & Assembly Drawings",  desc: "Comprehensive Bill of Materials and clear assembly drawings that ensure smooth production and procurement with well-structured documentation." },
      { icon: Repeat,            title: "Reverse Engineering",                  desc: "We reverse engineer physical products with high accuracy, enabling redesign, replication, or improvement using CAD and analysis tools." },
      { icon: Gauge,             title: "Value Engineering",                   desc: "Cut costs without compromising quality. We analyze and refine existing designs to improve performance, reduce materials, and optimize functionality." },
      { icon: Cog,               title: "SPM Design",                          desc: "Custom special purpose machine design for unique industrial needs, increasing automation, speed, and productivity." },
      { icon: Box,               title: "Prototyping",                         desc: "Bring your design to life with rapid, functional prototyping. Proof-of-concept builds and working models to validate form, fit, and function." },
      { icon: Factory,           title: "Production Support",                  desc: "From small batches to full-scale manufacturing, we support seamless production with quality-focused engineering and technical documentation." },
    ]
  },
  {
    slug: "procurement",
    title: "Procurement",
    short:
      "End-to-end component procurement, supplier management, cost optimization, and supply chain coordination to ensure seamless manufacturing continuity.",
    icon: PackageCheck,
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    deliverables: [
      "Supplier ID & Management",
      "Vendor Coordination",
      "BOM-based Purchasing",
      "Component & Material Procurement",
      "Cost Optimization",
      "Supply Chain Coordination",
      "Logistics & Sourcing Support"
    ],
    subServices: [
      { icon: Blocks,            title: "Supplier Identification & Management", desc: "Rigorous vetting, selection, and performance monitoring of global manufacturing partners and component distributors." },
      { icon: Component,         title: "BOM-Based Purchasing",                 desc: "Full-scale procurement matching bill-of-materials requirements with optimized lead times and strict quality control." },
      { icon: Cpu,               title: "Component & Material Procurement",    desc: "Direct procurement of passives, semiconductors, electromechanical parts, custom enclosures, and materials." },
      { icon: Waves,             title: "Cost Optimization & Negotiation",      desc: "Strategic sourcing to reduce unit economics, minimize component risk, and lock in volume pricing." },
      { icon: Zap,               title: "Supply Chain & Logistics Support",     desc: "End-to-end supply chain coordination, customs clearances, global logistics management, and production continuity." },
      { icon: Lightbulb,         title: "Vendor Coordination",                  desc: "Managing communications, quality agreements, production runs, and engineering change orders with manufacturing partners." },
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

export const works = [
  {
    slug: "washer-cutting-machine",
    title: "Semi-Automatic Washer Cutting Machine",
    category: "SPM Projects",
    client: "FCS",
    short:
      "Design and manufacturing of a Semi-Automatic Teflon/Nylon Washer Cutting Machine engineered for precision cutting, optimized material handling, and operator safety.",
    icon: Scissors,
    image: "/Washer-Cutting-Machine-Case-Study.webp",
    services: ["BOM Development", "CAD Design", "Reverse Engineering", "Manufacturing"],
    overview:
      "Texawave designed and manufactured a Semi-Automatic Teflon/Nylon Washer Cutting Machine capable of producing washers in multiple sizes and cutting angles with high accuracy. The solution combines precision engineering, semi-automation, and enhanced safety features to improve productivity while maintaining consistent product quality.",
    challenges: [
      "Handling washers of varying sizes efficiently.",
      "Delivering precise cuts at different angles.",
      "Reducing material waste and production defects.",
      "Improving operator safety without compromising productivity.",
      "Balancing automation with manual control for process flexibility."
    ],
    solutions: [
      { title: "Precision Mechanical Design", desc: "Developed detailed CAD models and manufacturing drawings focused on stability, accuracy, and ease of operation." },
      { title: "Optimized Material Handling", desc: "Designed an advanced clamping mechanism to securely hold washers during cutting operations and eliminate material slippage." },
      { title: "Semi-Automated Workflow", desc: "Integrated automation features for repetitive operations while retaining operator control for customization." },
      { title: "Safety-First Engineering", desc: "Implemented safety interlocks, emergency stop systems, and ergonomic controls to ensure safe machine operation." },
      { title: "Validation & Testing", desc: "Conducted extensive testing and refinement to achieve consistent cutting performance across different washer sizes and materials." }
    ],
    results: [
      "Improved material clamping and stability.",
      "High-precision cutting at multiple angles.",
      "Reduced material waste and rework.",
      "Increased production efficiency through semi-automation.",
      "Enhanced operator safety and usability."
    ],
    conclusion:
      "The Semi-Automatic Washer Cutting Machine demonstrates Texawave's expertise in custom machine development, combining precision engineering, manufacturing excellence, and automation to deliver a reliable production solution for industrial applications."
  },
  {
    slug: "espin-nano-machine",
    title: "Espin Nano Machine",
    category: "Reverse Engineering",
    client: "Physics Instruments",
    short:
      "Design and manufacturing of an advanced electrospinning machine for nanofiber production with integrated PLC automation and precision process control.",
    icon: Zap,
    image: "/Espin-Nano-Machine-Case-Study.webp",
    services: ["CAD Design", "Manufacturing", "PLC Programming", "Design for Manufacturing"],
    overview:
      "Texawave designed and manufactured the Espin Nano Machine, an advanced electrospinning platform developed for the production of high-quality nanofibers. The project combined precision mechanical engineering with intelligent PLC-based automation to create a reliable and fully integrated manufacturing solution.",
    challenges: [
      "Delivering consistent electrospinning performance.",
      "Ensuring reliable process automation and control.",
      "Simplifying manufacturing and assembly processes.",
      "Maintaining operational stability during extended production cycles.",
      "Achieving precise control over critical process parameters."
    ],
    solutions: [
      { title: "Advanced Mechanical Design", desc: "Developed a robust machine architecture using detailed CAD modeling and engineering analysis to optimize electrospinning performance." },
      { title: "Design for Manufacturability", desc: "Created manufacturing-friendly designs with precise mechanical drawings and standardized components to simplify fabrication and assembly." },
      { title: "PLC-Based Automation", desc: "Designed and implemented a complete PLC control system capable of monitoring and controlling voltage, flow rate, environmental conditions, and process parameters in real time." },
      { title: "Integrated System Engineering", desc: "Ensured seamless interaction between mechanical systems and automation controls for stable and repeatable production." },
      { title: "Testing & Validation", desc: "Conducted extensive performance testing to verify reliability, process consistency, and overall system efficiency under various operating conditions." }
    ],
    results: [
      "Consistent production of high-quality nanofibers.",
      "Improved process stability and repeatability.",
      "Reduced manufacturing complexity and assembly time.",
      "Reliable PLC-driven automation with minimal downtime.",
      "Enhanced scalability for research and industrial applications."
    ],
    conclusion:
      "The Espin Nano Machine showcases Texawave's capability to combine precision engineering, advanced automation, and manufacturable design into a single high-performance solution. The project establishes a strong foundation for efficient and reliable nanofiber production in research and industrial environments."
  },
  {
    slug: "autoclave-reverse-engineering",
    title: "Autoclave Reverse Engineering",
    category: "Reverse Engineering",
    client: "Inlab Equipments",
    short:
      "Reverse engineering and redesign of industrial autoclaves to improve sterilization efficiency, manufacturability, reliability, and long-term performance.",
    icon: FlaskConical,
    image: "/Autoclave-Case-Study-reverse-engineering.webp",
    services: ["Reverse Engineering", "CAD Design", "BOM Development", "Manufacturing Design"],
    overview:
      "Texawave successfully reverse-engineered and redesigned an industrial autoclave system to improve sterilization performance, manufacturing efficiency, and operational reliability. Through detailed engineering analysis and optimized manufacturing practices, we transformed a conventional sterilization system into a more efficient and dependable solution.",
    challenges: [
      "Sterilization consistency and effectiveness.",
      "Manufacturing efficiency and cost optimization.",
      "Mechanical reliability and durability.",
      "Production scalability.",
      "Component standardization and quality control."
    ],
    solutions: [
      { title: "Detailed Reverse Engineering", desc: "Performed comprehensive analysis of existing systems to identify design limitations, performance bottlenecks, and improvement opportunities." },
      { title: "Mechanical Design Optimization", desc: "Developed updated CAD models and engineering drawings focused on improving thermal efficiency, structural integrity, and manufacturing accuracy." },
      { title: "BOM Enhancement", desc: "Optimized component selection and material specifications to improve durability, reliability, and overall cost efficiency." },
      { title: "Manufacturing Process Improvement", desc: "Created manufacturing-ready documentation and streamlined production workflows to reduce complexity and improve consistency." },
      { title: "Validation & Performance Testing", desc: "Conducted extensive testing under multiple operating conditions to ensure compliance with sterilization performance requirements and industry standards." }
    ],
    results: [
      "Improved sterilization efficiency and consistency.",
      "Reduced manufacturing complexity and production costs.",
      "Enhanced system reliability and durability.",
      "Lower maintenance requirements.",
      "Increased scalability for healthcare and laboratory applications."
    ],
    conclusion:
      "This project demonstrates Texawave's expertise in reverse engineering and product optimization. By reimagining the design and manufacturing process, we delivered an autoclave solution that achieves higher performance, greater reliability, and improved manufacturability while meeting the stringent demands of modern sterilization applications."
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
    accentColor: "#9BDF83",
  },
  {
    quote:
      "Texawave helped us source critical electronic components during supply chain challenges. Their network and responsiveness saved us valuable time.",
    name: "Sarah Jenkins",
    designation: "Procurement Head",
    company: "Vortex Electronics",
    initials: "SJ",
    blueprintId: "TXW-TS-02",
    accentColor: "#00D4FF",
  },
  {
    quote:
      "The PCB design and manufacturing guidance was outstanding. Every milestone was delivered professionally and on schedule.",
    name: "Marcus Sterling",
    designation: "Hardware Engineer",
    company: "Lumen Robotics",
    initials: "MS",
    blueprintId: "TXW-TS-03",
    accentColor: "#9BDF83",
  },
  {
    quote:
      "We needed a rapid proof-of-concept. Texawave transformed our requirements into a working prototype with remarkable speed.",
    name: "Elena Rostova",
    designation: "Startup Founder",
    company: "Kinetix IoT",
    initials: "ER",
    blueprintId: "TXW-TS-04",
    accentColor: "#00D4FF",
  },
  {
    quote:
      "The team understood our technical requirements immediately and provided practical engineering solutions that reduced development costs.",
    name: "Robert Chen",
    designation: "Manufacturing Director",
    company: "Apex Automations",
    initials: "RC",
    blueprintId: "TXW-TS-05",
    accentColor: "#9BDF83",
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

export const solutionCategories = [
  {
    slug: "consumer-electronics",
    title: "Consumer Electronics",
    short: "High-performance smart hardware, wearables, and IoT products designed for seamless consumer experiences.",
    icon: Smartphone,
    featuredProject: {
      title: "20W PD Charger Design",
      desc: "Ultra-compact USB-C Power Delivery wall charger featuring high-efficiency GaN power stage and thermal protection.",
      image: "/pd-charger.webp",
      cta: "/our-works"
    },
    subSolutions: [
      { title: "Smart Devices", desc: "Connected smart home devices, sensors, and intelligent lifestyle products built for the modern consumer." },
      { title: "Wearable Products", desc: "Miniaturized, low-power health monitors and wearable electronics with integrated biosensors." },
      { title: "Home Automation", desc: "Smart switches, lighting controllers, and automation gateways for intelligent environment control." },
      { title: "Mobile Accessories", desc: "High-efficiency power delivery chargers, wireless power banks, and connectivity accessories." }
    ]
  },
  {
    slug: "industrial-iot",
    title: "Industrial Solutions",
    short: "Ruggedized automation controllers, telemetry systems, and predictive maintenance hardware for industrial environments.",
    icon: Factory,
    featuredProject: {
      title: "IoT Industrial Gateway",
      desc: "Rugged multi-protocol edge gateway with RS485, Modbus, Wi-Fi, and LTE connectivity for real-time telemetry.",
      image: "/industrial-gateway.webp",
      cta: "/our-works"
    },
    subSolutions: [
      { title: "IoT Monitoring Systems", desc: "End-to-end industrial monitoring solutions for tracking environment, assets, and operations." },
      { title: "Automation Controllers", desc: "PLC-compatible and custom controllers for automated assembly, sorting, and machinery operations." },
      { title: "Data Acquisition Systems", desc: "High-precision sensor sampling and telemetry acquisition hardware for harsh environments." },
      { title: "Predictive Maintenance", desc: "Vibration, acoustic, and thermal sensor systems coupled with edge analysis to predict equipment wear." }
    ]
  },
  {
    slug: "medical-devices",
    title: "Medical Devices",
    short: "ISO-compliant diagnostic equipment and health monitoring platforms built with precision electronics.",
    icon: FlaskConical,
    featuredProject: {
      title: "Diabetic Neuropathy Device",
      desc: "Non-invasive diagnostic device for early detection of peripheral neuropathy in diabetic patients.",
      image: "/diabetic-neuropathy.webp",
      cta: "/our-works"
    },
    subSolutions: [
      { title: "Diagnostic Equipment", desc: "Precise electronic signal conditioning and analysis instruments for non-invasive clinical diagnostics." },
      { title: "Healthcare IoT", desc: "Connected clinical and eldercare hardware for secure health telemetry and database integration." },
      { title: "Patient Monitoring", desc: "Real-time wearable and bedside monitors for heart rate, SpO2, temperature, and vital signs." },
      { title: "Assistive Devices", desc: "Smart mobility, sensory assistance, and rehabilitative technology designed for user independence." }
    ]
  },
  {
    slug: "automotive-electronics",
    title: "Automotive Electronics",
    short: "EV controllers, dashboard telemetry systems, and ruggedized vehicle electronics.",
    icon: CircuitBoard,
    featuredProject: {
      title: "Smart Dashboard Systems",
      desc: "Interactive dashboard console with integrated CAN bus communication, navigation, and vehicle health telemetry.",
      image: "/smart-dashboard.webp",
      cta: "/our-works"
    },
    subSolutions: [
      { title: "EV Components", desc: "Battery management systems, DC-DC converters, and motor controllers for electric vehicles." },
      { title: "Vehicle Monitoring", desc: "Telemetry modules tracking location, speed, fuel, and diagnostics parameters over cellular." },
      { title: "Smart Dashboard Systems", desc: "Visual display clusters and driver interface controls featuring high-contrast display tech." },
      { title: "Connectivity Solutions", desc: "V2X modules, Bluetooth/Wi-Fi gateways, and secure OTA firmware updating units." }
    ]
  }
];

export const featuredProjects = [
  {
    title: "Smart Cane Device",
    desc: "An assistive smart cane with ultrasonic obstacle detection, haptic feedback, and GPS tracking.",
    image: "/smart-cane.webp",
    slug: "smart-cane"
  },
  {
    title: "IoT Industrial Gateway",
    desc: "Rugged multi-protocol edge gateway with RS485, Modbus, Wi-Fi, and LTE connectivity for real-time telemetry.",
    image: "/industrial-gateway.webp",
    slug: "industrial-gateway"
  },
  {
    title: "Wireless Smart Switch",
    desc: "A sleek, touch-sensitive wall switch with Wi-Fi connectivity, app control, and smart home hub integration.",
    image: "/smart-switch.webp",
    slug: "wireless-smart-switch"
  },
  {
    title: "Diabetic Neuropathy Device",
    desc: "Non-invasive diagnostic device for early detection of peripheral neuropathy in diabetic patients.",
    image: "/diabetic-neuropathy.webp",
    slug: "diabetic-neuropathy-device"
  },
  {
    title: "20W PD Charger Design",
    desc: "Ultra-compact USB-C Power Delivery wall charger featuring high-efficiency GaN power stage and thermal protection.",
    image: "/pd-charger.webp",
    slug: "pd-charger"
  }
];

