// App.js
import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "./Pages/Navbar";
import { setDataProduct } from "./utils/ProductSlice";
import "./App.css";
import Checkout from "./Pages/Checkout.jsx";
const Home = lazy(() => import("./Pages/Home"));
const Contact = lazy(() => import("./Pages/Contact"));
const About = lazy(() => import("./Pages/About"));
const Signup = lazy(() => import("./Components/Signup"));
const Login = lazy(() => import("./Components/Login"));
const Forget = lazy(() => import("./Pages/Forget"));
const Addcontainer = lazy(() => import("./Components/Addcontainer"));
const Menu = lazy(() => import("./Pages/Menu"));
const Cart = lazy(() => import("./Pages/Cart"));
const Success = lazy(() => import("./Pages/success.jsx"));
const Cancel = lazy(() => import("./Pages/cancel.jsx"));
const Dashboard = lazy(() => import("./Components/Dashboard/Dashboard"));
const Address = lazy(() => import("./Pages/address.jsx"));
const ProductSearch = lazy(() => import("./Components/ProductSearch"));
const WishlistPage = lazy(() => import("./Pages/Wishlist"));
const Analytics = lazy(() => import("./Pages/Analytics.jsx"));
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}api/products`
      );
      const resData = await res.json();
      dispatch(setDataProduct(resData));
    })();
  }, []);

  return (
    <main>
      <Toaster />
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<Forget />} />
          <Route path="/newproduct" element={<Addcontainer />} />
          <Route path="/menu/:filterby" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/address" element={<Address />} />
          <Route path="/search" element={<ProductSearch />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default App;
