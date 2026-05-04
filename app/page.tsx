import TopBar from "./components/home/TopBar";
import SubBar from "./components/home/SubBar";
import HeroSection from "./components/home/HeroSection";
import FooterBar from "./components/home/FooterBar";

export default function HomePage() {
  return (
    <main className="h-screen w-full">
      
        <TopBar />
        <SubBar />
        <HeroSection />
        <FooterBar />
      
    </main>
  );
}