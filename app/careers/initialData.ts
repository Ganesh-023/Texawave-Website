import { Job, WalkInDrive, CareerUpdate, Application } from "./types";

export const INITIAL_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Senior Embedded Systems Engineer",
    department: "Electrical",
    location: "Chennai / Hybrid",
    type: "Full Time",
    experience: "5+ Years",
    salary: "₹12,00,000 - ₹18,00,000 PA",
    description: "We are looking for a Senior Embedded Systems Engineer to lead firmware and high-speed hardware board development for our IoT and industrial clients.",
    responsibilities: [
      "Design and layout multi-layer PCBs using Altium Designer or KiCAD.",
      "Develop reliable firmware in C/C++ for STM32, ESP32, and Nordic BLE chipsets.",
      "Bring up, test, debug, and optimize custom hardware prototypes in our electrical lab.",
      "Integrate communication protocols like Modbus, CAN, SPI, I2C, and WebSockets.",
      "Mentor junior hardware designers and contribute to DFM checks."
    ],
    requirements: [
      "Bachelor's or Master's degree in Electrical/Electronics Engineering or related field.",
      "Proven track record of designing and releasing industrial-grade hardware products.",
      "Deep understanding of EMI/EMC compliance and signal integrity.",
      "Hands-on expertise with logical analyzers, oscilloscopes, and spectrum analyzers.",
      "Experience with FreeRTOS or bare-metal development."
    ],
    benefits: [
      "Comprehensive health insurance for you and your family.",
      "Performance-linked annual project milestones bonus.",
      "Access to premium electronic test equipment and design workshops.",
      "Flexible hybrid working options (3 days lab, 2 days remote)."
    ],
    skills: ["Altium Designer", "ESP32", "STM32", "FreeRTOS", "EMI/EMC", "Firmware (C/C++)"],
    deadline: "2026-07-15",
    status: "Open",
    isFeatured: true,
    isUrgent: true,
    isInternship: false,
    postedDate: "2026-06-07"
  },
  {
    id: "job-2",
    title: "IoT Cloud & Fullstack Architect",
    department: "Software",
    location: "Chennai / Remote",
    type: "Full Time",
    experience: "4+ Years",
    salary: "₹15,00,000 - ₹22,00,000 PA",
    description: "Join us to build complex, scalable cloud backends, real-time control dashboards, and IoT messaging queues supporting global product rollouts.",
    responsibilities: [
      "Architect and build high-performance web applications using React, Next.js, and TypeScript.",
      "Develop robust APIs and cloud messaging pipes on Node.js/Python connected to AWS IoT Core.",
      "Maintain database schemas using PostgreSQL and configure serverless deployment environments.",
      "Implement real-time bidirectional messaging via WebSockets, gRPC, and MQTT.",
      "Optimize web application performance, accessibility, and SEO."
    ],
    requirements: [
      "Proficient in Modern JavaScript/TypeScript, Next.js, and TailwindCSS.",
      "Strong experience building backends with Node.js/Express, Python, or Go.",
      "Solid understanding of AWS resources (Lambda, DynamoDB, ECS, IoT Core, Cognito).",
      "Experience setting up secure CI/CD deployment workflows (GitHub Actions, Docker).",
      "Familiarity with visual graphs, telemetry panels, or timeseries databases."
    ],
    benefits: [
      "Flexible remote working setup with office hardware allowance.",
      "Regular tech training budgets and certifications reimbursement.",
      "Generous personal and annual leaves with mental wellness days.",
      "Stock option options for core technical leaders."
    ],
    skills: ["Next.js", "Node.js", "AWS IoT Core", "PostgreSQL", "MQTT", "Docker", "TypeScript"],
    deadline: "2026-07-20",
    status: "Open",
    isFeatured: true,
    isUrgent: false,
    isInternship: false,
    postedDate: "2026-06-08"
  },
  {
    id: "job-3",
    title: "Mechanical CAD Enclosure Designer",
    department: "Mechanical",
    location: "Chennai / Onsite",
    type: "Full Time",
    experience: "3+ Years",
    salary: "₹8,00,000 - ₹12,00,000 PA",
    description: "We are seeking a mechanical engineer with strong DFM awareness to design stylish, functional plastic and sheet metal enclosures for medical devices and automated equipment.",
    responsibilities: [
      "Create high-precision 3D CAD models and production drawings in SolidWorks.",
      "Design enclosures for injection molding, CNC machining, and sheet metal fabrication.",
      "Perform thermal analysis and structural FEA simulations in Ansys.",
      "Collaborate directly with electrical teams on board clearances and thermal venting.",
      "Fabricate rapid prototypes using 3D printers and coordinate directly with mold makers."
    ],
    requirements: [
      "Degree in Mechanical Engineering or Manufacturing Engineering.",
      "Excellent mastery of SolidWorks, Fusion 360, and structural simulation toolsets.",
      "Strong understanding of fits, tolerances, GD&T, and DFM rules.",
      "Experience drafting BOMs and tracking supplier component selections.",
      "Hands-on prototyping experience and mechanical workbench familiarity."
    ],
    benefits: [
      "State-of-the-art mechanical labs and rapid prototyping printers.",
      "Annual team performance incentive structures.",
      "Onsite accommodation support for relocating candidates.",
      "Opportunities to work on cutting-edge medical hardware programs."
    ],
    skills: ["SolidWorks", "DFM / GD&T", "FEA Analysis", "Ansys", "Enclosure Design", "Sheet Metal"],
    deadline: "2026-06-30",
    status: "Open",
    isFeatured: false,
    isUrgent: true,
    isInternship: false,
    postedDate: "2026-06-05"
  },
  {
    id: "job-4",
    title: "Global Supply Chain & Sourcing Specialist",
    department: "Procurement",
    location: "Chennai / Hybrid",
    type: "Full Time",
    experience: "3 - 5 Years",
    salary: "₹6,00,000 - ₹9,50,000 PA",
    description: "Manage global supplier relations, optimize bill of materials (BoM) sourcing costs, and streamline custom import clearances for critical electronic components.",
    responsibilities: [
      "Analyze client engineering BoMs and search global databases for alternative chipsets.",
      "Negotiate volume pricing, lead times, and contracts with international distributors.",
      "Oversee shipping logistics, custom clearance compliance, and freight forwarding schedules.",
      "Maintain vendor performance logs and establish secure secondary supply lines.",
      "Work closely with finance and project leads to align manufacturing budgets."
    ],
    requirements: [
      "Degree in Supply Chain Management, Logistics, Commerce, or related engineering branch.",
      "Proven sourcing experience in PCBA components, plastics, and mechanical modules.",
      "Proficient in ERP software (SAP, Oracle) and heavy analytics in Excel.",
      "Good understanding of import duty structures, customs clearance codes, and logistics.",
      "Strong verbal and written negotiations skills."
    ],
    benefits: [
      "Health coverage and annual medical health packages.",
      "Professional supply chain certification program funding.",
      "Hybrid setup matching operational targets.",
      "Dynamic team with clear performance rewards."
    ],
    skills: ["Global Sourcing", "ERP Systems", "Excel Analytics", "Logistics", "Contract Negotiation"],
    deadline: "2026-07-10",
    status: "Open",
    isFeatured: false,
    isUrgent: false,
    isInternship: false,
    postedDate: "2026-06-06"
  },
  {
    id: "job-5",
    title: "React & Next.js Web Developer",
    department: "Software",
    location: "Remote",
    type: "Full Time",
    experience: "1 - 3 Years",
    salary: "₹6,00,000 - ₹10,00,000 PA",
    description: "Develop premium, animated frontend interfaces, build reusable component libraries, and construct intuitive customer dashboard panels.",
    responsibilities: [
      "Build highly interactive frontend modules with Next.js, React, and TypeScript.",
      "Use TailwindCSS and CSS configurations to construct responsive, pixel-perfect UI screens.",
      "Implement smooth scrolling and high-fidelity micro-animations using GSAP.",
      "Integrate RESTful APIs and handle real-time WebSocket state management.",
      "Ensure web optimization, SEO best practices, and fast rendering speeds."
    ],
    requirements: [
      "At least 1 year of professional development experience with React or Next.js.",
      "Solid command of CSS layouts (Flexbox, Grid), animations, and tailwind variables.",
      "Proficient in TypeScript and async state managers (Zustand, Redux, or Context).",
      "Git version control expertise and unit testing familiarity.",
      "Strong visual sense and dedication to premium user experiences."
    ],
    benefits: [
      "100% remote job policy with modern work-from-home hardware kit.",
      "Paid learning resources, Udemy business subscription, and tech books allowance.",
      "Annual team retreat and structural engineering workshops.",
      "Performance feedback cycles twice a year."
    ],
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "GSAP Animations", "Git"],
    deadline: "2026-07-05",
    status: "Open",
    isFeatured: false,
    isUrgent: false,
    isInternship: false,
    postedDate: "2026-06-09"
  },
  {
    id: "job-6",
    title: "Embedded Systems Trainee",
    department: "Electrical",
    location: "Chennai / Onsite",
    type: "Internship",
    experience: "Freshers / Students",
    salary: "₹20,000 - ₹28,000 Monthly",
    description: "Kickstart your hardware engineering career with our structured 6-month embedded firmware training program. Hands-on exposure on active client products.",
    responsibilities: [
      "Assist senior engineers with board soldering, sensor calibration, and diagnostic tests.",
      "Write device drivers and peripheral scripts (ADC, PWM, UART) on ESP32 or STM32 MCU boards.",
      "Conduct stress testing on power rails and log thermal data.",
      "Document test code setups, wiring configurations, and board bring-up checklists."
    ],
    requirements: [
      "Final-year student or recent graduate in EEE, ECE, Instrumentation, or related disciplines.",
      "Basic understanding of C language, microcontroller architectures, and registers.",
      "Familiarity with using multimeters, breadboards, and basic PCB assembly.",
      "Strong problem-solving attitude and willingness to learn from core lab specialists."
    ],
    benefits: [
      "Full hands-on training with advanced PCB equipment and diagnostic software.",
      "Potential conversion to a full-time Associate Embedded Engineer role.",
      "Internship certificate, stipend, and travel assistance.",
      "Access to office events, team dynamic culture, and mentors."
    ],
    skills: ["Embedded C", "Microcontrollers", "Soldering", "Lab Instruments", "UART/SPI"],
    deadline: "2026-06-25",
    status: "Open",
    isFeatured: false,
    isUrgent: false,
    isInternship: true,
    postedDate: "2026-06-09"
  }
];

