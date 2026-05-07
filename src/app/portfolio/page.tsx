import Link from "next/link";
import { Changa_One, Nunito_Sans } from "next/font/google";
import SiteHeader from "@/components/site-header";

const changaOne = Changa_One({ weight: "400", subsets: ["latin"] });
const nunitoSans = Nunito_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function PortfolioPage() {
  return (
    <>
      <SiteHeader />
      <main className={`relative min-h-screen overflow-hidden bg-[#0a0a0a] ${nunitoSans.className}`}>
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ourproject.jpg"
            alt="Our projects — game art showcase"
            className="absolute inset-0 h-full w-full object-cover object-right md:object-center"
          />
        </div>

        <section
          className="relative z-10 mx-auto flex min-h-screen items-center"
          style={{ width: "var(--layout-width, 75%)" }}
        >
          <div className="w-full py-24">
            <div className="max-w-[606px] tracking-[0.5px]">
              <div className="mb-[-8px] overflow-hidden">
                <div
                  className={`leading-none font-black uppercase text-white ${changaOne.className}`}
                  style={{ fontSize: "var(--hero-title-size, 84px)" }}
                >
                  OUR{" "}
                  <span style={{ color: "var(--hero-highlight-color, #f59e0b)" }}>
                    PROJECTS
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="h-[2px] w-12 bg-amber-400" />
                <h2 className="text-base font-bold uppercase tracking-[0.3em] text-amber-400">
                  Take a look at our game art projects!
                </h2>
              </div>

              <p
                className="mt-5 max-w-[620px] leading-normal"
                style={{
                  fontSize: "var(--hero-desc-size, 18px)",
                  color: "var(--hero-desc-color, #e5e7eb)",
                }}
              >
                Sinspired Studio&apos;s portfolio. We specialize in creating modern
                3D environments, captivating characters, and innovative concept art
                for next-gen games. For years of experience in the industry of game
                art design, managed to collect a solid game design portfolio of
                various artworks made in 2D or 3D and other directions.
              </p>

              <div className="mt-[32px]">
                <Link
                  href="#open-form"
                  className="inline-block rounded-xl border-2 px-[32px] py-[16px] text-[18px] font-bold uppercase tracking-wider text-black transition-colors duration-300 hover:bg-transparent hover:text-white"
                  style={{
                    backgroundColor: "var(--hero-btn-bg, #f59e0b)",
                    borderColor: "var(--hero-btn-bg, #f59e0b)",
                  }}
                >
                  Get in Contact
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
