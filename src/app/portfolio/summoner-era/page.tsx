import Link from "next/link";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { projectMeta, relatedProjects, showcaseModules } from "./project-data";

function FactIcon({ name }: { name: string }) {
  const common = "h-5 w-5 text-[#ff8c3a]";
  if (name === "calendar") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={common}
        aria-hidden
      >
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
        <path d="M8 3v4M16 3v4M3.5 10h17" />
      </svg>
    );
  }
  if (name === "users") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={common}
        aria-hidden
      >
        <circle cx="9" cy="8.5" r="3.5" />
        <path d="M2.8 19.5c.7-3.4 3.3-5.5 6.2-5.5s5.5 2.1 6.2 5.5" />
        <path d="M16.5 11.5a3 3 0 1 0 0-6" />
        <path d="M17.5 19.5c-.2-2-1-3.7-2.4-5" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={common}
      aria-hidden
    >
      <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </svg>
  );
}

function HeroTitle() {
  return (
    <h1
      className="mt-3 text-[32px] font-black uppercase leading-[0.95] tracking-tight text-white md:text-[44px]"
      style={{ fontFamily: "var(--font-rajdhani)" }}
    >
      {projectMeta.titleLines.map((line, i) => (
        <span key={i} className="block">
          {line.map((part, j) => {
            const color =
              "color" in part && part.color === "light"
                ? "text-[#ffb547]"
                : "color" in part && part.color === "dark"
                  ? "text-[#9b6bff]"
                  : "";
            return (
              <span key={j} className={color}>
                {part.text}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

const TOOL_LOGOS: Record<string, string> = {
  "Spine 2D": "/images/maxresdefault.jpg",
  "After Effects": "/images/after-effects-cc-logo-png-transparent.png",
};

function PanelWorkflow() {
  const steps = [
    { n: "01", t: "Concept & Style", sub: "Moodboard · refs" },
    { n: "02", t: "Rig & Animate", sub: "Spine 2D" },
    { n: "03", t: "VFX Layer", sub: "After Effects" },
    { n: "04", t: "Polish & Deliver", sub: "QA · handoff" },
  ];
  return (
    <div className="mt-4 flex h-full flex-col rounded-2xl border border-white/10 bg-white/2 p-5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/40">
          Workflow
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">
          4 stages
        </div>
      </div>

      <div className="relative mt-5 flex-1">
        <div className="pointer-events-none absolute left-[12%] right-[12%] top-[20px] h-px bg-linear-to-r from-[#ff8c3a]/55 via-[#ff8c3a]/25 to-white/10" />
        <div className="relative grid grid-cols-4 gap-1">
          {steps.map((s, i) => (
            <div key={s.n} className="flex flex-col items-center text-center">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#ff8c3a]/55 bg-[#141414] text-[12px] font-black text-[#ff8c3a] shadow-[0_0_0_3px_rgba(20,20,20,1)]">
                {s.n}
                {i < steps.length - 1 && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute right-[-10px] top-1/2 h-3 w-3 -translate-y-1/2 text-[#ff8c3a]/70"
                    aria-hidden
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                )}
              </div>
              <div className="mt-2.5 text-[11.5px] font-semibold leading-tight text-white/85">
                {s.t}
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <div className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#ff8c3a]">
        {eyebrow}
      </div>
      <h2
        className="mt-3 text-2xl font-black uppercase tracking-tight text-white md:text-3xl"
        style={{ fontFamily: "var(--font-rajdhani)" }}
      >
        {title}
      </h2>
    </div>
  );
}

export default function SummonerEraDetailPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#080808] text-white">
        <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,140,58,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(155,107,255,0.16),transparent_38%),linear-gradient(180deg,#141414_0%,#0a0a0a_75%)] pt-20 md:pt-24">
          <div
            className="relative mx-auto grid gap-8 px-4 pb-6 sm:px-0 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:pb-8"
            style={{ width: "min(var(--layout-width, 88%), 1280px)" }}
          >
            <div className="flex flex-col">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white/55 transition-colors hover:text-white"
              >
                <span aria-hidden>←</span>
                Back to Portfolio
              </Link>
              <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.34em] text-[#ff8c3a]">
                {projectMeta.eyebrow}
              </div>

              <HeroTitle />

              <p className="mt-4 max-w-xl text-[13px] leading-6 text-white/70 md:text-sm">
                {projectMeta.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={projectMeta.behanceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ff8c3a] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#ff9e5d]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden
                  >
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View Project on Behance
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:border-[#ff8c3a]/50 hover:bg-[#ff8c3a]/10"
                >
                  Ask for Similar Work
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden
                  >
                    <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
                  </svg>
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2.5">
                {projectMeta.heroFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-xl border border-white/10 bg-white/3 px-3 py-2.5"
                  >
                    <FactIcon name={fact.icon} />
                    <div className="mt-2 text-base font-black tracking-tight text-white md:text-lg">
                      {fact.value}
                    </div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                      {fact.label}
                    </div>
                  </div>
                ))}
              </div>

              <PanelWorkflow />
            </div>

            <div>
              <div className="overflow-hidden rounded-[26px] border border-white/10 bg-black/40 shadow-[0_30px_80px_-30px_rgba(255,140,58,0.35)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={projectMeta.coverImage}
                  alt={projectMeta.title}
                  className="block h-auto w-full"
                />
              </div>

              <div className="mt-4 grid gap-4 rounded-2xl border border-white/10 bg-white/2 p-4 md:grid-cols-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/40">
                    Deliverables
                  </div>
                  <ul className="mt-2.5 space-y-1.5 text-[12.5px] leading-snug text-white/75">
                    {projectMeta.deliverables.map((line) => (
                      <li key={line} className="flex gap-2">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ff8c3a"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mt-0.5 h-4 w-4 shrink-0"
                          aria-hidden
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="m8.5 12.5 2.5 2.5 4.5-5" />
                        </svg>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/40">
                    Tools
                  </div>
                  <ul className="mt-2.5 space-y-1.5 text-[12.5px] text-white/80">
                    {projectMeta.tools.map((tool) => {
                      const logo = TOOL_LOGOS[tool];
                      return (
                        <li key={tool} className="flex items-center gap-2">
                          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white/8">
                            {logo ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={logo}
                                alt={tool}
                                className="h-full w-full object-contain"
                                loading="lazy"
                              />
                            ) : (
                              <span className="text-[10px] font-black uppercase text-white/80">
                                {tool.slice(0, 2)}
                              </span>
                            )}
                          </span>
                          {tool}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/40">
                    Creative Fields
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {projectMeta.fields.map((field) => (
                      <span
                        key={field}
                        className="rounded-full border border-[#ff8c3a]/25 bg-[#ff8c3a]/10 px-3 py-1.5 text-[11px] font-semibold text-[#ffd4b0]"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative mx-auto px-4 pb-8 sm:px-0 lg:pb-10"
            style={{ width: "min(var(--layout-width, 88%), 1280px)" }}
          >
            <div className="border-t border-white/10 pt-5 md:pt-6">
              <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#ff8c3a]">
                    Project Overview
                  </div>
                  <p className="mt-2.5 max-w-xl text-[13px] leading-6 text-white/72 md:text-sm">
                    {projectMeta.overview.body}
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {projectMeta.overview.stats.map((s) => (
                    <div key={s.label}>
                      <div
                        className="text-2xl font-black tracking-tight text-white md:text-3xl"
                        style={{ fontFamily: "var(--font-rajdhani)" }}
                      >
                        {s.value}
                      </div>
                      <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/8 bg-[#191919] py-14 md:py-18">
          <div
            className="mx-auto px-4 sm:px-0"
            style={{ width: "min(var(--layout-width, 86%), 1280px)" }}
          >
            <SectionTitle eyebrow="Showcase" title="Project Modules" />
            <div className="overflow-hidden rounded-[28px] bg-[#191919]">
              {showcaseModules.map((module) =>
                module.variant === "portrait" ? (
                  <div
                    key={module.id}
                    className="flex justify-center bg-[#222221] px-4 py-6 md:py-10"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={module.src}
                      alt={`${projectMeta.title} module ${module.id}`}
                      className="block h-auto w-full max-w-[420px]"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={module.id}
                    src={module.src}
                    alt={`${projectMeta.title} module ${module.id}`}
                    className="block h-auto w-full"
                    loading="lazy"
                  />
                ),
              )}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,#101010_0%,#070707_100%)] py-14 md:py-18">
          <div
            className="mx-auto px-4 sm:px-0"
            style={{ width: "min(var(--layout-width, 86%), 1280px)" }}
          >
            <SectionTitle eyebrow="More Projects" title="Related Work" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {relatedProjects.map((project) => (
                <a
                  key={project.id}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-[24px] border border-white/10 bg-[#131313] transition-colors hover:border-[#ff8c3a]/40"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-52 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#ff8c3a]">
                      Behance Project
                    </div>
                    <h3
                      className="mt-3 text-lg font-black uppercase leading-tight tracking-tight text-white"
                      style={{ fontFamily: "var(--font-rajdhani)" }}
                    >
                      {project.title}
                    </h3>
                    <div className="mt-4 flex gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                      <span>{project.appreciations} Appreciate</span>
                      <span>{project.views} Views</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
