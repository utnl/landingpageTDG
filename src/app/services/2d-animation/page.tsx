import ServicePageTemplate from "@/components/service-page-template";

export default function Service2DAnimationPage() {
  return (
    <ServicePageTemplate
      eyebrow="Service"
      title="2D Animation"
      subtitle="Smooth, expressive motion tuned for gameplay clarity and efficient production."
      intro="From subtle idle loops to high-energy combat actions, we build animation sets that preserve character identity while fitting technical constraints."
      bullets={[
        "Spine animation for gameplay and UI characters",
        "Frame-by-frame shots for promo and cutscenes",
        "Combat actions, transitions, and loop sets",
        "Export-ready animation packages for engine integration",
      ]}
    />
  );
}
