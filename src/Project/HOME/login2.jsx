import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      let url = `http://localhost:5000/users?email=${formData.email}&password=${formData.password}`;
      let res = await axios.get(url);


      if (res.data.length === 0) {
        url = `http://localhost:5000/admin?email=${formData.email}&password=${formData.password}`;
        res = await axios.get(url);
      }

      if (res.data.length > 0) {
        const user = res.data[0];


        localStorage.setItem("user", JSON.stringify(user));

        alert("✅ Login successful!");


        if (user.role === "admin") {
          navigate("/admin");
        } else {
          if (user.status !== "active" || user.blocked == "true") {
            alert("⚠️ Your account is Suspended! You cannot login.");
            return;
          }
          navigate("/");
        }
      } else {
        alert("❌ Invalid email or password!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("⚠️ Login failed. Please try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50 font-[Poppins]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-yellow-600 mb-4">
          🐶 Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Not a member?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-yellow-600 font-semibold cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}
