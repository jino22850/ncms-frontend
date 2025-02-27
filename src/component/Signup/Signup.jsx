import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdGridView, MdDelete, MdEdit } from "react-icons/md";
import { BASE_URL } from "../../api/API";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null); 

  // Fetch admin list when component loads
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/slrc/auth/admins`);
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error.response?.data?.message || error.message);
      }
    };

    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setIsLoading(true);

    try {
      if (editingAdmin) {
        const response = await axios.put(`${BASE_URL}/slrc/auth/admin/edit/${editingAdmin._id}`, {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 200) {
          alert("Admin updated successfully!");
          setAdmins(admins.map(admin => admin._id === editingAdmin._id ? response.data : admin)); 
          setEditingAdmin(null); 
        }
      } else {
        const response = await axios.post(`${BASE_URL}/slrc/auth/register`, {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 201) {
          alert("Admin registered successfully!");
          setAdmins([...admins, response.data]); 
        }
      }

     
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (admin) => {
    setFormData({
      name: admin.username,
      email: admin.email,
      password: "",
    });
    setEditingAdmin(admin); 
  };

  const handleDelete = async (adminId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/slrc/auth/admin/delete/${adminId}`);
      if (response.status === 200) {
        alert("Admin deleted successfully!");
        setAdmins(admins.filter(admin => admin._id !== adminId)); 
      }
    } catch (error) {
      console.error("Error deleting admin:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center space-x-4 mb-6">
        <MdGridView className="text-4xl text-black" />
        <h2 className="text-3xl font-semibold text-black">Administrator</h2>
      </div>

      <div className="border-b-4 border-gray-900 mb-6"></div>

      {/* Layout with two columns */}
      <div className="grid grid-cols-[1fr_5fr] gap-6">
        {/* Form Section */}
        <div className="flex flex-col">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              {editingAdmin ? "Edit Admin" : "Register Admin"}
            </h3>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-900 mb-2 text-sm font-semibold">
                User Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-72 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm bg-gray-100"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-900 mb-2 text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-72 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm bg-gray-100"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-900 mb-2 text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-72 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm bg-gray-100"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-1/3 border-2 border-red-900 bg-white text-red-900 py-2 rounded-md hover:bg-red-900 hover:text-white transition-colors text-sm font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : editingAdmin ? "Update Admin" : "Sign up"}
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-4 text-sm">{error}</p>}
        </div>

        {/* Admin Table Section */}
        <div className="p-4 border border-gray-300 rounded-md shadow-md">
          <table className="min-w-full text-sm text-left text-gray-500 border">
            <thead className="bg-gray-900 text-gray-300">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 ? (
                admins.map((admin, index) => (
                  <tr key={admin._id}>
                    <td className="px-4 py-2 text-gray-900 border">{index + 1}</td>
                    <td className="px-4 py-2 text-gray-900 border">{admin.username}</td>
                    <td className="px-4 py-2 text-gray-900 border">{admin.email}</td>
                    <td className="px-4 py-2 text-gray-900 border space-x-1">
                      <button
                        className="p-1 text-blue-500 border-2 border-blue-500 rounded-md hover:bg-blue-500 hover:text-white text-sm"
                        onClick={() => handleEdit(admin)}
                      >
                        <MdEdit />
                      </button>{" "}
                      {" "}
                      <button
                        className="p-1 text-red-500 border-2 border-red-700 hover:bg-red-700 hover:text-white rounded-md text-sm"
                        onClick={() => handleDelete(admin._id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2 border text-center" colSpan="4">
                    No admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Signup;
