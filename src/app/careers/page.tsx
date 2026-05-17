import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Changa_One, Nunito_Sans } from "next/font/google";

import { AccentHighlight } from "@/components/accent-highlight";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const changaOne = Changa_One({ weight: "400", subsets: ["latin"] });
const nunitoSans = Nunito_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Careers — TD Games",
  description:
    "[Draft] Join TD Games — 2D art, animation & VFX. Mock openings.",
};

const MOCK_ROLES = [
  {
    id: "mock-senior-2d",
    title: "Senior 2D Artist (mock)",
    location: "Ho Chi Minh City / Hybrid",
    type: "Full-time",
    blurb:
      "Placeholder: stylized characters & environments, game-ready exports, ít nhất X năm kinh nghiệm — thay bằng JD thật.",
  },
  {
    id: "mock-spine",
    title: "2D Animator — Spine (mock)",
    location: "Remote-friendly (GMT+7 overlap)",
    type: "Full-time",
    blurb:
      "Placeholder: rigs, skinning, gameplay loops; portfolio link required — chỉnh benefits và level sau.",
  },
  {
    id: "mock-vfx",
    title: "2D VFX Artist (mock)",
    location: "Ho Chi Minh City",
    type: "Full-time",
    blurb:
      "Placeholder: skill FX, particles, hand-drawn frames; hợp tác chặt với art lead.",
  },
] as const;

const MOCK_PERKS = [
  "Mock: competitive package — điền số thật khi HR chốt",
  "Mock: learning budget / tools",
  "Mock: flexible hours trong khung overlap",
  "Mock: project variety (mobile, indie, publisher)",
] as const;

export default function CareersPage() {
  return (
    <>
      <SiteHeader />
      <main
        className={`min-h-screen bg-[#090a10] text-white ${nunitoSans.className}`}
      >
        <section className="relative h-[100vh] overflow-hidden border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 z-0">
            <Image
              src="/images/f0d05f71-5089-4b3f-b453-7a8d19afc013.png"
              alt=""
              fill
              className="object-cover object-[center_35%]"
              sizes="100vw"
              priority
            />
          </div>

          <div
            className="relative z-10 mx-auto flex h-[100vh] items-end px-4 pb-16 pt-28 md:items-center md:pb-24 md:pt-32"
            style={{ width: "var(--layout-width, 75%)" }}
          >
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff9f1a]">
                Hiring
              </p>
              <h1
                className={`mt-4 text-5xl font-black uppercase leading-[0.98] tracking-tight sm:text-6xl md:text-7xl ${changaOne.className}`}
              >
                Build games
                <br />
                <span className="text-[#f59e0b] drop-shadow-[0_0_24px_rgba(245,158,11,0.35)]">
                  with us
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
                Join our creative team and bring stunning game art to life. We're looking for passionate artists who love crafting characters, environments, and visual effects that players remember.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#open-roles"
                  className="inline-flex rounded-xl border-2 border-[#f59e0b] bg-[#f59e0b] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-transparent hover:text-white md:text-base"
                >
                  Open roles
                </a>
                <Link
                  href="/contact"
                  className="inline-flex rounded-xl border-2 border-white/35 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-[#f59e0b] hover:text-[#f59e0b] md:text-base"
                >
                  Speculative application
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="open-roles"
          className="scroll-mt-24 border-b border-white/10 py-16 md:py-24"
        >
          <div
            className="mx-auto px-4"
            style={{ width: "min(var(--layout-width, 85%), 960px)" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff9f1a]">
              // Open positions
            </p>
            <h2
              className="mt-3 text-3xl font-black uppercase tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Roles — <AccentHighlight>mock listings</AccentHighlight>
            </h2>
            <p className="mt-4 max-w-2xl text-white/70">
              Mỗi ô dưới có thể link tới{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">
                /careers/[id]
              </code>{" "}
              hoặc URL ngoài (Greenhouse, Notion, Google Form).
            </p>

            <ul className="mt-10 flex flex-col gap-4">
              {MOCK_ROLES.map((role) => (
                <li
                  key={role.id}
                  className="rounded-2xl border border-white/12 bg-white/4 p-6 md:flex md:items-start md:justify-between md:gap-8 md:p-8"
                >
                  <div>
                    <h3
                      className="text-xl font-bold uppercase tracking-tight md:text-2xl"
                      style={{ fontFamily: "var(--font-rajdhani)" }}
                    >
                      {role.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#f59e0b]/90">
                      {role.type} · {role.location}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
                      {role.blurb}
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex shrink-0 rounded-xl border border-[#f59e0b]/60 bg-[#f59e0b]/10 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-[#f59e0b] transition-colors hover:bg-[#f59e0b] hover:text-black md:mt-0 md:self-center"
                  >
                    Apply (mock)
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[linear-gradient(165deg,#14151f_0%,#0e0f14_42%,#0a0a10_100%)] py-16 md:py-20">
          <div
            className="mx-auto px-4"
            style={{ width: "min(var(--layout-width, 85%), 960px)" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff9f1a]">
              // Why TD Games
            </p>
            <h2
              className="mt-3 text-2xl font-black uppercase tracking-tight md:text-3xl"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Perks & culture <span className="text-white/40">(draft)</span>
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {MOCK_PERKS.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/80 md:text-base"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#f59e0b]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-[#ff8c3a]/20 py-14 md:py-16">
          <div
            className="mx-auto px-4 text-center md:text-left"
            style={{ width: "min(var(--layout-width, 85%), 960px)" }}
          >
            <p className="text-sm text-white/65">
              <strong className="text-white">Gợi ý thêm:</strong> ảnh văn phòng,
              quote từ lead, quy trình interview 3 bước, diversity statement,
              link <Link href="/blog" className="text-[#f59e0b] hover:underline">blog</Link>.
            </p>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
