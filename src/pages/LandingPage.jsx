import MarketingHeader from "@/components/marketing/MarketingHeader";
import HeroSection from "@/components/marketing/HeroSection";
import ProductPreview from "@/components/marketing/ProductPreview";
import BenefitsSection from "@/components/marketing/BenefitsSections";
import HowItWorksSection from "@/components/marketing/HowItWorksSection";
import FeatureShowcase from "@/components/marketing/FeatureShowcase";
import FinalCTA from "@/components/marketing/FinalCTA";
import MarketingFooter from "@/components/marketing/MarketingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MarketingHeader />

      <main>
        <HeroSection />
        <ProductPreview />
        <BenefitsSection />
        <HowItWorksSection />
        <FeatureShowcase />
        <FinalCTA />
      </main>

      <MarketingFooter />
    </div>
  );
}