// src/Project/Admin/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserX, UserCheck, ShieldBan, ShieldCheck } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  // soft delete / undo
  const handleSoftDelete = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await axios.patch(`http://localhost:5000/users/${id}`, {
        status: newStatus,
      });
      fetchUsers();
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  // block / unblock
  const handleBlockToggle = async (id, blocked) => {
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        blocked: !blocked,
      });
      fetchUsers();
    } catch (err) {
      console.error("Error blocking/unblocking user", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800"> Users list</h2>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Password</th>
              <th className="p-3">Status</th>
              <th className="p-3">Blocked</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className={`border-b hover:bg-gray-50 transition ${
                  u.status === "inactive" ? "bg-red-50" : ""
                }`}
              >
                <td className="p-3">{u.id}</td>
                <td className="p-3 font-medium text-gray-700">{u.fullName}</td>
                <td className="p-3 text-gray-600">{u.email}</td>
                <td className="p-3 text-gray-500">{u.password}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      (u.status || "active") === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.status || "active"}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      u.blocked
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {u.blocked ? "Yes" : "No"}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => handleSoftDelete(u.id, u.status || "active")}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition ${
                      (u.status || "active") === "active"
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {(u.status || "active") === "active" ? (
                      <>
                        <UserX size={16} /> Delete
                      </>
                    ) : (
                      <>
                        <UserCheck size={16} /> Undo
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleBlockToggle(u.id, u.blocked)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition ${
                      u.blocked
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-yellow-500 hover:bg-yellow-600 text-white"
                    }`}
                  >
                    {u.blocked ? (
                      <>
                        <ShieldCheck size={16} /> Unblock
                      </>
                    ) : (
                      <>
                        <ShieldBan size={16} /> Block
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
