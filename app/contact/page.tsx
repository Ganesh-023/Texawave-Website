"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { PageChrome } from "@/components/PageChrome";
import { MapCard } from "@/components/MapCard";

const FIELD_CONFIG = [
  { name: "name", label: "Name", required: true },
  { name: "company", label: "Company", required: false },
  { name: "country", label: "Country", required: false },
  { name: "email", label: "Email", required: true, type: "email" },
  { name: "serviceNeeded", label: "Service Needed", required: false },
  { name: "projectStage", label: "Project Stage", required: false },
  { name: "budgetRange", label: "Budget Range", required: false },
  { name: "timeline", label: "Timeline", required: false },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/submissions/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({});
        // Reset the actual form inputs
        (e.target as HTMLFormElement).reset();
      } else {
        setError(data.error || "Failed to submit. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageChrome>
      <section className="bg-mist py-20">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)] grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-small-text font-bold uppercase tracking-[0.18em] text-signal">
              Contact / Book a call
            </p>
            <h1 className="mt-3 text-hero text-ink">Ready to validate your hardware idea?</h1>
            <p className="mt-6 text-body-large text-graphite">
              Share your project stage, technical needs, and launch goals. Texawave&apos;s
              engineering team will help you identify feasibility, risks, and the best next step.
            </p>
            <div className="mt-8 grid gap-4">
              <p className="flex gap-3 font-semibold text-graphite">
                <Mail className="text-signal" size={22} /> contact@texawave.com
              </p>
              <p className="flex gap-3 font-semibold text-graphite">
                <Phone className="text-signal" size={22} /> +91 8680845604
              </p>
              <p className="flex gap-3 leading-7 text-graphite">
                <MapPin className="mt-1 shrink-0 text-signal" size={22} />
                93/206, Canal Bank Road,
                <br />
                Indira Nagar, Adyar,
                <br />
                Chennai - 600020
              </p>
            </div>
            <div data-reveal>
              <MapCard />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded border border-border-primary bg-bg-card p-6 shadow-premium md:p-8"
          >
            {success && (
              <div className="mb-6 flex items-start gap-3 rounded-lg bg-green-50 border border-green-200 p-4">
                <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-bold text-green-800 text-sm">Request received!</p>
                  <p className="text-green-700 text-sm mt-0.5">
                    Thank you. The Texawave team will review your project details and reach out within 1–2 business days.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 flex items-center gap-3 rounded-lg bg-red-50 border border-red-200 p-4">
                <AlertCircle className="text-red-600 shrink-0" size={18} />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              {FIELD_CONFIG.map(({ name, label, required, type }) => (
                <label key={name} className="grid gap-2 text-body-normal font-bold text-text-primary">
                  {label}
                  {required && <span className="text-red-500 ml-0.5">*</span>}
                  <input
                    className="rounded border border-border-primary bg-bg-secondary px-4 py-3 font-medium text-text-primary outline-none transition focus:border-signal focus:bg-bg-primary text-body-normal"
                    name={name}
                    type={type || "text"}
                    required={required}
                    value={formData[name] || ""}
                    onChange={handleChange}
                  />
                </label>
              ))}
            </div>

            <label className="mt-5 grid gap-2 text-body-normal font-bold text-text-primary">
              Message
              <textarea
                className="min-h-36 rounded border border-border-primary bg-bg-secondary px-4 py-3 font-medium text-text-primary outline-none transition focus:border-signal focus:bg-bg-primary text-body-normal"
                name="message"
                value={formData["message"] || ""}
                onChange={handleChange}
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-premium mt-6 w-full rounded bg-signal px-6 py-4 font-black text-white border border-transparent flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Book Free Feasibility Call"
              )}
            </button>

            <p className="mt-4 text-body-normal leading-6 text-text-secondary">
              Texawave will use your details only to respond to your project inquiry.
            </p>
          </form>
        </div>
      </section>
    </PageChrome>
  );
}