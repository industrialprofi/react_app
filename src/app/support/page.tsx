import { Header } from "../../components/sections/header";
import { Support } from "../../components/sections/support";
import { Footer } from "../../components/sections/footer";

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
