import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

import {
  CaseStudyShowcaseWithSettings,
  type SavedShowcaseUiV4,
} from "./case-study-showcase-with-settings";
import type {
  CaseStudyProps,
  HeroTitle,
  HeroTitleColor,
  ProjectTheme,
  RelatedProject,
} from "./case-study-types";
import { hexToRgba } from "./portfolio-color-utils";

function defaultHeroBackground(theme: ProjectTheme) {
  const a = hexToRgba(theme.accent, 0.2);
  const b = hexToRgba(theme.accentSoft, 0.16);
  return `radial-gradient(circle at top left, ${a}, transparent 42%), radial-gradient(circle at top right, ${b}, transparent 42%), linear-gradient(180deg, #0a0d12 0%, #050708 75%)`;
}

function colorClass(color: HeroTitleColor | undefined): string {
  switch (color) {
    case "white":
      return "text-white";
    case "soft":
      return "text-white/72";
    case "muted":
      return "text-white/55";
    case "divider":
      return "text-white/40";
    default:
      return "";
  }
}

function spanStyle(
  color: HeroTitleColor | undefined,
  theme: ProjectTheme,
): CSSProperties | undefined {
  if (color === "accent") return { color: theme.accent };
  if (color === "accentSoft") return { color: theme.accentSoft };
  return undefined;
}

function HeroTitleBlock({
  heroTitle,
  theme,
}: {
  heroTitle: HeroTitle;
  theme: ProjectTheme;
}) {
  return (
    <h1
      className="mt-3 text-[28px] font-black uppercase leading-[0.98] tracking-tight text-white md:text-[40px]"
      style={{ fontFamily: "var(--font-rajdhani)" }}
    >
      <span className="block">
        {heroTitle.primary.map((s, i) => (
          <span
            key={i}
            className={colorClass(s.color)}
            style={spanStyle(s.color, theme)}
          >
            {s.text}
          </span>
        ))}
      </span>
      {heroTitle.subtitle && (
        <span className="mt-1 block text-[0.62em] font-black tracking-[0.06em] md:text-[0.58em]">
          {heroTitle.subtitle.map((s, i) => (
            <span
              key={i}
              className={colorClass(s.color)}
              style={spanStyle(s.color, theme)}
            >
              {s.text}
            </span>
          ))}
        </span>
      )}
    </h1>
  );
}

function FactIcon({
  name,
  accent,
}: {
  name: string;
  accent: string;
}) {
  const common = "h-5 w-5";

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
        style={{ color: accent }}
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
        style={{ color: accent }}
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
      style={{ color: accent }}
      aria-hidden
    >
      <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </svg>
  );
}

