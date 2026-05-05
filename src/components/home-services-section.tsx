"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { AccentHighlight } from "./accent-highlight";

const ACCENT = "#ff8c3a";

type Service = {
  title: string;
  icon: "animation" | "art" | "vfx";
  href: string;
  statValue: string;
  statLabel: string;
  description: string;
  image: string;
};

const services: Service[] = [
  {
    title: "2D Animation",
    icon: "animation",
    href: "/2d-animation",
    statValue: "50+",
    statLabel: "Completed projects",
    description:
      "Stylized attack loops, promo motion, idle cycles, and lightweight animated sequences built for game readability.",
    image: "/images/service-animation.jpg",
  },
  {
    title: "2D Art",
    icon: "art",
    href: "/2d-art",
    statValue: "50+",
    statLabel: "Completed projects",
    description:
      "Character sheets, splash illustrations, UI-support art, and painted assets tuned for a cleaner, friendlier game look.",
    image: "/sinspired/character_6-min-1024x970.jpg",
  },
  {
    title: "2D VFX",
    icon: "vfx",
    href: "/2d-vfx",
    statValue: "50+",
    statLabel: "Completed projects",
    description:
      "Skill bursts, hit flashes, elemental trails, and screen-space accents that add energy without pushing the style too hard.",
    image: "/sinspired/Game_Animation-min-1024x612.jpg",
  },
];

function ServiceIcon({
  type,
  color,
}: {
  type: "animation" | "art" | "vfx";
  color: string;
}) {
  const iconSrc =
    type === "art"
      ? "/images/art.png"
      : type === "animation"
        ? "/images/running.png"
        : "/images/sparkling.png";

  return (
    <span
      className="block h-6 w-6"
      style={{
        backgroundColor: color,
        maskImage: `url('${iconSrc}')`,
        WebkitMaskImage: `url('${iconSrc}')`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
      aria-hidden="true"
    />
  );
}

function ServicesStudioIntro() {
  const accentStyle = { color: ACCENT };
  const title = "OUR SERVICES";
  const highlight = "SERVICES";
  const parts = title.split(highlight);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mb-8 md:mb-10"
    >
      <div className="text-center">
        <div className="mb-3 flex items-center justify-center gap-4">
          <span
            className="text-sm font-black italic tracking-tighter"
            style={accentStyle}
          >
            // 01
          </span>
          <div className="h-px w-10 bg-white/10" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
            Capabilities
          </span>
        </div>
        <h2
          className="text-4xl font-black uppercase tracking-tight text-white md:text-5xl lg:text-7xl"
          style={{ fontFamily: "var(--font-rajdhani)" }}
        >
          {parts.length === 2 ? (
            <>
              {parts[0]}
              <AccentHighlight>{highlight}</AccentHighlight>
              {parts[1]}
            </>
          ) : (
            title
          )}
        </h2>
        <p
          className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 opacity-70"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          This version keeps the brand energy but removes the hard AAA pressure.
          The layout follows a studio portfolio rhythm closer to the Sinspired
          reference.
        </p>
      </div>
    </motion.div>
  );
}

export default function HomeServicesSection() {
  return (
    <section
      id="services"
      className="snap-start border-t border-[#252525] bg-[linear-gradient(180deg,#171717_0%,#101010_100%)] pt-6 pb-20 text-white lg:pt-8 lg:pb-24"
    >
      <div
        className="mx-auto"
        style={{ width: "min(var(--layout-width, 85%), 1240px)" }}
      >
        <ServicesStudioIntro />

        <div className="mx-auto mt-6 grid max-w-5xl items-center gap-5 md:mt-8 md:grid-cols-3 lg:gap-6">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: 0.08 * (index + 1),
                duration: 0.45,
                ease: "easeOut",
              }}
              className="group relative h-[460px] w-full overflow-visible hover:z-10"
            >
              <div className="absolute left-0 right-0 top-1/2 z-20 flex -translate-y-1/2 flex-col overflow-hidden rounded-[24px] border border-orange-300/35 bg-[linear-gradient(170deg,#1c1f28_0%,#14171f_68%,#171107_100%)] shadow-[0_24px_70px_rgba(0,0,0,0.35)] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:border-orange-300/65 group-hover:shadow-[0_32px_90px_rgba(0,0,0,0.5),0_0_28px_rgba(255,140,58,0.2)]">
                <a
                  href={service.href}
                  aria-label={`Open ${service.title}`}
                  className="absolute inset-0 z-10"
                />
                <div className="relative h-[250px] w-full shrink-0 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 380px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0b0b0f] via-transparent to-transparent opacity-75" />
                </div>

                <div className="flex flex-col px-6 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[24px] font-bold leading-tight tracking-tight text-white">
                      {service.title}
                    </h3>
                    <span
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-amber-300/55 bg-black/55 shadow-[0_8px_24px_rgba(0,0,0,0.32),0_0_14px_rgba(245,158,11,0.2)]"
                      title={service.title}
                    >
                      <ServiceIcon type={service.icon} color={ACCENT} />
                    </span>
                  </div>

                  <div className="grid grid-rows-[0fr] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:mt-3 group-hover:grid-rows-[1fr]">
                    <div className="min-h-0 overflow-hidden">
                      <div className="translate-y-2 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-[13px] leading-6 text-white/82">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-4 pt-2">
                    <div className="min-w-0">
                      <div className="text-base font-semibold leading-tight text-white">
                        {service.statValue}
                      </div>
                      <div className="text-[12px] leading-tight text-white/60">
                        {service.statLabel}
                      </div>
                    </div>

                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white/85 transition-colors duration-200 group-hover:border-orange-300/60 group-hover:bg-[#ff8c3a] group-hover:text-black">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
