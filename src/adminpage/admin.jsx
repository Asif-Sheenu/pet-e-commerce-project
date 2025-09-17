// src/Project/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Users, DollarSign, Package } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => setUsers(res.data));
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data));
    axios.get("http://localhost:5000/orders").then((res) => setOrders(res.data));
  }, []);

  // Stats
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalProducts = products.length;

  const stats = [
    { title: "Total Orders", value: totalOrders, icon: ShoppingCart, color: "from-indigo-500 to-indigo-700" },
    { title: "Total Users", value: totalUsers, icon: Users, color: "from-emerald-500 to-emerald-700" },
    { title: "Revenue", value: `₹${totalRevenue.toFixed(2)}`, icon: DollarSign, color: "from-amber-500 to-amber-700" },
    { title: "Products", value: totalProducts, icon: Package, color: "from-rose-500 to-rose-700" },
  ];

  // Orders by category
  const ordersByCategory = [
    {
      name: "Dog",
      value: orders.filter((o) =>
        o.cartItems.some((item) => item.name.toLowerCase().includes("dog"))
      ).length,
    },
    {
      name: "Cat",
      value: orders.filter((o) =>
        o.cartItems.some((item) => item.name.toLowerCase().includes("cat"))
      ).length,
    },
  ];

  // Revenue by month
  const revenueByMonth = {};
  orders.forEach((order) => {
    const month = new Date(order.createdAt).toLocaleString("default", {
      month: "short",
    });
    revenueByMonth[month] = (revenueByMonth[month] || 0) + order.total;
  });
  const revenueByMonthData = Object.entries(revenueByMonth).map(
    ([month, revenue]) => ({ month, revenue })
  );

  // Users growth (dummy data)
  const usersGrowth = [
    { month: "Jan", users: 5 },
    { month: "Feb", users: 10 },
    { month: "Mar", users: 15 },
    { month: "Apr", users: 20 },
    { month: "May", users: users.length },
  ];

  const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444"];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 shadow-lg rounded-2xl p-6 flex justify-between items-center text-white">
        <h1 className="text-2xl font-extrabold tracking-wide">Admin Dashboard</h1>
        <div className="opacity-90">Welcome, Admin 👋</div>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl shadow-md text-white bg-gradient-to-br ${stat.color} flex items-center gap-4 transform transition hover:scale-105 hover:shadow-xl`}
          >
            <stat.icon className="opacity-90" size={36} />
            <div>
              <p className="text-sm opacity-80">{stat.title}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
            </div>
          </div>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donut Chart */}
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Orders by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ordersByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
              >
                {ordersByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Revenue by Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByMonthData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Users Growth Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usersGrowth}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#22C55E"
                strokeWidth={3}
                dot={{ r: 6, fill: "#22C55E" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
