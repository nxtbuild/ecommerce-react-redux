import React, { useEffect } from "react";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./About";
import Products from "./Products";
import Checkout from "./Checkout";
import ErrorPage from "./ErrorPage";
import Header from "./components/Header";
import Cart from "./Cart";
import "./index.css";
import Productinfo from "./Productinfo";
import { fetchCart } from "./redux/slices/cartSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart()); // Load cart items on app start
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/productinfo/:id" element={<Productinfo />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
