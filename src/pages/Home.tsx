import HeroSection from "../components/sections/Herosection";
import BentoSection from "../components/sections/BentoSection";
import CardSection from "../components/sections/CardSection";
import { featuredCards } from '../data/mockCards';

function Home() {
  return (
    <>
      <div className="min-h-screen">
        <HeroSection />
        <BentoSection />
        <main className="">
          <CardSection title="Artículos destacados" cards={featuredCards} />
        </main>
      </div>
    </>
  );
}

export default Home;