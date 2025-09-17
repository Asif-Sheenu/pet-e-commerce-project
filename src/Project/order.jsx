import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:5000/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch((err) => console.error("Error fetching order:", err));
  }, [id]);

  if (!order) return <p className="p-6">Loading order details...</p>;

  const { cartItems, subtotal, discount, taxes, shipping, total } = order;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="bg-white shadow-md rounded-lg max-w-3xl w-full p-8 space-y-6">
        <h2 className="text-indigo-600 font-semibold">Thank you!</h2>
        <h1 className="text-2xl font-bold">Your order is confirmed 🎉</h1>
        <p className="text-gray-600">
          Order <span className="font-medium">#{order.id}</span> will be shipped soon.
        </p>

        <hr />

        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4 mb-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">
                Quantity: {item.quantity} × ₹{item.price}
              </p>
            </div>
          </div>
        ))}

        <hr />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Discount</span><span>- ₹{discount.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Taxes</span><span>₹{taxes.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>₹{shipping.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
}
