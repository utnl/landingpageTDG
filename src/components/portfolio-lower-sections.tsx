"use client";

import ContactShowcaseSection from "@/components/contact-showcase-section";
import PortfolioFaq from "@/components/portfolio-faq";
import PortfolioGalleryGrid from "@/components/portfolio-gallery-grid";
import SiteFooter from "@/components/site-footer";

/** Below-fold bundle: gallery + FAQ + contact + footer (code-split from portfolio hero). */
export default function PortfolioLowerSections() {
  return (
    <>
      <PortfolioGalleryGrid />
      <PortfolioFaq />
      <ContactShowcaseSection sectionStep="// 04" embedded />
      <SiteFooter />
    </>
  );
}
