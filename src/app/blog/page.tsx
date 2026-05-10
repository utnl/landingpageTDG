import type { Metadata } from "next";
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
  title: "Blog — TD Games",
  description:
    "[Draft] Studio notes on 2D art, animation, and production — mock listing.",
};

const MOCK_POSTS = [
  {
    slug: "mock-pipeline-handoff",
    date: "2026-05-01",
    title: "Mock: PSD → Spine handoff checklist",
    excerpt:
      "Placeholder bài viết. Thay bằng bài thật: naming, layer groups, export rules cho animator.",
    tag: "Pipeline",
  },
  {
    slug: "mock-style-bible",
    date: "2026-04-18",
    title: "Mock: Giữ palette đồng nhất trên nhiều artist",
    excerpt:
      "Gợi ý nội dung: style bible ngắn, reference board, review round — bản nháp để duyệt layout.",
    tag: "Art direction",
  },
  {
    slug: "mock-vfx-readability",
    date: "2026-03-22",
    title: "Mock: VFX skill đọc được trên mobile nhỏ",
    excerpt:
      "Placeholder: silhouette, timing, saturation — chủ đề hay cho blog game 2D.",
    tag: "VFX",
  },
] as const;

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main
        className={`min-h-screen bg-[#090a10] text-white ${nunitoSans.className}`}
      >
        <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(165deg,#14151f_0%,#0e0f14_42%,#0a0a10_100%)] pt-28 pb-14 md:pt-36 md:pb-20">
          <div
            className="mx-auto px-4"
            style={{ width: "min(var(--layout-width, 85%), 960px)" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff9f1a]">
              [Mock] Journal
            </p>
            <h1
              className={`mt-4 text-5xl font-black uppercase leading-[0.98] tracking-tight sm:text-6xl md:text-7xl ${changaOne.className}`}
            >
              TD Games{" "}
              <span className="text-[#f59e0b] drop-shadow-[0_0_24px_rgba(245,158,11,0.35)]">
                Blog
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              Trang listing <strong className="text-white">nháp</strong>. Sau
              này: route động{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">
                /blog/[slug]
              </code>
              , CMS hoặc MDX. Hiện chỉ có card mock — click vẫn có URL để bạn
              nối bài chi tiết.
            </p>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div
            className="mx-auto px-4"
            style={{ width: "min(var(--layout-width, 85%), 960px)" }}
          >
            <h2
              className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff9f1a]"
            >
              // Latest (placeholder)
            </h2>
            <p
              className="mt-3 text-2xl font-black uppercase tracking-tight md:text-3xl"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Posts — replace with{" "}
              <AccentHighlight>real articles</AccentHighlight>
            </p>

            <ul className="mt-10 flex flex-col gap-5">
              {MOCK_POSTS.map((post) => (
                <li key={post.slug}>
                  <article className="group rounded-2xl border border-white/12 bg-white/4 p-6 transition-colors hover:border-[#ff8c3a]/35 md:p-8">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.14em] text-white/50">
                      <time dateTime={post.date}>{post.date}</time>
                      <span className="text-[#f59e0b]/90">{post.tag}</span>
                    </div>
                    <h3
                      className="mt-3 text-xl font-bold uppercase tracking-tight text-white md:text-2xl"
                      style={{ fontFamily: "var(--font-rajdhani)" }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition-colors hover:text-[#f59e0b]"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#f59e0b] transition-colors group-hover:gap-3"
                    >
                      Read post
                      <span aria-hidden>→</span>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>

            <p className="mt-10 rounded-xl border border-dashed border-white/20 bg-black/30 p-4 text-sm text-white/55">
              <strong className="text-white/80">Gợi ý:</strong> thêm phân
              trang, filter theo tag, RSS, và bài featured hero. Khi có CMS,
              map `MOCK_POSTS` → API.
            </p>
          </div>
        </section>

        <section className="border-t border-[#ff8c3a]/20 bg-black/40 py-12 md:py-16">
          <div
            className="mx-auto flex flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-center"
            style={{ width: "min(var(--layout-width, 85%), 960px)" }}
          >
            <p className="text-white/75">
              Muốn nhận bài mới (mock newsletter)?
            </p>
            <Link
              href="/contact"
              className="shrink-0 rounded-xl border-2 border-[#f59e0b] bg-[#f59e0b] px-6 py-3 text-sm font-black uppercase tracking-wider text-black hover:bg-transparent hover:text-white"
            >
              Contact us
            </Link>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
