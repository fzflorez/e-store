import { FeacturedProductsSection } from "@/src/components/products/feactured-products-section";
import { HeroSection } from "@/src/components/hero-section";
import { StatsSection } from "@/src/components/stats-section";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <div className="mx-auto w-full max-w-7xl px-5 xl:p-0">
        <StatsSection />
        <FeacturedProductsSection />
      </div>
    </div>
  );
}
