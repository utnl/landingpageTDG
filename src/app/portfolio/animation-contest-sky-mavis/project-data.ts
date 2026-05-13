const M = "https://mir-s3-cdn-cf.behance.net/project_modules/1400";
const MW = "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp";

export const projectMeta = {
  title: "Animation Contest - Sky Mavis",
  eyebrow: "Case study",
  summary:
    "Spine + After Effects entry for the Sky Mavis Animation Contest. A short cinematic reel and three character action loops showcasing combat timing, secondary motion, and stylised VFX.",
  heroFacts: [
    { value: "Nov 2021", label: "Published", icon: "calendar" },
    { value: "Contest entry", label: "Project type", icon: "cube" },
    { value: "Ae · Spine", label: "Pipeline", icon: "users" },
  ] as const,
  deliverables: [
    "Cinematic reel (Vimeo)",
    "3 character action loops",
    "End-card banner + free project files",
  ] as const,
  overview: {
    body: "Our submission for the Sky Mavis animation contest. We rigged the heroes in Spine 2D, layered VFX in After Effects, and packaged the result into a cinematic reel plus three looping action GIFs. The full project files were shared with the community as a free download.",
    stats: [
      { value: "218", label: "Appreciations" },
      { value: "3.2K", label: "Views" },
      { value: "3", label: "Hero loops" },
      { value: "1", label: "Cinematic" },
    ],
  },
  behanceUrl:
    "https://www.behance.net/gallery/130561969/Animation-Contest-Sky-Mavis",
  freeDownloadUrl:
    "https://drive.google.com/file/d/1QbNsxBSuMlL8tDJjdOCzie_HN4S6RqP9/view?usp=sharing",
  madeForLabel: "AnimVFX Clan",
  madeForUrl: "https://www.behance.net/AnimVFXClan",
  coverImage:
    "https://mir-s3-cdn-cf.behance.net/projects/max_808/33e83e130561969.Y3JvcCwxOTgxLDE1NTAsOSww.png",
  tools: ["After Effects", "Spine 2D"] as const,
  fields: ["Animation", "Visual Effects", "Character Design"] as const,
  tags: [
    "2D animation",
    "after effects",
    "animation",
    "character design",
    "concept art",
    "game",
    "spine",
    "spine 2D",
    "vfx",
  ] as const,
} as const;

export type ShowcaseModule =
  | { id: string; variant: "full"; src: string }
  | { id: string; variant: "video"; src: string }
  | { id: string; variant: "fullGif"; src: string };

export const showcaseModules: readonly ShowcaseModule[] = [
  {
    id: "m01",
    variant: "full",
    src: `${MW}/a11525130561969.6182bc9d17db5.png`,
  },
  {
    id: "m02",
    variant: "video",
    src: "https://player.vimeo.com/video/642207661?h=f7b128ae87&badge=0&autopause=0",
  },
  {
    id: "m03",
    variant: "fullGif",
    src: `${M}/bba1b6130561969.61840263c5a08.gif`,
  },
  {
    id: "m04",
    variant: "fullGif",
    src: `${M}/8c1bc0130561969.61840263c50e3.gif`,
  },
  {
    id: "m05",
    variant: "fullGif",
    src: `${M}/aa18d4130561969.61840263c4916.gif`,
  },
  {
    id: "m06",
    variant: "fullGif",
    src: `${M}/31cb6e130561969.61840263c67c3.gif`,
  },
] as const;

export const relatedProjects = [
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
    id: "lore-axie-origin",
    title: "LORE AXIE ORIGIN | CINEMATIC",
    href: "/portfolio/lore-axie-origin",
    internal: true as const,
    badge: "Case study",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/501fca163362313.Y3JvcCwxOTgxLDE1NTAsOSww.png",
    appreciations: "138",
    views: "1.8K",
  },
  {
    id: "battle-of-the-gods-mytheria",
    title: "Battle of the Gods | Mytheria - Login Screen",
    href: "/portfolio/battle-of-the-gods-mytheria",
    internal: true as const,
    badge: "Case study",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/d5b456134047127.Y3JvcCwyMzkyLDE4NzAsMCww.png",
    appreciations: "112",
    views: "1.9K",
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
] as const;
