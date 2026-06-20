import { Mail, MapPin, Phone } from "lucide-react";
import { PageChrome } from "@/components/PageChrome";
import { MapCard } from "@/components/MapCard";

export const metadata = {
  title: "Contact and Book a Call",
  description: "Book a free feasibility call with Texawave for hardware product development, mechanical design, PCB design, procurement, embedded systems, and IoT."
};

const fields = [
  "Name",
  "Company",
  "Country",
  "Email",
  "Service Needed",
  "Project Stage",
  "Budget Range",
  "Timeline"
];

export default function ContactPage() {
  return (
    <PageChrome>
      <section className="bg-mist py-20">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)] grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-small-text font-bold uppercase tracking-[0.18em] text-signal">Contact / Book a call</p>
            <h1 className="mt-3 text-hero text-ink">Ready to validate your hardware idea?</h1>
            <p className="mt-6 text-body-large text-graphite">Share your project stage, technical needs, and launch goals. Texawave&apos;s engineering team will help you identify feasibility, risks, and the best next step.</p>
            <div className="mt-8 grid gap-4">
              <p className="flex gap-3 font-semibold text-graphite"><Mail className="text-signal" size={22} /> contact@texawave.com</p>
              <p className="flex gap-3 font-semibold text-graphite"><Phone className="text-signal" size={22} /> +91 8680845604</p>
              <p className="flex gap-3 leading-7 text-graphite"><MapPin className="mt-1 shrink-0 text-signal" size={22} />
                93/206, Canal Bank Road,<br />
                Indira Nagar, Adyar,
                <br />Chennai - 600020
              </p>
            </div>
            <div data-reveal>
              <MapCard />
            </div>
          </div>
          <form className="rounded border border-border-primary bg-bg-card p-6 shadow-premium md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              {fields.map((field) => (
                <label key={field} className="grid gap-2 text-body-normal font-bold text-text-primary">
                  {field}
                  <input className="rounded border border-border-primary bg-bg-secondary px-4 py-3 font-medium text-text-primary outline-none transition focus:border-signal focus:bg-bg-primary text-body-normal" name={field.toLowerCase().replaceAll(" ", "-")} required={["Name", "Email"].includes(field)} />
                </label>
              ))}
            </div>
            <label className="mt-5 grid gap-2 text-body-normal font-bold text-text-primary">
              Message
              <textarea className="min-h-36 rounded border border-border-primary bg-bg-secondary px-4 py-3 font-medium text-text-primary outline-none transition focus:border-signal focus:bg-bg-primary text-body-normal" name="message" />
            </label>
            <button type="submit" className="btn-premium mt-6 w-full rounded bg-signal px-6 py-4 font-black text-white border border-transparent">
              Book Free Feasibility Call
            </button>
            <p className="mt-4 text-body-normal leading-6 text-text-secondary">Texawave will use your details only to respond to your project inquiry.</p>
          </form>
        </div>
      </section>
    </PageChrome>
  );
}
