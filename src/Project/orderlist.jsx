import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      if (!loggedInUser) {
        setOrders([]); 
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching orders...");

        const res = await axios.get("http://localhost:5000/orders");
        console.log("Response data:", res.data);

        let allOrders = [];
        if (Array.isArray(res.data)) {
          allOrders = res.data;
        } else if (res.data.orders) {
          allOrders = res.data.orders;
        } else if (res.data.order) {
          allOrders = res.data.order;
        } else {
          console.warn("Unexpected data format:", res.data);
        }

        const userOrders = allOrders.filter(
          (order) => order.userId === loggedInUser.id
        );

        setOrders(userOrders);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [loggedInUser]);

  if (loading) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders 📦</h1>

      {!loggedInUser ? (
        <p className="text-red-500">⚠ Please log in to view your orders.</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow p-6 rounded-lg">
              <h2 className="font-semibold mb-2">Order #{order.id}</h2>
              <p className="text-sm text-gray-500">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>

              <div className="mt-3 space-y-2">
                {order.cartItems?.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 font-bold">Total: ₹{order.total}</div>
              <Link
                to={`/order/${order.id}`}
                state={order}
                className="text-indigo-600 font-medium hover:underline block mt-2"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
