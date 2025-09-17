import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",

  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/users");
      const users = res.data;

      const exists = users.find((u) => u.email === formData.email);
      if (exists) {
        alert("⚠️ User already exists! Please login.");
        navigate("/login"); 
        return;
      }

      await axios.post("http://localhost:5000/users", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role : "user",
        status: "active",
      blocked: false
      });

      alert("✅ Signup successful! Please login.");
      navigate("/login"); 
    } catch (err) {
      console.error(err);
      alert("Error signing up");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50 font-[Poppins]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-yellow-600 mb-4">
          🐾 Sign Up
        </h1>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>
       
      </div>
    </div>
  );
}
