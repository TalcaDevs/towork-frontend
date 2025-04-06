import HeroSection from "../components/sections/Herosection";
import BentoSection from "../components/sections/BentoSection";
import CardSection from "../components/sections/CardSection";
import { featuredCards } from '../data/mockCards';

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f6f7f9]">
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Job Categories Section */}
        <BentoSection />
        
        {/* Featured Articles Section */}
        <CardSection title="Artículos destacados" cards={featuredCards} />
        
       
      </main>
    </div>
  );
}

export default Home;