const B = "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp";
const G14 = "https://mir-s3-cdn-cf.behance.net/project_modules/1400";
const G632 = "https://mir-s3-cdn-cf.behance.net/project_modules/max_632";

export const projectMeta = {
  title: "GAME ANIMATION/VFX - 3Q",
  eyebrow: "Case study",
  summary:
    "2D mobile strategy game animation and VFX — hero motion, combat loops and polish passes for a quarterly content drop, built in Spine 2D with After Effects and Photoshop finishing.",
  heroFacts: [
    { value: "May 2022", label: "Published", icon: "calendar" },
    { value: "Game (Mobile)", label: "Project type", icon: "cube" },
    { value: "Ae · Ps · Spine", label: "Pipeline", icon: "users" },
  ] as const,
  deliverables: [
    "Spine 2D character animation loops",
    "After Effects VFX & comp polish",
    "Photoshop texture and pose prep",
  ] as const,
  overview: {
    body: "A Behance collection of in-game animation and VFX work for a 2D mobile strategy title — hero showcases, readable silhouettes at phone scale, and hand-tuned effects passes that sit cleanly on illustrated assets from the art team.",
    stats: [
      { value: "193", label: "Appreciations" },
      { value: "2.5K", label: "Views" },
      { value: "15", label: "Comments" },
      { value: "3", label: "Fields" },
    ],
  },
  behanceUrl: "https://www.behance.net/gallery/143388227/GAME-ANIMATIONVFX-3Q",
  madeForLabel: "AnimVFX Clan",
  madeForUrl: "https://www.behance.net/AnimVFXClan",
  coverImage:
    "https://mir-s3-cdn-cf.behance.net/projects/max_808/c4e25d143388227.Y3JvcCwxOTgxLDE1NTAsOSww.png",
  tools: ["After Effects", "Photoshop", "Spine 2D"] as const,
  fields: ["Animation", "Character Design", "Visual Effects"] as const,
  tags: [
    "2D Animation",
    "2D game mobile",
    "Character design",
    "game character",
    "game design",
    "heroes",
    "spine",
    "strategy game",
    "toan dang",
    "vfx",
  ] as const,
} as const;

export const showcaseModules = [
  {
    id: "m01",
    variant: "fullGif" as const,
    src: `${B}/3c060e143388227.627b7de67c6a3.png`,
  },
  { id: "m02", variant: "fullGif" as const, src: `${G14}/03be1c143388227.627b7de67e2a0.gif` },
  { id: "m03", variant: "fullGif" as const, src: `${G14}/e0a486143388227.627b7de67d986.gif` },
  { id: "m04", variant: "fullGif" as const, src: `${G632}/b9f241143388227.627b7de67ce22.gif` },
  { id: "m05", variant: "fullGif" as const, src: `${G632}/83b47e143388227.627bb9b9e8511.gif` },
  { id: "m06", variant: "fullGif" as const, src: `${G14}/d81809143388227.627bb9b9e8cf8.gif` },
  { id: "m07", variant: "fullGif" as const, src: `${G632}/b9b814143388227.627bb9b9e95fb.gif` },
  { id: "m08", variant: "fullGif" as const, src: `${G632}/2db16d143388227.627c95d9648f4.gif` },
  { id: "m09", variant: "fullGif" as const, src: `${G14}/380bd7143388227.627c95d965068.gif` },
  { id: "m10", variant: "fullGif" as const, src: `${G14}/381ef0143388227.627c95d96575d.gif` },
  {
    id: "m11",
    variant: "fullGif" as const,
    src: `${B}/1a686d143388227.627b7de67be94.png`,
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