function SectionTitle({
  eyebrow,
  title,
  accent,
}: {
  eyebrow: string;
  title: string;
  accent: string;
}) {
  return (
    <div className="mb-8">
      <div
        className="text-[11px] font-bold uppercase tracking-[0.34em]"
        style={{ color: accent }}
      >
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

function RelatedCard({
  project,
  accent,
}: {
  project: RelatedProject;
  accent: string;
}) {
  const className =
    "group overflow-hidden rounded-[24px] border border-white/10 bg-[#131313] transition-colors";
  const hoverStyle: CSSProperties = {
    // Tailwind does not support inline hover colors, so keep the neutral border.
  };
  void hoverStyle;

  const body = (
    <>
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 320px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-5">
        <div
          className="text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{ color: accent }}
        >
          {project.badge}
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
    </>
  );

  if (project.internal) {
    return (
      <Link
        href={project.href}
        className={className}
        aria-label={`Open ${project.title}`}
      >
        {body}
      </Link>
    );
  }

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      {body}
    </a>
  );
}

export default function CaseStudyLayout({
  meta,
  modules,
  related,
  showcaseUiInit = null,
}: CaseStudyProps & { showcaseUiInit?: SavedShowcaseUiV4 | null }) {
  const { theme } = meta;
  const heroBg = theme.heroBackground ?? defaultHeroBackground(theme);
  const showcaseBg = theme.showcaseSectionBg ?? "#08161c";

  const accentRing = hexToRgba(theme.accent, 0.34);
  const accentSoftRing = hexToRgba(theme.accentSoft, 0.24);
  const snapshotBody =
    meta.overview.body.trim() === meta.summary.trim() ? null : meta.overview.body;

  return (
    <>
      <SiteHeader />
      <main className="bg-[#080808] text-white">
        <section
          className="relative overflow-hidden border-b border-white/10"
          style={{ background: heroBg }}
        >
          {/* First screen: min full viewport; hero + overview flow naturally. */}
          <div className="flex min-h-svh flex-col">
            <div className="flex flex-col pt-[96px] md:pt-[104px]">
              <div
                className="relative mx-auto flex flex-col px-4 pb-6 sm:px-0 lg:pb-8"
                style={{ width: "min(var(--layout-width, 88%), 1280px)" }}
              >
                <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
                  <div className="flex min-h-0 flex-col">
                    <Link
                      href="/portfolio"
                      className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white/55 transition-colors hover:text-white"
                    >
                      <span aria-hidden>&larr;</span>
                      Back to Portfolio
                    </Link>

                    <div
                      className="mt-4 text-[11px] font-bold uppercase tracking-[0.34em]"
                      style={{ color: theme.accent }}
                    >
                      {meta.eyebrow}
                    </div>

                    <HeroTitleBlock heroTitle={meta.heroTitle} theme={theme} />

                    <p className="mt-4 max-w-xl text-[13px] leading-6 text-white/70 md:text-sm">
                      {meta.summary}
                    </p>

                    {meta.credits && meta.credits.length > 0 && (
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-white/55">
                        {meta.credits.map((c) => (
                          <span key={c.role}>
                            <span className="text-white/40">{c.role}:</span>{" "}
                            <span
                              className="font-semibold"
                              style={{ color: theme.accentSoft }}
                            >
                              {c.name}
                            </span>
                          </span>
                        ))}
                      </div>
                    )}

                    {meta.madeForLabel && meta.madeForUrl && (
                      <div className="mt-1 text-[12px] text-white/55">
                        Made for:{" "}
                        <a
                          href={meta.madeForUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold underline-offset-2 hover:underline"
                          style={{ color: theme.accent }}
                        >
                          {meta.madeForLabel}
                        </a>
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href={meta.behanceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-90"
                        style={{ backgroundColor: theme.accent }}
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
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10"
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

                    <div className="mt-7 space-y-4">
                      <div className="grid gap-2.5 sm:grid-cols-3">
                        {meta.heroFacts.map((fact) => (
                          <div
                            key={fact.label}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                          >
                            <FactIcon name={fact.icon} accent={theme.accent} />
                            <div className="mt-2 text-base font-black tracking-tight text-white md:text-lg">
                              {fact.value}
                            </div>
                            <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                              {fact.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-4 md:p-5">
                        <div className="flex items-center gap-3">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: theme.accent }}
                          />
                          <div className="text-[11px] font-bold uppercase tracking-[0.34em] text-white/60">
                            Snapshot
                          </div>
                        </div>
                        {snapshotBody && (
                          <p className="mt-3 max-w-xl text-[12.5px] leading-6 text-white/68">
                            {snapshotBody}
                          </p>
                        )}
                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                          {meta.overview.stats.map((s) => (
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

                  <div className="flex min-h-0 flex-col lg:h-full">
                    <div
                      className="relative aspect-video w-full shrink-0 overflow-hidden rounded-[26px] border border-white/10"
                      style={{
                        backgroundColor: "#0a0d12",
                        boxShadow: `0 28px 70px -28px ${accentRing}, 0 32px 85px -32px ${accentSoftRing}`,
                      }}
                    >
                      <Image
                        src={meta.coverImage}
                        alt={meta.title}
                        fill
                        priority
                        sizes="(max-width: 1280px) 55vw, 640px"
                        className="object-cover"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/5 to-black/40"
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/10"
                        aria-hidden
                      />
                    </div>

                    <div className="mt-4 grid gap-4 rounded-[24px] border border-white/10 bg-white/[0.025] p-5 md:grid-cols-3">
                      <div className="flex h-full flex-col">
                        <div className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/40">
                          Deliverables
                        </div>
                        <ul className="mt-3 flex flex-1 flex-col justify-around gap-2 text-[12.5px] leading-snug text-white/75">
                          {meta.deliverables.map((line) => (
                            <li key={line} className="flex gap-2">
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mt-0.5 h-4 w-4 shrink-0"
                                style={{ stroke: theme.accent }}
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

                      <div className="flex h-full flex-col">
                        <div className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/40">
                          Tools
                        </div>
                        <div className="mt-3 flex flex-1 flex-wrap content-start gap-2">
                          {meta.tools.map((tool) => (
                            <span
                              key={tool}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white/80"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex h-full flex-col">
                        <div className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/40">
                          Creative Fields
                        </div>
                        <div className="mt-3 flex flex-1 flex-wrap content-start gap-2">
                          {meta.fields.map((field) => (
                            <span
                              key={field}
                              className="rounded-md px-3 py-1.5 text-[11px] font-medium transition-all duration-200 hover:scale-105"
                              style={{
                                background: `linear-gradient(135deg, ${theme.accent}20 0%, ${theme.accent}10 100%)`,
                                border: `1px solid ${theme.accent}50`,
                                color: `${theme.accentSoft}ff`,
                                boxShadow: `0 2px 8px ${theme.accent}15`,
                              }}
                            >
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-b border-white/8 py-14 md:py-18"
          style={{ backgroundColor: showcaseBg }}
        >
          <div
            className="mx-auto px-4 sm:px-0"
            style={{ width: "min(var(--layout-width, 86%), 1280px)" }}
          >
            <SectionTitle
              eyebrow="Showcase"
              title="Project Modules"
              accent={theme.accent}
            />
            <CaseStudyShowcaseWithSettings
              modules={modules}
              title={meta.title}
              theme={theme}
              showcaseUiInit={showcaseUiInit}
            />
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-[linear-gradient(180deg,#101010_0%,#070707_100%)] py-14 md:py-18">
            <div
              className="mx-auto px-4 sm:px-0"
              style={{ width: "min(var(--layout-width, 86%), 1280px)" }}
            >
              <SectionTitle
                eyebrow="More Projects"
                title="Related Work"
                accent={theme.accent}
              />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {related.map((project) => (
                  <RelatedCard
                    key={project.id}
                    project={project}
                    accent={theme.accent}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <SiteFooter />
      </main>
    </>
  );
}
