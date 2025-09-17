import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Orderadmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update order status when dropdown changes
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/orders/${id}`, {
        status: newStatus,
      });
      fetchOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-600">Loading orders...</p>;
  }

  return (
    <div className="space-y-6 p-6">
      <header className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">📦 Orders Management</h1>
        <span className="text-gray-500 text-sm">Admin Panel</span>
      </header>

      <section className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-6 text-gray-800 border-b pb-3">
          All Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr
                  key={order.id}
                  className={`hover:bg-gray-50 transition ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="p-3 font-medium text-gray-800">{order.id}</td>
                  <td className="p-3 text-gray-700">{order.customer.name}</td>
                  <td className="p-3 font-semibold text-gray-900">
                    ${order.total}
                  </td>
                  <td className="p-3">
                    <select
                      value={order.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="px-3 py-1 rounded-lg border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      disabled={order.status === "Delivered"} // lock after Delivered
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
