import "./App.css";
import Navbar from "../src/components/Navbar";
import HeroSection from "./components/sections/Herosection";

function App() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
      </div>
    </>
  );
}

export default App;
