import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Package, LogOut } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("user");


    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      <aside className="w-64 bg-indigo-700 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold flex items-center gap-2">
          <LayoutDashboard /> Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin"
            className="block px-3 py-2 rounded hover:bg-indigo-600"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/orders"
            className="block px-3 py-2 rounded hover:bg-indigo-600"
          >
            Orders
          </Link>
          <Link
            to="/admin/users"
            className="block px-3 py-2 rounded hover:bg-indigo-600"
          >
            Users
          </Link>
          <Link
            to="/admin/products"
            className="block px-3 py-2 rounded hover:bg-indigo-600"
          >
            Products
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-4 hover:bg-indigo-600"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
