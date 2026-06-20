"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Lock, LogOut, Plus, Trash2, Edit, Eye, Search, FileText, 
  TrendingUp, Users, Cpu, Calendar, X, Sparkles, PieChart, 
  BarChart2, FileSpreadsheet, CheckCircle2, ShieldAlert, 
  MessageSquare, UserCheck, Settings, Globe, Shield, UserPlus, Mail, Key
} from "lucide-react";
import { Job, Application, WalkInDrive } from "@/app/careers/types";
import { 
  INITIAL_JOBS, 
  INITIAL_APPLICATIONS 
} from "@/app/careers/initialData";

interface HRUser {
  name: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [username, setUsername] = useState("");

  // Navigation states
  const [activeTab, setActiveTab] = useState<"dashboard" | "hr" | "jobs" | "candidates" | "analytics" | "career-settings" | "system-settings">("dashboard");

  // Core Data States
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [hrUsers, setHrUsers] = useState<HRUser[]>([]);
  
  // HR User Management Form inputs
  const [newHRName, setNewHRName] = useState("");
  const [newHREmail, setNewHREmail] = useState("");
  const [newHRPassword, setNewHRPassword] = useState("");
  const [hrError, setHrError] = useState("");
  const [hrSuccess, setHrSuccess] = useState("");
  const [hrLoading, setHrLoading] = useState(false);

  // Job Modal/Form States (Everything HR can do)
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  
  // Job inputs
  const [jobTitle, setJobTitle] = useState("");
  const [jobDept, setJobDept] = useState("Software");
  const [jobLoc, setJobLoc] = useState("Chennai / Hybrid");
  const [jobType, setJobType] = useState("Full Time");
  const [jobExp, setJobExp] = useState("2+ Years");
  const [jobSalary, setJobSalary] = useState("₹8,00,000 - ₹12,00,000 PA");
  const [jobDesc, setJobDesc] = useState("");
  const [jobSkills, setJobSkills] = useState("");
  const [jobDeadline, setJobDeadline] = useState("2026-07-31");
  const [jobStatus, setJobStatus] = useState<"Open" | "Closed">("Open");

