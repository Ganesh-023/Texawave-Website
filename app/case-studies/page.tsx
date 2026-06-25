import fs from "fs";
import path from "path";
import { PageChrome } from "@/components/PageChrome";
import { CaseStudiesList } from "@/components/CaseStudiesList";

export const metadata = {
  title: "Case Studies | Texawave",
  description: "Texawave hardware engineering case studies across machine design, SPM manufacturing support, and performance improvement."
};

export default function CaseStudiesPage() {
  // Read case studies server side for fast initial load & SEO
  const dbPath = path.join(process.cwd(), "lib", "case_studies.json");
  let studies = [];
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, "utf-8");
      studies = JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading case studies", err);
  }

  // Filter drafts on server render
  const publishedStudies = studies.filter((s: any) => s.status === "Published");

  return (
    <PageChrome>
      <section className="bg-bg-secondary border-b border-white/5 pt-36 pb-24 relative overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none" />
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)] relative z-10 text-left">
          <p className="text-small-text font-bold uppercase tracking-[0.18em] text-signal font-mono">Case studies</p>
          <h1 className="mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-[1.15] font-display font-black tracking-tight">
            Engineering work shaped around <span className="text-[#8CC63F]">measurable outcomes.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-large text-text-secondary">
            Explore how Texawave delivers high-performance mechanical designs, custom PCBs, embedded systems, and connected IoT cloud platforms.
          </p>
        </div>
      </section>

      <section className="bg-bg-primary py-20 relative">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
          <CaseStudiesList initialStudies={publishedStudies} />
        </div>
      </section>
    </PageChrome>
  );
}
