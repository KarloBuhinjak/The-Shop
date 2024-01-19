import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
//import { useState } from "react";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Index from "./Pages/Index";
import Footer from "./Components/Footer";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import AdminDashboard from "./Pages/AdminDashboard";
import AddProduct from "./Pages/AddProduct";

function App() {
  const user = localStorage.getItem("token");
  const [cart, setCart] = useState({ cartQuantity: 0, totalPrice: 0 });
  // const decoded = jwtDecode(user);

  // Ako korisnik nije ulogiran, prikaži Navbar
  if (user) {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar cart={cart} />
          <Routes>
            <Route path="*" element={<Index setCart={setCart} cart={cart} />} />
            <Route path="/cart" element={<Cart />}></Route>
            <Route
              path="/product/:id"
              element={<Product setCart={setCart} cart={cart} />}
            ></Route>
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }

  // Ako korisnik nije ulogiran, prikaži login i signup stranice
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Ako korisnik nije ulogiran i pokuša pristupiti drugim stranicama, preusmjeri ga na /login */}
          <Route path="/*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
