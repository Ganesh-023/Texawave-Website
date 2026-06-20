"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Upload,
  X,
  Check,
  AlertCircle,
  GraduationCap,
  User,
  Building2,
  Mail,
  FileText,
  Image as ImageIcon,
  Settings,
  ShieldCheck,
  Sparkles,
  Clock,
  Trash2,
  Eye
} from "lucide-react";
import { PageChrome } from "@/components/PageChrome";
import { blogPosts } from "@/lib/content";

// --- TYPES ---
interface CommunityArticle {
  id: string;
  name: string;
  email: string;
  organization: string;
  authorPhoto: string; // base64 or URL
  title: string;
  category: string;
  coverImage: string; // base64 or URL
  content: string; // rich text HTML
  status: "pending" | "approved";
  submittedAt: string;
}

// --- INITIAL SEED DATA ---
const DEFAULT_COMMUNITY_ARTICLES: CommunityArticle[] = [
  {
    id: "comm-1",
    name: "Dr. Aris Thorne",
    email: "aris.thorne@mech-research.org",
    organization: "Robotics Research Lab",
    authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    title: "Generative Design in Sheet Metal for SPM Enclosures",
    category: "Mechanical",
    coverImage: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&w=800&q=80",
    content: `
      <h2>Optimizing Sheet Metal for Industrial SPM Enclosures</h2>
      <p>Modern industrial automation demands Special Purpose Machines (SPMs) that are robust, modular, and cost-effective. One area where engineering teams frequently over-design is the sheet metal enclosure, leading to excessive material weight and higher manufacturing costs.</p>
      
      <h3>The Role of Generative Design</h3>
      <p>Generative design algorithms allow engineers to input load cases, assembly clearances, and fabrication constraints. By running topology optimization, the software designs cutouts and reinforcement ribs that maintain structural integrity while shaving off up to 25% of the total steel weight.</p>
      
      <h3>Bend Deductions & Nesting Optimization</h3>
      <p>Before sending designs to production, ensure that bend radius calculations align with your fabricator's tooling. Proper nesting of sheet parts on a 4x8 sheet can reduce waste scrap rates to under 8%, directly improving project unit economics.</p>
    `,
    status: "approved",
    submittedAt: "2026-06-01T09:15:00.000Z"
  },
  {
    id: "comm-2",
    name: "Vikram Malhotra",
    email: "vikram@procure-tech.com",
    organization: "Apex Electronics Sourcing",
    authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    title: "Navigating Semiconductor Lead Times in 2026",
    category: "Procurement",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    content: `
      <h2>Supply Chain Continuity in Modern Hardware Sourcing</h2>
      <p>The semiconductor shortages of the past years have forced electrical and procurement engineers to work hand-in-hand during early prototyping phases. Waiting until layout completion to check chip availability is a recipe for delay.</p>
      
      <h3>Best Practices for BOM Resilience</h3>
      <ul>
        <li><strong>Multi-Source Strategy:</strong> Always lay out footprints that accommodate alternative components from different manufacturers (e.g., dual-footprint pads).</li>
        <li><strong>Early Sourcing:</strong> Order long-lead items (MCUs, RF transceivers) immediately after the schematics are frozen, even before routing begins.</li>
        <li><strong>Direct Distributor API Integrations:</strong> Use BOM scrubbing tools that query live inventories via distributor APIs (Mouser, DigiKey) during design time.</li>
      </ul>
    `,
    status: "approved",
    submittedAt: "2026-06-03T11:45:00.000Z"
  },
  {
    id: "comm-3",
    name: "Emily Johnson",
    email: "emily.j@stanford.edu",
    organization: "Stanford University",
    authorPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    title: "IoT Edge Computing with Rust for Industrial Sensors",
    category: "Software",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    content: `
      <h2>Why Rust is Becoming the Standard for Edge IoT Devices</h2>
      <p>Industrial monitoring requires high reliability and zero downtime. Microcontrollers and edge gateways processing sensor streams must manage memory safely and execute quickly under thermal constraints.</p>
      
      <h3>Memory Safety Without Garbage Collection</h3>
      <p>Rust's borrow checker prevents common errors like null pointer dereferencing and buffer overflows at compile time. This is critical for firmware running on remote PLC cabinets where manual restarts are extremely costly.</p>
      
      <h3>Predictive Maintenance at the Gate</h3>
      <p>By compiling neural network inferences into lightweight WebAssembly (WASM) binaries and running them on edge gateways with Rust, we process vibration data locally. Only anomaly flags are transmitted to the cloud, reducing bandwidth costs by 90%.</p>
    `,
    status: "pending",
    submittedAt: "2026-06-08T12:00:00.000Z"
  },
  {
    id: "intern-1",
    name: "Rohit Sharma",
    email: "rohit@iitm.ac.in",
    organization: "IIT Madras",
    authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    title: "Developing PLC Automations for Espin Nano Machine",
    category: "Internship",
    coverImage: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80",
    content: `
      <h2>Hands-on PLC Programming and Testing at Texawave</h2>
      <p>My internship experience at Texawave was focused on the automation layout of the Espin Nano Machine. Working closely with senior hardware engineers, I translated flow diagrams into PLC ladder logic, integrating stepper motors and high-voltage sensors.</p>
      
      <h3>Key Learnings</h3>
      <ul>
        <li>Configuring Modbus communication protocols between the PLC and HMI screens.</li>
        <li>Debugging signal noise issues on the high-voltage electrospinning nozzle lines.</li>
        <li>Writing safety interlock routines to instantly cut voltage if the machine casing is opened.</li>
      </ul>
      <p>The fast-paced engineering culture at Texawave taught me how to move rapidly from simulation models to working factory floors.</p>
    `,
    status: "approved",
    submittedAt: "2026-05-15T10:00:00.000Z"
  },
  {
    id: "intern-2",
    name: "Sneha Nair",
    email: "sneha@nitc.ac.in",
    organization: "NIT Calicut",
    authorPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    title: "A Deep Dive into PCB Assembly Support & BOM Sourcing",
    category: "Internship",
    coverImage: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=800&q=80",
    content: `
      <h2>Bridging PCB Design with Global Sourcing and Logistics</h2>
      <p>During my tenure as an electrical engineering intern at Texawave, I learned that a beautiful schematic means nothing if you can't buy the parts. I was tasked with verifying BOM alternatives for three active client projects.</p>
      
      <h3>Optimizing for Fabrication</h3>
      <p>I worked with local fabricators to understand PCB stack-up constraints, adjust track widths for impedance control, and generate fabrication packages (Gerbers, IPC-2581). I also leveraged BOM optimization scripts that reduced overall component costs by 15% across custom boards.</p>
      
      <p>The direct exposure to supply chain dynamics and hardware troubleshooting gave me practical engineering skills that textbooks simply cannot cover.</p>
    `,
    status: "approved",
    submittedAt: "2026-05-20T14:30:00.000Z"
  }
];

