import Navbar from "../components/Navbar";
import HeroSection from "../components/sections/Herosection";
import BentoSection from "../components/sections/BentoSection";
import CardSection from "../components/sections/CardSection";
import { featuredCards } from '../data/mockCards';
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <BentoSection />
        <main className="">
          <CardSection title="Artículos destacados" cards={featuredCards} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Home;