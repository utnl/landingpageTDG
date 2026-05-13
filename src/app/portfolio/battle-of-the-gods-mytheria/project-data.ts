const DISP = "https://mir-s3-cdn-cf.behance.net/project_modules/disp";
const W1400 = "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp";

export const projectMeta = {
  title: "Battle of the Gods | Mytheria - Login Screen",
  eyebrow: "Case study",
  summary:
    "Login-screen package for Mytheria — Battle of the Gods. Six character animation loops with VFX, plus a hero reveal cinematic intro tuned for the title screen.",
  heroFacts: [
    { value: "Jan 2022", label: "Published", icon: "calendar" },
    { value: "Mytheria (Mobile)", label: "Project type", icon: "cube" },
    { value: "Ae · Ps · Spine", label: "Pipeline", icon: "users" },
  ] as const,
  deliverables: [
    "Cinematic intro composite",
    "6 hero login loops with VFX",
    "Final motion graphics banner",
  ] as const,
  overview: {
    body: "A login-screen drop for Mytheria — Battle of the Gods. We delivered a short cinematic intro, six character motion + VFX loops shown two-up to compare poses and effects, and a final banner that ties the lineup together for marketing.",
    stats: [
      { value: "112", label: "Appreciations" },
      { value: "1.9K", label: "Views" },
      { value: "6", label: "Hero loops" },
      { value: "3", label: "Fields" },
    ],
  },
  behanceUrl:
    "https://www.behance.net/gallery/134047127/Battle-of-the-Gods-Mytheria-Login-Screen",
  madeForLabel: "AnimVFX Clan",
  madeForUrl: "https://www.behance.net/AnimVFXClan",
  coverImage:
    "https://mir-s3-cdn-cf.behance.net/projects/max_808/d5b456134047127.Y3JvcCwyMzkyLDE4NzAsMCww.png",
  videoEmbed:
    "https://player.vimeo.com/video/661196669?h=913b280609&badge=0&autopause=0",
  tools: ["After Effects", "Photoshop", "Spine 2D"] as const,
  fields: ["Animation", "Motion Graphics", "Visual Effects"] as const,
  tags: [
    "battle",
    "character animation",
    "effect",
    "gods",
    "login screen",
    "motion graphics",
    "mytheria",
  ] as const,
} as const;

export type ShowcaseModule =
  | { id: string; variant: "video"; src: string }
  | { id: string; variant: "duo"; srcs: [string, string] }
  | { id: string; variant: "full"; src: string };

export const showcaseModules: readonly ShowcaseModule[] = [
  {
    id: "m01",
    variant: "video",
    src: "https://player.vimeo.com/video/661196669?h=913b280609&badge=0&autopause=0",
  },
  {
    id: "m02",
    variant: "duo",
    srcs: [
      `${DISP}/c93cb1134047127.61cc8d2109d9f.gif`,
      `${DISP}/9acf03134047127.61cc8d210963c.gif`,
    ],
  },
  {
    id: "m03",
    variant: "duo",
    srcs: [
      `${DISP}/cc307d134047127.61cc8d221c65f.gif`,
      `${DISP}/960fcf134047127.61cc8d221ca32.gif`,
    ],
  },
  {
    id: "m04",
    variant: "duo",
    srcs: [
      `${DISP}/5841f2134047127.61cc8d22e8351.gif`,
      `${DISP}/bb3efc134047127.61cc8d22e7ddc.gif`,
    ],
  },
  {
    id: "m05",
    variant: "full",
    src: `${W1400}/489aca134047127.61cdce85c2c17.png`,
  },
] as const;

export const relatedProjects = [
  {
    id: "summoner-era-heroes",
    title: "ANIMATION/VFX - HEROES LIGHT/DARK | SUMMONER ERA",
    href: "/portfolio/summoner-era",
    internal: true as const,
    badge: "Case study",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/a8f476199358443.Y3JvcCwxOTgxLDE1NTAsOSww.jpg",
    appreciations: "208",
    views: "2.3K",
  },
  {
    id: "heroes-fire",
    title: "ANIMATION/VFX - HEROES FIRE | SUMMONER ERA",
    href: "/portfolio/heroes-fire",
    internal: true as const,
    badge: "Case study",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/d50de7152527397.Y3JvcCwxOTgxLDE1NTAsOSww.png",
    appreciations: "627",
    views: "6.0K",
  },
  {
    id: "summoner-era-2020",
    title: "Summoner Era - Login Screen Animations (2020)",
    href: "/portfolio/summoner-era-2020",
    internal: true as const,
    badge: "Case study",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/1efef4144430837.Y3JvcCwxOTgxLDE1NTAsOSww.jpg",
    appreciations: "89",
    views: "1.7K",
  },
  {
    id: "game-animation-vfx-3q",
    title: "GAME ANIMATION/VFX - 3Q",
    href: "/portfolio/game-animation-vfx-3q",
    internal: true as const,
    badge: "Case study",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/c4e25d143388227.Y3JvcCwxOTgxLDE1NTAsOSww.png",
    appreciations: "193",
    views: "2.5K",
  },
  {
    id: "kayn-snow-moon",
    title: "Kayn Snow Moon | League of Legends - Login Screen",
    href: "/portfolio/kayn-snow-moon",
    internal: true as const,
    badge: "Case study",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/5ad036149524063.Y3JvcCwxOTgxLDE1NTAsMCww.png",
    appreciations: "446",
    views: "7.5K",
  },
  {
    id: "boss-animation",
    title: "BOSS ANIMATION - THE TWINS",
    href: "/portfolio/boss-animation",
    internal: true as const,
    badge: "Case study",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/9e2264152981257.Y3JvcCwxOTgxLDE1NTAsOSww.png",
    appreciations: "261",
    views: "3.0K",
  },
  {
    id: "axie-infinity-origins",
    title: "Axie Infinity - Origins | Animation",
    href: "/portfolio/axie-infinity-origins",
    internal: true as const,
    badge: "Case study",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/924075153491527.Y3JvcCwxOTgxLDE1NTAsOSww.png",
    appreciations: "1.1K",
    views: "12.2K",
  },
  {
    id: "horse-racing",
    title: "Horse Racing - Splash Art Animation",
    href: "/portfolio/horse-racing",
    internal: true as const,
    badge: "Case study",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/cad425183792791.Y3JvcCwyMzkyLDE4NzAsMCww.jpg",
    appreciations: "143",
    views: "1.7K",
  },
  {
    id: "animation-contest-sky-mavis",
    title: "Animation Contest - Sky Mavis",
    href: "/portfolio/animation-contest-sky-mavis",
    internal: true as const,
    badge: "Case study",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/33e83e130561969.Y3JvcCwxOTgxLDE1NTAsOSww.png",
    appreciations: "218",
    views: "3.2K",
  },
] as const;
