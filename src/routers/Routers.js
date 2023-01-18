import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";
import CheckOut from "../pages/CheckOut";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import ProtectedRoutes from "./ProtectedRoutes";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="cart" element={<Cart />} />
      <Route path="shop/:id" element={<ProductDetail />} />
      <Route
        path="checkout"
        element={
          <ProtectedRoutes>
            <CheckOut />
          </ProtectedRoutes>
        }
      />
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
};

export default Routers;
