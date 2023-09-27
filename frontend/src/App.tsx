import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Product from "./components/Product";
import { Route, Routes } from "react-router-dom";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart";
import RouteLayout from "./components/RouteLayout";
import Home from "./components/Home";
import Login from "./components/login";
import Contact from "./components/contact";
import Signup from "./components/signup";
import Wishlist from "./components/Wishlist";
import Checkout from "./components/checkout";
import Success from "./components/success";
import PaymentPage from "./components/payment";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RouteLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/pro" element={<Product />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/con" element={<Contact />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/wish" element={<Wishlist />}></Route>
        <Route path="/check" element={<Checkout />}></Route>
        <Route path="/success" element={<Success />}></Route>
        <Route path="/payment" element={<PaymentPage />}></Route>
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
