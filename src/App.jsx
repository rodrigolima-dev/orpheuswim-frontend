import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Home from "./pages/Home/Home";
import Measure from "./pages/Measure/Measure";
import Purchase from "./pages/Purchase/Purchase";
import Products from "./pages/Products/Products"
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart/Cart.jsx";
import Login from "./pages/Login/Login.jsx";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import MainLayout from "./layouts/MainLayout.jsx";




function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>


          {/* Páginas públicas com layout */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/measure" element={<MainLayout><Measure /></MainLayout>} />
          <Route path="/purchase/:productName" element={<MainLayout><Purchase /></MainLayout>} />
          <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
          <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />

          {/* Login sem layout */}
          <Route path="/login" element={<Login />} />

          {/* Admin protegido e sem layout */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;