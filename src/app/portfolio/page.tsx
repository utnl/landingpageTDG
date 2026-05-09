"use client";

import Link from "next/link";
import { Changa_One, Nunito_Sans } from "next/font/google";
import {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
/**
 * Sàn tối thiểu (px logic); kích thước thật = max(bounds cards, min này) để JSON/export
 * không lệch scale khi chỉnh layout.
 */
const BOARD_DESIGN_MIN = { w: 1065, h: 800 } as const;

function computeBoardDesignSize(cards: CardConfig[]): {
  w: number;
  h: number;
  topPad: number;
} {
  const M = 96;
  let minY = 0;
  let maxR = 0;
  let maxB = 0;
  for (const c of cards) {
    minY = Math.min(minY, c.y);
    maxR = Math.max(maxR, c.x + c.w);
    maxB = Math.max(maxB, c.y + c.h);
  }
  const topPad = minY < 0 ? -minY : 0;
  const w = Math.max(
    BOARD_DESIGN_MIN.w,
    Math.ceil(maxR + M + SHAPE_PAD * 2),
  );
  const h = Math.max(
    BOARD_DESIGN_MIN.h,
    Math.ceil(maxB + topPad + M + SHAPE_PAD * 2),
  );
  return { w, h, topPad };
}

/** Tỉ lệ pixel gốc của public/images/bgright.png (chỉnh trong settings nếu đổi file). */
const BG_RIGHT_NATURAL = { w: 1065, h: 938 } as const;

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

/** Snapshot BG Right panel (+ scale ảnh bgright). `boardFitScale` không lưu — tính lại theo viewport. */
type PortfolioBgRightInit = {
  widthVw: number;
  heightVh: number;
  maxHeightPx: number;
  offsetX: number;
  offsetY: number;
  rotate: number;
  lockAspect: boolean;
  aspectW: number;
  aspectH: number;
  imageScale: number;
};

const PORTFOLIO_INIT_STORAGE_KEY = "portfolio-page-init-v1";

const PORTFOLIO_CARDS_INITIAL: CardConfig[] = [
  {
    id: "overdrive-top-left",
    title: "ENVIRONMENT ART",
    subtitle: "20 ART",
    image: "/images/f8e2e81a-e72c-431b-b4ec-5ab7af73ea12.png",
    align: "center",
    x: 1478,
    y: 383,
    w: 600,
    h: 600,
    rotate: -1.4,
    tlx: 183,
    tly: -416,
    trx: 141,
    try: -6,
    brx: -170,
    bry: 89,
    blx: -1095,
    bly: 62,
    imageOffsetX: -87,
    imageOffsetY: -115,
    imageScale: 1.05,
    showText: true,
  },
  {
    id: "overdrive-top-right",
    title: "OVERDRIVE",
    subtitle: "20 / ANIMATION / VFX",
    image: "/images/21f8a0a6-048f-4a5c-9946-3a89f6303fcd.png",
    align: "top",
    x: 1263,
    y: -97,
    w: 200,
    h: 149,
    rotate: 2.1,
    tlx: 10,
    tly: -388,
    trx: 49,
    try: -77,
    brx: -4,
    bry: 173,
    blx: -72,
    bly: 92,
    imageOffsetX: 33,
    imageOffsetY: -37,
    imageScale: 1.05,
    showText: true,
  },
  {
    id: "summoners-era",
    title: "summoners era",
    subtitle: "30 ART",
    image: "/images/3067c837-e030-403f-b7c5-0c7246bfe15f.png",
    align: "center",
    x: 1193,
    y: 267,
    w: 387,
    h: 170,
    rotate: 0,
    tlx: -17,
    tly: -410,
    trx: 50,
    try: -14,
    brx: -59,
    bry: 577,
    blx: -358,
    bly: 73,
    imageOffsetX: -10,
    imageOffsetY: -24,
    imageScale: 1.2,
  },
  {
    id: "environment-art",
    title: "OVERDRIVE",
    subtitle: "20 / ANIMATION / VFX",
    image: "/images/f0d05f71-5089-4b3f-b453-7a8d19afc013.png",
    align: "center",
    x: 1546,
    y: -35,
    w: 439,
    h: 171,
    rotate: 0,
    tlx: -17,
    tly: -234,
    trx: -39,
    try: -26,
    brx: -138,
    bry: 293,
    blx: -68,
    bly: 43,
    imageOffsetX: -39,
    imageOffsetY: -28,
    imageScale: 1.05,
    showText: true,
  },
  {
    id: "hexagon-card",
    title: "SQUARE",
    subtitle: "AUTO CROP",
    image: "/images/xoa_nen_vip_pro.png",
    align: "center",
    x: 316,
    y: 124,
    w: 934,
    h: 899,
    rotate: -39.2,
    zIndex: 1,
    tlx: -140,
    tly: 55,
    trx: 319,
    try: -149,
    brx: 489,
    bry: 363,
    blx: -456,
    bly: 157,
    imageOffsetX: 120,
    imageOffsetY: 74,
    imageScale: 0.95,
    showText: true,
  },
];

const PORTFOLIO_BG_RIGHT_INITIAL: PortfolioBgRightInit = {
  widthVw: 70,
  heightVh: 86,
  maxHeightPx: 938,
  offsetX: 196,
  offsetY: 89,
  rotate: 0,
  lockAspect: true,
  aspectW: 1065,
  aspectH: 938,
  imageScale: 1.2,
};

/** Khớp Init JSON export (không derive từ compute để tránh lệch 1px). */
const PORTFOLIO_DESIGN_CANVAS_INITIAL: {
  w: number;
  h: number;
  topPad: number;
} = {
  w: 1985,
  h: 1224,
  topPad: 50,
};

const PORTFOLIO_PAGE_DEFAULTS = {
  board: BOARD_CONFIG,
  background: "/images/a0a5dab6-1e06-4a1b-af95-af0b51fc27e6.png",
  designCanvas: PORTFOLIO_DESIGN_CANVAS_INITIAL,
  bgRight: PORTFOLIO_BG_RIGHT_INITIAL,
  cards: PORTFOLIO_CARDS_INITIAL,
};

function applyPortfolioInitPayload(
  data: Record<string, unknown>,
  apply: {
    setBgImage: (v: string) => void;
    setBgRightWidthVw: (v: number) => void;
    setBgRightHeightVh: (v: number) => void;
    setBgRightMaxHeightPx: (v: number) => void;
    setBgRightOffsetX: (v: number) => void;
    setBgRightOffsetY: (v: number) => void;
    setBgRightRotate: (v: number) => void;
    setBgRightLockAspect: (v: boolean) => void;
    setBgRightAspectW: (v: number) => void;
    setBgRightAspectH: (v: number) => void;
    setBgRightImageScale: (v: number) => void;
    setBoardCanvas: (v: { w: number; h: number; topPad: number }) => void;
    setShowcaseCards: (v: CardConfig[]) => void;
  },
) {
  if (typeof data.background === "string") apply.setBgImage(data.background);

  if (data.designCanvas && typeof data.designCanvas === "object") {
    const d = data.designCanvas as Record<string, unknown>;
    const w = Number(d.width);
    const h = Number(d.height);
    const topPad = Number(d.topPad);
    if (
      Number.isFinite(w) &&
      Number.isFinite(h) &&
      Number.isFinite(topPad)
    ) {
      apply.setBoardCanvas({ w, h, topPad });
    }
  }

  if (data.bgRight && typeof data.bgRight === "object") {
    const b = data.bgRight as Record<string, unknown>;
    const num = (k: string) => {
      const v = Number(b[k]);
      return Number.isFinite(v) ? v : null;
    };
    const nw = num("widthVw");
    if (nw !== null) apply.setBgRightWidthVw(nw);
    const nh = num("heightVh");
    if (nh !== null) apply.setBgRightHeightVh(nh);
    const nm = num("maxHeightPx");
    if (nm !== null) apply.setBgRightMaxHeightPx(nm);
    const ox = num("offsetX");
    if (ox !== null) apply.setBgRightOffsetX(ox);
    const oy = num("offsetY");
    if (oy !== null) apply.setBgRightOffsetY(oy);
    const rot = num("rotate");
    if (rot !== null) apply.setBgRightRotate(rot);
    if (typeof b.lockAspect === "boolean")
      apply.setBgRightLockAspect(b.lockAspect);
    const aw = num("aspectW");
    if (aw !== null) apply.setBgRightAspectW(aw);
    const ah = num("aspectH");
    if (ah !== null) apply.setBgRightAspectH(ah);
    const ims = num("imageScale");
    if (ims !== null) apply.setBgRightImageScale(ims);
  }

  if (Array.isArray(data.cards)) {
    apply.setShowcaseCards(data.cards as CardConfig[]);
  }
}

export default function PortfolioPage() {
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [bgImage, setBgImage] = useState(PORTFOLIO_PAGE_DEFAULTS.background);
  const [bgRightWidthVw, setBgRightWidthVw] = useState(
    PORTFOLIO_PAGE_DEFAULTS.bgRight.widthVw,
  );
  const [bgRightHeightVh, setBgRightHeightVh] = useState(
    PORTFOLIO_PAGE_DEFAULTS.bgRight.heightVh,
  );
  const [bgRightMaxHeightPx, setBgRightMaxHeightPx] = useState(
    PORTFOLIO_PAGE_DEFAULTS.bgRight.maxHeightPx,
  );
  const [bgRightOffsetX, setBgRightOffsetX] = useState(
    PORTFOLIO_PAGE_DEFAULTS.bgRight.offsetX,
  );
  const [bgRightOffsetY, setBgRightOffsetY] = useState(
    PORTFOLIO_PAGE_DEFAULTS.bgRight.offsetY,
  );
  /** Xoay riêng nền bgright (card vẫn dùng BOARD_CONFIG.rotate). */
  const [bgRightRotate, setBgRightRotate] = useState(
    PORTFOLIO_PAGE_DEFAULTS.bgRight.rotate,
  );
  /** Bật: chiều cao khối theo đúng tỉ lệ ảnh (width vw × aspect). Tắt: dùng vh + max px như cũ. */
  const [bgRightLockAspect, setBgRightLockAspect] = useState(
    PORTFOLIO_PAGE_DEFAULTS.bgRight.lockAspect,
  );
  const [bgRightAspectW, setBgRightAspectW] = useState<number>(
    PORTFOLIO_PAGE_DEFAULTS.bgRight.aspectW,
  );
  const [bgRightAspectH, setBgRightAspectH] = useState<number>(
    PORTFOLIO_PAGE_DEFAULTS.bgRight.aspectH,
  );
  const [bgRightImageScale, setBgRightImageScale] = useState(
    PORTFOLIO_PAGE_DEFAULTS.bgRight.imageScale,
  );
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [pickHint, setPickHint] = useState<string | null>(null);

  const [showcaseCards, setShowcaseCards] = useState<CardConfig[]>(
    PORTFOLIO_PAGE_DEFAULTS.cards,
  );
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [interaction, setInteraction] = useState<InteractionState>(null);
  const [lockLayout, setLockLayout] = useState(false);

  const bgrightSlotRef = useRef<HTMLDivElement>(null);
  const [boardFitScale, setBoardFitScale] = useState(1);

  /**
   * Canvas scale/topPad cố định trong lúc kéo; không tính lại mỗi frame (tránh cả khối nhảy).
   * Bấm “Refit canvas” sau khi dịch layout xa; Init JSON / localStorage khôi phục designCanvas + bgRight.
   */
  const [boardCanvas, setBoardCanvas] = useState({
    w: PORTFOLIO_PAGE_DEFAULTS.designCanvas.w,
    h: PORTFOLIO_PAGE_DEFAULTS.designCanvas.h,
    topPad: PORTFOLIO_PAGE_DEFAULTS.designCanvas.topPad,
  });

  const runApplyInitPayload = (data: Record<string, unknown>) => {
    applyPortfolioInitPayload(data, {
      setBgImage,
      setBgRightWidthVw,
      setBgRightHeightVh,
      setBgRightMaxHeightPx,
      setBgRightOffsetX,
      setBgRightOffsetY,
      setBgRightRotate,
      setBgRightLockAspect,
      setBgRightAspectW,
      setBgRightAspectH,
      setBgRightImageScale,
      setBoardCanvas,
      setShowcaseCards,
    });
  };

  const portfolioHydratedRef = useRef(false);
  useLayoutEffect(() => {
    if (portfolioHydratedRef.current) return;
    portfolioHydratedRef.current = true;
    try {
      const raw = localStorage.getItem(PORTFOLIO_INIT_STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as unknown;
      if (data && typeof data === "object") {
        runApplyInitPayload(data as Record<string, unknown>);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const boardDesignSize = boardCanvas;

  useLayoutEffect(() => {
    const el = bgrightSlotRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w < 2 || h < 2) return;
      const s = Math.min(
        w / boardDesignSize.w,
        h / boardDesignSize.h,
      );
      setBoardFitScale(s > 0 ? s : 1);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [boardDesignSize.w, boardDesignSize.h]);

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

  const bgRightExport = useMemo(
    (): PortfolioBgRightInit => ({
      widthVw: bgRightWidthVw,
      heightVh: bgRightHeightVh,
      maxHeightPx: bgRightMaxHeightPx,
      offsetX: bgRightOffsetX,
      offsetY: bgRightOffsetY,
      rotate: bgRightRotate,
      lockAspect: bgRightLockAspect,
      aspectW: bgRightAspectW,
      aspectH: bgRightAspectH,
      imageScale: bgRightImageScale,
    }),
    [
      bgRightWidthVw,
      bgRightHeightVh,
      bgRightMaxHeightPx,
      bgRightOffsetX,
      bgRightOffsetY,
      bgRightRotate,
      bgRightLockAspect,
      bgRightAspectW,
      bgRightAspectH,
      bgRightImageScale,
    ],
  );

  const exportJson = useMemo(
    () =>
      JSON.stringify(
        {
          board: {
            ...BOARD_CONFIG,
          },
          background: bgImage,
          designCanvas: {
            width: boardDesignSize.w,
            height: boardDesignSize.h,
            topPad: boardDesignSize.topPad,
          },
          bgRight: bgRightExport,
          cards: showcaseCards,
        },
        null,
        2,
      ),
    [showcaseCards, bgImage, boardDesignSize, bgRightExport],
  );

  const initJson = useMemo(
    () =>
      JSON.stringify(
        {
          board: BOARD_CONFIG,
          background: bgImage,
          designCanvas: {
            width: boardDesignSize.w,
            height: boardDesignSize.h,
            topPad: boardDesignSize.topPad,
          },
          bgRight: bgRightExport,
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
    [showcaseCards, bgImage, boardDesignSize, bgRightExport],
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
      const z = Math.max(boardFitScale, 0.001);
      setShowcaseCards((prev) =>
        prev.map((card, index) => {
          if (index !== interaction.index) return card;

          if (interaction.mode === "drag") {
            const nextX = Math.round(
              interaction.originX +
                (event.clientX - interaction.startX) / z,
            );
            const nextY = Math.round(
              interaction.originY +
                (event.clientY - interaction.startY) / z,
            );
            return { ...card, x: nextX, y: nextY };
          }

          if (interaction.mode === "corner") {
            const dx = Math.round((event.clientX - interaction.startX) / z);
            const dy = Math.round((event.clientY - interaction.startY) / z);
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
            const dx = Math.round((event.clientX - interaction.startX) / z);
            const dy = Math.round((event.clientY - interaction.startY) / z);
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
              interaction.originX +
                (event.clientX - interaction.startX) / z,
            );
            const nextOffsetY = Math.round(
              interaction.originY +
                (event.clientY - interaction.startY) / z,
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
                ((event.clientX - interaction.startX) / z) * 0.35) *
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
  }, [interaction, boardFitScale]);

  // boardScale removed (rollback)

  useEffect(() => {
    fetchAvailableImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SHOW_CARDS = true;

  return (
    <>
      <SiteHeader />
      <main
        className={`relative min-h-screen overflow-hidden bg-black ${nunitoSans.className}`}
      >
        {/* Card Controller: fixed trên viewport, không nằm trong khối có transform */}
        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setSettingsOpen(!settingsOpen)}
          className={`hidden lg:block fixed left-4 top-28 z-[100] rounded-full border border-white/30 bg-black/75 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/90 ${settingsOpen ? "bg-amber-500/20 border-amber-400/50" : ""}`}
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
          <div className="hidden lg:block fixed left-4 top-[11rem] z-[100] max-h-[min(70vh,calc(100dvh-12rem))] w-[min(380px,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-white/30 bg-black/75 p-4 text-white shadow-xl backdrop-blur-sm">
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
                  onClick={() =>
                    setBoardCanvas(computeBoardDesignSize(showcaseCards))
                  }
                  className="rounded-md border border-sky-400/60 bg-sky-500/25 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-sky-200"
                  title="Tính lại khung canvas theo vị trí cards hiện tại (sau khi kéo xa)"
                >
                  Refit canvas
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


            {/* BG Right Layout (bgright.png) */}
            <div className="mt-3 rounded-md border border-white/15 bg-black/55 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.09em] text-white/80">
                BG Right Layout (bgright.png)
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex flex-col gap-1">
                  <span>Width (vw)</span>
                  <input
                    type="number"
                    min={20}
                    max={100}
                    value={bgRightWidthVw}
                    onChange={(e) =>
                      setBgRightWidthVw(Number(e.target.value))
                    }
                    className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span>Height (vh)</span>
                  <input
                    type="number"
                    min={20}
                    max={100}
                    value={bgRightHeightVh}
                    onChange={(e) =>
                      setBgRightHeightVh(Number(e.target.value))
                    }
                    className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span>Max height (px)</span>
                  <input
                    type="number"
                    min={200}
                    max={2000}
                    value={bgRightMaxHeightPx}
                    onChange={(e) =>
                      setBgRightMaxHeightPx(Number(e.target.value))
                    }
                    className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span>Offset X (px)</span>
                  <input
                    type="number"
                    value={bgRightOffsetX}
                    onChange={(e) => setBgRightOffsetX(Number(e.target.value))}
                    className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span>Offset Y (px)</span>
                  <input
                    type="number"
                    value={bgRightOffsetY}
                    onChange={(e) => setBgRightOffsetY(Number(e.target.value))}
                    className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                  />
                </label>
                <label className="col-span-2 flex flex-col gap-1">
                  <span>Rotate nền (deg)</span>
                  <input
                    type="number"
                    step="0.5"
                    value={bgRightRotate}
                    onChange={(e) => setBgRightRotate(Number(e.target.value))}
                    className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                  />
                </label>
                <label className="col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={bgRightLockAspect}
                    onChange={(e) => setBgRightLockAspect(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20"
                  />
                  <span>Giữ tỉ lệ W:H</span>
                </label>
                <label className="flex flex-col gap-1">
                  <span>Tỉ lệ W (px)</span>
                  <input
                    type="number"
                    min={1}
                    value={bgRightAspectW}
                    onChange={(e) =>
                      setBgRightAspectW(Math.max(1, Number(e.target.value)))
                    }
                    className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span>Tỉ lệ H (px)</span>
                  <input
                    type="number"
                    min={1}
                    value={bgRightAspectH}
                    onChange={(e) =>
                      setBgRightAspectH(Math.max(1, Number(e.target.value)))
                    }
                    className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                  />
                </label>
                <label className="col-span-2 flex flex-col gap-1">
                  <span>Scale ảnh bgright</span>
                  <input
                    type="number"
                    step="0.05"
                    min="0.25"
                    max="4"
                    value={bgRightImageScale}
                    onChange={(e) =>
                      setBgRightImageScale(
                        Math.max(0.25, Math.min(4, Number(e.target.value))),
                      )
                    }
                    className="rounded-md border border-white/20 bg-white/5 px-2 py-1"
                  />
                </label>
              </div>
            </div>

            {/* Init JSON Export */}
            <div className="mt-3 rounded-md border border-emerald-400/30 bg-emerald-950/20 p-2">
              <p className="mb-1 text-[9px] leading-snug text-white/55">
                Có <strong className="text-emerald-200/90">bgRight.imageScale</strong>{" "}
                và layout nền.{" "}
                <strong className="text-emerald-200/90">boardFitScale</strong> theo
                khung trình duyệt — không export, F5 vẫn đúng nếu lưu Init.
              </p>
              <div className="mb-1 flex flex-wrap items-center justify-end gap-1">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(initJson);
                      try {
                        localStorage.setItem(
                          PORTFOLIO_INIT_STORAGE_KEY,
                          initJson,
                        );
                      } catch {
                        /* ignore */
                      }
                      alert(
                        "Đã copy Init + lưu trình duyệt (F5 khôi phục cùng scale/offset).",
                      );
                    } catch {
                      alert("Copy thất bại!");
                    }
                  }}
                  className="rounded border border-emerald-400/50 bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300 hover:bg-emerald-500/30"
                >
                  Copy Init + lưu F5
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      const data = JSON.parse(text) as unknown;
                      if (!data || typeof data !== "object") {
                        alert("JSON không hợp lệ.");
                        return;
                      }
                      runApplyInitPayload(data as Record<string, unknown>);
                      try {
                        localStorage.setItem(PORTFOLIO_INIT_STORAGE_KEY, text);
                      } catch {
                        /* ignore */
                      }
                      alert("Đã dán Init + lưu F5.");
                    } catch {
                      alert("Clipboard / JSON lỗi.");
                    }
                  }}
                  className="rounded border border-emerald-400/50 bg-white/10 px-2 py-0.5 text-[10px] text-white/90 hover:bg-white/15"
                >
                  Dán Init
                </button>
              </div>
              <p className="text-[10px] uppercase tracking-[0.09em] text-emerald-300">
                Init JSON
              </p>
              <pre className="mt-1 max-h-32 overflow-auto text-[10px] leading-relaxed text-white/80">
                {initJson}
              </pre>
            </div>
          </div>
        )}
        <section
          className="relative z-10 mx-auto flex min-h-screen items-center"
          style={{ width: "var(--layout-width, 75%)" }}
        >
          <div className="relative flex w-full items-center py-24 pt-28 sm:pt-32 lg:min-h-screen">
            <div
              className="relative z-20 max-w-[606px] tracking-[0.5px]"
              style={{ transform: "translateY(var(--hero-text-y, 0px))" }}
            >
                <div className="mb-[-10px] overflow-hidden">
                  <div
                    className={`leading-[1] font-black uppercase text-white ${changaOne.className}`}
                    style={{ fontSize: "var(--hero-title-size, 100px)" }}
                  >
                    OUR{" "}
                    <span
                      style={{
                        color: "var(--hero-highlight-color, #f59e0b)",
                      }}
                    >
                      PROJECTS
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div
                    className="h-0.5 w-12 shrink-0"
                    style={{
                      backgroundColor: "var(--hero-subtitle-color, #f59e0b)",
                    }}
                  />
                  <h3
                    className="font-bold uppercase tracking-[0.3em]"
                    style={{
                      fontSize: "var(--hero-subtitle-size, 16px)",
                      color: "var(--hero-subtitle-color, #f59e0b)",
                    }}
                  >
                    Take a look at our game art projects!
                  </h3>
                </div>

                <p
                  className="mb-[15px] mt-4 max-w-[547px] leading-normal"
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

                <div className="mb-[15px] mt-[32px]">
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

            <div
              ref={bgrightSlotRef}
              className="absolute right-0 top-0 z-0 max-w-none"
              style={{
                width: `${bgRightWidthVw}vw`,
                ...(bgRightLockAspect
                  ? {
                      aspectRatio: `${bgRightAspectW} / ${bgRightAspectH}`,
                      maxHeight: `min(${bgRightHeightVh}vh, ${bgRightMaxHeightPx}px)`,
                    }
                  : {
                      height: `min(${bgRightHeightVh}vh, ${bgRightMaxHeightPx}px)`,
                    }),
                transform: `translate(${bgRightOffsetX}px, ${bgRightOffsetY}px)`,
              }}
            >
              <div className="relative h-full w-full min-h-0 overflow-hidden">
                <div
                  className="absolute"
                  style={{
                    right: 0,
                    top: "50%",
                    width: boardDesignSize.w,
                    height: boardDesignSize.h,
                    transform: `translateY(-50%) scale(${boardFitScale})`,
                    transformOrigin: "center right",
                  }}
                >
              <div
                className="relative h-full w-full"
                style={{
                  transform: `translate(${BOARD_CONFIG.translateX}px, ${BOARD_CONFIG.translateY + boardDesignSize.topPad}px)`,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transform: `rotate(${bgRightRotate}deg)`,
                    transformOrigin: "center center",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/bgright.png"
                    alt=""
                    className={`pointer-events-none absolute inset-0 h-full w-full select-none object-right ${
                      bgRightLockAspect ? "object-contain" : "object-cover"
                    }`}
                    style={{
                      transform: `scale(${bgRightImageScale})`,
                      transformOrigin: "center right",
                    }}
                  />
                </div>

                <div
                  className="absolute inset-0"
                  style={{
                    transform: `rotate(${BOARD_CONFIG.rotate}deg)`,
                    transformOrigin: "center center",
                  }}
                >
                  {SHOW_CARDS &&
                    showcaseCards.map((card, index) =>
                      (() => {
                        const poly = getPolygon(card);
                        const clipPath = `polygon(${poly.points
                          .map(
                            (p) => `${p.x + SHAPE_PAD}px ${p.y + SHAPE_PAD}px`,
                          )
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
                                    card.imageFit === "contain"
                                      ? "object-contain"
                                      : "object-cover"
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
                                          const cornerKey =
                                            handle.key as CornerKey;
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
                      })()
                    )}
                </div>
              </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
