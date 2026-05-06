import Link from "next/link";

import SiteHeader from "@/components/site-header";

const serviceLinks = [
  {
    title: "2D Art",
    href: "/services/2d-art",
    body: "Characters, environment painting, UI support assets, and production-ready visual style guides.",
  },
  {
    title: "2D Animation",
    href: "/services/2d-animation",
    body: "Spine, frame-by-frame, and gameplay-friendly motion loops with clear timing and readability.",
  },
  {
    title: "2D VFX",
    href: "/services/2d-vfx",
    body: "Skill impacts, particles, elemental effects, and layered effects packages optimized for real-time use.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#090a10] pt-36 pb-16 text-white md:pt-40">
        <section
          className="mx-auto"
          style={{ width: "min(var(--layout-width, 85%), 1120px)" }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff9f1a]">
            Services
          </p>
          <h1
            className="mt-3 text-4xl font-black uppercase tracking-tight md:text-6xl"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            TD Games capabilities
          </h1>
          <p className="mt-4 max-w-3xl text-white/70">
            We cover the full 2D production chain from art direction to final
            implementation assets. Choose a service to explore details.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {serviceLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/12 bg-white/4 p-5 transition-colors hover:border-[#ff9f1a]/55 hover:bg-white/7"
              >
                <h2
                  className="text-2xl font-black uppercase tracking-tight"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/72">{item.body}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
