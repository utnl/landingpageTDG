import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import type {
  CaseStudyProps,
  HeroTitle,
  HeroTitleColor,
  ProjectTheme,
  RelatedProject,
  ShowcaseModule,
  WorkflowStep,
} from "./case-study-types";

const TOOL_LOGOS: Record<string, string> = {
  "Spine 2D": "/images/spinelogo.jpg",
  "After Effects": "/images/after-effects-cc-logo-png-transparent.png",
  Photoshop: "/images/photoshop-logo.png",
  "Premiere Pro": "/images/premiere-pro-logo.png",
};

function toolAbbrev(tool: string): string {
  const words = tool.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return words
      .map((w) => w[0] ?? "")
      .join("")
      .slice(0, 4)
      .toUpperCase();
  }
  return tool.slice(0, 2).toUpperCase();
}

function hexToRgba(hex: string, alpha: number) {
  const v = hex.replace("#", "");
  const full =
    v.length === 3
      ? v
          .split("")
          .map((c) => c + c)
          .join("")
      : v;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function defaultHeroBackground(theme: ProjectTheme) {
  const a = hexToRgba(theme.accent, 0.2);
  const b = hexToRgba(theme.accentSoft, 0.16);
  return `radial-gradient(circle at top left, ${a}, transparent 42%), radial-gradient(circle at top right, ${b}, transparent 42%), linear-gradient(180deg, #0a0d12 0%, #050708 75%)`;
}

function FactIcon({
  name,
  color,
}: {
  name: string;
  color: string;
}) {
  const common = "h-5 w-5";
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor" as const,
    strokeWidth: 1.8 as const,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: common,
    style: { color } as CSSProperties,
    "aria-hidden": true,
  } as const;
  if (name === "calendar") {
    return (
      <svg {...props}>
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
        <path d="M8 3v4M16 3v4M3.5 10h17" />
      </svg>
    );
  }
  if (name === "users") {
    return (
      <svg {...props}>
        <circle cx="9" cy="8.5" r="3.5" />
        <path d="M2.8 19.5c.7-3.4 3.3-5.5 6.2-5.5s5.5 2.1 6.2 5.5" />
        <path d="M16.5 11.5a3 3 0 1 0 0-6" />
        <path d="M17.5 19.5c-.2-2-1-3.7-2.4-5" />
      </svg>
    );
  }
  // default = cube/pipeline
  return (
    <svg {...props}>
      <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </svg>
  );
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

function PanelWorkflow({
  workflow,
  theme,
}: {
  workflow: readonly WorkflowStep[];
  theme: ProjectTheme;
}) {
  const lineGradient = `linear-gradient(to right, ${hexToRgba(theme.accent, 0.55)}, ${hexToRgba(theme.accentSoft, 0.35)}, rgba(255,255,255,0.08))`;
  return (
    <div className="mt-4 flex flex-col rounded-2xl border border-white/10 bg-white/2 p-5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/40">
          Workflow
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">
          {workflow.length} stages
        </div>
      </div>

      <div className="relative mt-5">
        <div
          className="pointer-events-none absolute left-[12%] right-[12%] top-[20px] h-px"
          style={{ background: lineGradient }}
          aria-hidden
        />
        <div
          className="relative grid gap-1"
          style={{ gridTemplateColumns: `repeat(${workflow.length}, minmax(0, 1fr))` }}
        >
          {workflow.map((s, i) => (
            <div key={s.n} className="flex flex-col items-center text-center">
              <div
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#0a0d12] text-[12px] font-black shadow-[0_0_0_3px_rgba(10,13,18,1)]"
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: hexToRgba(theme.accent, 0.55),
                  color: theme.accent,
                }}
              >
                {s.n}
                {i < workflow.length - 1 && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute right-[-10px] top-1/2 h-3 w-3 -translate-y-1/2"
                    style={{ color: hexToRgba(theme.accent, 0.7) }}
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
    // hover border tint is handled inline via class? keep simple — Tailwind doesn't support inline hover.
    // We use a CSS variable trick via group + arbitrary value would be complex; rely on neutral white border.
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

function ShowcaseSectionLabel({
  label,
  theme,
}: {
  label: string;
  theme: ProjectTheme;
}) {
  const bg = theme.sectionLabelBg ?? "#0a1418";
  return (
    <div
      className="flex items-center justify-center px-6 py-8 md:py-12"
      style={{ backgroundColor: bg }}
    >
      <div className="flex items-center gap-4">
        <span
          className="h-px w-12 shrink-0"
          style={{ backgroundColor: hexToRgba(theme.accent, 0.33) }}
          aria-hidden
        />
        <h3
          className="text-2xl font-black uppercase tracking-[0.16em] md:text-3xl"
          style={{ color: theme.accent, fontFamily: "var(--font-rajdhani)" }}
        >
          {label}
        </h3>
        <span
          className="h-px w-12 shrink-0"
          style={{ backgroundColor: hexToRgba(theme.accent, 0.33) }}
          aria-hidden
        />
      </div>
    </div>
  );
}

function ShowcaseRenderer({
  modules,
  title,
  theme,
}: {
  modules: readonly ShowcaseModule[];
  title: string;
  theme: ProjectTheme;
}) {
  const panelBg = theme.showcasePanelBg ?? "#0b1d24";
  const labelBg = theme.sectionLabelBg ?? "#0a1418";
  return (
    <div
      className="overflow-hidden rounded-[28px]"
      style={{ backgroundColor: panelBg }}
    >
      {modules.map((module) => {
        const altBase = `${title} module ${module.id}`;

        if (module.variant === "sectionLabel") {
          return (
            <ShowcaseSectionLabel
              key={module.id}
              label={module.label}
              theme={theme}
            />
          );
        }

        if (module.variant === "video") {
          const aspect = module.aspect ?? 16 / 9;
          return (
            <div
              key={module.id}
              className="flex justify-center px-4 py-6 md:py-10"
              style={{ backgroundColor: labelBg }}
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black"
                style={{ aspectRatio: `${aspect}` }}
              >
                <iframe
                  src={module.src}
                  title={`${title} video reel`}
                  loading="lazy"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          );
        }

        if (module.variant === "vimeo") {
          const aspect = module.aspectRatio ?? 16 / 9;
          return (
            <div key={module.id} className="bg-black">
              <div
                className="relative mx-auto w-full max-w-[1600px]"
                style={{ aspectRatio: `${aspect}` }}
              >
                <iframe
                  src={module.embedSrc}
                  title={`${title} video — ${module.id}`}
                  loading="lazy"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          );
        }

        if (module.variant === "videoEmbed") {
          return (
            <div
              key={module.id}
              className="flex justify-center px-4 py-6 md:py-10"
              style={{ backgroundColor: labelBg }}
            >
              <div
                className="relative w-full max-w-[420px] overflow-hidden rounded-2xl border border-white/10 bg-black"
                style={{ aspectRatio: `${module.aspect}` }}
              >
                <iframe
                  src={module.src}
                  title={`${title} portrait reel`}
                  loading="lazy"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          );
        }

        if (module.variant === "duo") {
          return (
            <div
              key={module.id}
              className="grid grid-cols-1 gap-2 md:grid-cols-2"
              style={{ backgroundColor: panelBg }}
            >
              {module.srcs.map((src, idx) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={`${module.id}-${idx}`}
                  src={src}
                  alt={altBase}
                  className="block h-auto w-full"
                  loading="lazy"
                />
              ))}
            </div>
          );
        }

        if (module.variant === "trio") {
          return (
            <div
              key={module.id}
              className="grid grid-cols-1 px-3 py-6 sm:grid-cols-3 sm:px-4 md:py-10"
              style={{ backgroundColor: panelBg }}
            >
              {module.srcs.map((src, idx) => (
                <div
                  key={`${module.id}-${idx}`}
                  className="flex justify-center px-2 py-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${altBase} ${idx + 1}`}
                    className="block h-auto max-h-[560px] w-full max-w-[420px] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          );
        }

        if (module.variant === "square") {
          const maxW = module.maxWidth ?? 680;
          return (
            <div
              key={module.id}
              className="flex justify-center px-4 py-3"
              style={{ backgroundColor: labelBg }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={module.src}
                alt={altBase}
                className="block h-auto w-full rounded-lg"
                style={{ maxWidth: `${maxW}px` }}
                loading="lazy"
              />
            </div>
          );
        }

        if (module.variant === "portrait") {
          const maxW = module.maxWidth ?? 420;
          return (
            <div
              key={module.id}
              className="flex justify-center px-4 py-6 md:py-10"
              style={{ backgroundColor: panelBg }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={module.src}
                alt={altBase}
                className="block h-auto w-full"
                style={{ maxWidth: `${maxW}px` }}
                loading="lazy"
              />
            </div>
          );
        }

        if (module.variant === "closing") {
          const isLarge = (module.size ?? "lg") === "lg";
          const color =
            module.color ?? (isLarge ? theme.accent : "rgba(255,255,255,0.55)");
          return (
            <div
              key={module.id}
              className={`flex items-center justify-center px-6 ${isLarge ? "py-16 md:py-24" : "py-14 md:py-20"}`}
              style={{ backgroundColor: "#000" }}
            >
              {isLarge ? (
                <h3
                  className="text-center text-3xl font-black uppercase tracking-[0.08em] md:text-5xl"
                  style={{ color, fontFamily: "var(--font-rajdhani)" }}
                >
                  {module.text}
                </h3>
              ) : (
                <p
                  className="text-center text-[22px] font-bold md:text-[25px]"
                  style={{ color }}
                >
                  {module.text}
                </p>
              )}
            </div>
          );
        }

        if (module.variant === "info") {
          return (
            <div
              key={module.id}
              className="flex items-center justify-center bg-black px-6 py-10 md:py-12"
            >
              <div className="text-center">
                <a
                  href={module.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] underline underline-offset-4 transition-opacity hover:opacity-80 md:text-base"
                  style={{ color: theme.accent }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                    className="h-4 w-4"
                  >
                    <path d="M3.6 3.2c-.3.3-.5.7-.5 1.2v15.2c0 .5.2.9.5 1.2L12 12 3.6 3.2Zm10.4 7.4 2.6 1.5L19 14.4 13.7 9 14 10.6Zm-1.7 1-8.3 8.3c.3 0 .7-.1 1-.3l9.4-5.4-2.1-2.6Zm9.1-2.7L18 10.1l-2.5 1.4 2.5 1.4 3.5 2.1c.6-.3 1-.9 1-1.7v-2.3c0-.8-.4-1.4-1.1-1.7ZM4.6 3.1l8.3 8.3 2.1-2.1L5.6 3.4c-.3-.2-.7-.3-1-.3Z" />
                  </svg>
                  {module.linkLabel}
                </a>
                <p className="mt-3 text-[13px] italic leading-6 text-white/55 md:text-sm">
                  Role in project:{" "}
                  <span className="font-semibold not-italic text-white/80">
                    {module.role}
                  </span>
                  <br />
                  {module.note}
                </p>
              </div>
            </div>
          );
        }

        // banner | full | fullGif → full-width image
        return (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={module.id}
            src={module.src}
            alt={altBase}
            className="block h-auto w-full"
            loading="lazy"
          />
        );
      })}
    </div>
  );
}

export default function CaseStudyLayout({
  meta,
  modules,
  related,
}: CaseStudyProps) {
  const { theme, workflow } = meta;
  const heroBg = theme.heroBackground ?? defaultHeroBackground(theme);
  const showcaseBg = theme.showcaseSectionBg ?? "#08161c";

  const accentRing = hexToRgba(theme.accent, 0.34);
  const accentSoftRing = hexToRgba(theme.accentSoft, 0.24);
  const accentChipBg = hexToRgba(theme.accent, 0.1);
  const accentChipBorder = hexToRgba(theme.accent, 0.25);

  return (
    <>
      <SiteHeader />
      <main className="bg-[#080808] text-white">
        <section
          className="relative overflow-hidden border-b border-white/10"
          style={{ background: heroBg }}
        >
          {/* First screen: min full viewport; hero + overview flow naturally (no flex-grow on hero grid — that was pushing overview below the fold) */}
          <div className="flex min-h-svh flex-col">
            <div className="flex flex-col pt-[96px] md:pt-[104px]">
              <div
                className="relative mx-auto flex flex-col px-4 pb-6 sm:px-0 lg:pb-8"
                style={{ width: "min(var(--layout-width, 88%), 1280px)" }}
              >
                <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
                  {/* LEFT COLUMN */}
                  <div className="flex min-h-0 flex-col">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white/55 transition-colors hover:text-white"
              >
                <span aria-hidden>←</span>
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

              <div className="mt-6 grid grid-cols-3 gap-2.5">
                {meta.heroFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-xl border border-white/10 bg-white/3 px-3 py-2.5"
                  >
                    <FactIcon name={fact.icon} color={theme.accent} />
                    <div className="mt-2 text-base font-black tracking-tight text-white md:text-lg">
                      {fact.value}
                    </div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                      {fact.label}
                    </div>
                  </div>
                ))}
              </div>

              <PanelWorkflow workflow={workflow} theme={theme} />
            </div>

                  {/* RIGHT COLUMN: stretch with left on lg so metadata card can flex-1 and fill vertical gap */}
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

                    <div className="mt-4 flex min-h-0 flex-col rounded-2xl border border-white/10 bg-white/2 p-5 lg:flex-1">
                      <div className="grid min-h-0 grid-cols-1 gap-6 md:h-full md:grid-cols-3 md:items-stretch md:gap-4">
                        <div className="flex min-h-0 flex-col md:h-full">
                          <div className="shrink-0 text-[11px] font-bold uppercase tracking-[0.26em] text-white/40">
                            Deliverables
                          </div>
                          <ul className="mt-3 flex min-h-0 flex-col gap-2 text-[12.5px] leading-snug text-white/75 md:flex-1 md:justify-evenly md:gap-3">
                          {meta.deliverables.map((line) => (
                            <li key={line} className="flex gap-2">
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={theme.accent}
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

                        <div className="flex min-h-0 flex-col md:h-full">
                          <div className="shrink-0 text-[11px] font-bold uppercase tracking-[0.26em] text-white/40">
                            Tools
                          </div>
                          <ul className="mt-3 flex min-h-0 flex-col gap-2 text-[12.5px] text-white/80 md:flex-1 md:justify-evenly md:gap-3">
                          {meta.tools.map((tool, toolIdx) => {
                            const logo = TOOL_LOGOS[tool];
                            return (
                              <li
                                key={`${tool}-${toolIdx}`}
                                className="flex items-center gap-2"
                              >
                                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white/8">
                                  {logo ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                      src={logo}
                                      alt=""
                                      className="h-full w-full object-contain"
                                      loading="lazy"
                                      aria-hidden
                                    />
                                  ) : (
                                    <span className="text-[10px] font-black uppercase text-white/80">
                                      {toolAbbrev(tool)}
                                    </span>
                                  )}
                                </span>
                                {tool}
                              </li>
                            );
                          })}
                        </ul>
                        </div>

                        <div className="flex min-h-0 flex-col md:h-full">
                          <div className="shrink-0 text-[11px] font-bold uppercase tracking-[0.26em] text-white/40">
                            Creative Fields
                          </div>
                          <div className="mt-3 flex min-h-0 flex-wrap gap-2.5 md:flex-1 md:content-evenly md:gap-x-2.5 md:gap-y-3">
                          {meta.fields.map((field) => (
                            <span
                              key={field}
                              className="h-fit rounded-full border px-3 py-1.5 text-[11px] font-semibold"
                              style={{
                                borderColor: accentChipBorder,
                                backgroundColor: accentChipBg,
                                color: theme.accent,
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

                {/* Project overview: same intro screen as hero (not pushed below a forced full-viewport hero) */}
                <div className="mt-8 border-t border-white/10 pt-6 md:mt-10 md:pt-8 lg:pb-2">
                  <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
                    <div>
                      <div
                        className="text-[11px] font-bold uppercase tracking-[0.34em]"
                        style={{ color: theme.accent }}
                      >
                        Project Overview
                      </div>
                      <p className="mt-2.5 max-w-xl text-[13px] leading-6 text-white/72 md:text-sm">
                        {meta.overview.body}
                      </p>
                    </div>
                    <div
                      className="grid gap-3"
                      style={{
                        gridTemplateColumns: `repeat(${meta.overview.stats.length}, minmax(0, 1fr))`,
                      }}
                    >
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
            </div>
          </div>
        </section>

        {/* SHOWCASE */}
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
            <ShowcaseRenderer
              modules={modules}
              title={meta.title}
              theme={theme}
            />
          </div>
        </section>

        {/* RELATED */}
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
