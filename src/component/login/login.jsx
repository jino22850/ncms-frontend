import React, { useState } from "react";
import { useAuth } from "../context/authContext";

const Login = () => {
  const { login, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData);
    } catch (err) {
      setError(err.message || "An error occurred during login.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-100 w-screen">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-96">
        <h1 className="text-center text-black mb-6 font-bold text-3xl">
          LOGIN
        </h1>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 mb-2 text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 mb-2 text-sm"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gray-900 to-gray-300 text-white py-2 rounded-lg font-semibold hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-center mt-4 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