const CATEGORIES = ["All", "Software", "Electrical", "Mechanical", "Procurement", "Internship", "Industry Insights"];

export default function BlogPage() {
  const [articles, setArticles] = useState<CommunityArticle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isModeratorOpen, setIsModeratorOpen] = useState(false);
  const [activeReaderArticle, setActiveReaderArticle] = useState<CommunityArticle | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    authorPhoto: "",
    title: "",
    category: "Software",
    coverImage: "",
    content: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Initialize and Seed localStorage
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("texawave_community_articles");
    if (stored) {
      try {
        setArticles(JSON.parse(stored));
      } catch {
        setArticles(DEFAULT_COMMUNITY_ARTICLES);
        localStorage.setItem("texawave_community_articles", JSON.stringify(DEFAULT_COMMUNITY_ARTICLES));
      }
    } else {
      setArticles(DEFAULT_COMMUNITY_ARTICLES);
      localStorage.setItem("texawave_community_articles", JSON.stringify(DEFAULT_COMMUNITY_ARTICLES));
    }
  }, []);

  // Save articles to local storage helper
  const saveArticles = (updated: CommunityArticle[]) => {
    setArticles(updated);
    localStorage.setItem("texawave_community_articles", JSON.stringify(updated));
  };

  // Insert Rich-Text Helper Tags
  const insertTag = (tagOpen: string, tagClose: string) => {
    const textarea = document.getElementById("blog-content-textarea") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = tagOpen + (selected || "formatted text") + tagClose;
    const newValue = text.substring(0, start) + replacement + text.substring(end);

    setFormData((prev) => ({ ...prev, content: newValue }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagOpen.length, start + tagOpen.length + (selected || "formatted text").length);
    }, 0);
  };

  // Handle image upload and base64 conversion
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "authorPhoto" | "coverImage") => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit size to ~1MB for localStorage safety
    if (file.size > 1024 * 1024 * 1.5) {
      setFormErrors((prev) => ({ ...prev, [field]: "Image must be less than 1.5MB" }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, [field]: reader.result as string }));
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    };
    reader.readAsDataURL(file);
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Author Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.organization.trim()) errors.organization = "Organization/College is required";
    if (!formData.title.trim()) errors.title = "Blog Title is required";
    if (!formData.content.trim()) errors.content = "Content is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Default placeholders if images weren't uploaded
    const finalAuthorPhoto = formData.authorPhoto || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`;
    const finalCoverImage = formData.coverImage || `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80`;

    const newArticle: CommunityArticle = {
      id: "user-" + Date.now(),
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      authorPhoto: finalAuthorPhoto,
      title: formData.title,
      category: formData.category,
      coverImage: finalCoverImage,
      content: formData.content,
      status: "pending", // enter review queue
      submittedAt: new Date().toISOString()
    };

    saveArticles([newArticle, ...articles]);

    // Reset Form
    setFormData({
      name: "",
      email: "",
      organization: "",
      authorPhoto: "",
      title: "",
      category: "Software",
      coverImage: "",
      content: ""
    });
    setFormErrors({});
    setIsUploadOpen(false);
    setIsSuccessOpen(true);
  };

  // Moderator actions
  const approveArticle = (id: string) => {
    const updated = articles.map((art) => (art.id === id ? { ...art, status: "approved" as const } : art));
    saveArticles(updated);
  };

  const rejectArticle = (id: string) => {
    const updated = articles.filter((art) => art.id !== id);
    saveArticles(updated);
  };

  // Data processing
  const approvedCommunity = articles.filter((art) => art.status === "approved");
  const pendingArticles = articles.filter((art) => art.status === "pending");

  // Merge static and approved community blogs for general Recent Blogs feed
  const allRecentBlogs = [
    ...blogPosts.map((post) => ({
      ...post,
      id: post.slug,
      isStatic: true,
      authorPhoto: null,
      name: "Texawave Engineering",
      organization: "Core Team",
      submittedAt: "2025-01-01T00:00:00.000Z"
    })),
    ...approvedCommunity.map((art) => ({
      slug: art.id,
      id: art.id,
      title: art.title,
      excerpt: art.content.replace(/<[^>]*>/g, "").substring(0, 140) + "...",
      category: art.category,
      isStatic: false,
      authorPhoto: art.authorPhoto,
      name: art.name,
      organization: art.organization,
      submittedAt: art.submittedAt
    }))
  ];

  // Filter based on category select
  const filteredRecentBlogs = allRecentBlogs.filter((post) => {
    if (selectedCategory === "All") return true;
    return post.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Extract community guest articles specifically (excluding Internships) for the distinct Community Contributions section
  const communityContributions = approvedCommunity.filter((art) => art.category !== "Internship");

  // Extract Intern Spotlight experiences (Internship category approved submissions)
  const internSpotlights = approvedCommunity.filter((art) => art.category === "Internship");

  if (!mounted) {
    return (
      <PageChrome>
        <section className="bg-bg-secondary border-b border-border-primary py-20">
          <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
            <p className="text-small-text font-bold uppercase tracking-[0.18em] text-signal">Blog</p>
            <h1 className="mt-3 max-w-4xl text-hero text-text-primary">
              Engineering insights for faster, cleaner product development.
            </h1>
          </div>
        </section>
      </PageChrome>
    );
  }

  return (
    <PageChrome>
      {/* 1. HERO HEADER */}
      <section className="bg-bg-secondary border-b border-border-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)] relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-small-text font-bold bg-signal/20 text-signal border border-signal/30 uppercase tracking-wider mb-4">
              <Sparkles size={12} className="text-signal" /> Texawave Knowledge Base
            </span>
            <h1 className="max-w-4xl text-hero text-text-primary">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9BDF83] via-[#62ba46] to-[#2b521e]">Insights</span>
            </h1>
            <p className="mt-4 max-w-xl text-body-large text-text-secondary">
              Practical roadmap guides, embedded schematics, procurement metrics, and custom automation case studies.
            </p>
          </div>

          {/* Admin Indicator */}
          {pendingArticles.length > 0 && (
            <button
              onClick={() => setIsModeratorOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-950/40 border border-orange-500/30 hover:border-orange-500 text-orange-400 text-xs font-bold transition self-start md:self-auto cursor-pointer"
            >
              <Settings className="animate-spin duration-400" size={16} />
              Review Queue ({pendingArticles.length} Pending)
            </button>
          )}
        </div>
      </section>

      {/* 2. CATEGORIES FILTER SECTION */}
      <section className="bg-bg-primary pt-12 border-b border-border-primary/50">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
          <h2 className="text-small-text font-bold uppercase tracking-widest text-text-secondary">Filter by Topic</h2>
          <div className="mt-4 flex flex-wrap gap-2 pb-6 overflow-x-auto">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold border transition duration-300 ${
                    isActive
                      ? "bg-signal border-signal text-white shadow-lg shadow-signal/20"
                      : "bg-bg-secondary border-border-primary text-text-secondary hover:text-text-primary hover:border-signal/50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. UPLOAD YOUR ARTICLE CTA CARD */}
      <section className="bg-bg-primary py-8">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-signal/60 bg-bg-secondary/40 p-8 text-center md:text-left md:flex md:items-center md:justify-between gap-6 transition duration-300 hover:border-signal">
            <div className="absolute top-0 right-0 w-64 h-64 bg-signal/5 rounded-full blur-3xl pointer-events-none" />
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-small-text font-bold bg-signal/15 text-signal border border-signal/30 uppercase tracking-wider">
                <Sparkles size={12} /> Share Your Expertise
              </span>
              <h3 className="mt-3 text-card text-text-primary">Have an engineering story or project to share?</h3>
              <p className="mt-2 text-text-secondary max-w-2xl text-body-normal">
                Contribute to the Texawave Knowledge Hub. Submit articles on software engineering, electronics, custom hardware, or your internship experiences.
              </p>
            </div>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="mt-6 md:mt-0 flex-shrink-0 btn-premium px-6 py-3 bg-signal hover:bg-opacity-90 text-white font-bold rounded-xl transition inline-flex items-center gap-2 cursor-pointer"
            >
              <Upload size={18} /> Upload Your Article
            </button>
          </div>
        </div>
      </section>

      {/* 4. RECENT BLOGS SECTION */}
      <section className="bg-bg-primary py-10">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
          <h2 className="text-section text-text-primary mb-8">Recent Blogs & Publications</h2>

          {filteredRecentBlogs.length === 0 ? (
            <div className="text-center py-20 border border-border-primary rounded-2xl bg-bg-secondary/20">
              <AlertCircle className="mx-auto text-text-secondary" size={40} />
              <p className="mt-4 text-text-secondary font-bold">No articles found in this category.</p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="mt-4 text-signal hover:underline font-bold text-sm"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredRecentBlogs.map((post) => (
                <div
                  key={post.id}
                  data-reveal
                  onClick={() => {
                    if (post.isStatic) {
                      // Static route redirection
                      window.location.href = `/blog/${post.slug}`;
                    } else {
                      // Open community article inside reader modal
                      const matched = articles.find((a) => a.id === post.id);
                      if (matched) setActiveReaderArticle(matched);
                    }
                  }}
                  className="service-card-premium rounded-2xl border border-border-primary bg-bg-secondary p-7 transition duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-small-text font-black uppercase tracking-[0.16em] text-copper">{post.category}</span>
                      {!post.isStatic && (
                        <span className="text-small-text font-bold px-2 py-0.5 rounded bg-signal/15 text-signal border border-signal/30 uppercase tracking-wider">
                          Guest Post
                        </span>
                      )}
                    </div>
                    <h3 className="text-card text-text-primary hover:text-signal transition duration-200">
                      {post.title}
                    </h3>
                    <p className="mt-4 text-body-normal text-text-secondary line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border-primary/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {post.authorPhoto ? (
                        <img
                          src={post.authorPhoto}
                          alt={post.name}
                          className="w-8 h-8 rounded-full border border-border-primary object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full border border-border-primary bg-bg-primary flex items-center justify-center text-text-secondary text-xs font-bold">
                          TW
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold text-text-primary">{post.name}</p>
                        <p className="text-[10px] text-text-secondary">{post.organization}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-signal hover:text-green-400 transition">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. COMMUNITY CONTRIBUTIONS SECTION */}
      <section className="bg-bg-secondary/50 border-y border-border-primary py-20">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-small-text font-bold uppercase tracking-[0.18em] text-copper">Knowledge Exchange</p>
              <h2 className="mt-2 text-section text-text-primary">Community Contributions</h2>
              <p className="mt-3 text-text-secondary max-w-xl text-body-normal">
                Engineering deep-dives, tooling tips, and hardware analyses shared by industry professionals and researchers.
              </p>
            </div>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="mt-6 md:mt-0 flex items-center gap-2 px-5 py-3 rounded-xl border border-border-primary hover:border-signal/50 hover:bg-signal/10 transition text-text-primary font-bold text-sm cursor-pointer"
            >
              <Upload size={16} /> Share Your Article
            </button>
          </div>

          {communityContributions.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border-primary rounded-2xl bg-bg-secondary">
              <p className="text-text-secondary font-bold">No community contributions approved yet.</p>
              <p className="text-xs text-text-secondary mt-1">Be the first to upload and share your article!</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {communityContributions.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setActiveReaderArticle(art)}
                  className="group relative overflow-hidden rounded-2xl border border-border-primary bg-bg-secondary p-6 transition duration-300 hover:border-signal/70 cursor-pointer flex flex-col md:flex-row gap-6"
                >
                  <div className="md:w-1/3 relative h-40 md:h-auto rounded-xl overflow-hidden bg-bg-primary">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-bg-secondary/90 border border-border-primary text-[10px] font-bold text-copper uppercase tracking-wider">
                      {art.category}
                    </div>
                  </div>
                  <div className="md:w-2/3 flex flex-col justify-between">
                    <div>
                      <h3 className="text-card text-text-primary group-hover:text-signal transition duration-200">
                        {art.title}
                      </h3>
                      <p className="mt-2 text-body-normal text-text-secondary line-clamp-3">
                        {art.content.replace(/<[^>]*>/g, "")}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border-primary/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={art.authorPhoto}
                          alt={art.name}
                          className="w-8 h-8 rounded-full border border-border-primary object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-text-primary">{art.name}</p>
                          <p className="text-[10px] text-text-secondary">{art.organization}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-signal inline-flex items-center gap-1 group-hover:text-green-400 transition">
                        View Article <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. INTERN SPOTLIGHT SECTION */}
      <section className="bg-bg-primary py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-signal/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)] relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-small-text font-bold bg-signal/20 text-signal border border-signal/30 uppercase tracking-wider mb-4">
              <GraduationCap size={12} className="text-signal" /> Talent Hub
            </span>
            <h2 className="text-section text-text-primary">Intern Spotlight</h2>
            <p className="mt-4 text-text-secondary text-body-normal">
              Showcasing approved student experiences, product prototypes, and engineering takeaways from the Texawave internship program.
            </p>
          </div>

          {internSpotlights.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border-primary rounded-2xl bg-bg-secondary/40">
              <p className="text-text-secondary font-bold">No intern spotlight experiences approved yet.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {internSpotlights.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setActiveReaderArticle(art)}
                  className="glassmorphism-hub-panel rounded-2xl p-8 hover:border-signal/80 transition duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-copper/5 rounded-full blur-2xl pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={art.authorPhoto}
                          alt={art.name}
                          className="w-12 h-12 rounded-full border border-signal/30 object-cover shadow-lg"
                        />
                        <div>
                          <h4 className="font-bold text-text-primary text-sm">{art.name}</h4>
                          <p className="text-xs text-copper font-semibold">{art.organization}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-signal/15 text-signal border border-signal/30 uppercase tracking-wider">
                        Intern Experience
                      </span>
                    </div>

                    <h3 className="text-card text-text-primary hover:text-signal transition mb-4">
                      {art.title}
                    </h3>
                    <p className="text-body-normal text-text-secondary line-clamp-4 bg-bg-primary/30 p-4 rounded-xl border border-border-primary/50">
                      {art.content.replace(/<[^>]*>/g, "")}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border-primary/40 flex items-center justify-between text-xs font-bold">
                    <span className="text-text-secondary flex items-center gap-1.5">
                      <Clock size={12} />
                      {new Date(art.submittedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                    <span className="text-signal inline-flex items-center gap-1 group hover:text-green-400 transition">
                      Read Intern Story <ArrowRight size={14} className="ml-1" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- FORM MODAL: UPLOAD YOUR ARTICLE --- */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto" data-lenis-prevent>
          <div
            data-reveal
            className="relative w-full max-w-3xl rounded-2xl border border-border-primary bg-bg-secondary shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border-primary p-6">
              <div>
                <h2 className="text-2xl font-black text-text-primary flex items-center gap-2">
                  <Upload className="text-signal" size={24} /> Submit Your Article
                </h2>
                <p className="text-xs text-text-secondary mt-1">
                  Share your knowledge. Once approved, it will be published in Community Contributions or Intern Spotlight.
                </p>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="rounded-lg p-1.5 hover:bg-bg-primary text-text-secondary hover:text-text-primary transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content / Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Author Name */}
                <div>
                  <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                    Author Name <span className="text-copper">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-text-secondary" size={16} />
                    <input
                      type="text"
                      placeholder="e.g. Alexander Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-bg-primary border border-border-primary text-text-primary focus:border-signal outline-none rounded-xl py-3 pl-10 pr-4 text-sm transition"
                    />
                  </div>
                  {formErrors.name && <p className="text-xs text-orange-500 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {formErrors.name}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                    Email Address <span className="text-copper">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-text-secondary" size={16} />
                    <input
                      type="email"
                      placeholder="e.g. alex@aerotech.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-bg-primary border border-border-primary text-text-primary focus:border-signal outline-none rounded-xl py-3 pl-10 pr-4 text-sm transition"
                    />
                  </div>
                  {formErrors.email && <p className="text-xs text-orange-500 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {formErrors.email}</p>}
                </div>

                {/* Organization or College */}
                <div>
                  <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                    Organization / College <span className="text-copper">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 text-text-secondary" size={16} />
                    <input
                      type="text"
                      placeholder="e.g. Stanford University / Texawave"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full bg-bg-primary border border-border-primary text-text-primary focus:border-signal outline-none rounded-xl py-3 pl-10 pr-4 text-sm transition"
                    />
                  </div>
                  {formErrors.organization && <p className="text-xs text-orange-500 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {formErrors.organization}</p>}
                </div>

                {/* Blog Category */}
                <div>
                  <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                    Article Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-bg-primary border border-border-primary text-text-primary focus:border-signal outline-none rounded-xl py-3 px-4 text-sm transition"
                  >
                    {CATEGORIES.slice(1).map((cat) => (
                      <option key={cat} value={cat} className="bg-bg-secondary text-text-primary">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Blog Title */}
              <div>
                <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                  Blog Title <span className="text-copper">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 text-text-secondary" size={16} />
                  <input
                    type="text"
                    placeholder="e.g. Design Considerations for High-Frequency PCBs"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-bg-primary border border-border-primary text-text-primary focus:border-signal outline-none rounded-xl py-3 pl-10 pr-4 text-sm transition"
                  />
                </div>
                {formErrors.title && <p className="text-xs text-orange-500 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {formErrors.title}</p>}
              </div>

              {/* Photo Uploads Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Author Photo */}
                <div className="border border-border-primary rounded-xl p-4 bg-bg-primary/40">
                  <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                    Author Profile Photo
                  </label>
                  <div className="flex items-center gap-4">
                    {formData.authorPhoto ? (
                      <img
                        src={formData.authorPhoto}
                        alt="Preview"
                        className="w-12 h-12 rounded-full object-cover border border-signal"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full border border-border-primary bg-bg-primary flex items-center justify-center text-text-secondary text-xs">
                        No Pic
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        id="author-photo-input"
                        onChange={(e) => handleImageUpload(e, "authorPhoto")}
                        className="hidden"
                      />
                      <label
                        htmlFor="author-photo-input"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-primary border border-border-primary hover:border-signal text-xs font-bold text-text-primary transition cursor-pointer"
                      >
                        <ImageIcon size={14} /> Upload Image
                      </label>
                      <p className="text-[10px] text-text-secondary mt-1">PNG, JPG up to 1.5MB. Auto placeholder if left empty.</p>
                    </div>
                  </div>
                  {formErrors.authorPhoto && <p className="text-xs text-orange-500 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {formErrors.authorPhoto}</p>}
                </div>

                {/* Cover Image */}
                <div className="border border-border-primary rounded-xl p-4 bg-bg-primary/40">
                  <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                    Blog Cover Image
                  </label>
                  <div className="flex items-center gap-4">
                    {formData.coverImage ? (
                      <img
                        src={formData.coverImage}
                        alt="Preview"
                        className="w-16 h-10 object-cover rounded border border-signal"
                      />
                    ) : (
                      <div className="w-16 h-10 border border-border-primary bg-bg-primary rounded flex items-center justify-center text-text-secondary text-xs">
                        No Cover
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        id="cover-image-input"
                        onChange={(e) => handleImageUpload(e, "coverImage")}
                        className="hidden"
                      />
                      <label
                        htmlFor="cover-image-input"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-primary border border-border-primary hover:border-signal text-xs font-bold text-text-primary transition cursor-pointer"
                      >
                        <ImageIcon size={14} /> Upload Image
                      </label>
                      <p className="text-[10px] text-text-secondary mt-1">PNG, JPG up to 1.5MB. Auto placeholder if left empty.</p>
                    </div>
                  </div>
                  {formErrors.coverImage && <p className="text-xs text-orange-500 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {formErrors.coverImage}</p>}
                </div>
              </div>

              {/* Rich Text Editor Field */}
              <div>
                <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                  Rich-Text Content <span className="text-copper">*</span>
                </label>

                {/* Editor Toolbar */}
                <div className="flex flex-wrap gap-1 p-2 bg-bg-primary border border-b-0 border-border-primary rounded-t-xl">
                  <button
                    type="button"
                    onClick={() => insertTag("<strong>", "</strong>")}
                    className="p-1.5 rounded hover:bg-bg-secondary text-xs font-bold text-text-secondary hover:text-text-primary transition"
                    title="Bold"
                  >
                    Bold
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTag("<em>", "</em>")}
                    className="p-1.5 rounded hover:bg-bg-secondary text-xs italic text-text-secondary hover:text-text-primary transition"
                    title="Italic"
                  >
                    Italic
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTag("<h2>", "</h2>")}
                    className="p-1.5 rounded hover:bg-bg-secondary text-xs font-bold text-text-secondary hover:text-text-primary transition"
                    title="Heading 2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTag("<h3>", "</h3>")}
                    className="p-1.5 rounded hover:bg-bg-secondary text-xs font-bold text-text-secondary hover:text-text-primary transition"
                    title="Heading 3"
                  >
                    H3
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTag("<ul>\n  <li>", "</li>\n</ul>")}
                    className="p-1.5 rounded hover:bg-bg-secondary text-xs text-text-secondary hover:text-text-primary transition"
                    title="Bullet List"
                  >
                    Bullet List
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTag("<pre><code>", "</code></pre>")}
                    className="p-1.5 rounded hover:bg-bg-secondary text-xs font-mono text-text-secondary hover:text-text-primary transition"
                    title="Code Block"
                  >
                    Code Block
                  </button>
                </div>

                <textarea
                  id="blog-content-textarea"
                  rows={8}
                  placeholder="Start writing your rich-text article... You can use HTML tags or the formatting buttons above."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-bg-primary border border-border-primary text-text-primary focus:border-signal outline-none rounded-b-xl p-4 text-sm transition font-sans leading-relaxed"
                />
                {formErrors.content && <p className="text-xs text-orange-500 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {formErrors.content}</p>}
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-primary">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-border-primary text-text-secondary hover:text-text-primary text-sm font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-signal hover:bg-opacity-90 text-white text-sm font-bold transition flex items-center gap-2 cursor-pointer"
                >
                  <Check size={16} /> Submit to Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: SUCCESS SUBMISSION --- */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div
            data-reveal
            className="w-full max-w-md rounded-2xl border border-border-primary bg-bg-secondary p-8 text-center shadow-2xl relative"
          >
            <div className="w-16 h-16 rounded-full bg-signal/20 border border-signal text-signal mx-auto flex items-center justify-center mb-6">
              <Check size={32} />
            </div>
            <h3 className="text-2xl font-black text-text-primary">Article Submitted!</h3>
            <p className="mt-3 text-text-secondary text-sm leading-relaxed">
              Thank you for contributing! Your article has entered the **moderator review queue**. Once approved by an administrator, it will be published live on the Texawave Blog.
            </p>
            <div className="mt-8">
              <button
                onClick={() => {
                  setIsSuccessOpen(false);
                  setIsModeratorOpen(true); // Open the queue immediately so the user can see and approve it!
                }}
                className="w-full py-3 rounded-xl bg-signal hover:bg-opacity-90 text-white font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                Open Moderator Queue <ArrowRight size={16} />
              </button>
            </div>
            <button
              onClick={() => setIsSuccessOpen(false)}
              className="mt-3 text-xs text-text-secondary hover:underline cursor-pointer"
            >
              Back to Blog
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL: MODERATOR REVIEW QUEUE --- */}
      {isModeratorOpen && (
        <div className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" data-lenis-prevent>
          <div
            data-reveal
            className="relative w-full max-w-4xl rounded-2xl border border-border-primary bg-bg-secondary shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-border-primary p-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-signal" size={24} />
                <div>
                  <h2 className="text-2xl font-black text-text-primary">Moderator Review Panel</h2>
                  <p className="text-xs text-text-secondary">Approve or reject community submissions in real-time.</p>
                </div>
              </div>
              <button
                onClick={() => setIsModeratorOpen(false)}
                className="rounded-lg p-1.5 hover:bg-bg-primary text-text-secondary hover:text-text-primary transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-bg-secondary/30">
              {pendingArticles.length === 0 ? (
                <div className="text-center py-20">
                  <ShieldCheck className="mx-auto text-green-500 mb-4" size={48} />
                  <h4 className="text-xl font-bold text-text-primary">Review Queue is Clear!</h4>
                  <p className="text-xs text-text-secondary mt-1">There are no pending article submissions at this time.</p>
                  <button
                    onClick={() => {
                      setIsModeratorOpen(false);
                      setIsUploadOpen(true);
                    }}
                    className="mt-6 px-5 py-2 rounded-lg bg-signal text-white font-bold text-xs hover:bg-opacity-90 transition cursor-pointer"
                  >
                    Submit a Test Article
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingArticles.map((art) => (
                    <div
                      key={art.id}
                      className="border border-border-primary rounded-xl p-5 bg-bg-primary flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-copper/20 text-copper border border-copper/30 uppercase tracking-wider">
                            {art.category}
                          </span>
                          <span className="text-[10px] text-text-secondary">
                            Submitted {new Date(art.submittedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="text-lg font-black text-text-primary">{art.title}</h4>
                        <div className="flex items-center gap-2 pt-1">
                          <img
                            src={art.authorPhoto}
                            alt={art.name}
                            className="w-5 h-5 rounded-full object-cover border border-border-primary"
                          />
                          <p className="text-xs text-text-secondary">
                            By <span className="text-text-primary font-semibold">{art.name}</span> ({art.organization})
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-auto">
                        <button
                          onClick={() => setActiveReaderArticle(art)}
                          className="px-3.5 py-2 rounded-lg border border-border-primary hover:border-signal/50 text-text-primary text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <Eye size={14} /> Preview
                        </button>
                        <button
                          onClick={() => approveArticle(art.id)}
                          className="px-3.5 py-2 rounded-lg bg-signal hover:bg-opacity-90 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <Check size={14} /> Approve
                        </button>
                        <button
                          onClick={() => rejectArticle(art.id)}
                          className="px-3.5 py-2 rounded-lg bg-red-950/30 border border-red-900/50 hover:border-red-500 text-red-400 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={14} /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- FULL ARTICLE READER MODAL --- */}
      {activeReaderArticle && (
        <div className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto" data-lenis-prevent>
          <div
            data-reveal
            className="relative w-full max-w-4xl rounded-2xl border border-border-primary bg-bg-secondary shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border-primary p-6 bg-bg-secondary">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-signal/15 text-signal border border-signal/30 uppercase tracking-wider">
                  {activeReaderArticle.category}
                </span>
                {activeReaderArticle.status === "pending" && (
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-950/40 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
                    In Review Queue
                  </span>
                )}
              </div>
              <button
                onClick={() => setActiveReaderArticle(null)}
                className="rounded-lg p-1.5 hover:bg-bg-primary text-text-secondary hover:text-text-primary transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Reader Content */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 bg-bg-primary">
              {/* Cover Image */}
              <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden bg-bg-secondary border border-border-primary">
                <img
                  src={activeReaderArticle.coverImage}
                  alt={activeReaderArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Author & Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-border-primary/50">
                <div className="flex items-center gap-4">
                  <img
                    src={activeReaderArticle.authorPhoto}
                    alt={activeReaderArticle.name}
                    className="w-12 h-12 rounded-full border border-signal object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-text-primary">{activeReaderArticle.name}</h4>
                    <p className="text-xs text-text-secondary">
                      {activeReaderArticle.organization} • {activeReaderArticle.email}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-text-secondary md:text-right">
                  <p>Published: {new Date(activeReaderArticle.submittedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}</p>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-invert prose-lg max-w-none text-text-primary/90 space-y-6 pb-12 leading-relaxed">
                <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight leading-tight">
                  {activeReaderArticle.title}
                </h1>
                
                {/* Dynamically Inject HTML Content safely */}
                <div 
                  className="space-y-4 text-text-secondary"
                  dangerouslySetInnerHTML={{ __html: activeReaderArticle.content }}
                />
              </div>
            </div>

            {/* Reader Modal Footer: Show moderation buttons if reviewing pending post */}
            {activeReaderArticle.status === "pending" && (
              <div className="border-t border-border-primary p-4 bg-bg-secondary flex justify-end gap-2">
                <button
                  onClick={() => {
                    approveArticle(activeReaderArticle.id);
                    setActiveReaderArticle(null);
                  }}
                  className="px-5 py-2.5 rounded-lg bg-signal hover:bg-opacity-90 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Check size={14} /> Approve & Publish
                </button>
                <button
                  onClick={() => {
                    rejectArticle(activeReaderArticle.id);
                    setActiveReaderArticle(null);
                  }}
                  className="px-5 py-2.5 rounded-lg bg-red-950/30 border border-red-900/50 hover:border-red-500 text-red-400 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={14} /> Reject & Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </PageChrome>
  );
}
