import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Home from "./pages/Home/Home";
import Measure from "./pages/Measure/Measure";
import Header from "./components/Header/Header";
import Navigation from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    
    <BrowserRouter> 
      <Header />
      <Navigation/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/measure" element={<Measure />} />
      </Routes>

      <Footer/>
    </BrowserRouter>
  );
}

export default App;
