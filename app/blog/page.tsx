import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageChrome } from "@/components/PageChrome";
import { blogPosts } from "@/lib/content";

export const metadata = {
  title: "Blog",
  description: "Texawave insights on hardware product development, mechanical design, PCB design, embedded systems, sourcing, and IoT software."
};

export default function BlogPage() {
  return (
    <PageChrome>
      <section className="bg-bg-secondary border-b border-border-primary px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">Blog</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black text-text-primary md:text-7xl">Engineering insights for faster, cleaner product development.</h1>
        </div>
      </section>
      <section className="bg-bg-primary px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {blogPosts.map((post) => (
              <Link data-reveal key={post.slug} href={`/blog/${post.slug}`} className="service-card-premium rounded-2xl border border-border-primary bg-bg-secondary p-7 transition duration-300">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-copper">{post.category}</p>
              <h2 className="mt-4 text-2xl font-black leading-8 text-text-primary">{post.title}</h2>
              <p className="mt-4 leading-8 text-text-secondary">{post.excerpt}</p>
              <span className="mt-7 inline-flex items-center gap-2 font-bold text-signal">
                Read article <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PageChrome>
  );
}
