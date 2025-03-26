import "./App.css";
import Navbar from "../src/components/Navbar";
import HeroSection from "./components/sections/Herosection";
import BentoSection from "./components/sections/BentoSection";

function App() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <BentoSection />
      </div>
    </>
  );
}

export default App;
