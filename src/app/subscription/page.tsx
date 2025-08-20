import { Header } from "../../components/sections/header";
import { Pricing } from "../../components/sections/pricing";
import { Footer } from "../../components/sections/footer";

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
