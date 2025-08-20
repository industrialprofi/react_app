import { Header } from "../../components/sections/header";
import { Support } from "../../components/sections/support";
import { Footer } from "../../components/sections/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Поддержка - DreamTeamSAAS",
  description: "Получите помощь и ответы на часто задаваемые вопросы о нашем сервисе. Наша команда поддержки всегда готова помочь вам.",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Support />
      </main>
      <Footer />
    </div>
  );
}
