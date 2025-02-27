import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { FaUserCircle } from "react-icons/fa";
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-100 w-screen">
    <div className="bg-white rounded-2xl shadow-lg p-8 w-96">
      <div className="flex justify-center mb-4">
        {/* <div className="bg-white text-gray-300 text-lg font-bold  px-36 py-2 w-full h-auto">
          <FaUserCircle/>
        </div> */}
      </div>
      {/* <h1 className="text-2xl font-semibold text-center text-gray-900">Welcome to SLRC!</h1> */}
      <h1 className="text-center text-black mb-6 font-bold text-3xl">LOGIN</h1>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 mb-2 text-sm"
            >
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
