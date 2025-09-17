import React, { useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaBox,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../cartcontest";

export default function Newnavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const cartCount = cartItems.length;

  return (
    <nav className="bg-gradient-to-r from-amber-50 via-white to-amber-100 shadow-md px-6 py-4 flex justify-between items-center relative z-50 sticky top-0">
      <div className="text-3xl font-extrabold text-amber-600 tracking-tight cursor-pointer flex items-center gap-2">
         <span className="text-gray-800">Pawfect</span>
      </div>

      <div className="hidden md:flex items-center border border-gray-200 rounded-full overflow-hidden w-1/2 shadow-sm">
        <input
          type="text"
          placeholder="Search for premium pet products..."
          className="px-4 py-2 w-full outline-none text-gray-700 placeholder-gray-400"
        />
        <button className="bg-amber-500 px-5 py-2 text-white hover:bg-amber-600 transition flex items-center justify-center">
          <FaSearch />
        </button>
      </div>

      <div className="hidden md:flex items-center gap-8 text-gray-700 text-lg font-medium">
        <Link to="/">
          <button className="flex items-center gap-2 hover:text-amber-600 transition">
            <FaHome className="text-base" /> <span>Home</span>
          </button>
        </Link>

        <button
          onClick={() => {
            navigate("/order");
            setMenuOpen(false);
          }}
          className="flex items-center gap-2 hover:text-amber-600 transition"
        >
          <FaBox className="text-base" /> <span>Orders</span>
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="relative flex items-center gap-2 hover:text-amber-600 transition"
        >
          <FaShoppingCart className="text-base" /> <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <button
        className="md:hidden text-3xl text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg p-6 flex flex-col gap-6 md:hidden z-50 animate-slideDown rounded-b-2xl">
          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 w-full outline-none text-gray-700 placeholder-gray-400"
            />
            <button className="bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 transition flex items-center justify-center">
              <FaSearch />
            </button>
          </div>

          <button
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 text-lg hover:text-amber-600 transition"
          >
            <FaHome className="text-base" /> Home
          </button>

          <button
            onClick={() => {
              navigate("/order");
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 text-lg hover:text-amber-600 transition"
          >
            <FaBox className="text-base" /> Orders
          </button>

          <button
            onClick={() => {
              navigate("/cart");
              setMenuOpen(false);
            }}
            className="relative flex items-center gap-3 text-lg hover:text-amber-600 transition"
          >
            <FaShoppingCart className="text-base" /> Cart
            {cartCount > 0 && (
              <span className="absolute -top-3 left-20 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      )}
    </nav>
  );
}
