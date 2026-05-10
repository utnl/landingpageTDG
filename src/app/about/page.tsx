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
  title: "About — TD Games",
  description:
    "[Draft] TD Games — Vietnam-based 2D art, animation & VFX studio. Replace with final positioning.",
};

const MOCK_VALUES = [
  {
    title: "Production-ready art",
    body: "Mock: stylized characters, environments, UI — tuned for mobile pipelines và handoff rõ ràng.",
  },
  {
    title: "Animation & VFX",
    body: "Mock: Spine, frame-by-frame, skill FX — giữ style đồng nhất từ concept tới in-game.",
  },
  {
    title: "Partnership",
    body: "Mock: timezone-friendly updates, NDA-first, milestone rõ — chỉnh lại theo cách bạn làm việc thật.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main
        className={`min-h-screen bg-[#090a10] text-white ${nunitoSans.className}`}
      >
        {/* Hero — đổi ảnh khi có key visual “about” riêng */}
        <section className="relative min-h-[min(100svh,920px)] overflow-hidden border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 z-0">
            <Image
              src="/images/summoners.png"
              alt=""
              fill
              className="object-cover object-[center_22%]"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/88 to-black/25" />
            <div className="absolute inset-0 bg-black/35" />
          </div>

          <div
            className="relative z-10 mx-auto flex min-h-[min(100svh,920px)] items-center px-4 py-28 md:py-32"
            style={{ width: "var(--layout-width, 75%)" }}
          >
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff9f1a] md:text-sm">
                [Mock] Studio snapshot
              </p>
              <h1
                className={`mt-4 text-5xl font-black uppercase leading-[0.98] tracking-tight text-white sm:text-6xl md:text-7xl ${changaOne.className}`}
              >
                About{" "}
                <span className="text-[#f59e0b] drop-shadow-[0_0_24px_rgba(245,158,11,0.35)]">
                  TD Games
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                Trang <strong className="text-white">nháp</strong> để bạn duyệt
                layout. Thay đoạn này bằng câu định vị 1–2 dòng: đội ở đâu, làm
                gì, cho ai (mobile / mid-core / publisher…).
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex rounded-xl border-2 border-[#f59e0b] bg-[#f59e0b] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-transparent hover:text-white md:text-base"
                >
                  Work with us
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex rounded-xl border-2 border-white/35 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-[#f59e0b] hover:text-[#f59e0b] md:text-base"
                >
                  View portfolio
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="border-b border-white/10 py-16 md:py-24">
          <div
            className="mx-auto px-4"
            style={{ width: "min(var(--layout-width, 85%), 960px)" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff9f1a]">
              // 01 — Our story
            </p>
            <h2
              className="mt-3 text-3xl font-black uppercase tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              From first sketch to{" "}
              <AccentHighlight>shippable assets</AccentHighlight>
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-white/75 md:text-lg">
              <p>
                <strong className="text-white">Gợi ý copy:</strong> 2–3 đoạn
                ngắn — năm thành lập, vì sao tập trung 2D, vài tên khách hoặc
                thể loại game đã làm (nếu được public). Tránh jargon; nhấn
                outcome (on-time, style consistency, communication).
              </p>
              <p>
                Đoạn mock: chúng tôi hợp tác với studio và publisher để đưa
                character sheets, environment concepts, animation rigs và VFX
                packs vào production — bạn sẽ thay bằng câu chuyện thật của TD
                Games.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-b border-white/10 bg-[linear-gradient(165deg,#14151f_0%,#0e0f14_42%,#0a0a10_100%)] py-16 md:py-24">
          <div
            className="mx-auto px-4"
            style={{ width: "min(var(--layout-width, 85%), 1120px)" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff9f1a]">
              // 02 — What we care about
            </p>
            <h2
              className="mt-3 max-w-2xl text-3xl font-black uppercase tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Three pillars <span className="text-[#f59e0b]">(placeholder)</span>
            </h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {MOCK_VALUES.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-white/12 bg-white/4 p-6 md:p-7"
                >
                  <h3
                    className="text-lg font-bold uppercase tracking-wide text-white md:text-xl"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Stats — chỉnh số liệu thật hoặc bỏ hàng này */}
        <section className="py-14 md:py-20">
          <div
            className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-4 md:grid-cols-4"
            style={{ width: "min(var(--layout-width, 85%), 960px)" }}
          >
            {[
              { label: "Years*", value: "10+" },
              { label: "Shipped titles*", value: "40+" },
              { label: "Artists core*", value: "25" },
              { label: "Time zones", value: "GMT+7" },
            ].map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <p
                  className="text-3xl font-black text-[#f59e0b] md:text-4xl"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  {s.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/55">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl px-4 text-center text-xs text-white/45 md:text-left" style={{ width: "min(var(--layout-width, 85%), 960px)" }}>
            *Số mock — thay bằng metric thật hoặc xóa dòng chú thích này.
          </p>
        </section>

        {/* CTA */}
        <section className="border-t border-[#ff8c3a]/20 bg-black/40 py-16 md:py-20">
          <div
            className="mx-auto flex flex-col items-start gap-6 px-4 md:flex-row md:items-center md:justify-between"
            style={{ width: "min(var(--layout-width, 85%), 960px)" }}
          >
            <div>
              <h2
                className="text-2xl font-black uppercase tracking-tight md:text-3xl"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                Next: team photos, logos khách, timeline
              </h2>
              <p className="mt-2 max-w-xl text-white/70">
                Gợi ý block bổ sung: ảnh team, quote lead, đối tác (nếu có),
                chứng chỉ, careers link.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 rounded-xl bg-[#f59e0b] px-8 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#fbbf24] md:text-base"
            >
              Get in touch
            </Link>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
