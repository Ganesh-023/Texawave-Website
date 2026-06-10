"use client";

import React, { useState, useEffect } from "react";
import { PageChrome } from "@/components/PageChrome";
import { CandidateView } from "./CandidateView";
import { HRView } from "./HRView";
import { Job, WalkInDrive, CareerUpdate, Application } from "./types";
import { 
  INITIAL_JOBS, 
  INITIAL_WALKINS, 
  INITIAL_UPDATES, 
  INITIAL_APPLICATIONS 
} from "./initialData";

export default function CareersPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [view, setView] = useState<"candidate" | "hr">("candidate");

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

    // 4. Applications & Talent Pool combined (General applications have jobId: 'general')
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
  const saveJobs = (newJobs: Job[]) => {
    setJobs(newJobs);
    localStorage.setItem("texawave_jobs", JSON.stringify(newJobs));
  };

  const saveWalkins = (newWalkins: WalkInDrive[]) => {
    setWalkins(newWalkins);
    localStorage.setItem("texawave_walkins", JSON.stringify(newWalkins));
  };

  const saveUpdates = (newUpdates: CareerUpdate[]) => {
    setUpdates(newUpdates);
    localStorage.setItem("texawave_updates", JSON.stringify(newUpdates));
  };

  const saveApplications = (newApps: Application[]) => {
    setApplications(newApps);
    localStorage.setItem("texawave_applications", JSON.stringify(newApps));
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

    saveApplications([newApp, ...applications]);
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

    saveApplications([newApp, ...applications]);
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

  // HR Admin: Add a Job Posting
  const handleAddJob = (jobData: Omit<Job, "id" | "postedDate">) => {
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split("T")[0]
    };
    saveJobs([newJob, ...jobs]);
  };

  // HR Admin: Edit a Job Posting
  const handleEditJob = (editedJob: Job) => {
    const updated = jobs.map((j) => (j.id === editedJob.id ? editedJob : j));
    saveJobs(updated);
  };

  // HR Admin: Delete a Job Posting
  const handleDeleteJob = (id: string) => {
    const updated = jobs.filter((j) => j.id !== id);
    saveJobs(updated);
  };

  // HR Admin: Update application pipeline status
  const handleUpdateAppStatus = (id: string, status: Application["status"]) => {
    const updated = applications.map((app) => {
      if (app.id === id) {
        return { ...app, status };
      }
      return app;
    });
    saveApplications(updated);
  };

  // HR Admin: Add Walk-in Drive Announcement
  const handleAddWalkin = (walkinData: Omit<WalkInDrive, "id">) => {
    const newWalkin: WalkInDrive = {
      ...walkinData,
      id: `walkin-${Date.now()}`
    };
    saveWalkins([newWalkin, ...walkins]);
  };

  // HR Admin: Delete Walk-in drive
  const handleDeleteWalkin = (id: string) => {
    const updated = walkins.filter((w) => w.id !== id);
    saveWalkins(updated);
  };

  // HR Admin: Add update / life photo feed post
  const handleAddUpdate = (updateData: Omit<CareerUpdate, "id" | "likes" | "commentsCount" | "date">) => {
    const newUpdate: CareerUpdate = {
      ...updateData,
      id: `update-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      commentsCount: 0
    };
    saveUpdates([newUpdate, ...updates]);
  };

  // HR Admin: Delete update post
  const handleDeleteUpdate = (id: string) => {
    const updated = updates.filter((u) => u.id !== id);
    saveUpdates(updated);
  };

  // Loading state during mount checks
  if (!isMounted) {
    return (
      <PageChrome>
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-black">
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
          <div className="h-10 w-10 border-4 border-signal border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs text-text-secondary uppercase tracking-[0.2em] font-bold">Initializing Portal...</p>
        </div>
      </PageChrome>
    );
  }

  // Split applications list for HR tabs queries
  const activeApplications = applications.filter((app) => app.jobId !== "general");
  const talentPoolList = applications.filter((app) => app.jobId === "general");

  return (
    <PageChrome>
      {view === "candidate" ? (
        <CandidateView
          jobs={jobs}
          walkins={walkins}
          updates={updates}
          onApply={handleApply}
          onJoinTalentPool={handleJoinTalentPool}
          onLikeUpdate={handleLikeUpdate}
          onToggleAdmin={() => setView("hr")}
        />
      ) : (
        <HRView
          jobs={jobs}
          walkins={walkins}
          updates={updates}
          applications={activeApplications}
          talentPool={talentPoolList}
          onAddJob={handleAddJob}
          onEditJob={handleEditJob}
          onDeleteJob={handleDeleteJob}
          onUpdateAppStatus={handleUpdateAppStatus}
          onAddWalkin={handleAddWalkin}
          onDeleteWalkin={handleDeleteWalkin}
          onAddUpdate={handleAddUpdate}
          onDeleteUpdate={handleDeleteUpdate}
          onLogout={() => setView("candidate")}
        />
      )}
    </PageChrome>
  );
}
