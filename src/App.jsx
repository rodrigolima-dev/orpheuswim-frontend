import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Home from "./pages/Home/Home";
import Measure from "./pages/Measure/Measure";
import Header from "./components/Header/Header";
import Navigation from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Purchase from "./pages/Purchase/Purchase";
import Products from "./pages/Products/Products"
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart/Cart.jsx";




function App() {
  return (

    <CartProvider>
    <BrowserRouter>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/measure" element={<Measure />} />
        <Route path="/purchase/:productName" element={<Purchase />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </CartProvider>
  );
}

export default App;
