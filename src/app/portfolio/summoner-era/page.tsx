import Link from "next/link";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import {
  owners,
  projectMeta,
  relatedProjects,
  showcaseModules,
} from "./project-data";

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="text-xl font-black tracking-tight text-white">{value}</div>
      <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
        {label}
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
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
        <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,140,58,0.22),transparent_30%),linear-gradient(180deg,#151515_0%,#0a0a0a_70%)] pt-28 md:pt-32">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,transparent_28%,transparent_72%,rgba(255,140,58,0.08)_100%)]" />
          <div
            className="relative mx-auto grid gap-10 px-4 pb-14 sm:px-0 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:pb-18"
            style={{ width: "min(var(--layout-width, 86%), 1280px)" }}
          >
            <div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white/55 transition-colors hover:text-white"
              >
                <span aria-hidden>←</span>
                Back to Portfolio
              </Link>
              <div className="mt-7 text-[11px] font-bold uppercase tracking-[0.34em] text-[#ff8c3a]">
                {projectMeta.eyebrow}
              </div>
              <h1
                className="mt-4 max-w-4xl text-4xl font-black uppercase leading-[0.92] tracking-tight text-white md:text-6xl"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                {projectMeta.title}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
                {projectMeta.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={projectMeta.behanceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full bg-[#ff8c3a] px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#ff9e5d]"
                >
                  View on Behance
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:border-[#ff8c3a]/50 hover:bg-[#ff8c3a]/10"
                >
                  Ask for Similar Work
                </Link>
              </div>

              <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
                <Stat value={projectMeta.publishedAt} label="Published" />
                <Stat value={projectMeta.appreciations} label="Appreciations" />
                <Stat value={projectMeta.views} label="Views" />
                <Stat value={projectMeta.comments} label="Comments" />
              </div>
            </div>

            <aside className="rounded-[28px] border border-white/10 bg-black/35 p-5 backdrop-blur-sm md:p-6">
              <div className="overflow-hidden rounded-[22px] border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={projectMeta.coverImage}
                  alt={projectMeta.title}
                  className="block h-auto w-full"
                />
              </div>

              <div className="mt-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/40">
                  Owners
                </div>
                <div className="mt-4 space-y-4">
                  {owners.map((owner) => (
                    <a
                      key={owner.name}
                      href={owner.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-3 transition-colors hover:border-[#ff8c3a]/35 hover:bg-white/[0.05]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={owner.avatar}
                        alt={owner.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-bold text-white">{owner.name}</div>
                        <div className="text-xs text-white/55">{owner.location}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/40">
                    Tools
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {projectMeta.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-white/72"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/40">
                    Creative Fields
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {projectMeta.fields.map((field) => (
                      <span
                        key={field}
                        className="rounded-full border border-[#ff8c3a]/20 bg-[#ff8c3a]/8 px-3 py-1.5 text-xs font-semibold text-[#ffd4b0]"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-b border-white/8 bg-[#0c0c0c] py-14 md:py-18">
          <div
            className="mx-auto px-4 sm:px-0"
            style={{ width: "min(var(--layout-width, 86%), 1280px)" }}
          >
            <SectionTitle eyebrow="Showcase" title="Project Modules" />
            <div className="grid gap-6">
              {showcaseModules.map((module) => (
                <div
                  key={module.id}
                  className={`overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] ${
                    module.variant === "portrait"
                      ? "mx-auto max-w-[560px]"
                      : module.variant === "strip"
                        ? "max-w-[1100px]"
                        : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={module.src}
                    alt={`${projectMeta.title} module ${module.id}`}
                    className="block h-auto w-full"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/8 bg-[#090909] py-14 md:py-18">
          <div
            className="mx-auto grid gap-10 px-4 sm:px-0 lg:grid-cols-[0.95fr_1.05fr]"
            style={{ width: "min(var(--layout-width, 86%), 1280px)" }}
          >
            <div>
              <SectionTitle eyebrow="Project Info" title="Context" />
              <p className="text-sm leading-7 text-white/68 md:text-base">
                This detail page intentionally mirrors the density and long-scroll
                feel of the Behance showcase so the client can review the full
                presentation in one place, while the actual rendering stays under
                your site codebase instead of depending on Behance markup.
              </p>
              <p className="mt-5 text-sm leading-7 text-white/68 md:text-base">
                The current implementation hotlinks the Behance media modules
                directly to reproduce the showcase fast. That matches the request,
                but it still keeps routing, layout, and future edits fully under
                your Next.js app.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:p-7">
              <div className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/40">
                Tags
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {projectMeta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs font-semibold text-white/72"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 border-t border-white/8 pt-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/40">
                  Copyright
                </div>
                <div className="mt-3 text-lg font-black uppercase tracking-tight text-white">
                  {projectMeta.copyright}
                </div>
                <p className="mt-2 text-sm leading-7 text-white/58">
                  {projectMeta.copyrightNote}
                </p>
              </div>
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
