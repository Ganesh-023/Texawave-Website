import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageChrome } from "@/components/PageChrome";
import { caseStudies } from "@/lib/content";

export const metadata = {
  title: "Case Studies",
  description: "Texawave hardware engineering case studies across machine design, SPM manufacturing support, and performance improvement."
};

export default function CaseStudiesPage() {
  return (
    <PageChrome>
      <section className="bg-mist py-20">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
          <p className="text-small-text font-bold uppercase tracking-[0.18em] text-signal">Case studies</p>
          <h1 className="mt-3 max-w-4xl text-hero text-ink">Engineering work shaped around measurable product outcomes.</h1>
        </div>
      </section>
      <section className="bg-bg-primary py-16">
        <div className="mx-auto w-full max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
          <div className="grid gap-6 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <article data-reveal key={study.title} className="service-card-premium rounded-2xl border border-line bg-mist p-7 transition duration-300">
                <h2 className="text-card text-ink">{study.title}</h2>
                <p className="mt-5 text-small-text font-black uppercase tracking-[0.16em] text-signal">Problem</p>
                <p className="mt-2 text-body-normal text-graphite">{study.problem}</p>
                <p className="mt-5 text-small-text font-black uppercase tracking-[0.16em] text-signal">Solution</p>
                <p className="mt-2 text-body-normal text-graphite">{study.solution}</p>
                <p className="mt-5 text-small-text font-black uppercase tracking-[0.16em] text-signal">Deliverables</p>
                <p className="mt-2 text-body-normal text-graphite">{study.deliverables}</p>
                <p className="mt-5 text-small-text font-black uppercase tracking-[0.16em] text-signal">Result</p>
                <p className="mt-2 text-body-normal text-graphite">{study.result}</p>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/contact" className="cta-magnetic inline-flex items-center gap-2 rounded bg-signal px-6 py-4 font-bold text-white border border-transparent">
              Start a similar project <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PageChrome>
  );
}