  // Candidate evaluation states
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showResumeViewer, setShowResumeViewer] = useState(false);
  const [resumeApp, setResumeApp] = useState<Application | null>(null);
  
  // Candidate Filter/Search states
  const [appSearch, setAppSearch] = useState("");
  const [appFilterStatus, setAppFilterStatus] = useState("All");
  const [appFilterJob, setAppFilterJob] = useState("All");

  // HR evaluation notes / comments state
  const [newComment, setNewComment] = useState("");
  const [candidateComments, setCandidateComments] = useState<{[key: string]: string[]}>({});

  // Career/System Mock settings state
  const [portalMode, setPortalMode] = useState("Open Recruitment");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [debugLogs, setDebugLogs] = useState(false);

  // Guard Check
  useEffect(() => {
    const token = localStorage.getItem("texawave_token");
    const role = localStorage.getItem("texawave_role");
    const storedName = localStorage.getItem("texawave_username");

    // Admin dashboard is locked to role === "admin"
    if (!token || role !== "admin") {
      router.push("/login");
      return;
    }

    setUsername(storedName || "Administrator");

    // Load jobs & applications
    const localJobs = localStorage.getItem("texawave_jobs");
    if (localJobs) {
      setJobs(JSON.parse(localJobs));
    } else {
      setJobs(INITIAL_JOBS);
      localStorage.setItem("texawave_jobs", JSON.stringify(INITIAL_JOBS));
    }

    const localApps = localStorage.getItem("texawave_applications");
    if (localApps) {
      setApplications(JSON.parse(localApps));
    } else {
      setApplications(INITIAL_APPLICATIONS);
      localStorage.setItem("texawave_applications", JSON.stringify(INITIAL_APPLICATIONS));
    }

    // Load HR Notes from LocalStorage
    const localNotes = localStorage.getItem("texawave_hr_notes");
    if (localNotes) {
      setCandidateComments(JSON.parse(localNotes));
    }

    // Fetch HR accounts list from `/api/hr`
    fetchHRAccounts();

    setIsMounted(true);
  }, [router]);

  const fetchHRAccounts = async () => {
    try {
      const response = await fetch("/api/hr");
      const data = await response.json();
      if (data.success) {
        setHrUsers(data.hrUsers);
      }
    } catch (err) {
      console.error("Failed to load HR accounts from API");
    }
  };

  const handleCreateHRUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHRName || !newHREmail || !newHRPassword) {
      setHrError("Please provide all fields.");
      return;
    }

    setHrLoading(true);
    setHrError("");
    setHrSuccess("");

    try {
      const response = await fetch("/api/hr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newHRName,
          email: newHREmail,
          password: newHRPassword,
          role: "hr"
        })
      });

      const data = await response.json();

      if (data.success) {
        setHrSuccess(`HR account for ${newHRName} created successfully.`);
        setNewHRName("");
        setNewHREmail("");
        setNewHRPassword("");
        fetchHRAccounts(); // reload
      } else {
        setHrError(data.error || "Failed to create HR account.");
      }
    } catch (err) {
      setHrError("Network error occurred.");
    } finally {
      setHrLoading(false);
    }
  };

  const handleDeleteHRUser = async (email: string) => {
    if (confirm(`Are you sure you want to remove the recruiter account for ${email}?`)) {
      try {
        const response = await fetch("/api/hr", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });
        const data = await response.json();
        if (data.success) {
          fetchHRAccounts();
        } else {
          alert(data.error || "Failed to remove HR account.");
        }
      } catch (err) {
        alert("Network error.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("texawave_token");
    localStorage.removeItem("texawave_role");
    localStorage.removeItem("texawave_username");
    router.push("/login");
  };

  // Job Posting actions
  const saveJobsList = (updated: Job[]) => {
    setJobs(updated);
    localStorage.setItem("texawave_jobs", JSON.stringify(updated));
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobDesc) return;

    const skillsArray = jobSkills.split(",").map(s => s.trim()).filter(s => s.length > 0);

    if (editingJob) {
      const updated = jobs.map(j => {
        if (j.id === editingJob.id) {
          return {
            ...j,
            title: jobTitle,
            department: jobDept,
            location: jobLoc,
            type: jobType,
            experience: jobExp,
            salary: jobSalary,
            description: jobDesc,
            skills: skillsArray.length > 0 ? skillsArray : ["Engineering"],
            deadline: jobDeadline,
            status: jobStatus
          };
        }
        return j;
      });
      saveJobsList(updated);
    } else {
      const newJob: Job = {
        id: `job-${Date.now()}`,
        title: jobTitle,
        department: jobDept,
        location: jobLoc,
        type: jobType,
        experience: jobExp,
        salary: jobSalary,
        description: jobDesc,
        responsibilities: [
          "Lead design efforts across multidisciplinary modules.",
          "Validate client assemblies and DFM criteria."
        ],
        requirements: [
          "B.E. or B.Tech in engineering with relevant skillset.",
          "Solid operational modeling logic."
        ],
        benefits: ["Comprehensive medical cover", "Performance bonuses"],
        skills: skillsArray.length > 0 ? skillsArray : ["Engineering"],
        deadline: jobDeadline,
        status: "Open",
        isFeatured: true,
        isUrgent: false,
        isInternship: jobType.toLowerCase() === "internship",
        postedDate: new Date().toISOString().split("T")[0]
      };
      saveJobsList([newJob, ...jobs]);
    }

    resetJobForm();
    setShowJobModal(false);
  };

  const handleEditJobClick = (job: Job) => {
    setEditingJob(job);
    setJobTitle(job.title);
    setJobDept(job.department);
    setJobLoc(job.location);
    setJobType(job.type);
    setJobExp(job.experience);
    setJobSalary(job.salary);
    setJobDesc(job.description);
    setJobSkills(job.skills.join(", "));
    setJobDeadline(job.deadline);
    setJobStatus(job.status);
    setShowJobModal(true);
  };

  const handleDeleteJob = (id: string) => {
    if (confirm("Delete this job listing?")) {
      const updated = jobs.filter(j => j.id !== id);
      saveJobsList(updated);
    }
  };

  const resetJobForm = () => {
    setEditingJob(null);
    setJobTitle("");
    setJobDept("Software");
    setJobLoc("Chennai / Hybrid");
    setJobType("Full Time");
    setJobExp("2+ Years");
    setJobSalary("₹8,00,000 - ₹12,00,000 PA");
    setJobDesc("");
    setJobSkills("");
    setJobDeadline("2026-07-31");
    setJobStatus("Open");
  };

  // Candidates actions
  const saveAppsList = (updated: Application[]) => {
    setApplications(updated);
    localStorage.setItem("texawave_applications", JSON.stringify(updated));
  };

  const saveNotesList = (updatedNotes: {[key: string]: string[]}) => {
    setCandidateComments(updatedNotes);
    localStorage.setItem("texawave_hr_notes", JSON.stringify(updatedNotes));
  };

  const handleStatusChange = (appId: string, newStatus: Application["status"]) => {
    const updated = applications.map(app => {
      if (app.id === appId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    saveAppsList(updated);
  };

  const handleAddComment = (appId: string) => {
    if (!newComment.trim()) return;
    const currentNotes = candidateComments[appId] ? [...candidateComments[appId]] : [];
    const updated = {
      ...candidateComments,
      [appId]: [...currentNotes, newComment.trim()]
    };
    saveNotesList(updated);
    setNewComment("");
  };

  // Calculations for Metrics Cards
  const totalJobsCount = jobs.length;
  const totalCandidatesCount = applications.length;
  const totalHRUsersCount = hrUsers.filter(u => u.role === "hr").length;
  const websiteVisitorsCount = 1420; // Simulated/Mocked value

  // Application Pipeline Distribution
  const deptSummary = {
    Software: applications.filter(a => a.jobTitle.toLowerCase().includes("software") || a.jobTitle.toLowerCase().includes("web") || a.deptInterest?.toLowerCase() === "software").length,
    Electrical: applications.filter(a => a.jobTitle.toLowerCase().includes("embedded") || a.jobTitle.toLowerCase().includes("electrical") || a.deptInterest?.toLowerCase() === "electrical").length,
    Mechanical: applications.filter(a => a.jobTitle.toLowerCase().includes("cad") || a.jobTitle.toLowerCase().includes("mechanical") || a.deptInterest?.toLowerCase() === "mechanical").length,
    Procurement: applications.filter(a => a.jobTitle.toLowerCase().includes("sourcing") || a.jobTitle.toLowerCase().includes("procurement") || a.deptInterest?.toLowerCase() === "procurement").length
  };

  // Filter application candidates
  const filteredCandidates = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(appSearch.toLowerCase()) || 
                          app.email.toLowerCase().includes(appSearch.toLowerCase());
    const matchesStatus = appFilterStatus === "All" || app.status === appFilterStatus;
    const matchesJob = appFilterJob === "All" || app.jobId === appFilterJob;
    return matchesSearch && matchesStatus && matchesJob;
  });

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="h-10 w-10 border-4 border-[#9BDF83] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-bold uppercase tracking-wider ml-4 text-text-secondary">Securing administrative panel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-text-primary font-sans text-left relative">
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none z-0" aria-hidden="true" />
      
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-[75px] bg-[#0c0c0c] border-b border-white/10 flex items-center justify-between px-6 lg:px-12 z-40">
        <div className="flex items-center gap-4">
          <Image
            src="/texawave_logo.webp"
            alt="Texawave Logo"
            width={140}
            height={40}
            className="h-8 w-auto object-contain"
          />
          <span className="hidden sm:inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#9BDF83] bg-[#9BDF83]/10 border border-[#9BDF83]/20 rounded font-mono">
            🛡️ MASTER ADMIN
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold">
          <div className="text-right">
            <span className="text-text-secondary block text-[10px] uppercase font-mono">System Owner</span>
            <span className="text-[#9BDF83] font-bold">{username}</span>
          </div>
          
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-red-500/30 text-text-secondary hover:text-red-400 bg-white/5 transition-colors font-bold uppercase text-[10px]"
          >
            <LogOut size={12} /> Logout
          </button>
        </div>
      </nav>

      {/* Main split grid */}
      <div className="pt-[75px] min-h-screen grid lg:grid-cols-[260px_1fr] relative z-10">
        
        {/* Left Side menu */}
        <aside className="bg-[#080808]/90 border-r border-white/10 p-6 flex flex-col justify-between max-h-[calc(100vh-75px)] lg:sticky lg:top-[75px]">
          <div className="space-y-6">
            
            {/* Admin permissions checklist */}
            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
              <span className="text-[10px] font-bold text-text-secondary uppercase block mb-3 font-mono">
                🛡️ Admin Permissions
              </span>
              <ul className="text-[10px] font-bold space-y-2 font-mono">
                <li className="flex items-center gap-2 text-white">✅ Everything HR Can Do</li>
                <li className="flex items-center gap-2 text-[#9BDF83]">✅ Create/Remove HR Accounts</li>
                <li className="flex items-center gap-2 text-[#9BDF83]">✅ Manage Roles</li>
                <li className="flex items-center gap-2 text-[#9BDF83]">✅ View Analytics</li>
                <li className="flex items-center gap-2 text-[#9BDF83]">✅ Configure Career Portal</li>
              </ul>
            </div>

            <nav className="space-y-1">
              {[
                { id: "dashboard", label: "📊 Dashboard", icon: TrendingUp },
                { id: "hr", label: "👥 HR Management", icon: UserCheck },
                { id: "jobs", label: "💼 Job Management", icon: Cpu },
                { id: "candidates", label: "📝 Candidates", icon: FileText },
                { id: "analytics", label: "📈 Analytics", icon: PieChart },
                { id: "career-settings", label: "⚙️ Career Settings", icon: Globe },
                { id: "system-settings", label: "💻 System Settings", icon: Settings }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border ${
                    activeTab === tab.id
                      ? "bg-[#9BDF83]/10 border-[#9BDF83]/30 text-[#9BDF83] shadow-[0_0_12px_rgba(155,223,131,0.08)]"
                      : "bg-transparent border-transparent text-text-secondary hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/5 text-[10px] text-text-secondary font-mono">
            TEXAWAVE ADMIN PANEL
          </div>
        </aside>

        {/* Right Main Panel Content */}
        <main className="p-6 md:p-8 lg:p-12 overflow-y-auto">
          
          {/* Tab 1: Dashboard overview */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold font-display text-white">Administrative Operations</h1>
                <p className="text-text-secondary text-sm mt-1">Global operations registry control, metrics monitoring, and system metrics.</p>
              </div>

              {/* Cards row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Total Jobs", value: totalJobsCount, desc: "Listed positions", color: "text-[#9BDF83]" },
                  { label: "Total Candidates", value: totalCandidatesCount, desc: "Received submissions", color: "text-[#00D4FF]" },
                  { label: "Total HR Users", value: totalHRUsersCount, desc: "Active recruiter accounts", color: "text-purple-400" },
                  { label: "Website Visitors", value: websiteVisitorsCount, desc: "Sourcing page traffic", color: "text-amber-400" }
                ].map((card, idx) => (
                  <div key={idx} className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-crisp">
                    <span className="text-[10px] font-bold text-text-secondary uppercase block font-mono">{card.label}</span>
                    <strong className="text-4xl block mt-2 font-mono font-black text-white">{card.value}</strong>
                    <span className="text-[10px] text-text-secondary mt-1.5 block leading-none font-medium">{card.desc}</span>
                  </div>
                ))}
              </div>

              {/* SVG Charts section */}
              <div className="grid md:grid-cols-2 gap-8 pt-4">
                
                {/* Chart 1: Applications by division */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6 text-left">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2 font-mono">
                    <BarChart2 size={16} className="text-[#9BDF83]" />
                    Applications per Division
                  </h3>

                  <div className="space-y-4">
                    {Object.entries(deptSummary).map(([dept, count]) => {
                      const total = totalCandidatesCount || 1;
                      const percentage = Math.round((count / total) * 100);
                      return (
                        <div key={dept} className="space-y-1 text-left">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-white">{dept} Division</span>
                            <span className="text-[#9BDF83] font-mono">{count} ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-[#080808] h-3 border border-white/5 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#9BDF83] h-full rounded-full transition-all duration-700" 
                              style={{ width: `${Math.max(percentage, 5)}%` }} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* System Diagnostics status */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6 text-left flex flex-col justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2 font-mono">
                    <Shield size={16} className="text-[#9BDF83]" />
                    System Status & Operations
                  </h3>

                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2.5">
                      <span className="text-text-secondary">Authentication API Gateway:</span>
                      <strong className="text-green-400 font-mono">Active (200 OK)</strong>
                    </div>
                    <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2.5">
                      <span className="text-text-secondary">HR Accounts Directory size:</span>
                      <strong className="text-white font-mono">{hrUsers.length} accounts</strong>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-secondary">Career Sourcing Database:</span>
                      <strong className="text-green-400 font-mono">Synchronized (LocalStorage)</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: HR Account Management */}
          {activeTab === "hr" && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold font-display text-white">HR User Management</h1>
                <p className="text-text-secondary text-sm mt-1">Administer recruiters accounts list, provision credentials, and revoke system access.</p>
              </div>

              <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 items-start">
                
                {/* Form: Add Recruiter */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6 text-left">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2 font-mono">
                    <UserPlus size={16} className="text-[#9BDF83]" />
                    Add HR Recruiter Account
                  </h3>

                  {hrError && (
                    <div className="p-3 bg-red-950/30 border border-red-500/20 text-xs text-red-400 rounded-xl mb-4 flex items-center gap-2">
                      <ShieldAlert size={14} /> <span>{hrError}</span>
                    </div>
                  )}

                  {hrSuccess && (
                    <div className="p-3 bg-green-950/20 border border-[#9BDF83]/20 text-xs text-[#9BDF83] rounded-xl mb-4 flex items-center gap-2">
                      <CheckCircle2 size={14} /> <span>{hrSuccess}</span>
                    </div>
                  )}

                  <form onSubmit={handleCreateHRUser} className="space-y-4">
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-secondary mb-1.5 font-mono">Recruiter Name</label>
                      <input
                        type="text"
                        required
                        value={newHRName}
                        onChange={(e) => setNewHRName(e.target.value)}
                        placeholder="e.g. John Recruiter"
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#9BDF83] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-secondary mb-1.5 font-mono">Email Address</label>
                      <div className="relative flex items-center">
                        <Mail size={14} className="absolute left-3.5 text-text-secondary" />
                        <input
                          type="email"
                          required
                          value={newHREmail}
                          onChange={(e) => setNewHREmail(e.target.value)}
                          placeholder="e.g. recruiter@texawave.com"
                          className="w-full bg-black border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:border-[#9BDF83] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-text-secondary mb-1.5 font-mono">Access Password</label>
                      <div className="relative flex items-center">
                        <Key size={14} className="absolute left-3.5 text-text-secondary" />
                        <input
                          type="password"
                          required
                          value={newHRPassword}
                          onChange={(e) => setNewHRPassword(e.target.value)}
                          placeholder="Password"
                          className="w-full bg-black border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:border-[#9BDF83] focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={hrLoading}
                      className="w-full bg-[#9BDF83] text-black font-bold uppercase text-[10px] tracking-wider py-3 rounded-xl hover:bg-opacity-95 shadow-crisp font-mono"
                    >
                      {hrLoading ? "Provisioning..." : "Create Account"}
                    </button>
                  </form>
                </div>

                {/* Recruiter list table */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6 text-left">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2 font-mono">
                    <Users size={16} className="text-[#9BDF83]" />
                    Recruiter Directory List
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-text-secondary uppercase font-bold tracking-wider">
                          <th className="py-2.5 px-3">Recruiter Details</th>
                          <th className="py-2.5 px-3">Role</th>
                          <th className="py-2.5 px-3 text-right">Access</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {hrUsers.map((user) => (
                          <tr key={user.email} className="hover:bg-white/5 transition-colors">
                            <td className="py-3 px-3">
                              <span className="font-bold text-white block">{user.name}</span>
                              <span className="text-[10px] text-text-secondary font-mono mt-0.5">{user.email}</span>
                            </td>
                            <td className="py-3 px-3 uppercase text-[9px] font-bold font-mono">
                              <span className={`px-2 py-0.5 rounded ${
                                user.role === "admin" ? "bg-red-950/20 text-red-400 border border-red-500/10" : "bg-[#9BDF83]/10 text-[#9BDF83] border border-[#9BDF83]/10"
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              {user.email.toLowerCase() !== "admin@texawave.com" ? (
                                <button
                                  onClick={() => handleDeleteHRUser(user.email)}
                                  className="text-text-secondary hover:text-red-400 p-1.5 rounded hover:bg-white/5"
                                  title="Revoke system access"
                                >
                                  <Trash2 size={13} />
                                </button>
                              ) : (
                                <span className="text-[9px] font-mono text-text-secondary italic">Locked</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 3: Job management (Everything HR can do) */}
          {activeTab === "jobs" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold font-display text-white">Job Listings Management</h1>
                  <p className="text-text-secondary text-sm mt-1">Publish new job postings and inspect pipelines.</p>
                </div>
                <button
                  onClick={() => {
                    resetJobForm();
                    setShowJobModal(true);
                  }}
                  className="bg-[#9BDF83] text-black px-4 py-2.5 rounded-lg text-xs font-bold shadow-crisp hover:bg-opacity-95 flex items-center gap-2"
                >
                  <Plus size={14} /> Publish Job
                </button>
              </div>

              <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-text-secondary uppercase font-bold tracking-wider bg-white/5">
                      <th className="py-4 px-6">Role Details</th>
                      <th className="py-4 px-6">Division</th>
                      <th className="py-4 px-6">Details</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-bold text-white text-sm">{job.title}</div>
                          <div className="text-[10px] text-text-secondary mt-1 font-mono">{job.salary}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-text-secondary uppercase text-[10px] font-bold">
                            {job.department}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-white font-medium">{job.location}</div>
                          <div className="text-text-secondary mt-0.5 text-[10px]">{job.type} &bull; {job.experience}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            job.status === "Open" ? "bg-[#9BDF83]/20 text-[#9BDF83] border border-[#9BDF83]/30" : "bg-neutral-800 text-text-secondary border border-white/5"
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => handleEditJobClick(job)}
                            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white transition-colors"
                          >
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="p-1.5 rounded bg-red-950/20 hover:bg-red-900/30 text-red-400 transition-colors border border-red-500/10"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 4: Candidates (Everything HR can do) */}
          {activeTab === "candidates" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold font-display text-white">Candidates Pipelines Management</h1>
                <p className="text-text-secondary text-sm mt-1">Review candidates submissions, edit details, update status, and manage comment notes.</p>
              </div>

              {/* Filtering row */}
              <div className="grid sm:grid-cols-3 gap-4 bg-[#111] p-4 rounded-2xl border border-white/10">
                <div className="relative flex items-center">
                  <Search className="absolute left-3 text-text-secondary" size={14} />
                  <input
                    type="text"
                    placeholder="Search candidate name..."
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    className="w-full bg-black border border-white/10 focus:border-[#9BDF83] focus:outline-none rounded-xl pl-9 pr-3 py-2.5 text-xs text-white"
                  />
                </div>
                
                <select
                  value={appFilterStatus}
                  onChange={(e) => setAppFilterStatus(e.target.value)}
                  className="bg-black border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-semibold focus:border-[#9BDF83] focus:outline-none"
                >
                  <option value="All">All Pipelines Statuses</option>
                  <option value="New">New</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <select
                  value={appFilterJob}
                  onChange={(e) => setAppFilterJob(e.target.value)}
                  className="bg-black border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-semibold focus:border-[#9BDF83] focus:outline-none"
                >
                  <option value="All">All Job Postings</option>
                  {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                  <option value="general">General Talent Pool</option>
                </select>
              </div>

              {/* Candidate Grid list */}
              <div className="grid gap-6 md:grid-cols-2 text-left">
                {filteredCandidates.map((app) => (
                  <div key={app.id} className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-crisp relative">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div>
                          <strong className="text-white text-base block font-display">{app.name}</strong>
                          <span className="text-text-secondary text-xs mt-1 block font-mono">{app.email}</span>
                          <span className="text-text-secondary text-xs block font-mono">{app.phone}</span>
                        </div>
                        
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value as Application["status"])}
                          className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold focus:outline-none bg-black font-mono cursor-pointer ${
                            app.status === "New" ? "border-blue-500/30 text-blue-400" :
                            app.status === "Shortlisted" ? "border-amber-500/30 text-amber-400" :
                            app.status === "Interview Scheduled" ? "border-purple-500/30 text-purple-400" :
                            app.status === "Selected" ? "border-[#9BDF83]/30 text-[#9BDF83]" : "border-red-500/30 text-red-400"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Interview Scheduled">Interview Scheduled</option>
                          <option value="Selected">Selected</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>

                      <div className="space-y-2 text-xs py-3 border-y border-white/5 my-4">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Applied Role:</span>
                          <span className="text-white font-semibold">{app.jobTitle}</span>
                        </div>
                        <div className="flex justify-between font-mono text-[10px]">
                          <span className="text-text-secondary">Date Submitted:</span>
                          <span className="text-white">{app.dateApplied}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-text-secondary">Resume Document:</span>
                          <button
                            onClick={() => {
                              setResumeApp(app);
                              setShowResumeViewer(true);
                            }}
                            className="inline-flex items-center gap-1 text-[#9BDF83] hover:underline font-bold"
                          >
                            <Eye size={12} /> View Resume (Simulated)
                          </button>
                        </div>
                      </div>

                      {/* Evaluator Notes Comments list */}
                      <div className="mt-4">
                        <span className="text-[10px] font-bold text-text-secondary uppercase block mb-2 font-mono flex items-center gap-1">
                          <MessageSquare size={10} /> Recruiter Evaluation Notes
                        </span>
                        
                        <div className="space-y-1.5 max-h-24 overflow-y-auto mb-3 bg-[#080808] p-2.5 rounded-xl border border-white/5">
                          {candidateComments[app.id]?.map((note, index) => (
                            <div key={index} className="text-[11px] text-white/90 pl-2 border-l border-[#9BDF83] font-sans">
                              "{note}"
                            </div>
                          )) || <div className="text-[10px] text-text-secondary font-mono italic">No comments evaluated.</div>}
                        </div>

                        {/* Add note */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add evaluation comment..."
                            value={selectedApp?.id === app.id ? newComment : ""}
                            onChange={(e) => {
                              setSelectedApp(app);
                              setNewComment(e.target.value);
                            }}
                            onFocus={() => setSelectedApp(app)}
                            className="flex-1 bg-black border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-text-secondary/50 focus:border-[#9BDF83] focus:outline-none"
                          />
                          <button
                            onClick={() => handleAddComment(app.id)}
                            className="bg-[#9BDF83]/10 border border-[#9BDF83]/30 hover:bg-[#9BDF83]/20 text-[#9BDF83] text-[10px] font-bold uppercase px-3 rounded-lg transition-colors font-mono"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Analytics detailed */}
          {activeTab === "analytics" && (
            <div className="space-y-8 animate-fade-in text-left">
              <div>
                <h1 className="text-2xl font-bold font-display text-white">Recruitment Sourcing Analytics</h1>
                <p className="text-text-secondary text-sm mt-1">Full statistical summary graphs of career postings and hiring.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Chart 1: Applications per month */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-6 font-mono">Applications Volume (Month-wise)</h3>
                  
                  <div className="h-48 flex items-end justify-between pt-6 border-b border-white/5 font-mono text-[10px] text-text-secondary">
                    {[
                      { m: "March", val: 12, h: "h-[30%]" },
                      { m: "April", val: 18, h: "h-[45%]" },
                      { m: "May", val: 25, h: "h-[65%]" },
                      { m: "June", val: totalCandidatesCount + 4, h: "h-[85%]" }
                    ].map((month, i) => (
                      <div key={i} className="flex flex-col items-center flex-1">
                        <span className="text-[#9BDF83] font-bold block mb-2">{month.val}</span>
                        <div className={`w-12 bg-gradient-to-t from-[#9BDF83]/20 to-[#9BDF83] rounded-t ${month.h}`} />
                        <span className="mt-2 text-[9px] uppercase font-bold">{month.m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conversion Summary info */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">Department Openings Distribution</h3>
                  
                  <div className="space-y-4 pt-2">
                    {Object.entries(deptSummary).map(([dept, count]) => {
                      const percentage = Math.round((count / (totalCandidatesCount || 1)) * 100);
                      return (
                        <div key={dept} className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                          <span className="text-text-secondary font-bold uppercase">{dept}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-white font-mono font-bold">{count} profiles</span>
                            <span className="text-[#9BDF83] font-mono font-bold bg-[#9BDF83]/10 px-2 py-0.5 rounded text-[10px]">{percentage}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Career Portal Settings */}
          {activeTab === "career-settings" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h1 className="text-2xl font-bold font-display text-white">Career Portal Configurations</h1>
                <p className="text-text-secondary text-sm mt-1">Configure candidate-facing interfaces parameters and recruitment campaigns status.</p>
              </div>

              <div className="bg-[#111] border border-white/10 rounded-2xl p-6 max-w-2xl space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-2 font-mono">Portal Sourcing Campaign Status</label>
                  <select
                    value={portalMode}
                    onChange={(e) => setPortalMode(e.target.value)}
                    className="bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#9BDF83]"
                  >
                    <option value="Open Recruitment">Open Sourcing Mode (Hiring Candidates)</option>
                    <option value="Off-Season Pool">Off-Season Pool Only (General applications)</option>
                    <option value="Maintenance Mode">Maintenance Mode (Temporary Freeze)</option>
                  </select>
                  <p className="text-[10px] text-text-secondary mt-1.5 leading-relaxed font-mono">
                    Controls whether new external candidate application forms are accepted on the public careers portal page.
                  </p>
                </div>

                <div className="border-t border-white/5 pt-5 space-y-4">
                  <h4 className="text-white font-bold text-sm">System Operations Flags</h4>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary font-semibold">Enable Email Notifications to candidates on status shifts:</span>
                    <button
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`px-3 py-1.5 rounded-lg font-bold font-mono text-[10px] uppercase transition-all ${
                        emailNotifications ? "bg-[#9BDF83] text-black" : "bg-white/5 border border-white/10 text-text-secondary"
                      }`}
                    >
                      {emailNotifications ? "ENABLED" : "DISABLED"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 7: System Settings */}
          {activeTab === "system-settings" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h1 className="text-2xl font-bold font-display text-white">Global System Settings</h1>
                <p className="text-text-secondary text-sm mt-1">Monitor diagnostic systems registries, logs tracking, and access levels.</p>
              </div>

              <div className="bg-[#111] border border-white/10 rounded-2xl p-6 max-w-xl space-y-4 text-xs font-mono">
                <h3 className="text-white font-bold text-sm font-display mb-3">Diagnostics Terminal</h3>

                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-text-secondary">System Kernel Version:</span>
                  <span className="text-white">v1.2.0-Production</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-text-secondary">Security Token Verification:</span>
                  <span className="text-green-400">OK (TLS Enabled)</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-text-secondary">Debug Operational Logs:</span>
                  <button
                    onClick={() => setDebugLogs(!debugLogs)}
                    className="text-[#9BDF83] hover:underline"
                  >
                    {debugLogs ? "Show Log Output" : "Enable Debug Mode"}
                  </button>
                </div>

                {debugLogs && (
                  <div className="bg-black p-3 rounded-xl border border-white/5 text-[10px] text-green-400 space-y-1 overflow-x-auto max-h-32">
                    <p>[06-17 18:05:12] AUTH: Authenticated admin account.</p>
                    <p>[06-17 18:05:15] DB: Synced 6 active jobs posts.</p>
                    <p>[06-17 18:05:22] API: Fetched HR recruiter listings file successfully.</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: Create/Edit Job Post (Admin exclusive) */}
      {showJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl shadow-premium p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setShowJobModal(false)}
              className="absolute right-4 top-4 text-text-secondary hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-white font-display mb-6">
              {editingJob ? "Modify Job Posting Details" : "Create New Job Posting"}
            </h3>

            <form onSubmit={handleJobSubmit} className="space-y-4 text-left">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1.5 font-mono">Job Title</label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#9BDF83] focus:outline-none"
                    placeholder="e.g. Senior Embedded Systems Engineer"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1.5 font-mono">Department</label>
                  <select
                    value={jobDept}
                    onChange={(e) => setJobDept(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#9BDF83] focus:outline-none font-semibold"
                  >
                    <option value="Software">Software</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Procurement">Procurement</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1.5 font-mono">Location</label>
                  <input
                    type="text"
                    required
                    value={jobLoc}
                    onChange={(e) => setJobLoc(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#9BDF83] focus:outline-none"
                    placeholder="e.g. Chennai / Hybrid"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1.5 font-mono">Employment Type</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#9BDF83] focus:outline-none font-semibold"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1.5 font-mono">Experience Required</label>
                  <input
                    type="text"
                    required
                    value={jobExp}
                    onChange={(e) => setJobExp(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#9BDF83] focus:outline-none"
                    placeholder="e.g. 3+ Years"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1.5 font-mono">Salary Range</label>
                  <input
                    type="text"
                    required
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#9BDF83] focus:outline-none"
                    placeholder="e.g. ₹8,00,000 - ₹12,00,000 PA"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1.5 font-mono">Application Deadline</label>
                  <input
                    type="date"
                    required
                    value={jobDeadline}
                    onChange={(e) => setJobDeadline(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#9BDF83] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1.5 font-mono">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  required
                  value={jobSkills}
                  onChange={(e) => setJobSkills(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#9BDF83] focus:outline-none"
                  placeholder="e.g. Altium Designer, ESP32, KiCAD, Firmware"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1.5 font-mono">Job Description</label>
                <textarea
                  required
                  rows={5}
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#9BDF83] focus:outline-none resize-none"
                  placeholder="Provide comprehensive job description details..."
                />
              </div>

              {editingJob && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-1.5 font-mono">Hiring Status</label>
                  <select
                    value={jobStatus}
                    onChange={(e) => setJobStatus(e.target.value as any)}
                    className="bg-black border border-white/10 rounded-xl px-4 py-2 text-xs text-white font-semibold focus:border-[#9BDF83] focus:outline-none font-mono"
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#9BDF83] text-black font-bold uppercase text-xs tracking-wider py-3.5 rounded-xl hover:bg-opacity-90 shadow-crisp transition-all mt-4 font-mono"
              >
                {editingJob ? "Save Changes" : "Publish Job Posting"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Inline Resume Viewer */}
      {showResumeViewer && resumeApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#111] border border-white/10 rounded-2xl shadow-premium overflow-hidden flex flex-col md:grid md:grid-cols-[280px_1fr] max-h-[85vh]">
            
            <button
              onClick={() => {
                setShowResumeViewer(false);
                setResumeApp(null);
              }}
              className="absolute right-4 top-4 text-text-secondary hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors z-20"
            >
              <X size={18} />
            </button>

            {/* Sidebar info */}
            <div className="bg-[#080808] p-6 md:p-8 border-r border-white/10 text-left flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="text-[9px] font-bold text-text-secondary font-mono block uppercase">Candidate CV Info</span>
                <strong className="text-white text-lg block mt-1.5 font-display">{resumeApp.name}</strong>
                <p className="text-text-secondary text-[11px] mt-1">{resumeApp.jobTitle}</p>
                
                <div className="mt-6 space-y-3.5 text-xs text-text-secondary border-t border-white/5 pt-5 font-mono">
                  <div className="flex items-center gap-2">
                    <Mail size={13} className="text-[#9BDF83]" />
                    <span className="truncate">{resumeApp.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck size={13} className="text-[#9BDF83]" />
                    <span>{resumeApp.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-[#9BDF83]" />
                    <span>Applied: {resumeApp.dateApplied}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => alert(`Direct download: ${resumeApp.resumeName}`)}
                  className="w-full flex items-center justify-center gap-1.5 border border-white/10 hover:border-[#9BDF83] text-white hover:text-[#9BDF83] bg-black/40 py-2.5 rounded-xl text-xs font-bold font-mono uppercase transition-all"
                >
                  Download PDF
                </button>
              </div>
            </div>

            {/* Resume viewer window */}
            <div className="p-8 md:p-12 overflow-y-auto text-left bg-black max-h-[85vh]">
              <div className="border border-white/10 rounded-2xl bg-[#080808] p-8 max-w-xl mx-auto shadow-crisp relative">
                <div className="absolute right-6 top-6 text-[9px] text-text-secondary border border-white/10 px-2 py-0.5 rounded font-mono">
                  PDF VIEWER
                </div>
                
                <div className="border-b border-white/10 pb-6 mb-6">
                  <h1 className="text-2xl font-black text-white font-display">{resumeApp.name}</h1>
                  <span className="text-xs text-text-secondary mt-1 block font-mono">{resumeApp.email} | {resumeApp.phone}</span>
                </div>

                <div className="space-y-6 text-xs text-white/90">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#9BDF83] mb-2 font-mono">Professional Summary</h4>
                    <p className="leading-relaxed text-text-secondary text-[11px]">
                      Detail-oriented and dedicated engineering professional. Experienced with PCB designs, Altium design layout structures, firmware code design in C/C++, and hardware systems bring-up tests. Excited to apply interdisciplinary skills at Texawave.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#9BDF83] mb-2 font-mono">Professional Experience</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between font-bold">
                          <span>Associate Systems Engineer &bull; Automation Corp</span>
                          <span className="text-text-secondary font-mono text-[10px]">2024 - Present</span>
                        </div>
                        <ul className="list-disc list-inside mt-1.5 space-y-1 text-text-secondary text-[11px] leading-relaxed">
                          <li>Developed multi-layer hardware schematics and PCB designs using Altium Designer.</li>
                          <li>Collaborated in diagnostic testing and lab calibrations for smart controllers.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#9BDF83] mb-2 font-mono">Key Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {["Altium Designer", "SolidWorks", "PCB Layouts", "C/C++ Programming", "STM32 MCU"].map((skill, index) => (
                        <span key={index} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-text-secondary font-mono text-[10px]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#9BDF83] mb-2 font-mono">Candidate Cover Message</h4>
                    <p className="leading-relaxed text-text-secondary italic font-sans text-[11px]">
                      "{resumeApp.message}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
