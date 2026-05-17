"use client";

import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#0a0a0a] text-white">
        {/* Hero Section */}
        <section className="relative flex h-screen items-center overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <Image
              src="/images/summoners.png"
              alt="TD Games Team"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div
            className="relative z-10 mx-auto px-4"
            style={{ width: "min(90%, 1280px)" }}
          >
            <div className="max-w-2xl">
              <h1
                className="text-6xl font-black uppercase leading-[1] tracking-tight md:text-8xl"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                ABOUT <span className="text-[#f59e0b]">US</span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                Founded in 2019, TD Games emerged from a shared passion for creating visually stunning game experiences. What started as a small team of artists has grown into a full-service game art studio trusted by developers worldwide.
              </p>
              
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                We believe that great art is the foundation of memorable games. Our mission is to help developers bring their creative visions to life with professional-grade assets that enhance gameplay and captivate players.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex rounded-xl border-2 border-[#f59e0b] bg-[#f59e0b] px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-transparent hover:text-white md:text-base"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-white/10 py-16 md:py-20">
          <div
            className="mx-auto px-4"
            style={{ width: "min(90%, 1280px)" }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#f59e0b]">
              WHO WE ARE
            </p>
            <h2
              className="mt-3 text-3xl font-black uppercase tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              A compact team
              <br />
              <span className="text-[#f59e0b]">with big passion</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">
              TD Games is a humble and creative team. We believe
              in delivering high-quality work, and always
              try to be collaborative, deliver on-time, high-quality
              production-ready game art.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#f59e0b]/30 bg-[#f59e0b]/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-8 w-8 text-[#f59e0b]"
                  >
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                </div>
                <p
                  className="mt-4 text-3xl font-black text-white"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  10+
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
                  YEARS OF EXPERIENCE
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#f59e0b]/30 bg-[#f59e0b]/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-8 w-8 text-[#f59e0b]"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <p
                  className="mt-4 text-3xl font-black text-white"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  40+
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
                  TALENTED ARTISTS
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#f59e0b]/30 bg-[#f59e0b]/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-8 w-8 text-[#f59e0b]"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <p
                  className="mt-4 text-3xl font-black text-white"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  GMT+7
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
                  TIMEZONE
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#f59e0b]/30 bg-[#f59e0b]/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-8 w-8 text-[#f59e0b]"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                </div>
                <p
                  className="mt-4 text-3xl font-black text-white"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  100+
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
                  PROJECTS
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Photos Grid */}
        <section className="border-b border-white/10 py-16 md:py-20">
          <div
            className="mx-auto px-4"
            style={{ width: "min(90%, 1280px)" }}
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/images/summoners.png"
                  alt="Team working"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/images/summonerDetail.png"
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/images/art.png"
                  alt="Creative process"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/images/running.png"
                  alt="Team meeting"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="border-b border-white/10 bg-[#0f0f0f] py-16 md:py-20">
          <div
            className="mx-auto px-4"
            style={{ width: "min(90%, 1280px)" }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#f59e0b]">
              HOW WE WORK
            </p>
            <h2
              className="mt-3 text-3xl font-black uppercase tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              A clear process
              <br />
              <span className="text-[#f59e0b]">from start to finish</span>
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-5">
              {[
                {
                  num: "01",
                  title: "CONCEPT",
                  desc: "Ideation, moodboards, and initial explorations.",
                  icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                },
                {
                  num: "02",
                  title: "FEEDBACK",
                  desc: "Review and align on style and direction.",
                  icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
                },
                {
                  num: "03",
                  title: "PRODUCTION",
                  desc: "Modeling, texturing, and animation.",
                  icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
                },
                {
                  num: "04",
                  title: "POLISH",
                  desc: "Quality and final refinements.",
                  icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                },
                {
                  num: "05",
                  title: "DELIVER",
                  desc: "Optimized, organized, and ready to ship.",
                  icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                },
              ].map((step) => (
                <div key={step.num} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#f59e0b]/30 bg-[#f59e0b]/10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-[#f59e0b]"
                    >
                      <path d={step.icon} />
                    </svg>
                  </div>
                  <p
                    className="mt-4 text-sm font-black uppercase tracking-wider text-[#f59e0b]"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {step.num}
                  </p>
                  <h3
                    className="mt-2 text-lg font-black uppercase text-white"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Showcase */}
        <section className="border-b border-white/10 py-16 md:py-20">
          <div
            className="mx-auto px-4"
            style={{ width: "min(90%, 1280px)" }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#f59e0b]">
              BEHIND THE SCENES
            </p>
            <h2
              className="mt-3 text-3xl font-black uppercase tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              From sketch
              <br />
              <span className="text-[#f59e0b]">to in-game</span>
            </h2>

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
              {[
                { img: "/images/Casual_character-1024x683.jpg", label: "SKETCH" },
                { img: "/images/Character_Concept-1024x683.jpg", label: "BLOCKOUT" },
                { img: "/images/Environment_Art-1024x683.jpg", label: "TEXTURING" },
                { img: "/images/service-animation.jpg", label: "VFX / LIGHTING" },
                { img: "/images/Slot_Art-1024x683.jpg", label: "IN-GAME" },
              ].map((item, i) => (
                <div key={i} className="group relative aspect-[3/4] overflow-hidden rounded-lg">
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <p
                    className="absolute bottom-4 left-4 text-xs font-black uppercase tracking-wider text-[#f59e0b]"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="border-b border-white/10 bg-[#0f0f0f] py-16 md:py-20">
          <div
            className="mx-auto px-4"
            style={{ width: "min(90%, 1280px)" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f59e0b]">
              OUR VALUES
            </p>
            <h2
              className="mt-3 text-3xl font-black uppercase tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              What drives us
              <br />
              <span className="text-[#f59e0b]">every day</span>
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "PASSION",
                  desc: "We love games and we love what we do.",
                  icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                },
                {
                  title: "QUALITY",
                  desc: "We care about details that project success.",
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                },
                {
                  title: "COLLABORATION",
                  desc: "Close partnership brings the best results.",
                  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                },
                {
                  title: "RELIABILITY",
                  desc: "We make deadlines and keep our commitments.",
                  icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  title: "GROWTH",
                  desc: "We grow and level up together.",
                  icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
                },
                {
                  title: "INNOVATION",
                  desc: "We explore new techniques and workflows.",
                  icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-[#f59e0b]/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f59e0b]/10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-[#f59e0b]"
                    >
                      <path d={value.icon} />
                    </svg>
                  </div>
                  <h3
                    className="mt-4 text-lg font-black uppercase text-white"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="border-b border-white/10 py-16 md:py-20">
          <div
            className="mx-auto px-4"
            style={{ width: "min(90%, 1280px)" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f59e0b]">
              STUDIO LIFE
            </p>
            <h2
              className="mt-3 text-3xl font-black uppercase tracking-tight md:text-4xl"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              More than
              <br />
              <span className="text-[#f59e0b]">just a team</span>
            </h2>

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                "/images/trieuvan.png",
                "/images/ourproject.jpg",
                "/images/art.png",
                "/images/running.png",
              ].map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={`Team photo ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#f59e0b]/10 via-black to-black py-20 md:py-28">
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
            <Image
              src="/images/summoners.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          <div
            className="relative z-10 mx-auto px-4 text-center"
            style={{ width: "min(90%, 960px)" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f59e0b]">
              LET'S CREATE TOGETHER
            </p>
            <h2
              className="mt-4 text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              We'd love to hear about it. Let's build something amazing together.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex rounded-lg bg-[#f59e0b] px-8 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-[#ffb366]"
              >
                GET IN TOUCH
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex rounded-lg border-2 border-white/30 px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:border-[#f59e0b] hover:text-[#f59e0b]"
              >
                VIEW OUR WORK
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
