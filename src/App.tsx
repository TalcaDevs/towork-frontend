import "./App.css";
import { useRoutes } from 'react-router-dom';
import { routes } from './routes/routes';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

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