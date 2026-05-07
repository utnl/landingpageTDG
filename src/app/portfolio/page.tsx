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
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
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
};

type CornerKey = "tl" | "tr" | "br" | "bl";
const SHAPE_PAD = 120;

type InteractionState =
  | { mode: "drag"; index: number; startX: number; startY: number; originX: number; originY: number }
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
      mode: "imagePan";
      index: number;
      startX: number;
      startY: number;
      originX: number;
      originY: number;
    }
  | null;

export default function PortfolioPage() {
  const boardConfig = {
    translateX: 36,
    translateY: 8,
    rotate: 24,
    height: 520,
  };

  const [showcaseCards, setShowcaseCards] = useState<CardConfig[]>([
    {
      id: "overdrive-top-left",
      title: "OVERDRIVE",
      subtitle: "20 / ANIMATION / VFX",
      image: "/images/trieuvan.png",
      align: "top",
      x: 511,
      y: 201,
      w: 259,
      h: 600,
      rotate: 23.1,
      tlx: -157,
      tly: -21,
      trx: 296,
      try: -97,
      brx: 633,
      bry: -183,
      blx: -294,
      bly: -28,
      imageOffsetX: 0,
      imageOffsetY: 0,
      imageScale: 1,
    },
    {
      id: "overdrive-top-right",
      title: "OVERDRIVE",
      subtitle: "20 / ANIMATION / VFX",
      image: "/images/trieuvan.png",
      align: "top",
      x: 281,
      y: -49,
      w: 168,
      h: 96,
      rotate: 0,
      tlx: 35,
      tly: -100,
      trx: 6,
      try: -109,
      brx: -26,
      bry: 28,
      blx: 0,
      bly: 0,
      imageOffsetX: 0,
      imageOffsetY: 0,
      imageScale: 1,
    },
    {
      id: "summoners-era",
      title: "summoners era",
      subtitle: "30 ART",
      image: "/images/ourproject.jpg",
      x: 239,
      y: 173,
      w: 342,
      h: 136,
      rotate: 0,
      tlx: 39,
      tly: -130,
      trx: -53,
      try: -71,
      brx: -178,
      bry: 63,
      blx: -23,
      bly: -17,
      align: "center",
      imageOffsetX: 0,
      imageOffsetY: 0,
      imageScale: 1,
    },
    {
      id: "environment-art",
      title: "ENVIRONMENT ART",
      subtitle: "20 ART",
      image: "/images/ourproject.jpg",
      x: 431,
      y: -36,
      w: 342,
      h: 112,
      rotate: 0,
      tlx: 29,
      tly: -203,
      trx: -13,
      try: -96,
      brx: 4,
      bry: 71,
      blx: 0,
      bly: 0,
      align: "bottom",
      imageOffsetX: 0,
      imageOffsetY: 0,
      imageScale: 1,
    },
  ]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [interaction, setInteraction] = useState<InteractionState>(null);
  const [lockLayout] = useState(true);

  const selectedCard = showcaseCards[selectedCardIndex];

  const updateSelectedCard = (
    key: keyof Pick<
      CardConfig,
      | "x"
      | "y"
      | "w"
      | "h"
      | "rotate"
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

  const handleSelectImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    updateSelectedImage(localUrl);
    event.target.value = "";
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
    return { tl, tr, br, bl };
  };

  const exportJson = useMemo(
    () =>
      JSON.stringify(
        {
          board: {
            ...boardConfig,
          },
          cards: showcaseCards,
        },
        null,
        2,
      ),
    [boardConfig, showcaseCards],
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
            const nextX = Math.round(interaction.originX + (event.clientX - interaction.startX));
            const nextY = Math.round(interaction.originY + (event.clientY - interaction.startY));
            return { ...card, x: nextX, y: nextY };
          }

          if (interaction.mode === "corner") {
            const dx = Math.round(event.clientX - interaction.startX);
            const dy = Math.round(event.clientY - interaction.startY);
            const nextX = interaction.originX + dx;
            const nextY = interaction.originY + dy;

            if (interaction.corner === "tl") return { ...card, tlx: nextX, tly: nextY };
            if (interaction.corner === "tr") return { ...card, trx: nextX, try: nextY };
            if (interaction.corner === "br") return { ...card, brx: nextX, bry: nextY };
            return { ...card, blx: nextX, bly: nextY };
          }

          if (interaction.mode === "imagePan") {
            const nextOffsetX = Math.round(
              interaction.originX + (event.clientX - interaction.startX),
            );
            const nextOffsetY = Math.round(
              interaction.originY + (event.clientY - interaction.startY),
            );
            return { ...card, imageOffsetX: nextOffsetX, imageOffsetY: nextOffsetY };
          }

          const nextRotate = Math.round((interaction.originRotate + (event.clientX - interaction.startX) * 0.35) * 10) / 10;
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

  return (
    <>
      <SiteHeader />
      <main className={`relative min-h-screen overflow-hidden bg-[#0a0a0a] ${nunitoSans.className}`}>
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/trieuvan.png"
            alt="Our projects — game art showcase"
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

            <div className="absolute right-0 top-0 hidden w-full max-w-[620px] lg:block">
              <div className="absolute -inset-4 rounded-[34px] bg-[radial-gradient(circle_at_30%_60%,rgba(34,124,255,0.28),transparent_62%)] blur-2xl" />
              <div
                className="relative"
                style={{
                  height: `${boardConfig.height}px`,
                  transform: `translate(${boardConfig.translateX}px, ${boardConfig.translateY}px) rotate(${boardConfig.rotate}deg)`,
                }}
              >
                {showcaseCards.map((card, index) => (
                  (() => {
                    const points = getCardPoints(card);
                    const clipPath = `polygon(${points.tl.x + SHAPE_PAD}px ${points.tl.y + SHAPE_PAD}px, ${points.tr.x + SHAPE_PAD}px ${points.tr.y + SHAPE_PAD}px, ${points.br.x + SHAPE_PAD}px ${points.br.y + SHAPE_PAD}px, ${points.bl.x + SHAPE_PAD}px ${points.bl.y + SHAPE_PAD}px)`;

                    return (
                      <article
                        key={card.id}
                        className={`group absolute overflow-visible shadow-[0_14px_40px_rgba(0,0,0,0.55)] ${
                      selectedCardIndex === index
                        ? "z-20"
                        : "z-10"
                    } ${interaction?.index === index ? "cursor-grabbing" : "cursor-grab"}`}
                        style={{
                          left: `${card.x}px`,
                          top: `${card.y}px`,
                          width: `${card.w}px`,
                          height: `${card.h}px`,
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
                              transform: `rotate(${-(boardConfig.rotate + card.rotate)}deg) scale(${card.imageScale})`,
                              transformOrigin: "center",
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={card.image}
                              alt={card.title}
                              className={`absolute inset-0 h-full w-full object-cover ${
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
                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                              <p className="text-[10px] font-black uppercase tracking-[0.08em]">
                                {card.title}
                              </p>
                              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.11em] text-white/90">
                                {card.subtitle}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* Black border - outside clip-path */}
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
                            points={`${points.tl.x + SHAPE_PAD},${points.tl.y + SHAPE_PAD} ${points.tr.x + SHAPE_PAD},${points.tr.y + SHAPE_PAD} ${points.br.x + SHAPE_PAD},${points.br.y + SHAPE_PAD} ${points.bl.x + SHAPE_PAD},${points.bl.y + SHAPE_PAD}`}
                            fill="none"
                            stroke="black"
                            strokeWidth="10"
                          />
                        </svg>
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
                        {(
                          [
                            { key: "tl", point: points.tl },
                            { key: "tr", point: points.tr },
                            { key: "br", point: points.br },
                            { key: "bl", point: points.bl },
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
                            style={{ left: `${handle.point.x}px`, top: `${handle.point.y}px` }}
                            title={`Corner ${handle.key.toUpperCase()}`}
                          />
                        ))}
                      </>
                    )}
                      </article>
                    );
                  })()
                ))}
              </div>

              <div className="absolute left-[-430px] top-[180px] z-50 max-h-[70vh] w-[380px] overflow-y-auto rounded-2xl border border-white/30 bg-black/75 p-4 text-white backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-[0.09em] text-amber-300">
                    Card Controller
                  </p>
                  <button
                    type="button"
                    onClick={handleExportCoordinates}
                    className="rounded-md border border-amber-300/70 bg-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-black"
                  >
                    Xuat toa do
                  </button>
                </div>
                <p className="mb-3 text-[11px] text-white/70">
                  Layout dang khoa de giu nguyen khung cat/xoay. Ban chi can thay image cho tung card.
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
                    <label className="flex flex-col gap-1">
                      <span>Chon anh</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSelectImageFile}
                        className="rounded-md border border-white/20 bg-white/5 px-2 py-1 text-[11px]"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span>X</span>
                      <input
                        type="number"
                        value={selectedCard.x}
                        onChange={(e) => updateSelectedCard("x", Number(e.target.value))}
                        className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span>Y</span>
                      <input
                        type="number"
                        value={selectedCard.y}
                        onChange={(e) => updateSelectedCard("y", Number(e.target.value))}
                        className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span>W</span>
                      <input
                        type="number"
                        value={selectedCard.w}
                        onChange={(e) => updateSelectedCard("w", Number(e.target.value))}
                        className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span>H</span>
                      <input
                        type="number"
                        value={selectedCard.h}
                        onChange={(e) => updateSelectedCard("h", Number(e.target.value))}
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
                      <span>Image X</span>
                      <input
                        type="number"
                        value={selectedCard.imageOffsetX}
                        onChange={(e) =>
                          updateSelectedCard("imageOffsetX", Number(e.target.value))
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
                          updateSelectedCard("imageOffsetY", Number(e.target.value))
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
                            Math.max(0.2, Math.min(5, Number(e.target.value))),
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
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
