"use client";

import Link from "next/link";
import { Changa_One, Nunito_Sans } from "next/font/google";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/site-header";

const changaOne = Changa_One({ weight: "400", subsets: ["latin"] });
const nunitoSans = Nunito_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

type CardConfig = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  align: "top" | "center" | "bottom";
  imageFit?: "cover" | "contain";
  textOffsetX?: number;
  textOffsetY?: number;
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  zIndex?: number;
  // If provided, renders a custom polygon clip-path (supports many corners).
  // Points are in the same local coordinate system as the card (before SHAPE_PAD is added).
  poly?: Array<{ x: number; y: number }>;
  tlx: number;
  tly: number;
  trx: number;
  try: number;
  brx: number;
  bry: number;
  blx: number;
  bly: number;
  imageOffsetX: number;
  imageOffsetY: number;
  imageScale: number;
  showText?: boolean;
  // Hexagon corners (optional - only for 6-corner cards)
  tmx?: number;
  tmy?: number;
  bmx?: number;
  bmy?: number;
};

type CornerKey = "tl" | "tr" | "br" | "bl" | "tm" | "bm";
const SHAPE_PAD = 120;
const BOARD_CONFIG = {
  translateX: 36,
  translateY: 8,
  rotate: 24,
  height: 520,
};

type InteractionState =
  | {
      mode: "drag";
      index: number;
      startX: number;
      startY: number;
      originX: number;
      originY: number;
    }
  | { mode: "rotate"; index: number; startX: number; originRotate: number }
  | {
      mode: "corner";
      index: number;
      corner: CornerKey;
      startX: number;
      startY: number;
      originX: number;
      originY: number;
    }
  | {
      mode: "polyCorner";
      index: number;
      cornerIndex: number;
      startX: number;
      startY: number;
      originX: number;
      originY: number;
    }
  | {
      mode: "imagePan";
      index: number;
      startX: number;
      startY: number;
      originX: number;
      originY: number;
    }
  | null;

