import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PredictionForm from "./components/PredictionForm";
import Results from "./pages/Results";
import About from "./pages/About";

function App() {
  const [prediction, setPrediction] = useState(null);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white text-gray-900">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<PredictionForm setPrediction={setPrediction} />} />
            <Route path="/results" element={<Results prediction={prediction} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
