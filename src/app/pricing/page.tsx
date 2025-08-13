import { TopBanner } from "../../components/sections/top-banner";
import { Header } from "../../components/sections/header";
import { Pricing } from "../../components/sections/pricing";
import { Footer } from "../../components/sections/footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <TopBanner />
      <Header />
      <main>
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
