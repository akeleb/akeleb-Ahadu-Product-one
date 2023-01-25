import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";
import CheckOut from "../pages/CheckOut";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import ProtectedRoutes from "./ProtectedRoutes";
import AddProducts from "../admin/AddProducts";
import AllProducts from "../admin/AllProducts";
import Dashboard from "../admin/Dashboard";
import Users from "../admin/Users"
import Orders from "../admin/Orders";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="cart" element={<Cart />} />
      <Route path="shop/:id" element={<ProductDetail />} />
      <Route path="/*" element={<ProtectedRoutes />}>
        <Route path="checkout" element={<CheckOut />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="dashboard/all-products" element={<AllProducts />}></Route>
        <Route path="dashboard/add-product" element={<AddProducts />}></Route>
        <Route path="dashboard/users" element={<Users />}></Route>
        <Route path="dashboard/orders" element={<Orders />}></Route>
      </Route>
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
};

export default Routers;
