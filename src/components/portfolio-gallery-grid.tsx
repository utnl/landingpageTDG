import Image from "next/image";
import Link from "next/link";

import { AccentHighlight } from "@/components/accent-highlight";

export type PortfolioGalleryItem = {
  id: string;
  title: string;
  tag: string;
  image: string;
  /** Link nút VIEW PROJECT */
  href?: string;
};

/** 10 dự án — chỉnh trong production */
const DEFAULT_ITEMS: PortfolioGalleryItem[] = [
  {
    id: "p1",
    title: "Dragon warrior",
    tag: "Character · IP",
    image: "/images/f8e2e81a-e72c-431b-b4ec-5ab7af73ea12.png",
    href: "#portfolio-gallery",
  },
  {
    id: "p2",
    title: "Energy VFX suite",
    tag: "Real-time VFX",
    image: "/images/21f8a0a6-048f-4a5c-9946-3a89f6303fcd.png",
    href: "#portfolio-gallery",
  },
  {
    id: "p3",
    title: "Summoners Era",
    tag: "Key art pack",
    image: "/images/3067c837-e030-403f-b7c5-0c7246bfe15f.png",
    href: "/portfolio/summoner-era",
  },
  {
    id: "p4",
    title: "Temple night scene",
    tag: "Environment 3D",
    image: "/images/f0d05f71-5089-4b3f-b453-7a8d19afc013.png",
    href: "#portfolio-gallery",
  },
  {
    id: "p5",
    title: "Hero key visual",
    tag: "Marketing",
    image: "/images/xoa_nen_vip_pro.png",
    href: "#portfolio-gallery",
  },
  {
    id: "p6",
    title: "Isometric world",
    tag: "2D isometry",
    image: "/images/Isometry_art-1024x683.jpg",
    href: "#portfolio-gallery",
  },
  {
    id: "p7",
    title: "Casual roster",
    tag: "Character 2D",
    image: "/images/Casual_character-1024x683.jpg",
    href: "#portfolio-gallery",
  },
  {
    id: "p8",
    title: "Slot production",
    tag: "Casino art",
    image: "/images/Slot_Art-1024x683.jpg",
    href: "#portfolio-gallery",
  },
  {
    id: "p9",
    title: "Concept exploration",
    tag: "Pre-production",
    image: "/images/Character_Concept-1024x683.jpg",
    href: "#portfolio-gallery",
  },
  {
    id: "p10",
    title: "Biome concepts",
    tag: "Environment 2D",
    image: "/images/Environment_Art-1024x683.jpg",
    href: "#portfolio-gallery",
  },
];

/**
 * Lưới kín (lg+): 3 cột × 12 hàng đồng cao (1fr) + 2 hàng banner.
 * Mỗi cột tổng row-span = 12 → không lỗ; card 10 trải full 3 cột ở hàng 13–16 (gấp đôi cao so với 2 track).
 */
const BENTO_LG: string[] = [
  "lg:col-start-1 lg:row-start-1 lg:row-span-4",
  "lg:col-start-2 lg:row-start-1 lg:row-span-5",
  "lg:col-start-3 lg:row-start-1 lg:row-span-3",
  "lg:col-start-1 lg:row-start-5 lg:row-span-4",
  "lg:col-start-2 lg:row-start-6 lg:row-span-3",
  "lg:col-start-3 lg:row-start-4 lg:row-span-5",
  "lg:col-start-1 lg:row-start-9 lg:row-span-4",
  "lg:col-start-2 lg:row-start-9 lg:row-span-4",
  "lg:col-start-3 lg:row-start-9 lg:row-span-4",
  "lg:col-span-3 lg:row-start-13 lg:row-span-4",
];

export default function PortfolioGalleryGrid({
  items = DEFAULT_ITEMS,
}: {
  items?: PortfolioGalleryItem[];
}) {
  return (
    <section
      id="portfolio-gallery"
      className="border-t border-[#252525] bg-[linear-gradient(180deg,#171717_0%,#101010_100%)] py-14 text-white md:py-16 lg:py-20"
    >
      <div
        className="mx-auto px-4 sm:px-0"
        style={{ width: "min(var(--layout-width, 76%), 1240px)" }}
      >
        <header className="mb-10 md:mb-12">
          <div className="mb-3 flex flex-wrap items-center gap-4">
            <span className="text-sm font-black italic tracking-tighter text-[#ff8c3a]">
              // 02
            </span>
            <div className="h-px w-10 shrink-0 bg-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
              10 projects
            </span>
          </div>
          <h2
            className="text-3xl font-black uppercase leading-tight tracking-tight text-white md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            Selected <AccentHighlight>works</AccentHighlight>
          </h2>
          <p
            className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            Ba cột mosaic khớp kín (không lỗ): mỗi cột cùng tổng chiều cao 12
            lát; banner cuối trải full ngang.
          </p>
        </header>

        <div
          className="grid grid-cols-1 gap-3 sm:gap-4 lg:min-h-[200vh] lg:grid-cols-3 lg:grid-rows-[repeat(16,minmax(0,1fr))] lg:gap-3"
        >
          {items.map((item, index) => {
            const n = String(index + 1).padStart(2, "0");
            const lg = BENTO_LG[index] ?? "";
            return (
              <article
                key={item.id}
                className={`group relative min-h-[220px] overflow-hidden rounded-2xl border border-[#ff8c3a]/20 bg-[#14141a] shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition-[transform,box-shadow,border-color] duration-300 hover:z-1 hover:border-[#ff8c3a]/45 hover:shadow-[0_28px_80px_rgba(0,0,0,0.5)] lg:min-h-0 lg:h-full ${lg}`}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/25 to-transparent" />
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 md:p-5">
                  <span
                    className="text-sm font-semibold tabular-nums text-white/35"
                    style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                  >
                    {n}
                  </span>
                  <div className="pointer-events-auto">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff8c3a]">
                      {item.tag}
                    </p>
                    <h3
                      className="mt-1.5 text-lg font-black uppercase leading-tight tracking-[0.04em] text-[#ffecd6] md:text-xl"
                      style={{ fontFamily: "var(--font-rajdhani)" }}
                    >
                      {item.title}
                    </h3>
                    <Link
                      href={item.href ?? "#"}
                      className="mt-4 inline-flex items-center rounded-lg border border-[#ff8c3a]/70 bg-black/35 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffcc8e] backdrop-blur-sm transition-colors hover:border-[#ff8c3a] hover:bg-[#ff8c3a]/10"
                    >
                      View project
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
