import { NextResponse } from "next/server";

// Mock data - trong thực tế sẽ query từ database
const PROJECTS = [
  {
    id: "1",
    title: "Summoners Era",
    subtitle: "Mobile RPG Game",
    image: "/images/3067c837-e030-403f-b7c5-0c7246bfe15f.png",
    slug: "summoner-era",
    category: "3D Art",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Overdrive",
    subtitle: "Racing Game Assets",
    image: "/images/f8e2e81a-e72c-431b-b4ec-5ab7af73ea12.png",
    slug: "overdrive",
    category: "3D Art",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    title: "Environment Design",
    subtitle: "Fantasy World",
    image: "/images/f0d05f71-5089-4b3f-b453-7a8d19afc013.png",
    category: "Environment",
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    title: "Character Art",
    subtitle: "Hero Designs",
    image: "/images/IMG_4352.png",
    category: "2D Art",
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    title: "Casual Art Props",
    subtitle: "Game Assets",
    image: "/images/Casual_Art_Props-1024x683.jpg",
    category: "2D Art",
    createdAt: "2024-01-11",
  },
  {
    id: "6",
    title: "Casual Character",
    subtitle: "Character Design",
    image: "/images/Casual_character-1024x683.jpg",
    category: "2D Art",
    createdAt: "2024-01-10",
  },
  {
    id: "7",
    title: "Character Concept",
    subtitle: "Concept Art",
    image: "/images/Character_Concept-1024x683.jpg",
    category: "Concept Art",
    createdAt: "2024-01-09",
  },
  {
    id: "8",
    title: "Environment Art",
    subtitle: "Level Design",
    image: "/images/Environment_Art-1024x683.jpg",
    category: "Environment",
    createdAt: "2024-01-08",
  },
  {
    id: "9",
    title: "Isometry Art",
    subtitle: "Isometric Design",
    image: "/images/Isometry_art-1024x683.jpg",
    category: "2D Art",
    createdAt: "2024-01-07",
  },
  {
    id: "10",
    title: "Slot Art",
    subtitle: "Casino Game",
    image: "/images/Slot_Art-1024x683.jpg",
    category: "2D Art",
    createdAt: "2024-01-06",
  },
  {
    id: "11",
    title: "Game Animation",
    subtitle: "Character Animation",
    image: "/sinspired/Game_Animation-min-1024x612.jpg",
    category: "Animation",
    createdAt: "2024-01-05",
  },
  {
    id: "12",
    title: "2D Character",
    subtitle: "Character Design",
    image: "/sinspired/2D-Art-min-947x1024.jpg",
    category: "2D Art",
    createdAt: "2024-01-04",
  },
  {
    id: "13",
    title: "Character Design 1",
    subtitle: "Hero Concept",
    image: "/sinspired/character_1-min-1024x970.jpg",
    category: "Concept Art",
    createdAt: "2024-01-03",
  },
  {
    id: "14",
    title: "Character Design 2",
    subtitle: "Warrior Concept",
    image: "/sinspired/character_5-min-1024x970.jpg",
    category: "Concept Art",
    createdAt: "2024-01-02",
  },
  {
    id: "15",
    title: "Character Design 3",
    subtitle: "Mage Concept",
    image: "/sinspired/character_6-min-1024x970.jpg",
    category: "Concept Art",
    createdAt: "2024-01-01",
  },
  {
    id: "16",
    title: "Volcano Arena",
    subtitle: "Environment Render",
    image: "/sinspired/Volcano_Arena_render-min-1024x567.jpg",
    category: "Environment",
    createdAt: "2023-12-31",
  },
  {
    id: "17",
    title: "Space Arena",
    subtitle: "Sci-fi Environment",
    image: "/sinspired/space_arena_source_nature_render_final-min-1024x599.jpg",
    category: "Environment",
    createdAt: "2023-12-30",
  },
  {
    id: "18",
    title: "Lab Asset",
    subtitle: "Laboratory Props",
    image: "/sinspired/lab_asset-min-1024x506.jpg",
    category: "3D Art",
    createdAt: "2023-12-29",
  },
];

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    // Filter by category
    let filtered = category && category !== "all"
      ? PROJECTS.filter((p) => p.category === category)
      : PROJECTS;

    // Sort by date (newest first)
    filtered = filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    // Pagination
    const total = filtered.length;
    const limitNum = limit ? parseInt(limit) : filtered.length;
    const offsetNum = offset ? parseInt(offset) : 0;
    const paginated = filtered.slice(offsetNum, offsetNum + limitNum);

    return NextResponse.json({
      projects: paginated,
      total,
      limit: limitNum,
      offset: offsetNum,
      hasMore: offsetNum + limitNum < total,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

// Example usage:
// GET /api/projects - Get all projects
// GET /api/projects?category=3D%20Art - Filter by category
// GET /api/projects?limit=12&offset=0 - Pagination (page 1)
// GET /api/projects?limit=12&offset=12 - Pagination (page 2)
// GET /api/projects?category=2D%20Art&limit=12&offset=0 - Combined
