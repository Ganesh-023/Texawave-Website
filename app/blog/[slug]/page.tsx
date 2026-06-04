import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { PageChrome } from "@/components/PageChrome";
import { blogPosts } from "@/lib/content";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type BlogPostProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return {
    title: post?.title || "Blog",
    description: post?.excerpt || "Texawave hardware product development insights."
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <PageChrome>
      <article className="bg-bg-primary px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="btn-premium inline-flex items-center gap-2 font-bold text-signal">
            <ArrowLeft size={18} /> Back to blog
          </Link>
          <p className="mt-10 text-sm font-black uppercase tracking-[0.16em] text-copper">{post.category}</p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-text-primary md:text-6xl">{post.title}</h1>
          <p className="mt-6 text-lg leading-8 text-text-secondary">{post.excerpt}</p>
          <div className="prose prose-lg mt-10 max-w-none text-text-secondary">
            <p>
              Successful hardware development starts with clear product intent, measurable requirements, and early alignment between design, electronics, sourcing, software, and production. Texawave helps teams identify technical risk before it becomes schedule risk.
            </p>
            <p>
              The strongest programs validate the hardest assumptions first: enclosure fit, PCB architecture, firmware behavior, supplier availability, thermal behavior, assembly method, and test strategy. This reduces avoidable redesign and gives stakeholders a practical view of cost and timeline.
            </p>
            <p>
              For global clients, documentation and communication are as important as technical execution. Clear CAD packages, BOMs, assembly drawings, prototype reports, and decision logs help remote teams move with confidence.
            </p>
          </div>
        </div>
      </article>
    </PageChrome>
  );
}
