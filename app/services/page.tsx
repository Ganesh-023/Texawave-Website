import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageChrome } from "@/components/PageChrome";
import { services } from "@/lib/content";

export const metadata = {
  title: "Services",
  description:
    "Texawave provides mechanical design services, PCB design and prototyping, embedded systems development, component sourcing services, and IoT product development."
};

export default function ServicesPage() {
  return (
    <PageChrome>
      <section className="bg-bg-secondary border-b border-border-primary px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">Services</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black text-text-primary md:text-7xl">End-to-end engineering for market-ready hardware products.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">
            Texawave helps global clients connect mechanical engineering, electrical systems, sourcing, software, IoT, prototyping, and production support into one practical product development path.
          </p>
        </div>
      </section>
      <section className="bg-bg-primary px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link data-reveal href={`/${service.slug}`} key={service.slug} className="service-card-premium group rounded-2xl border border-border-primary bg-bg-secondary p-7 transition duration-300">
                <Icon className="text-signal" size={32} />
                <h2 className="mt-5 text-2xl font-black text-text-primary">{service.title}</h2>
                <p className="mt-3 leading-8 text-text-secondary">{service.short}</p>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {service.deliverables.map((item) => (
                    <span key={item} className="flex gap-2 text-sm font-semibold text-text-secondary">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-signal" size={16} />
                      {item}
                    </span>
                  ))}
                </div>
                <span className="mt-7 inline-flex items-center gap-2 font-bold text-signal">
                  Explore service <ArrowRight size={18} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </PageChrome>
  );
}
