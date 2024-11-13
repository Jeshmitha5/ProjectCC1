import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Toys from "./pages/Toys";
import ToyDetails from "./pages/ToyDetails";
import Cart from "./pages/Cart";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './App.css';

function App() {
  const [toys] = useState([
    { id: 1, name: 'Toy Car', price: 20, image: 'https://image.made-in-china.com/202f0j00MshWlzQcODpG/Baby-Toy-Car-Big-Rubber-Wheel-Remote-Control.webp', description: 'A cool toy car.' },
    { id: 2, name: 'Doll', price: 30, image: 'https://e7.pngegg.com/pngimages/378/990/png-clipart-doll-infant-child-stuffed-animals-cuddly-toys-baby-doll-miscellaneous-toddler.png', description: 'A beautiful doll.' },
    { id: 3, name: 'Action Figure', price: 25, image: 'https://i5.walmartimages.com/seo/First4Figures-My-Hero-Academia-All-Might-Golden-Age-PVC-Figure_64647616-7485-4d75-b01c-c76d2163b9e2.f0e1b55e4177d045450d0ee61b97b9c3.jpeg', description: 'An action-packed figure.' },
    { id: 4, name: 'Building Blocks', price: 35, image: 'https://m.media-amazon.com/images/I/71yKG8RkSSL.jpg', description: 'Creative building blocks for kids.' },
    { id: 5, name: 'Toy Robot', price: 50, image: 'https://i.ebayimg.com/images/g/SowAAOSwMbZiJbDc/s-l1200.jpg', description: 'A fun toy robot.' },
  ]);

  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  // Add item to cart
  const addToCart = (toy) => {
    setCart((prevCart) => [...prevCart, toy]);
  };

  // Remove item from cart
  const removeFromCart = (toyId) => {
    setCart((prevCart) => prevCart.filter((toy) => toy.id !== toyId));
  };

  // Handle logout and clear user session
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  // Define ProtectedRoute component for user authentication
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} /> {/* Navbar displayed on all pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/toys" element={<ProtectedRoute><Toys toys={toys} /></ProtectedRoute>} />
          <Route path="/toy/:toyId" element={<ProtectedRoute><ToyDetails toys={toys} addToCart={addToCart} /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart cart={cart} removeFromCart={removeFromCart} /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
        </Routes>
        <Footer /> {/* Footer displayed on all pages */}
      </div>
    </Router>
  );
}

export default App;



