import React from "react";
import { useCart } from "./cartcontest";
import { useNavigate } from "react-router-dom";


export default function CartPage() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">Your Cart 🛒</h1>

      <div className="grid lg:grid-cols-3 gap-6">
       
       
        <div className="lg:col-span-2 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center bg-white p-4 rounded-xl shadow-md">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">₹{item.price}</p>
                  <div className="flex items-center mt-2">
                    <button onClick={() => decreaseQty(item.id)} className="px-2 py-1 bg-gray-200 rounded-l">-</button>
                    <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)} className="px-2 py-1 bg-gray-200 rounded-r">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Shipping</span>
            <span>₹50</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total</span>
            <span>₹{total + 50}</span>
          </div>
          <button onClick={(()=>{navigate("/checkout")})} className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
