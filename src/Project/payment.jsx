import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cartcontest";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();


  const loggedInUser = JSON.parse(localStorage.getItem("user"));


  const [customer, setCustomer] = useState({
    name: loggedInUser?.fullName || "",
    email: loggedInUser?.email || "",
    phone: "",
    address: "",
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.1;
  const taxes = subtotal * 0.05;
  const shipping = 50;
  const total = subtotal - discount + taxes + shipping;

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      alert("Please fill in all customer details.");
      return;
    }

    const newOrder = {
      userId: loggedInUser?.id || null,   
      user: loggedInUser || null,        
      customer,                          
      cartItems,
      subtotal,
      discount,
      taxes,
      shipping,
      total,
      status: "Pending",                
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post("http://localhost:5000/orders", newOrder);
      navigate(`/order/${response.data.id}`); 
      clearCart(); 
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="bg-white shadow-md rounded-lg max-w-3xl w-full p-8 space-y-6">
        <h1 className="text-2xl font-bold">Checkout</h1>


        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="tel"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            placeholder="Shipping Address"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <hr />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>- ₹{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span>₹{taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
