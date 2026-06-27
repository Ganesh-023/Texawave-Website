"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, Trash2, Edit, ArrowUp, ArrowDown, Linkedin, 
  Upload, User, Shield, Check, Loader2, AlertCircle, RefreshCw 
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  department: string;
  role: string;
  description: string;
  skills: string[];
  experience: string;
  linkedinUrl: string;
  profileImage: string;
  displayOrder: number;
}

const DEPARTMENTS = [
  "Software Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Procurement",
  "IoT Engineering",
  "Product Design"
];

export default function AdminTeamTab() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [profileImage, setProfileImage] = useState("");
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      if (data.success) {
        setTeam(data.team);
      } else {
        setError(data.error || "Failed to fetch team members");
      }
    } catch (err) {
      setError("Network error fetching team members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const resetForm = () => {
    setEditingMember(null);
    setName("");
    setDepartment(DEPARTMENTS[0]);
    setRole("");
    setDescription("");
    setSkills("");
    setExperience("");
    setLinkedinUrl("");
    setProfileImage("");
    setError(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setName(member.name);
    setDepartment(member.department);
    setRole(member.role);
    setDescription(member.description);
    setSkills(member.skills.join(", "));
    setExperience(member.experience);
    setLinkedinUrl(member.linkedinUrl);
    setProfileImage(member.profileImage);
    setError(null);
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/case-studies/upload", {
        method: "POST",
        headers: {
          "Authorization": "Bearer jwt_mock_admin_token"
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setProfileImage(data.url);
        setSuccess("Profile photo uploaded successfully!");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.error || "Failed to upload image.");
      }
    } catch (err) {
      setError("Network error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !department || !role) {
      setError("Name, Department, and Designation are required.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const skillsArray = skills
      ? skills.split(",").map(s => s.trim()).filter(Boolean)
      : [];

    const payload = {
      name,
      department,
      role,
      description,
      skills: skillsArray,
      experience,
      linkedinUrl,
      profileImage,
    };

    try {
      const url = "/api/team";
      const method = editingMember ? "PUT" : "POST";
      const body = editingMember ? { ...payload, id: editingMember.id } : payload;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer jwt_mock_admin_token"
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(editingMember ? "Team member updated!" : "Team member added!");
        setShowModal(false);
        resetForm();
        fetchTeam();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.error || "Failed to save team member.");
      }
    } catch (err) {
      setError("Network error saving team member.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from the team?`)) return;

    setError(null);
    try {
      const res = await fetch(`/api/team/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer jwt_mock_admin_token"
        }
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(`${name} removed from the team.`);
        fetchTeam();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.error || "Failed to delete team member.");
      }
    } catch (err) {
      setError("Network error deleting team member.");
    }
  };

  const handleReorder = async (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= team.length) return;

    const newTeam = [...team];
    
    // Swap items
    const temp = newTeam[index];
    newTeam[index] = newTeam[targetIdx];
    newTeam[targetIdx] = temp;

    // Recalculate displayOrder values
    const updatedTeam = newTeam.map((member, idx) => ({
      ...member,
      displayOrder: idx + 1
    }));

    setTeam(updatedTeam);

    try {
      const res = await fetch("/api/team", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer jwt_mock_admin_token"
        },
        body: JSON.stringify(updatedTeam)
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Failed to save display order.");
        fetchTeam();
      }
    } catch (err) {
      setError("Network error saving new display order.");
      fetchTeam();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white">Team Management</h1>
          <p className="text-text-secondary text-sm mt-1">
            Administer the Texawave engineering, design, and procurement team members displayed on the About page.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 rounded bg-[#8CC63F] px-4 py-2.5 font-bold text-black hover:bg-[#a8eb90] transition-colors self-start sm:self-center text-xs uppercase tracking-wider shadow-lg"
        >
          <Plus size={16} /> Add Team Member
        </button>
      </div>

      {success && (
        <div className="p-4 bg-green-950/20 border border-[#8CC63F]/20 text-xs text-[#8CC63F] rounded-2xl flex items-center gap-2">
          <Check size={16} /> <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-950/30 border border-red-500/20 text-xs text-red-400 rounded-2xl flex items-center gap-2">
          <AlertCircle size={16} /> <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-text-secondary">
          <Loader2 size={36} className="animate-spin text-[#8CC63F] mb-4" />
          <p className="text-xs font-bold uppercase tracking-widest font-mono">Loading team records...</p>
        </div>
      ) : team.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl bg-[#111]">
          <User className="mx-auto text-neutral-600 mb-3" size={40} />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">No Team Members Found</h3>
          <p className="text-xs text-text-secondary mt-1">Add your first team member to display them on the About page.</p>
        </div>
      ) : (
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-crisp">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-text-secondary font-mono">
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4">Member</th>
                  <th className="px-6 py-4">Department & Role</th>
                  <th className="px-6 py-4">Experience & Skills</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {team.map((member, index) => (
                  <tr key={member.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-text-secondary">{index + 1}</span>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => handleReorder(index, "up")}
                            disabled={index === 0}
                            className={`p-1 rounded bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:hover:bg-white/5 transition-colors`}
                            title="Move Up"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            onClick={() => handleReorder(index, "down")}
                            disabled={index === team.length - 1}
                            className={`p-1 rounded bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:hover:bg-white/5 transition-colors`}
                            title="Move Down"
                          >
                            <ArrowDown size={12} />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {member.profileImage ? (
                          <img
                            src={member.profileImage}
                            alt={member.name}
                            className="h-10 w-10 rounded-full object-cover border border-white/10"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1E3A0E] to-[#0A0F0D] border border-white/10 flex items-center justify-center text-[#8CC63F] font-bold text-xs uppercase font-mono">
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-white text-sm">{member.name}</h4>
                          {member.linkedinUrl && (
                            <a
                              href={member.linkedinUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#8CC63F] hover:underline flex items-center gap-1 mt-0.5 text-[10px]"
                            >
                              <Linkedin size={10} /> LinkedIn
                            </a>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white font-semibold">{member.role}</div>
                      <div className="text-text-secondary text-[11px] mt-0.5">{member.department}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono text-text-secondary text-[11px]">Exp: {member.experience || "N/A"}</div>
                      <div className="flex flex-wrap gap-1 mt-1 max-w-[280px]">
                        {member.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 text-[9px] rounded bg-white/5 text-white/80 border border-white/5 font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(member)}
                          className="p-2 rounded bg-white/5 hover:bg-[#8CC63F]/10 hover:text-[#8CC63F] border border-white/5 transition-colors text-text-secondary"
                          title="Edit Profile"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id, member.name)}
                          className="p-2 rounded bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/5 transition-colors text-text-secondary"
                          title="Delete Profile"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl animate-scale-in text-left">
            <div className="px-6 py-5 border-b border-white/10 bg-white/[0.01] flex items-center justify-between">
              <h3 className="font-display font-bold text-white text-lg">
                {editingMember ? "Edit Team Member" : "Add Team Member"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-text-secondary hover:text-white transition-colors font-semibold text-xs uppercase"
              >
                Cancel
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary font-mono">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Arun Kumar"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#8CC63F] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary font-mono">Department *</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#8CC63F] transition-colors"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary font-mono">Designation / Role *</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Full Stack Developer"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#8CC63F] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary font-mono">Experience Badge</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="3+ Years"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#8CC63F] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary font-mono">Profile Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                    placeholder="/uploads/file.png"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#8CC63F] transition-colors"
                  />
                  <label className="cursor-pointer shrink-0 inline-flex items-center justify-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 text-xs font-bold text-white transition-colors">
                    {uploading ? (
                      <Loader2 size={14} className="animate-spin text-[#8CC63F]" />
                    ) : (
                      <>
                        <Upload size={14} /> Upload
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
                {profileImage && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={profileImage} alt="Preview" className="h-10 w-10 rounded-full object-cover border border-white/10" />
                    <span className="text-[10px] text-text-secondary font-mono truncate max-w-xs">{profileImage}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary font-mono">LinkedIn URL</label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#8CC63F] transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary font-mono">Skills Tags (Comma Separated)</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="React, NodeJS, AWS, IoT"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#8CC63F] transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary font-mono">Short Expertise Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe key engineering focus areas or accomplishments..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#8CC63F] transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-950/30 border border-red-500/20 text-[11px] text-red-400 rounded-xl flex items-center gap-2">
                  <AlertCircle size={14} /> <span>{error}</span>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-bold text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-[#8CC63F] text-black hover:bg-[#a8eb90] transition-colors font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Check size={14} /> Save Member
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
