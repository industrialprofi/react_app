// Импорт секционных компонентов
import { Header } from "../components/sections/header";
import { Hero } from "../components/sections/hero";
import { Features } from "../components/sections/features";
import { Demo } from "../components/sections/demo";
import { Pricing } from "../components/sections/pricing";
import { Testimonials } from "../components/sections/testimonials";
import { CTA } from "../components/sections/cta";
import { Footer } from "../components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <Hero />
        <Features />
        <Demo />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
