"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageChrome } from "@/components/PageChrome";
import { CandidateView } from "./CandidateView";
import { Job, WalkInDrive, CareerUpdate, Application } from "./types";
import { 
  INITIAL_JOBS, 
  INITIAL_WALKINS, 
  INITIAL_UPDATES, 
  INITIAL_APPLICATIONS 
} from "./initialData";

export default function CareersPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Core Database States
  const [jobs, setJobs] = useState<Job[]>([]);
  const [walkins, setWalkins] = useState<WalkInDrive[]>([]);
  const [updates, setUpdates] = useState<CareerUpdate[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  // Hydrate states from localStorage on client-mount
  useEffect(() => {
    // 1. Jobs List
    const localJobs = localStorage.getItem("texawave_jobs");
    if (localJobs) {
      setJobs(JSON.parse(localJobs));
    } else {
      setJobs(INITIAL_JOBS);
      localStorage.setItem("texawave_jobs", JSON.stringify(INITIAL_JOBS));
    }

    // 2. Walk-in Drives
    const localWalkins = localStorage.getItem("texawave_walkins");
    if (localWalkins) {
      setWalkins(JSON.parse(localWalkins));
    } else {
      setWalkins(INITIAL_WALKINS);
      localStorage.setItem("texawave_walkins", JSON.stringify(INITIAL_WALKINS));
    }

    // 3. Company & Life Updates
    const localUpdates = localStorage.getItem("texawave_updates");
    if (localUpdates) {
      setUpdates(JSON.parse(localUpdates));
    } else {
      setUpdates(INITIAL_UPDATES);
      localStorage.setItem("texawave_updates", JSON.stringify(INITIAL_UPDATES));
    }

    // 4. Applications
    const localApps = localStorage.getItem("texawave_applications");
    if (localApps) {
      setApplications(JSON.parse(localApps));
    } else {
      setApplications(INITIAL_APPLICATIONS);
      localStorage.setItem("texawave_applications", JSON.stringify(INITIAL_APPLICATIONS));
    }

    setIsMounted(true);
  }, []);

  // Helpers to persist state updates
  const saveApplications = (newApps: Application[]) => {
    setApplications(newApps);
    localStorage.setItem("texawave_applications", JSON.stringify(newApps));
  };

  const saveUpdates = (newUpdates: CareerUpdate[]) => {
    setUpdates(newUpdates);
    localStorage.setItem("texawave_updates", JSON.stringify(newUpdates));
  };

  // Candidate: Job Application Submission
  const handleApply = (formData: {
    jobId: string;
    jobTitle: string;
    name: string;
    email: string;
    phone: string;
    resumeName: string;
    message: string;
  }) => {
    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: formData.jobId,
      jobTitle: formData.jobTitle,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      resumeName: formData.resumeName,
      message: formData.message,
      dateApplied: new Date().toISOString().split("T")[0],
      status: "New"
    };

    const updated = [newApp, ...applications];
    saveApplications(updated);
  };

  // Candidate: General Talent Pool Registration
  const handleJoinTalentPool = (formData: {
    name: string;
    email: string;
    phone: string;
    deptInterest: string;
    skills: string[];
    message: string;
    resumeName: string;
  }) => {
    const newApp: Application = {
      id: `talent-${Date.now()}`,
      jobId: "general",
      jobTitle: "General Sourcing / Talent Pool",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      resumeName: formData.resumeName,
      message: formData.message,
      dateApplied: new Date().toISOString().split("T")[0],
      status: "New",
      skills: formData.skills,
      deptInterest: formData.deptInterest
    };

    const updated = [newApp, ...applications];
    saveApplications(updated);
  };

  // Candidate: Like a Feed Post
  const handleLikeUpdate = (id: string) => {
    const updated = updates.map((up) => {
      if (up.id === id) {
        return { ...up, likes: up.likes + 1 };
      }
      return up;
    });
    saveUpdates(updated);
  };

  // Loading state during mount checks
  if (!isMounted) {
    return (
      <PageChrome>
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-bg-primary">
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
          <div className="h-10 w-10 border-4 border-signal border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs text-text-secondary uppercase tracking-[0.2em] font-bold">Initializing Portal...</p>
        </div>
      </PageChrome>
    );
  }

  return (
    <PageChrome>
      <CandidateView
        jobs={jobs}
        walkins={walkins}
        updates={updates}
        onApply={handleApply}
        onJoinTalentPool={handleJoinTalentPool}
        onLikeUpdate={handleLikeUpdate}
        onToggleAdmin={() => router.push("/login")}
      />
    </PageChrome>
  );
}
