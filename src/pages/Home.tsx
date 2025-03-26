import Navbar from "../components/Navbar";
import HeroSection from "../components/sections/Herosection";

function Home() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
      </div>
    </>
  );
}

export default Home;