export default function PortfolioPage() {
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [bgImage, setBgImage] = useState(
    "/images/a0a5dab6-1e06-4a1b-af95-af0b51fc27e6.png",
  );
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [pickHint, setPickHint] = useState<string | null>(null);

  const [showcaseCards, setShowcaseCards] = useState<CardConfig[]>([
    {
      id: "overdrive-top-left",
      title: "ENVIRONMENT ART",
      subtitle: "20 ART",
      image: "/images/f8e2e81a-e72c-431b-b4ec-5ab7af73ea12.png",
      align: "center",
      x: 372,
      y: 229,
      w: 500,
      h: 500,
      rotate: 0,
      tlx: 182,
      tly: -212,
      trx: 207,
      try: -35,
      brx: -97,
      bry: -84,
      blx: -94,
      bly: -27,
      imageOffsetX: 1,
      imageOffsetY: -15,
      imageScale: 1.05,
      showText: true,
    },
    {
      id: "overdrive-top-right",
      title: "OVERDRIVE",
      subtitle: "20 / ANIMATION / VFX",
      image: "/images/21f8a0a6-048f-4a5c-9946-3a89f6303fcd.png",
      align: "top",
      x: 316,
      y: -92,
      w: 168,
      h: 96,
      rotate: 2.1,
      tlx: 40,
      tly: -185,
      trx: 35,
      try: -96,
      brx: -19,
      bry: 76,
      blx: -24,
      bly: 46,
      imageOffsetX: 33,
      imageOffsetY: -37,
      imageScale: 0.85,
      showText: true,
    },
    {
      id: "summoners-era",
      title: "summoners era",
      subtitle: "30 ART",
      image: "/images/3067c837-e030-403f-b7c5-0c7246bfe15f.png",
      align: "center",
      x: 220,
      y: 158,
      w: 342,
      h: 136,
      rotate: 0,
      tlx: 72,
      tly: -171,
      trx: -12,
      try: -63,
      brx: -154,
      bry: 123,
      blx: -21,
      bly: -6,
      imageOffsetX: -10,
      imageOffsetY: -24,
      imageScale: 1,
    },
    {
      id: "environment-art",
      title: "OVERDRIVE",
      subtitle: "20 / ANIMATION / VFX",
      image: "/images/f0d05f71-5089-4b3f-b453-7a8d19afc013.png",
      align: "center",
      x: 487,
      y: -66,
      w: 342,
      h: 112,
      rotate: 0,
      tlx: 38,
      tly: -226,
      trx: -13,
      try: -96,
      brx: -66,
      bry: 94,
      blx: -25,
      bly: 30,
      imageOffsetX: 17,
      imageOffsetY: -36,
      imageScale: 1,
      showText: true,
    },
    {
      id: "hexagon-card",
      title: "SQUARE",
      subtitle: "AUTO CROP",
      image: "/images/xoa_nen_vip_pro.png",
      align: "center",
      x: -113,
      y: -5,
      w: 500,
      h: 500,
      rotate: -39.2,
      zIndex: 1,
      tlx: -140,
      tly: 55,
      trx: 89,
      try: -30,
      brx: 381,
      bry: 18,
      blx: -456,
      bly: 157,
      imageOffsetX: -23,
      imageOffsetY: 62,
      imageScale: 0.8,
      showText: true,
    },
  ]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [interaction, setInteraction] = useState<InteractionState>(null);
  const [lockLayout, setLockLayout] = useState(false);

  const selectedCard = showcaseCards[selectedCardIndex];
  const availableImageSet = useMemo(
    () => new Set(availableImages),
    [availableImages],
  );

  const updateSelectedCard = (
    key: keyof Pick<
      CardConfig,
      | "x"
      | "y"
      | "w"
      | "h"
      | "rotate"
      | "zIndex"
      | "textOffsetX"
      | "textOffsetY"
      | "imageOffsetX"
      | "imageOffsetY"
      | "imageScale"
    >,
    value: number,
  ) => {
    setShowcaseCards((prev) =>
      prev.map((card, index) =>
        index === selectedCardIndex ? { ...card, [key]: value } : card,
      ),
    );
  };

  const updateSelectedImage = (value: string) => {
    setShowcaseCards((prev) =>
      prev.map((card, index) =>
        index === selectedCardIndex ? { ...card, image: value } : card,
      ),
    );
  };

  const handlePickCardImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const nextPath = `/images/${encodeURIComponent(file.name)}`;
    updateSelectedImage(nextPath);
    setPickHint(
      availableImageSet.has(nextPath)
        ? null
        : `Không thấy file trong public/images: ${nextPath}`,
    );
  };

  const handlePickBgImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const nextPath = `/images/${encodeURIComponent(file.name)}`;
    setBgImage(nextPath);
    setPickHint(
      availableImageSet.has(nextPath)
        ? null
        : `Không thấy file trong public/images: ${nextPath}`,
    );
  };

  const fetchAvailableImages = async () => {
    try {
      const res = await fetch("/api/list-images", { cache: "no-store" });
      const data = (await res.json()) as { images?: string[] };
      const listed = Array.isArray(data.images) ? data.images : [];
      const extra = [
        "/sinspired/Artboard-1-copy-13-min-1024x572.jpg",
        "/sinspired/Artboard-1-copy-11-min-1024x572.jpg",
        "/sinspired/Artboard-2-copy-1024x850.jpg",
        "/sinspired/Artboard-2-copy-4-1024x850.jpg",
        "/sinspired/2D-Art-min-947x1024.jpg",
        "/sinspired/3a7ab9112768871.602fbfbfa228c-882x1024.jpg",
        "/sinspired/Character-Design-min-822x1024.jpg",
        "/sinspired/character_1-min-1024x970.jpg",
        "/sinspired/character_5-min-1024x970.jpg",
        "/sinspired/character_6-min-1024x970.jpg",
        "/sinspired/character_8-min-1024x970.jpg",
        "/sinspired/character_10-min-1024x970.jpg",
        "/sinspired/Game_Animation-min-1024x612.jpg",
        "/sinspired/lab_asset-min-1024x506.jpg",
        "/sinspired/lab_asset_dark_final-min-1024x506.jpg",
        "/sinspired/promo_amanda.jpg",
        "/sinspired/space_arena_source_nature_render_final-min-1024x599.jpg",
        "/sinspired/Volcano_Arena_render-min-1024x567.jpg",
      ];
      const merged = Array.from(new Set([...listed, ...extra]));
      setAvailableImages(merged);
    } catch {
      // ignore
    }
  };

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const getCardPoints = (card: CardConfig) => {
    const tl = {
      x: clamp(card.tlx, -SHAPE_PAD, card.w - 20),
      y: clamp(card.tly, -SHAPE_PAD, card.h - 20),
    };
    const tr = {
      x: clamp(card.w + card.trx, 20, card.w + SHAPE_PAD),
      y: clamp(card.try, -SHAPE_PAD, card.h - 20),
    };
    const br = {
      x: clamp(card.w + card.brx, 20, card.w + SHAPE_PAD),
      y: clamp(card.h + card.bry, 20, card.h + SHAPE_PAD),
    };
    const bl = {
      x: clamp(card.blx, -SHAPE_PAD, card.w - 20),
      y: clamp(card.h + card.bly, 20, card.h + SHAPE_PAD),
    };
    // Hexagon corners (if defined)
    const tm =
      card.tmx !== undefined
        ? {
            x: clamp(card.w / 2 + card.tmx, 20, card.w - 20),
            y: clamp(card.tmy ?? 0, -SHAPE_PAD, card.h - 20),
          }
        : undefined;
    const bm =
      card.bmx !== undefined
        ? {
            x: clamp(card.w / 2 + card.bmx, 20, card.w - 20),
            y: clamp(card.h + (card.bmy ?? 0), 20, card.h + SHAPE_PAD),
          }
        : undefined;
    return { tl, tr, br, bl, tm, bm };
  };

  const getPolygon = (card: CardConfig) => {
    if (card.poly && card.poly.length >= 3) {
      const points = card.poly.map((p) => ({
        x: clamp(p.x, -SHAPE_PAD, card.w + SHAPE_PAD),
        y: clamp(p.y, -SHAPE_PAD, card.h + SHAPE_PAD),
      }));
      return { points, kind: "poly" as const };
    }

    const pts = getCardPoints(card);
    const points =
      pts.tm && pts.bm
        ? [pts.tl, pts.tm, pts.tr, pts.br, pts.bm, pts.bl]
        : [pts.tl, pts.tr, pts.br, pts.bl];
    return { points, kind: "legacy" as const };
  };

  const exportJson = useMemo(
    () =>
      JSON.stringify(
        {
          board: {
            ...BOARD_CONFIG,
          },
          background: bgImage,
          cards: showcaseCards,
        },
        null,
        2,
      ),
    [showcaseCards, bgImage],
  );

  const initJson = useMemo(
    () =>
      JSON.stringify(
        {
          board: BOARD_CONFIG,
          background: bgImage,
          cards: showcaseCards.map((c) => ({
            id: c.id,
            title: c.title,
            subtitle: c.subtitle,
            image: c.image,
            align: c.align,
            x: c.x,
            y: c.y,
            w: c.w,
            h: c.h,
            rotate: c.rotate,
            zIndex: c.zIndex,
            poly: c.poly,
            tlx: c.tlx,
            tly: c.tly,
            trx: c.trx,
            try: c.try,
            brx: c.brx,
            bry: c.bry,
            blx: c.blx,
            bly: c.bly,
            imageOffsetX: c.imageOffsetX,
            imageOffsetY: c.imageOffsetY,
            imageScale: c.imageScale,
            showText: c.showText,
            tmx: c.tmx,
            tmy: c.tmy,
            bmx: c.bmx,
            bmy: c.bmy,
          })),
        },
        null,
        2,
      ),
    [showcaseCards, bgImage],
  );

  const handleExportCoordinates = async () => {
    try {
      await navigator.clipboard.writeText(exportJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  useEffect(() => {
    if (!interaction) return;

    const onPointerMove = (event: PointerEvent) => {
      setShowcaseCards((prev) =>
        prev.map((card, index) => {
          if (index !== interaction.index) return card;

          if (interaction.mode === "drag") {
            const nextX = Math.round(
              interaction.originX + (event.clientX - interaction.startX),
            );
            const nextY = Math.round(
              interaction.originY + (event.clientY - interaction.startY),
            );
            return { ...card, x: nextX, y: nextY };
          }

          if (interaction.mode === "corner") {
            const dx = Math.round(event.clientX - interaction.startX);
            const dy = Math.round(event.clientY - interaction.startY);
            const nextX = interaction.originX + dx;
            const nextY = interaction.originY + dy;

            if (interaction.corner === "tl")
              return { ...card, tlx: nextX, tly: nextY };
            if (interaction.corner === "tm")
              return { ...card, tmx: nextX, tmy: nextY };
            if (interaction.corner === "tr")
              return { ...card, trx: nextX, try: nextY };
            if (interaction.corner === "br")
              return { ...card, brx: nextX, bry: nextY };
            if (interaction.corner === "bm")
              return { ...card, bmx: nextX, bmy: nextY };
            return { ...card, blx: nextX, bly: nextY };
          }

          if (interaction.mode === "polyCorner") {
            const dx = Math.round(event.clientX - interaction.startX);
            const dy = Math.round(event.clientY - interaction.startY);
            const nextX = clamp(
              interaction.originX + dx,
              -SHAPE_PAD,
              card.w + SHAPE_PAD,
            );
            const nextY = clamp(
              interaction.originY + dy,
              -SHAPE_PAD,
              card.h + SHAPE_PAD,
            );
            const nextPoly = (card.poly ?? []).map((p, i) =>
              i === interaction.cornerIndex ? { x: nextX, y: nextY } : p,
            );
            return { ...card, poly: nextPoly };
          }

          if (interaction.mode === "imagePan") {
            const nextOffsetX = Math.round(
              interaction.originX + (event.clientX - interaction.startX),
            );
            const nextOffsetY = Math.round(
              interaction.originY + (event.clientY - interaction.startY),
            );
            return {
              ...card,
              imageOffsetX: nextOffsetX,
              imageOffsetY: nextOffsetY,
            };
          }

          const nextRotate =
            Math.round(
              (interaction.originRotate +
                (event.clientX - interaction.startX) * 0.35) *
                10,
            ) / 10;
          return { ...card, rotate: nextRotate };
        }),
      );
    };

    const onPointerUp = () => setInteraction(null);

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [interaction]);

  // boardScale removed (rollback)

  useEffect(() => {
    fetchAvailableImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SiteHeader />
      <main
        className={`relative min-h-screen overflow-hidden bg-[#0a0a0a] ${nunitoSans.className}`}
      >
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-right md:object-center"
          />
        </div>

        <section
          className="relative z-10 mx-auto flex min-h-screen items-center"
          style={{ width: "var(--layout-width, 75%)" }}
        >
          <div className="relative w-full py-24">
            <div className="max-w-[606px] tracking-[0.5px]">
              <div className="mb-[-8px] overflow-hidden">
                <div
                  className={`leading-none font-black uppercase text-white ${changaOne.className}`}
                  style={{ fontSize: "var(--hero-title-size, 84px)" }}
                >
                  OUR{" "}
                  <span
                    style={{ color: "var(--hero-highlight-color, #f59e0b)" }}
                  >
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
                Sinspired Studio&apos;s portfolio. We specialize in creating
                modern 3D environments, captivating characters, and innovative
                concept art for next-gen games. For years of experience in the
                industry of game art design, managed to collect a solid game
                design portfolio of various artworks made in 2D or 3D and other
                directions.
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

            <div className="absolute right-0 top-0 hidden w-full max-w-[620px] lg:block">
              <div
                className="relative"
                style={{
                  height: `${BOARD_CONFIG.height}px`,
                  transform: `translate(${BOARD_CONFIG.translateX}px, ${BOARD_CONFIG.translateY}px) rotate(${BOARD_CONFIG.rotate}deg)`,
                }}
              >
                {showcaseCards.map((card, index) =>
                  (() => {
                    const poly = getPolygon(card);
                    const clipPath = `polygon(${poly.points
                      .map((p) => `${p.x + SHAPE_PAD}px ${p.y + SHAPE_PAD}px`)
                      .join(", ")})`;

                    return (
                      <article
                        key={card.id}
                        className={`group absolute overflow-visible shadow-[0_14px_40px_rgba(0,0,0,0.55)] ${interaction?.index === index ? "cursor-grabbing" : "cursor-grab"}`}
                        style={{
                          left: `${card.x}px`,
                          top: `${card.y}px`,
                          width: `${card.w}px`,
                          height: `${card.h}px`,
                          zIndex:
                            card.zIndex ??
                            (selectedCardIndex === index ? 20 : 10),
                          transform: `rotate(${card.rotate}deg)`,
                        }}
                        onPointerDown={(event) => {
                          if (lockLayout) return;
                          if (event.button !== 0) return;
                          setSelectedCardIndex(index);
                          setInteraction({
                            mode: "drag",
                            index,
                            startX: event.clientX,
                            startY: event.clientY,
                            originX: card.x,
                            originY: card.y,
                          });
                        }}
                      >
                        <div
                          className="absolute overflow-hidden"
                          style={{
                            left: `-${SHAPE_PAD}px`,
                            top: `-${SHAPE_PAD}px`,
                            width: `calc(100% + ${SHAPE_PAD * 2}px)`,
                            height: `calc(100% + ${SHAPE_PAD * 2}px)`,
                            clipPath,
                          }}
                        >
                          <div
                            className="absolute inset-0"
                            style={{
                              transform: `rotate(${-(BOARD_CONFIG.rotate + card.rotate)}deg) scale(${card.imageScale})`,
                              transformOrigin: "center",
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={card.image}
                              alt=""
                              className={`absolute inset-0 h-full w-full ${
                                card.imageFit === "contain" ? "object-contain" : "object-cover"
                              } ${
                                card.align === "top"
                                  ? "object-top"
                                  : card.align === "bottom"
                                    ? "object-bottom"
                                    : "object-center"
                              }`}
                              style={{
                                transform: `translate(${card.imageOffsetX}px, ${card.imageOffsetY}px)`,
                              }}
                            />
                          </div>
                          {card.showText !== false && (
                            <div
                              className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-white"
                              style={{
                                textShadow:
                                  "0 2px 14px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,0.85)",
                              }}
                            >
                              <p className="text-[10px] font-black uppercase tracking-[0.08em]">
                                {card.title}
                              </p>
                              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.11em] text-white/90">
                                {card.subtitle}
                              </p>
                            </div>
                          )}
                        </div>
                        {/* Black border - outside clip-path */}
                        {card.id !== "hexagon-card" && (
                          <svg
                            className="pointer-events-none absolute"
                            style={{
                              left: `-${SHAPE_PAD}px`,
                              top: `-${SHAPE_PAD}px`,
                              width: `calc(100% + ${SHAPE_PAD * 2}px)`,
                              height: `calc(100% + ${SHAPE_PAD * 2}px)`,
                            }}
                            preserveAspectRatio="none"
                          >
                            <polygon
                              points={poly.points
                                .map(
                                  (p) =>
                                    `${p.x + SHAPE_PAD},${p.y + SHAPE_PAD}`,
                                )
                                .join(" ")}
                              fill="none"
                              stroke="black"
                              strokeWidth="10"
                            />
                          </svg>
                        )}
                        {selectedCardIndex === index && (
                          <>
                            <button
                              type="button"
                              onPointerDown={(event) => {
                                if (lockLayout) return;
                                event.stopPropagation();
                                setInteraction({
                                  mode: "rotate",
                                  index,
                                  startX: event.clientX,
                                  originRotate: card.rotate,
                                });
                              }}
                              className="absolute left-1/2 top-[-18px] h-4 w-4 -translate-x-1/2 rounded-full border border-white bg-white/95"
                              title="Rotate"
                            />
                            <button
                              type="button"
                              onPointerDown={(event) => {
                                event.stopPropagation();
                                setInteraction({
                                  mode: "imagePan",
                                  index,
                                  startX: event.clientX,
                                  startY: event.clientY,
                                  originX: card.imageOffsetX,
                                  originY: card.imageOffsetY,
                                });
                              }}
                              className="absolute right-1 top-1 h-4 w-4 rounded-full border border-white bg-white/95"
                              title="Move image inside frame"
                            />
                            {card.poly && card.poly.length >= 3
                              ? poly.points.map((p, cornerIndex) => (
                                  <button
                                    key={`p-${cornerIndex}`}
                                    type="button"
                                    onPointerDown={(event) => {
                                      if (lockLayout) return;
                                      event.stopPropagation();
                                      const origin = card.poly?.[
                                        cornerIndex
                                      ] ?? { x: p.x, y: p.y };
                                      setInteraction({
                                        mode: "polyCorner",
                                        index,
                                        cornerIndex,
                                        startX: event.clientX,
                                        startY: event.clientY,
                                        originX: origin.x,
                                        originY: origin.y,
                                      });
                                    }}
                                    className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-white/95"
                                    style={{
                                      left: `${p.x}px`,
                                      top: `${p.y}px`,
                                    }}
                                    title={`Point ${cornerIndex + 1}`}
                                  />
                                ))
                              : (
                                  [
                                    { key: "tl", point: poly.points[0] },
                                    { key: "tr", point: poly.points[1] },
                                    { key: "br", point: poly.points[2] },
                                    { key: "bl", point: poly.points[3] },
                                  ] as const
                                ).map((handle) => (
                                  <button
                                    key={handle.key}
                                    type="button"
                                    onPointerDown={(event) => {
                                      if (lockLayout) return;
                                      event.stopPropagation();
                                      const cornerKey = handle.key as CornerKey;
                                      const originX =
                                        cornerKey === "tl"
                                          ? card.tlx
                                          : cornerKey === "tr"
                                            ? card.trx
                                            : cornerKey === "br"
                                              ? card.brx
                                              : card.blx;
                                      const originY =
                                        cornerKey === "tl"
                                          ? card.tly
                                          : cornerKey === "tr"
                                            ? card.try
                                            : cornerKey === "br"
                                              ? card.bry
                                              : card.bly;
                                      setInteraction({
                                        mode: "corner",
                                        index,
                                        corner: cornerKey,
                                        startX: event.clientX,
                                        startY: event.clientY,
                                        originX,
                                        originY,
                                      });
                                    }}
                                    className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-white/95"
                                    style={{
                                      left: `${handle.point.x}px`,
                                      top: `${handle.point.y}px`,
                                    }}
                                    title={`Corner ${handle.key.toUpperCase()}`}
                                  />
                                ))}
                          </>
                        )}
                      </article>
                    );
                  })(),
                )}
              </div>

              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => setSettingsOpen(!settingsOpen)}
                className={`absolute left-[-430px] top-[140px] z-50 rounded-full border border-white/30 bg-black/75 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/90 ${settingsOpen ? "bg-amber-500/20 border-amber-400/50" : ""}`}
                title={settingsOpen ? "Ẩn Settings" : "Hiện Settings"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>

              {settingsOpen && (
                <div className="absolute left-[-430px] top-[180px] z-50 max-h-[70vh] w-[380px] overflow-y-auto rounded-2xl border border-white/30 bg-black/75 p-4 text-white backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase tracking-[0.09em] text-amber-300">
                      Card Controller
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setLockLayout(!lockLayout)}
                        className={`rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${
                          lockLayout
                            ? "border-red-400/70 bg-red-400/20 text-red-300"
                            : "border-emerald-400/70 bg-emerald-400/20 text-emerald-300"
                        }`}
                        title={
                          lockLayout ? "Mở khóa để kéo góc" : "Khóa layout"
                        }
                      >
                        {lockLayout ? "🔒 Khóa" : "🔓 Mở"}
                      </button>
                      <button
                        type="button"
                        onClick={handleExportCoordinates}
                        className="rounded-md border border-amber-300/70 bg-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-black"
                      >
                        Xuất JSON
                      </button>
                    </div>
                  </div>
                  <p className="mb-3 text-[11px] text-white/70">
                    {lockLayout
                      ? "Layout đang khóa. Bật 🔓 Mở để kéo các góc chỉnh hình dạng (4 hoặc 6 góc)."
                      : "Layout đang mở. Kéo các chấm trắng ở góc để chỉnh hình. Card 5 = Hexagon 6 góc. Bật 🔒 Khóa để giữ cố định."}
                  </p>

                  <div className="mb-3 flex flex-wrap gap-2">
                    {showcaseCards.map((card, index) => (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => setSelectedCardIndex(index)}
                        className={`rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                          selectedCardIndex === index
                            ? "border-amber-300 bg-amber-300/20 text-amber-200"
                            : "border-white/25 text-white/75"
                        }`}
                      >
                        Card {index + 1}
                      </button>
                    ))}
                  </div>

                  {selectedCard && (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label className="flex flex-col gap-1">
                        <span>Image</span>
                        <input
                          type="text"
                          value={selectedCard.image}
                          onChange={(e) => updateSelectedImage(e.target.value)}
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                        />
                      </label>
                      <div className="col-span-2 flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-2">
                          <span>Chọn ảnh (file browser → lấy tên file)</span>
                          <button
                            type="button"
                            onClick={fetchAvailableImages}
                            className="rounded border border-amber-300/60 bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold text-amber-200 hover:bg-amber-400/25"
                          >
                            Reload images dir
                          </button>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePickCardImage}
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1 text-[11px]"
                        />
                        <span className="text-[10px] text-white/55">
                          File phải nằm trong{" "}
                          <span className="font-mono">public/images</span>. Mình
                          chỉ lấy <span className="font-mono">file.name</span>{" "}
                          và gán thành{" "}
                          <span className="font-mono">/images/tenfile</span>.
                        </span>
                      </div>
                      {pickHint && (
                        <div className="col-span-2 rounded border border-red-400/30 bg-red-950/20 px-2 py-1 text-[10px] text-red-200">
                          {pickHint}
                        </div>
                      )}
                      <label className="flex flex-col gap-1">
                        <span>X</span>
                        <input
                          type="number"
                          value={selectedCard.x}
                          onChange={(e) =>
                            updateSelectedCard("x", Number(e.target.value))
                          }
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>Y</span>
                        <input
                          type="number"
                          value={selectedCard.y}
                          onChange={(e) =>
                            updateSelectedCard("y", Number(e.target.value))
                          }
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>W</span>
                        <input
                          type="number"
                          value={selectedCard.w}
                          onChange={(e) =>
                            updateSelectedCard("w", Number(e.target.value))
                          }
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>H</span>
                        <input
                          type="number"
                          value={selectedCard.h}
                          onChange={(e) =>
                            updateSelectedCard("h", Number(e.target.value))
                          }
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>TL x,y</span>
                        <input
                          type="text"
                          value={`${selectedCard.tlx}, ${selectedCard.tly}`}
                          readOnly
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1 text-white/75"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>TR x,y</span>
                        <input
                          type="text"
                          value={`${selectedCard.trx}, ${selectedCard.try}`}
                          readOnly
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1 text-white/75"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>Rotate</span>
                        <input
                          type="number"
                          value={selectedCard.rotate}
                          onChange={(e) =>
                            updateSelectedCard("rotate", Number(e.target.value))
                          }
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>Z Index</span>
                        <input
                          type="number"
                          value={
                            selectedCard.zIndex ??
                            (selectedCardIndex === 4 ? 1 : 10)
                          }
                          onChange={(e) =>
                            updateSelectedCard("zIndex", Number(e.target.value))
                          }
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>Text X</span>
                        <input
                          type="number"
                          value={selectedCard.textOffsetX ?? 0}
                          onChange={(e) =>
                            updateSelectedCard(
                              "textOffsetX",
                              Number(e.target.value),
                            )
                          }
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>Text Y</span>
                        <input
                          type="number"
                          value={selectedCard.textOffsetY ?? 0}
                          onChange={(e) =>
                            updateSelectedCard(
                              "textOffsetY",
                              Number(e.target.value),
                            )
                          }
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>Image X</span>
                        <input
                          type="number"
                          value={selectedCard.imageOffsetX}
                          onChange={(e) =>
                            updateSelectedCard(
                              "imageOffsetX",
                              Number(e.target.value),
                            )
                          }
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>Image Y</span>
                        <input
                          type="number"
                          value={selectedCard.imageOffsetY}
                          onChange={(e) =>
                            updateSelectedCard(
                              "imageOffsetY",
                              Number(e.target.value),
                            )
                          }
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>Image Scale</span>
                        <input
                          type="number"
                          step="0.05"
                          min="0.2"
                          max="5"
                          value={selectedCard.imageScale}
                          onChange={(e) =>
                            updateSelectedCard(
                              "imageScale",
                              Math.max(
                                0.2,
                                Math.min(5, Number(e.target.value)),
                              ),
                            )
                          }
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span>BR x,y</span>
                        <input
                          type="text"
                          value={`${selectedCard.brx}, ${selectedCard.bry}`}
                          readOnly
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1 text-white/75"
                        />
                      </label>
                      <label className="col-span-2 flex flex-col gap-1">
                        <span>BL x,y</span>
                        <input
                          type="text"
                          value={`${selectedCard.blx}, ${selectedCard.bly}`}
                          readOnly
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1 text-white/75"
                        />
                      </label>
                      {selectedCard.tmx !== undefined && (
                        <>
                          <label className="flex flex-col gap-1">
                            <span>TM x</span>
                            <input
                              type="number"
                              value={selectedCard.tmx}
                              onChange={(e) =>
                                setShowcaseCards((prev) =>
                                  prev.map((card, idx) =>
                                    idx === selectedCardIndex
                                      ? { ...card, tmx: Number(e.target.value) }
                                      : card,
                                  ),
                                )
                              }
                              className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                            />
                          </label>
                          <label className="flex flex-col gap-1">
                            <span>TM y</span>
                            <input
                              type="number"
                              value={selectedCard.tmy}
                              onChange={(e) =>
                                setShowcaseCards((prev) =>
                                  prev.map((card, idx) =>
                                    idx === selectedCardIndex
                                      ? { ...card, tmy: Number(e.target.value) }
                                      : card,
                                  ),
                                )
                              }
                              className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                            />
                          </label>
                        </>
                      )}
                      {selectedCard.bmx !== undefined && (
                        <>
                          <label className="flex flex-col gap-1">
                            <span>BM x</span>
                            <input
                              type="number"
                              value={selectedCard.bmx}
                              onChange={(e) =>
                                setShowcaseCards((prev) =>
                                  prev.map((card, idx) =>
                                    idx === selectedCardIndex
                                      ? { ...card, bmx: Number(e.target.value) }
                                      : card,
                                  ),
                                )
                              }
                              className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                            />
                          </label>
                          <label className="flex flex-col gap-1">
                            <span>BM y</span>
                            <input
                              type="number"
                              value={selectedCard.bmy}
                              onChange={(e) =>
                                setShowcaseCards((prev) =>
                                  prev.map((card, idx) =>
                                    idx === selectedCardIndex
                                      ? { ...card, bmy: Number(e.target.value) }
                                      : card,
                                  ),
                                )
                              }
                              className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                            />
                          </label>
                        </>
                      )}
                      <label className="col-span-2 flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCard.showText !== false}
                          onChange={(e) =>
                            setShowcaseCards((prev) =>
                              prev.map((card, index) =>
                                index === selectedCardIndex
                                  ? { ...card, showText: e.target.checked }
                                  : card,
                              ),
                            )
                          }
                          className="h-4 w-4 rounded border-white/20"
                        />
                        <span className="text-xs">Hiển thị text</span>
                      </label>
                    </div>
                  )}

                  <div className="mt-3 rounded-md border border-white/15 bg-black/55 p-2">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.09em] text-white/70">
                      JSON export {copied ? "(copied)" : ""}
                    </p>
                    <pre className="max-h-36 overflow-auto text-[10px] leading-relaxed text-white/80">
                      {exportJson}
                    </pre>
                  </div>

                  {/* Background Image Settings */}
                  <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-950/20 p-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.09em] text-amber-300">
                      Background Image
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label className="flex flex-col gap-1">
                        <span>Image URL</span>
                        <input
                          type="text"
                          value={bgImage}
                          onChange={(e) => setBgImage(e.target.value)}
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                        />
                      </label>
                      <div className="flex flex-col gap-1">
                        <span>Pick BG (file browser)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePickBgImage}
                          className="rounded-md border border-white/20 bg-white/5 px-2 py-1 text-[11px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Init JSON Export */}
                  <div className="mt-3 rounded-md border border-emerald-400/30 bg-emerald-950/20 p-2">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-[0.09em] text-emerald-300">
                        Init JSON (for initialization)
                      </p>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(initJson);
                            alert("Đã copy init JSON!");
                          } catch {
                            alert("Copy thất bại!");
                          }
                        }}
                        className="rounded border border-emerald-400/50 bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300 hover:bg-emerald-500/30"
                      >
                        Copy Init
                      </button>
                    </div>
                    <pre className="max-h-32 overflow-auto text-[10px] leading-relaxed text-white/80">
                      {initJson}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
