// src/Project/Admin/AdminProducts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2, RefreshCw, PlusCircle } from "lucide-react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    descreption: "",
    image: "",
    category: "",
    old_price: "",
    new_price: "",
    status: "active",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/products/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/products", form);
      }
      setForm({
        name: "",
        descreption: "",
        image: "",
        category: "",
        old_price: "",
        new_price: "",
        status: "active",
      });
      fetchProducts();
    } catch (err) {
      console.error("Error saving product", err);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSoftDelete = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await axios.patch(`http://localhost:5000/products/${id}`, {
        status: newStatus,
      });
      fetchProducts();
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800"> Products </h2>

      {/* Add/Edit Form */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <PlusCircle size={20} className="text-indigo-600" />
          {editingId ? "Edit Product" : "Add New Product"}
        </h3>

        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            name="descreption"
            placeholder="Description"
            value={form.descreption}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            name="old_price"
            placeholder="Old Price"
            type="number"
            value={form.old_price}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            name="new_price"
            placeholder="New Price"
            type="number"
            value={form.new_price}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            type="submit"
            className="col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg font-semibold transition"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Product Table */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Old Price</th>
              <th className="p-3">New Price</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className={`border-b hover:bg-gray-50 transition ${
                  p.status === "inactive" ? "bg-red-50" : ""
                }`}
              >
                <td className="p-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-12 w-12 rounded-lg object-cover border"
                  />
                </td>
                <td className="p-3 font-medium text-gray-700">{p.name}</td>
                <td className="p-3 text-gray-600">{p.category}</td>
                <td className="p-3 text-gray-500 line-through">₹{p.old_price}</td>
                <td className="p-3 font-semibold text-green-600">
                  ₹{p.new_price}
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      p.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm transition"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleSoftDelete(p.id, p.status)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition ${
                      p.status === "active"
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {p.status === "active" ? (
                      <>
                        <Trash2 size={16} /> Delete
                      </>
                    ) : (
                      <>
                        <RefreshCw size={16} /> Undo
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
