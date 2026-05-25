import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { FloatingCTA } from "@/components/public/FloatingCTA";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
