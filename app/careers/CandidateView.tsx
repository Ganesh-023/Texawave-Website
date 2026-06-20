import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Cpu, 
  Wrench, 
  Terminal, 
  PackageCheck, 
  Search, 
  Upload, 
  Check, 
  X, 
  Heart, 
  Calendar, 
  AlertCircle, 
  Sparkles,
  Lock,
  MessageSquare
} from "lucide-react";
import { Job, WalkInDrive, CareerUpdate } from "./types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface CandidateViewProps {
  jobs: Job[];
  walkins: WalkInDrive[];
  updates: CareerUpdate[];
  onApply: (formData: {
    jobId: string;
    jobTitle: string;
    name: string;
    email: string;
    phone: string;
    resumeName: string;
    message: string;
  }) => void;
  onJoinTalentPool: (formData: {
    name: string;
    email: string;
    phone: string;
    deptInterest: string;
    skills: string[];
    message: string;
    resumeName: string;
  }) => void;
  onLikeUpdate: (id: string) => void;
  onToggleAdmin: () => void;
}

export function CandidateView({
  jobs,
  walkins,
  updates,
  onApply,
  onJoinTalentPool,
  onLikeUpdate,
  onToggleAdmin
}: CandidateViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  
  // Modals state
  const [activeJobForModal, setActiveJobForModal] = useState<Job | null>(null);
  const [showTalentPoolModal, setShowTalentPoolModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formType, setFormType] = useState<"apply" | "talent">("apply");
  
  // Form input states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formResume, setFormResume] = useState<File | null>(null);
  const [formDeptInterest, setFormDeptInterest] = useState("Software");
  const [formSkillsInput, setFormSkillsInput] = useState("");
  
  // Error handling
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status check states
  const [statusEmail, setStatusEmail] = useState("");
  const [statusResults, setStatusResults] = useState<any[] | null>(null);
  const [statusChecked, setStatusChecked] = useState(false);
  const [statusError, setStatusError] = useState("");

  const handleCheckStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusEmail.trim()) {
      setStatusError("Please enter a valid email address.");
      return;
    }
    setStatusError("");
    
    const localApps = localStorage.getItem("texawave_applications");
    const apps = localApps ? JSON.parse(localApps) : [];
    const matched = apps.filter(
      (a: any) => a.email.toLowerCase() === statusEmail.trim().toLowerCase()
    );

    const localNotes = localStorage.getItem("texawave_hr_notes");
    const notes = localNotes ? JSON.parse(localNotes) : {};

    const matchedWithNotes = matched.map((a: any) => ({
      ...a,
      notes: notes[a.id] || []
    }));

    setStatusResults(matchedWithNotes);
    setStatusChecked(true);
  };

  // Counter logic
  const [liveCount, setLiveCount] = useState(0);
  const targetCount = jobs.filter(j => j.status === "Open").length;

  useEffect(() => {
    if (targetCount === 0) return;
    let start = 0;
    const end = targetCount;
    const duration = 1500; // ms
    const increment = Math.ceil(end / (duration / 50));
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setLiveCount(end);
        clearInterval(timer);
      } else {
        setLiveCount(start);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, [targetCount]);

  // Entrance animations via GSAP
  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const tl = gsap.timeline();
    tl.fromTo(".fade-in-up-hero", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );
  }, { scope: containerRef });

  // Filter logic
  const filteredJobs = jobs.filter(job => {
    if (job.status !== "Open") return false;
    
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesDept = selectedDept === "All" || job.department.toLowerCase() === selectedDept.toLowerCase();
    const matchesType = selectedType === "All" || job.type.toLowerCase() === selectedType.toLowerCase();
    
    return matchesSearch && matchesDept && matchesType;
  });

  const featuredJobs = jobs.filter(job => job.status === "Open" && job.isFeatured);

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formPhone || !formResume) {
      setFormError("Please fill out all required fields and upload your resume.");
      return;
    }
    
    setFormError("");
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (formType === "apply" && activeJobForModal) {
        onApply({
          jobId: activeJobForModal.id,
          jobTitle: activeJobForModal.title,
          name: formName,
          email: formEmail,
          phone: formPhone,
          resumeName: formResume.name,
          message: formMessage
        });
      } else if (formType === "talent") {
        const skillsArray = formSkillsInput
          .split(",")
          .map(s => s.trim())
          .filter(s => s.length > 0);
          
        onJoinTalentPool({
          name: formName,
          email: formEmail,
          phone: formPhone,
          deptInterest: formDeptInterest,
          skills: skillsArray.length > 0 ? skillsArray : ["Hardware", "Prototyping"],
          message: formMessage,
          resumeName: formResume.name
        });
      }
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Clear inputs
      setFormName("");
      setFormEmail("");
      setFormPhone("");
      setFormMessage("");
      setFormResume(null);
      setFormSkillsInput("");
    }, 1200);
  };

  const handleCloseModal = () => {
    setActiveJobForModal(null);
    setShowTalentPoolModal(false);
    setIsSuccess(false);
    setFormError("");
  };

  const getDeptIcon = (dept: string) => {
    switch(dept.toLowerCase()) {
      case "software": return <Terminal className="text-[#00D4FF]" size={18} />;
      case "electrical": return <Cpu className="text-[var(--primary-green)]" size={18} />;
      case "mechanical": return <Wrench className="text-orange-400" size={18} />;
      case "procurement": return <PackageCheck className="text-amber-500" size={18} />;
      default: return <Briefcase className="text-gray-400" size={18} />;
    }
  };

  return (
    <div ref={containerRef} className="relative bg-black min-h-screen text-text-primary font-sans">
      {/* Blueprint Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none z-0" aria-hidden="true" />
      
      {/* Top Gradient Overlay */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--primary-green)]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#00D4FF]/4 blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 z-10">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)] flex flex-col items-center justify-center text-center">
        
        <h1 className="fade-in-up-hero text-hero text-white max-w-5xl">
          Build Your Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-green)] to-[#00D4FF]">at TEXAWAVE</span>
        </h1>
        
        <p className="fade-in-up-hero text-body-large text-text-secondary max-w-2xl mt-6">
          We combine hardware, software, and global supply chains to build state-of-the-art systems. Join our team of interdisciplinary engineering professionals.
        </p>

        <div className="fade-in-up-hero mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#job-feed-section"
            className="cta-magnetic inline-flex items-center justify-center gap-2 rounded bg-signal px-8 py-4 font-bold text-white shadow-crisp border border-transparent w-full sm:w-auto transition-transform hover:scale-105"
          >
            View Openings <ArrowRight size={16} />
          </a>
          <button
            onClick={() => {
              setFormType("talent");
              setShowTalentPoolModal(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded border border-border-primary bg-black/40 backdrop-blur-sm px-8 py-4 font-bold text-text-primary hover:border-signal transition-all w-full sm:w-auto"
          >
            Join Talent Pool
          </button>
        </div>

        {/* Dynamic counter */}
        <div className="fade-in-up-hero mt-12 bg-bg-card/75 border border-border-primary rounded-2xl px-8 py-6 shadow-crisp backdrop-blur-sm flex flex-col items-center">
          <div className="text-4xl md:text-5xl font-black text-signal font-mono animate-pulse">
            {liveCount}
          </div>
          <div className="text-xs uppercase tracking-[0.18em] text-text-secondary mt-2 font-bold">
            Open Positions Available
          </div>
        </div>

        {/* Application Status Checker */}
        <div className="fade-in-up-hero mt-8 w-full max-w-xl bg-bg-card/60 border border-border-primary rounded-2xl p-6 shadow-crisp backdrop-blur-sm">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-mono flex items-center justify-center gap-1.5">
            🔍 Check Application Status
          </h3>
          <p className="text-xs text-text-secondary mb-4">Track your submission status in real-time.</p>
          <form onSubmit={handleCheckStatus} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="Enter your applied email address..."
              value={statusEmail}
              onChange={(e) => setStatusEmail(e.target.value)}
              className="flex-1 bg-black border border-border-primary rounded-xl px-3 py-2 text-xs text-white placeholder-text-secondary/50 focus:border-signal focus:outline-none"
            />
            <button
              type="submit"
              className="bg-signal text-black px-4 py-2 rounded-xl text-xs font-bold font-sans uppercase hover:bg-opacity-90 transition-all font-mono"
            >
              Verify
            </button>
          </form>

          {statusError && (
            <p className="text-[11px] text-red-400 mt-2 font-mono">{statusError}</p>
          )}

          {statusChecked && statusResults && (
            <div className="mt-4 border-t border-white/5 pt-4 text-left space-y-3.5">
              {statusResults.length > 0 ? (
                statusResults.map((app) => (
                  <div key={app.id} className="p-3 bg-black/40 border border-border-primary rounded-xl space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white">{app.jobTitle}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono ${
                        app.status === "New" ? "bg-blue-950/45 text-blue-400 border border-blue-500/20" :
                        app.status === "Shortlisted" ? "bg-amber-950/45 text-amber-400 border border-amber-500/20" :
                        app.status === "Interview Scheduled" ? "bg-purple-950/45 text-purple-400 border border-purple-500/20" :
                        app.status === "Selected" ? "bg-signal/25 text-signal border border-signal/40" :
                        "bg-red-950/45 text-red-400 border border-red-500/20"
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-text-secondary font-mono">Applied Date: {app.dateApplied}</p>
                    
                    {app.notes && app.notes.length > 0 && (
                      <div className="mt-2 pl-2 border-l-2 border-signal text-[11px] text-text-secondary italic">
                        Feedback: "{app.notes[app.notes.length - 1]}"
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-text-secondary font-mono italic text-center">No applications found matching this email.</p>
              )}
            </div>
          )}
        </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      {featuredJobs.length > 0 && (
        <section className="relative py-12 z-10">
          <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
            <div className="flex items-center gap-2 mb-8">
            <Sparkles className="text-signal" size={18} />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-signal">Featured Opportunities</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {featuredJobs.map((job) => (
              <div 
                key={job.id}
                className="relative rounded-2xl p-6 bg-gradient-to-br from-bg-card to-black border-2 border-signal/20 hover:border-signal transition-all duration-300 group shadow-crisp overflow-hidden"
              >
                {/* Pulsing border animation block */}
                <div className="absolute inset-0 border border-signal opacity-0 group-hover:opacity-100 rounded-2xl pointer-events-none transition-opacity duration-300 animate-[pulse_2s_infinite]" />
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-signal/25 border border-signal/40 rounded-full flex items-center gap-1">
                      ⭐ Featured
                    </span>
                    {job.isUrgent && (
                      <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-950/45 border border-red-500/30 rounded-full animate-pulse">
                        Urgent Hiring
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-text-secondary font-semibold font-mono">
                    {job.postedDate}
                  </span>
                </div>
                
                <h3 className="text-card text-white group-hover:text-signal transition-colors">
                  {job.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-small-text text-text-secondary font-medium">
                  <span className="flex items-center gap-1">
                    {getDeptIcon(job.department)}
                    {job.department} Division
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-signal" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-signal" />
                    {job.type}
                  </span>
                </div>
                
                <p className="mt-4 text-body-normal text-text-secondary line-clamp-2">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {job.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-white/5 border border-white/5 text-text-secondary">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-signal">
                    {job.salary}
                  </span>
                  <button
                    onClick={() => {
                      setFormType("apply");
                      setActiveJobForModal(job);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-accent-light group-hover:gap-2.5 transition-all bg-signal/10 hover:bg-signal/20 px-3 py-1.5 rounded"
                  >
                    Apply Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>
      )}

      {/* Main Jobs Section & Interactive filters */}
      <section id="job-feed-section" className="py-16 z-10 relative scroll-mt-24">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
          <div className="text-center md:text-left mb-10">
          <span className="text-small-text font-bold uppercase tracking-[0.2em] text-signal font-display">Job Feed</span>
          <h2 className="text-section text-white mt-3">Explore Careers</h2>
          <p className="text-body-large text-text-secondary mt-2">Find active technical vacancies across our engineering divisions.</p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col gap-4 bg-bg-card/60 p-4 rounded-2xl border border-border-primary backdrop-blur-sm mb-8">
          <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-4">
            {/* Search Input */}
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-text-secondary" size={16} />
              <input
                type="text"
                placeholder="Search job title, skills, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-border-primary hover:border-white/20 focus:border-signal focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-white transition-colors"
              />
            </div>
            
            {/* Department Dropdown */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-black/60 border border-border-primary focus:border-signal focus:outline-none rounded-xl px-4 py-3 text-sm text-white font-semibold"
            >
              <option value="All">All Departments</option>
              <option value="Software">Software</option>
              <option value="Electrical">Electrical</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Procurement">Procurement</option>
            </select>
            
            {/* Job Type Dropdown */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-black/60 border border-border-primary focus:border-signal focus:outline-none rounded-xl px-4 py-3 text-sm text-white font-semibold"
            >
              <option value="All">All Job Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>

        {/* Jobs Feed Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <div 
              key={job.id}
              className="rounded-2xl border border-border-primary bg-bg-card/80 p-6 shadow-crisp relative hover:border-signal/50 hover:shadow-[0_0_25px_rgba(155,223,131,0.15)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-light bg-signal/15 border border-signal/30 rounded">
                    {job.department}
                  </span>
                  <span className="text-[10px] text-text-secondary font-mono">
                    Posted 2 Days Ago
                  </span>
                </div>
                
                <h3 className="text-card text-white group-hover:text-signal transition-colors line-clamp-1">
                  {job.title}
                </h3>
                
                <div className="flex flex-col gap-1.5 mt-3 text-small-text text-text-secondary font-medium">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-signal" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={12} className="text-signal" />
                    {job.experience}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} className="text-signal" />
                    {job.type}
                  </span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-signal">
                  {job.salary.split(" ")[0]}
                </span>
                <button
                  onClick={() => {
                    setFormType("apply");
                    setActiveJobForModal(job);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-light group-hover:gap-2.5 transition-all"
                >
                  Apply Now <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="col-span-full text-center py-16 rounded-2xl border border-dashed border-border-primary bg-bg-card/40">
              <AlertCircle className="mx-auto text-text-secondary mb-4" size={32} />
              <h3 className="text-lg font-bold text-white">No Matching Positions Found</h3>
              <p className="text-text-secondary text-sm max-w-md mx-auto mt-2">
                We don&apos;t have any open vacancies matching your exact filters right now, but we are always seeking great builders!
              </p>
              <button
                onClick={() => {
                  setFormType("talent");
                  setShowTalentPoolModal(true);
                }}
                className="mt-6 inline-flex items-center gap-2 rounded bg-signal/20 px-6 py-2.5 text-xs font-bold text-white border border-signal/30 hover:bg-signal/30 transition-all"
              >
                Join Our Talent Pool
              </button>
            </div>
          )}
        </div>
        </div>
      </section>

      {/* Internship Corner */}
      <section className="bg-bg-secondary py-20 border-y border-border-primary">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
          <div className="text-center mb-16">
            <span className="text-small-text font-bold uppercase tracking-[0.2em] text-signal font-display">Special Section</span>
            <h2 className="text-section text-white mt-3">Internship Corner</h2>
            <p className="text-body-large text-text-secondary mt-3 max-w-2xl mx-auto">
              TEXAWAVE is a hub for talented engineering students. Apply for structured internships to gain real hardware lab experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Mechanical Design Intern",
                duration: "3 - 6 Months",
                desc: "Design premium sheet metal and injection molded enclosures using SolidWorks. Perform FEA thermal & stress simulations in Ansys.",
                skills: "SolidWorks, GD&T, FEA Analysis",
                benefit: "Hands-on Prototyping & Lab Access"
              },
              {
                title: "Embedded Systems Intern",
                duration: "3 - 6 Months",
                desc: "Develop firmware drivers for ESP32 and STM32 MCUs in C/C++. soldering, diagnostic tests, logic analyzer bring-up.",
                skills: "Embedded C, Microcontrollers, UART/SPI",
                benefit: "Stipend, Hardware Labs Bring-up"
              },
              {
                title: "Software Developer Intern",
                duration: "3 - 6 Months",
                desc: "Build animated web interfaces with React, Next.js, and TypeScript. Set up real-time telemetry graphs and MQTT streams.",
                skills: "Next.js, TypeScript, TailwindCSS, APIs",
                benefit: "Wfh kit, structured coding cohorts"
              },
              {
                title: "Electronics Design Intern",
                duration: "3 - 6 Months",
                desc: "PCB schematic design, layout optimization, signal integrity analysis, EMI/EMC compliance, board soldering & diagnosis.",
                skills: "Altium Designer, PCB Layouts, Multimeter",
                benefit: "Altium workshops, lab equipment access"
              }
            ].map((intern, index) => (
              <div 
                key={index}
                className="rounded-2xl border border-border-primary bg-bg-card p-6 shadow-crisp hover:border-signal transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-small-text font-mono font-bold text-signal">{"0" + (index + 1) + " // PROGRAM"}</span>
                  <h3 className="text-card text-white mt-3 leading-tight min-h-[3rem] flex items-center">{intern.title}</h3>
                  <p className="text-small-text font-semibold text-accent-light bg-signal/10 rounded px-2.5 py-1 w-fit mt-2 font-mono">
                    ⏱️ {intern.duration}
                  </p>
                  <p className="text-xs text-text-secondary mt-4 leading-relaxed">
                    {intern.desc}
                  </p>
                </div>
                
                <div className="border-t border-white/5 pt-4 mt-6">
                  <div className="text-xs text-text-secondary font-medium">
                    <span className="block">🎓 Eligibility: <strong className="text-white">{intern.skills}</strong></span>
                    <span className="block mt-1">⭐ Perks: <strong className="text-white">{intern.benefit}</strong></span>
                  </div>
                  <button
                    onClick={() => {
                      const mockJob: Job = {
                        id: `intern-program-${index}`,
                        title: intern.title,
                        department: "Electrical",
                        location: "Chennai / Onsite",
                        type: "Internship",
                        experience: "Students",
                        salary: "Paid Stipend",
                        description: intern.desc,
                        responsibilities: ["Participate in daily engineering scrums", "Perform testing and documentation", "Build demo prototypes"],
                        requirements: ["Currently enrolled in Engineering degree", "Basic coding or drafting knowledge"],
                        benefits: ["Certificate", "Stipend"],
                        skills: [intern.skills],
                        deadline: "2026-06-30",
                        status: "Open",
                        isFeatured: false,
                        isUrgent: false,
                        isInternship: true,
                        postedDate: new Date().toISOString().split("T")[0]
                      };
                      setFormType("apply");
                      setActiveJobForModal(mockJob);
                    }}
                    className="mt-6 w-full text-center py-2.5 rounded bg-signal/10 hover:bg-signal/20 font-bold text-xs text-accent-light border border-signal/20 transition-all font-mono"
                  >
                    Apply For Internship
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Walk-in Drives Section */}
      {walkins.length > 0 && (
        <section className="py-20 z-10">
          <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-small-text font-bold uppercase tracking-[0.2em] text-signal font-display">Fast-Track Hiring</span>
            <h2 className="text-section text-white mt-3">Walk-in Interviews</h2>
            <p className="text-body-large text-text-secondary mt-2 max-w-xl">
              Skip the application queue. Join us directly at our Chennai labs on event dates for dynamic onsite screening evaluations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {walkins.map((drive) => (
              <div 
                key={drive.id}
                className="relative rounded-2xl border border-border-primary bg-bg-card p-6 shadow-crisp overflow-hidden group hover:border-signal/50 transition-colors"
              >
                <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-signal/10 to-transparent pointer-events-none" />
                
                <div className="flex gap-4 items-start">
                  <div className="bg-signal/15 border border-signal/30 text-signal rounded-xl p-3 flex flex-col items-center justify-center min-w-16">
                    <Calendar size={20} />
                    <span className="text-xs font-mono font-bold mt-1">EVENT</span>
                  </div>
                  
                  <div>
                    <span className="text-small-text font-mono font-bold text-signal tracking-widest block uppercase">
                      📅 Date: {drive.date}
                    </span>
                    <h3 className="text-card text-white mt-1 group-hover:text-signal transition-colors">
                      {drive.title}
                    </h3>
                    <p className="text-small-text text-text-secondary mt-1 font-semibold flex items-center gap-1">
                      <MapPin size={12} className="text-signal" />
                      {drive.location}
                    </p>
                    <p className="text-body-normal text-text-secondary mt-3">
                      {drive.description}
                    </p>
                    
                    <div className="mt-4">
                      <span className="text-xs font-bold text-white">Target Roles:</span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {drive.positions.map((pos) => (
                          <span key={pos} className="px-2 py-0.5 text-[10px] font-semibold rounded bg-white/5 border border-white/5 text-text-secondary">
                            {pos}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-xs">
                  <span className="text-text-secondary font-mono">
                    Inquiries: <strong className="text-white">{drive.contactEmail}</strong>
                  </span>
                  <button 
                    onClick={() => {
                      const mockJob: Job = {
                        id: `walkin-${drive.id}`,
                        title: drive.positions[0] || "Walkin Candidate",
                        department: "Mechanical",
                        location: "Chennai / Onsite",
                        type: "Full Time",
                        experience: "Variable",
                        salary: "TBD Onsite",
                        description: `Walk-in interview registration for ${drive.title}`,
                        responsibilities: ["Attend walkin screening"],
                        requirements: ["Come with physical CV"],
                        benefits: ["Fast track process"],
                        skills: drive.positions,
                        deadline: drive.date,
                        status: "Open",
                        isFeatured: false,
                        isUrgent: false,
                        isInternship: false,
                        postedDate: drive.date
                      };
                      setFormType("apply");
                      setActiveJobForModal(mockJob);
                    }}
                    className="text-signal font-bold hover:underline"
                  >
                    Register Interest &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>
      )}

      {/* Premium Feature: Life at TEXAWAVE Feed */}
      <section className="bg-bg-secondary/60 py-20 border-t border-border-primary">
        <div className="mx-auto w-full max-w-4xl px-[clamp(1rem,4vw,4rem)]">
          <div className="text-center mb-16">
            <span className="text-small-text font-bold uppercase tracking-[0.2em] text-signal font-display">Social Stream</span>
            <h2 className="text-section text-white mt-3">Life at TEXAWAVE Feed</h2>
            <p className="text-body-large text-text-secondary mt-2">
              Explore employee experiences, labs bring-up milestones, cultural activities, and internal hackathons.
            </p>
          </div>

          <div className="space-y-8">
            {updates.map((update) => (
              <div 
                key={update.id}
                className="bg-bg-card rounded-2xl border border-border-primary overflow-hidden shadow-crisp"
              >
                {/* Image panel */}
                {update.image && (
                  <div className="relative h-60 md:h-80 w-full bg-neutral-900 border-b border-border-primary">
                    <Image
                      src={update.image}
                      alt={update.title}
                      fill
                      className="object-cover"
                      sizes="(max-w-768px) 100vw, 800px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                
                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-center text-xs text-text-secondary font-mono mb-3">
                    <span className="uppercase text-signal font-bold tracking-wider">
                      {update.type === "life" ? "📷 Culture & Team" : "📢 Company Update"}
                    </span>
                    <span>{update.date}</span>
                  </div>
                  
                  <h3 className="text-card text-white">
                    {update.title}
                  </h3>
                  
                  <p className="text-body-normal text-text-secondary mt-4 whitespace-pre-line">
                    {update.content}
                  </p>

                  <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between">
                    <button
                      onClick={() => onLikeUpdate(update.id)}
                      className="flex items-center gap-2 text-xs font-bold text-text-secondary hover:text-red-400 transition-colors group"
                    >
                      <Heart 
                        size={16} 
                        className="text-text-secondary group-hover:text-red-400 group-hover:scale-125 transition-all" 
                        fill={update.likes > 42 ? "currentColor" : "none"} 
                      />
                      <span>Like ({update.likes})</span>
                    </button>
                    
                    <div className="flex items-center gap-2 text-xs text-text-secondary font-semibold">
                      <MessageSquare size={16} />
                      <span>{update.commentsCount} Comments</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Login Link */}
      <div className="py-12 border-t border-white/5 text-center flex flex-col items-center justify-center bg-black">
        <button
          onClick={onToggleAdmin}
          className="text-xs text-text-secondary hover:text-[#9BDF83] transition-colors inline-flex items-center gap-1 font-mono uppercase font-bold tracking-wider"
        >
          Staff Login &rarr;
        </button>
      </div>

      {/* Modal - Apply Job / Join Talent Pool */}
      {(activeJobForModal || showTalentPoolModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-bg-card border border-border-primary rounded-2xl shadow-premium overflow-hidden flex flex-col md:grid md:grid-cols-[1.2fr_1.8fr] max-h-[90vh]">
            
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 z-10 bg-black/60 text-white hover:text-signal p-1.5 rounded-full border border-white/5 hover:border-signal/30 transition-colors"
            >
              <X size={18} />
            </button>
            
            {/* Left Column: Context / Job details */}
            <div className="bg-bg-secondary p-6 md:p-8 border-r border-border-primary overflow-y-auto hidden md:block">
              {formType === "apply" && activeJobForModal ? (
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-signal block">
                    {activeJobForModal.department} Division
                  </span>
                  <h3 className="text-subtitle text-white mt-2">
                    {activeJobForModal.title}
                  </h3>
                  
                  <div className="space-y-2 mt-4 text-body-normal text-text-secondary font-medium">
                    <p className="flex items-center gap-1.5"><MapPin size={12} className="text-signal" /> {activeJobForModal.location}</p>
                    <p className="flex items-center gap-1.5"><Clock size={12} className="text-signal" /> {activeJobForModal.type}</p>
                    <p className="flex items-center gap-1.5"><Briefcase size={12} className="text-signal" /> {activeJobForModal.experience}</p>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-small-text font-bold text-white uppercase tracking-wider font-display">Salary Range</h4>
                    <p className="text-body-normal font-mono font-bold text-signal mt-1">{activeJobForModal.salary}</p>
                  </div>

                  <div className="mt-6 border-t border-white/5 pt-4">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Primary Requirements</h4>
                    <ul className="space-y-1.5">
                      {activeJobForModal.requirements.slice(0, 3).map((req, idx) => (
                        <li key={idx} className="text-[11px] text-text-secondary list-disc list-inside">
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {activeJobForModal.skills.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-white/5 border border-white/5 text-text-secondary">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-signal block">
                    Global Sourcing
                  </span>
                  <h3 className="text-subtitle text-white mt-2">
                    TEXAWAVE Talent Pool
                  </h3>
                  <p className="text-body-normal text-text-secondary mt-3">
                    No matching active role? Join our talent database. Our HR sourcing managers search this list first when new projects launch.
                  </p>
                  
                  <div className="mt-6 space-y-4 font-sans">
                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                      <span className="text-[10px] font-bold text-white block">Step 1</span>
                      <p className="text-[11px] text-text-secondary mt-1">Submit your engineering division interest and capabilities profile.</p>
                    </div>
                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                      <span className="text-[10px] font-bold text-white block">Step 2</span>
                      <p className="text-[11px] text-text-secondary mt-1">Your cv is indexed inside our matching skills database.</p>
                    </div>
                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                      <span className="text-[10px] font-bold text-white block">Step 3</span>
                      <p className="text-[11px] text-text-secondary mt-1">When matching vacancies open, we reach out to schedule assessments.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Interactive Form */}
            <div className="p-6 md:p-8 overflow-y-auto flex flex-col justify-center">
              {isSuccess ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-signal/15 text-signal mb-4">
                    <Check size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-white">Application Submitted!</h3>
                  <p className="text-text-secondary mt-3 max-w-sm text-xs leading-relaxed">
                    Thank you. We have received your profile and CV. A hiring manager will review your credentials and get back to you shortly.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="mt-6 px-6 py-2.5 rounded bg-signal text-black font-bold text-xs hover:bg-opacity-90 font-sans uppercase tracking-wider"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans text-left">
                  <div>
                    <h3 className="text-card text-white">
                      {formType === "apply" && activeJobForModal 
                        ? `Apply for: ${activeJobForModal.title}` 
                        : "Join General Talent Pool"}
                    </h3>
                    <p className="text-body-normal text-text-secondary mt-1">Please fill in your primary contact info below (* required).</p>
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-950/45 border border-red-500/35 rounded-xl flex items-start gap-2 text-xs text-red-400">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="block text-small-text font-bold uppercase tracking-wider text-text-secondary mb-1 font-display">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-black border border-border-primary focus:border-signal focus:outline-none rounded-lg px-3 py-2 text-body-normal text-white"
                      placeholder="e.g., Jane Doe"
                    />
                  </div>

                  {/* Contact coordinates */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-small-text font-bold uppercase tracking-wider text-text-secondary mb-1 font-display">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full bg-black border border-border-primary focus:border-signal focus:outline-none rounded-lg px-3 py-2 text-body-normal text-white"
                        placeholder="yourname@domain.com"
                      />
                    </div>
                    <div>
                      <label className="block text-small-text font-bold uppercase tracking-wider text-text-secondary mb-1 font-display">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full bg-black border border-border-primary focus:border-signal focus:outline-none rounded-lg px-3 py-2 text-body-normal text-white"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  {/* Talent pool additional questions */}
                  {formType === "talent" && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-small-text font-bold uppercase tracking-wider text-text-secondary mb-1 font-display">Department Interest *</label>
                        <select
                          value={formDeptInterest}
                          onChange={(e) => setFormDeptInterest(e.target.value)}
                          className="w-full bg-black border border-border-primary focus:border-signal focus:outline-none rounded-lg px-3 py-2 text-body-normal text-white"
                        >
                          <option value="Software">Software</option>
                          <option value="Electrical">Electrical</option>
                          <option value="Mechanical">Mechanical</option>
                          <option value="Procurement">Procurement</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-small-text font-bold uppercase tracking-wider text-text-secondary mb-1 font-display">Skills Tags (comma-separated)</label>
                        <input
                          type="text"
                          value={formSkillsInput}
                          onChange={(e) => setFormSkillsInput(e.target.value)}
                          className="w-full bg-black border border-border-primary focus:border-signal focus:outline-none rounded-lg px-3 py-2 text-body-normal text-white"
                          placeholder="React, PCB, SolidWorks, ESP32"
                        />
                      </div>
                    </div>
                  )}

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-small-text font-bold uppercase tracking-wider text-text-secondary mb-1 font-display">Resume / CV Upload *</label>
                    <div className="border border-dashed border-border-primary hover:border-signal/50 rounded-xl p-4 text-center cursor-pointer relative bg-black/40">
                      <input
                        type="file"
                        required={!formResume}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFormResume(e.target.files[0]);
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept=".pdf,.doc,.docx"
                      />
                      <div className="flex flex-col items-center justify-center">
                        <Upload size={18} className="text-signal mb-1.5" />
                        {formResume ? (
                          <p className="text-body-normal font-semibold text-white truncate max-w-xs">{formResume.name}</p>
                        ) : (
                          <>
                            <p className="text-body-normal font-semibold text-text-primary">Click or drag-and-drop to upload resume</p>
                            <p className="text-small-text text-text-secondary mt-0.5">Accepts PDF, DOC, DOCX up to 5MB</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Message/Intro */}
                  <div>
                    <label className="block text-small-text font-bold uppercase tracking-wider text-text-secondary mb-1 font-display">Short Introduction / Cover Message</label>
                    <textarea
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      rows={3}
                      className="w-full bg-black border border-border-primary focus:border-signal focus:outline-none rounded-lg px-3 py-2 text-body-normal text-white resize-none"
                      placeholder="Briefly share any projects, hardware lab experience, or details you want to highlight..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cta-magnetic w-full rounded bg-signal py-3 font-bold text-black shadow-crisp border border-transparent flex justify-center items-center gap-2 hover:bg-opacity-95 text-xs tracking-wider uppercase transition-opacity mt-2"
                  >
                    {isSubmitting ? "Uploading Profile..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
