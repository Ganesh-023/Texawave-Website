import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { PageChrome } from "@/components/PageChrome";
import { CaseStudyDetailClient } from "@/components/CaseStudyDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dbPath = path.join(process.cwd(), "lib", "case_studies.json");
  if (!fs.existsSync(dbPath)) return { title: "Case Study" };

  const studies = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const study = studies.find((s: any) => s.slug === slug || s.id === slug);

  if (!study) return { title: "Case Study | Texawave" };

  return {
    title: `${study.title} | Texawave Case Study`,
    description: study.problemStatement || study.solution
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const dbPath = path.join(process.cwd(), "lib", "case_studies.json");

  if (!fs.existsSync(dbPath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(dbPath, "utf-8");
  const studies = JSON.parse(fileContent);
  const index = studies.findIndex((s: any) => s.slug === slug || s.id === slug);

  if (index === -1) {
    notFound();
  }

  const study = studies[index];

  // Prevent draft studies from loading publicly
  if (study.status !== "Published") {
    notFound();
  }

  // Increment view count server-side
  study.views = (study.views || 0) + 1;
  fs.writeFileSync(dbPath, JSON.stringify(studies, null, 2), "utf-8");

  // Get related studies (sharing category or just other published ones)
  let related = studies.filter(
    (s: any) => s.category === study.category && s.id !== study.id && s.status === "Published"
  );
  if (related.length === 0) {
    related = studies.filter((s: any) => s.id !== study.id && s.status === "Published");
  }

  return (
    <PageChrome>
      <CaseStudyDetailClient study={study} relatedStudies={related} />
    </PageChrome>
  );
}
