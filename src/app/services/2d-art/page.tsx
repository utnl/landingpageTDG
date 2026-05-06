import ServicePageTemplate from "@/components/service-page-template";

export default function Service2DArtPage() {
  return (
    <ServicePageTemplate
      eyebrow=""
      title="2D Art"
      subtitle="Stylized visuals built for readability, consistency, and game-ready production."
      intro="Our 2D art pipeline focuses on strong shape language, clean value structure, and practical handoff for implementation teams."
      hero={{
        image: "/images/summoners.png",
        titleTop: "2D GAME ART",
        titleMain: "PRODUCTION",
        subheading: "2D Art outsource",
        description:
          "TD Games specializes in professional 2D game art, turning ideas into visually striking creations. Our expertise spans stylized characters, environments, UI-support pieces, and illustration pipelines tuned for production schedules.",
        ctaLabel: "Consult with our experts",
      }}
      capabilities={{
        eyebrow: "What we do",
        titlePrefix: "OUR ",
        titleHighlight: "2D ART",
        titleSuffix: " SERVICES",
        items: [
          {
            title: "Slot Art",
            description:
              "Slot-ready visual sets with readable symbols and style consistency.",
            image: "/images/Slot_Art-1024x683.jpg",
          },
          {
            title: "Casual Characters",
            description: "Stylized character sets for casual and social game worlds.",
            image: "/images/Casual_character-1024x683.jpg",
          },
          {
            title: "Character Concept",
            description:
              "Unique character design from concept exploration to final lineup.",
            image: "/images/Character_Concept-1024x683.jpg",
          },
          {
            title: "Environment Art",
            description: "Stunning painted environments and scenic world-building.",
            image: "/images/Environment_Art-1024x683.jpg",
          },
          {
            title: "Isometry Art",
            description: "Isometric assets and building sets for gameplay readability.",
            image: "/images/Isometry_art-1024x683.jpg",
          },
          {
            title: "Casual Art Props",
            description:
              "Prop packs and icon-ready objects tailored for casual game style.",
            image: "/images/Casual_Art_Props-1024x683.jpg",
          },
        ],
      }}
      bullets={[
        "Character concepts and final render packs",
        "Environment key art and modular scene paint-overs",
        "UI-support illustrations and icon families",
        "Prop sheets and in-game object variations",
      ]}
    />
  );
}