export const INITIAL_WALKINS: WalkInDrive[] = [
  {
    id: "walkin-1",
    title: "Walk-In Drive for Mechanical Design Engineers",
    date: "2026-06-15",
    location: "TEXAWAVE Chennai Corporate Office, Guindy Industrial Estate",
    positions: ["Mechanical Design Engineer", "CAD Draftsman (SolidWorks)"],
    description: "Join us for direct technical discussions and hands-on SolidWorks design evaluation. Candidates must bring their design portfolios and resumes.",
    contactEmail: "hr@texawave.com"
  },
  {
    id: "walkin-2",
    title: "Freshers Walk-In for Embedded Systems & Firmware Trainees",
    date: "2026-06-22",
    location: "TEXAWAVE Chennai Lab & R&D Hub, Guindy Industrial Estate",
    positions: ["Embedded Trainee", "Electronics Assembly Assistant"],
    description: "A fast-track walk-in evaluation involving a basic written technical screening on microcontrollers, schematic reading, and basic C coding.",
    contactEmail: "hr@texawave.com"
  }
];

export const INITIAL_UPDATES: CareerUpdate[] = [
  {
    id: "update-1",
    type: "life",
    title: "🎉 TEXAWAVE Welcomes 12 New Summer Engineering Interns!",
    content: "We are extremely excited to welcome our summer cohort of 2026! Over the next few months, these talented students from top institutions will work alongside our core electrical, mechanical, and software engineers on live medical devices and commercial IoT prototypes. Here's to learning, designing, and launching together!",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    date: "2026-06-05",
    likes: 42,
    commentsCount: 5
  },
  {
    id: "update-2",
    type: "update",
    title: "🚀 New Embedded & IoT Prototyping Division Opened in Chennai",
    content: "To support our growing client portfolio in Europe and North America, we've expanded our laboratory capacity. The new lab features automated multi-layer PCB inspection tooling, high-precision thermal chambers, RF diagnostic analyzers, and a state-of-the-art pick-and-place prototyping line. This enables our teams to build and test hardware prototypes in days rather than weeks.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    date: "2026-06-01",
    likes: 56,
    commentsCount: 3
  },
  {
    id: "update-3",
    type: "life",
    title: "🏆 Employee of the Month: Amit Kumar (Lead Mechanical Designer)",
    content: "Big congratulations to Amit! This month, Amit successfully spearheaded the DFM optimization for a high-precision enclosure, reducing injection molding setup costs by 18% and shaving 30g off the component weight. Amit's meticulous focus on tolerances, clearances, and manufacturing constraints represents the gold standard of hardware engineering.",
    image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80",
    date: "2026-05-28",
    likes: 31,
    commentsCount: 2
  },
  {
    id: "update-4",
    type: "life",
    title: "⚡ 48-Hour Embedded Soldering Hackathon Outcomes",
    content: "Our team took a break from active client builds to host a internal hackathon. The challenge? Build functional smart office automation nodes in 48 hours using ESP32 mesh networks. The winning design showcased a zero-latency conference room presence sensor and automated ventilation controller. Great job to all the hardware hackers who participated!",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    date: "2026-05-15",
    likes: 48,
    commentsCount: 7
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "app-1",
    jobId: "job-1",
    jobTitle: "Senior Embedded Systems Engineer",
    name: "Rahul Sharma",
    email: "rahul.sharma@domain.com",
    phone: "+91 98765 43210",
    resumeName: "Rahul_Sharma_Embedded_CV.pdf",
    message: "I have 6 years of experience in multi-layer PCB design using Altium. I have successfully released 3 consumer IoT products and programmed firmware for STM32 and ESP32 with FreeRTOS. I would love to join Texawave to lead high-speed designs.",
    dateApplied: "2026-06-08",
    status: "Shortlisted"
  },
  {
    id: "app-2",
    jobId: "job-2",
    jobTitle: "IoT Cloud & Fullstack Architect",
    name: "Priya Patel",
    email: "priya.patel@techsolutions.com",
    phone: "+91 91234 56789",
    resumeName: "Priya_Patel_Fullstack_Resume.pdf",
    message: "I've been building cloud backends for industrial automation for 5 years. I'm highly proficient in AWS IoT Core, Serverless Node.js architecture, and React dashboard metrics mapping. Your company's interdisciplinary depth excites me.",
    dateApplied: "2026-06-09",
    status: "Interview Scheduled"
  },
  {
    id: "app-3",
    jobId: "job-3",
    jobTitle: "Mechanical CAD Enclosure Designer",
    name: "Amit Verma",
    email: "amit.verma@cadworks.in",
    phone: "+91 88776 65544",
    resumeName: "Amit_V_Mechanical_Portfolio.pdf",
    message: "I have designed injection molded plastic casings for healthcare devices. I understand DFM rules and mold draft guidelines. I look forward to contributing to your enclosures team.",
    dateApplied: "2026-06-07",
    status: "New"
  },
  {
    id: "app-4",
    jobId: "job-6",
    jobTitle: "Embedded Systems Trainee",
    name: "Sneha Reddy",
    email: "sneha.reddy@studentmail.edu",
    phone: "+91 76543 21098",
    resumeName: "Sneha_Reddy_EEE_Internship.pdf",
    message: "I am a final-year EEE student. I have built a solar tracker using ESP32 and C++ for my final year project. I want to learn hardware bring-up and PCB layout at Texawave under direct senior engineering guidance.",
    dateApplied: "2026-06-09",
    status: "Selected"
  },
  {
    id: "app-5",
    jobId: "job-5",
    jobTitle: "React & Next.js Web Developer",
    name: "John Doe",
    email: "john.doe@gmail.com",
    phone: "+91 99988 87766",
    resumeName: "John_Doe_Developer.pdf",
    message: "Hi, I have 1 year of frontend experience. I specialize in building responsive React screens. I am keen to learn Next.js layouts and GSAP animations.",
    dateApplied: "2026-06-09",
    status: "New"
  },
  {
    id: "app-6",
    jobId: "general",
    jobTitle: "General Sourcing / Talent Pool",
    name: "Vikram Sen",
    email: "vikram.sen@outlook.com",
    phone: "+91 95554 44332",
    resumeName: "Vikram_Sen_General_Talent.pdf",
    message: "Hi, I'm a procurement specialist with 6 years of component sourcing experience, but I didn't see an opening matching my seniority level. Joining the talent pool to express interest in future supply chain lead vacancies.",
    dateApplied: "2026-06-07",
    status: "New",
    skills: ["Global Sourcing", "ERP", "Logistics", "Compliance"],
    deptInterest: "Procurement"
  },
  {
    id: "app-7",
    jobId: "general",
    jobTitle: "General Sourcing / Talent Pool",
    name: "Anjali Gupta",
    email: "anjali.g@ecegrad.com",
    phone: "+91 94443 32211",
    resumeName: "Anjali_Gupta_Hardware.pdf",
    message: "Recent ECE graduate with solid academic projects on microcontrollers. Looking for junior hardware engineer positions in Chennai. Joining talent pool.",
    dateApplied: "2026-06-06",
    status: "Shortlisted",
    skills: ["Arduino", "PCB Layout", "C++", "Oscilloscope"],
    deptInterest: "Electrical"
  }
];
