import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/API";

const Login = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 

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
    setIsLoading(true); 

    try {
      const response = await axios.post(
        `${BASE_URL}/slrc/auth/login`,
        formData
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        alert("Login successful!");

        navigate("/Dashboard");
      } else {
        setError(error.response?.data?.message || 'Login failed');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 w-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 mb-2 text-sm"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
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
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 text-sm"
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
