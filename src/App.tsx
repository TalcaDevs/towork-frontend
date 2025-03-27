import "./App.css";
import { useRoutes } from 'react-router-dom';
import { routes } from './routes/routes';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const element = useRoutes(routes);

  return (
    <div className="App">
      <Navbar />
      {element}
      <Footer />
    </div>
  )
}

export default App;