import { useState } from "react";
import "./App.css";

import { Homepage } from "./Project/HOME/homepage";
import { Route, Routes } from "react-router-dom";
import Allproducts from "./Project/allproducts";
import ProductDetail from "./Project/productdetail";
import { Dogs } from "./Project/dogs";
import SignupPage from "./Project/HOME/signup";
import LoginPage from "./Project/HOME/login2";
import CartPage from "./Project/mainCart";
import Checkout from "./Project/payment";
import OrderConfirmation from "./Project/order";
import OrdersPage from "./Project/orderlist";

import AdminLayout from "./adminpage/adminlayout";
import AdminDashboard from "./adminpage/admin";
import Orderadmin from "./adminpage/orderadmin";
import AdminProducts from "./adminpage/productadmin";
import AdminUsers from "./adminpage/usersadmin";
import GuestRoute from "./guestroute";
import ProtectedRoute from "./protect";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-[rgba(240,240,240,1)] min-h-screen">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/allproducts" element={<Allproducts />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/Mid/:dog" element={<Dogs />} />

        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <SignupPage />
            </GuestRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<Orderadmin />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
