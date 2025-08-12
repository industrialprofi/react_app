// Импорт компонентов в стиле DreamTeamSAAS
import { TopBanner } from "../components/sections/top-banner";
import { Header } from "../components/sections/header";
import { Hero } from "../components/sections/hero";
import { Features } from "../components/sections/features";
import { Examples } from "../components/sections/examples";
import { FAQ } from "../components/sections/faq";
import { Footer } from "../components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <TopBanner />
      <Header />
      <main>
        <Hero />
        <Features />
        <Examples />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
