import ServicePageTemplate from "@/components/service-page-template";

export default function Service2DVfxPage() {
  return (
    <ServicePageTemplate
      eyebrow="Service"
      title="2D VFX"
      subtitle="Impactful effects that enhance action without overwhelming the scene."
      intro="We craft VFX with gameplay readability first: strong timing, readable silhouettes, and effect layering that performs well on real devices."
      bullets={[
        "Skill effects and hit impact libraries",
        "Elemental particles and ambient overlays",
        "Screen-space flashes and combo feedback effects",
        "Optimization-friendly atlas and timing setup",
      ]}
    />
  );
}
