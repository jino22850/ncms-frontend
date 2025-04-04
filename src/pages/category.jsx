import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { getAllCategories, addCategory, updateCategory, deleteCategory } from "../api/correspondentAPI";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


 
  const fetchCategories = async () => {
    try {
      const { data } = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateCategory(editId, formData);
        setIsEditing(false);
        setEditId(null);
        alert('category updated successfully');
      } else {
        await addCategory(formData);
        alert('category added successfully');
      }
      setFormData({ name: "", description: "" });
      fetchCategories();
    } catch (error) {
      console.error("Failed to save category:", error);
      alert('Failed to add/update category');
    }
  };


  const handleEdit = (category) => {
    const isConfirmed = window.confirm('Are you sure you want to edit this category?');
    if (isConfirmed) {
    setIsEditing(true);
    setEditId(category._id);
    setFormData({ name: category.name, description: category.description });

  } else {
    console.log('Edit canceled');
  }
  };

  
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this category?');
    if (isConfirmed) {
    try {
      await deleteCategory(id);
      fetchCategories();
      alert('category deleted successfully');
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert('An error occurred while deleting the category. Please try again.');
    }
  } else {
    console.log('Deletion canceled');
  }
  };


const filteredCategories = categories.filter(
  (category) =>
    (category.name && category.name.toLowerCase().includes(search.toLowerCase())) ||
    (category.description && category.description.toLowerCase().includes(search.toLowerCase()))
);


  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const currentCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-[#F8F9FC] h-full w-full p-6">
      <div className="flex items-center space-x-4 mb-6">
        <FaUser className="text-4xl text-black" />
        <h2 className="text-3xl font-semibold text-black">Category</h2>
      </div>

      <div className="border-b-4 border-gray-900 mb-6"></div>

      <div className="grid grid-cols-[1fr_5fr] gap-6">
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Category Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-900 focus:outline-none text-sm"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-900 focus:outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full border-2 border-red-900 text-red-900 bg-white py-2 rounded-md hover:bg-red-900 hover:text-white transition-colors text-sm"
          >
            {isEditing ? "Update Category" : "Add Category"}
          </button>
        </form>

        
        <div className="bg-white p-6 rounded-lg shadow-md">

        <div className="flex justify-between items-center bg-white">
  
   <div className="flex items-center space-x-2">
    <label className="text-sm font-medium text-gray-700">Show</label>
     <select
      className="px-3 py-1.5 border border-gray-100 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
      onChange={(e) => setItemsPerPage(Number(e.target.value))}
             value={itemsPerPage}
    >
      <option>2</option>
      <option>25</option>
      <option>50</option>
      <option>100</option>
    </select>
    <span className="text-sm font-medium text-gray-700">Entities</span>
  </div>

 
  <div className="flex space-x-2">
    {/* <button className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-900 focus:outline-none focus:ring focus:ring-green-300">
      Excel
    </button>
    <button className="px-5 py-2 text-sm font-medium text-white bg-red-700 rounded-md hover:bg-red-900 focus:outline-none focus:ring focus:ring-blue-300">
      Pdf
    </button> */}
    <button className="px-4 py-2 text-sm font-medium text-green-900 border-2 border-green-700 rounded-md hover:bg-green-900 hover:text-white focus:outline-none focus:ring focus:ring-green-300">
      Print
    </button>
  </div>


  <div className="flex justify-end items-center mb-4">
           <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-black text-sm bg-gray-100"
          />
        </div>
        </div>


          <table className="w-full border-collapse border border-gray-200 divide-y divide-gray-200">
            <thead className="border-gray-100 border-2">
              <tr className="bg-gray-900">
              <th className="text-left p-3 text-gray-300 font-medium text-sm border-gray-100 border">#</th>
                <th className="text-left p-3 text-gray-300 font-medium text-sm border-gray-100 border">Category Name</th>
                <th className="text-left p-3 text-gray-300 font-medium text-sm border-gray-100 border">Description</th>
                <th className="text-left p-3 text-gray-300 font-medium text-sm border-gray-100 border">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCategories.map((category) => (
                <tr key={category._id} className=" even:bg-gray-200 odd:bg-white hover:bg-gray-300">
                   <td className="p-2 text-gray-800 text-xs border-gray-100 border-2"></td>
                  <td className="p-2 text-gray-800 text-xs border-gray-100 border-2">{category.name}</td>
                  <td className="p-2 text-gray-800 text-xs border-gray-100 border-2">{category.description}</td>
                  <td className="p-2 flex space-x-2 border-gray-100 border-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="border-2 border-blue-500 text-blue-500 py-1 px-1 text-sm rounded-md hover:bg-blue-500 hover:text-white transition-colors"
                    >
                      <MdModeEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="border-2 border-red-500 text-red-500 py-1 px-1 text-sm rounded-md hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <MdDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {!currentCategories.length && (
                <tr>
                  <td colSpan="3" className="p-3 text-center text-gray-600">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

           {/* Pagination Section */}
           <div className="flex items-center justify-center space-x-2 mt-4">
  {/* Previous Button */}
  <button
    onClick={handlePreviousPage}
    disabled={currentPage === 1}
    className="px-3 py-2 border border-gray-300 rounded-md bg-white 
               text-gray-700 hover:bg-gray-200 disabled:opacity-50"
  >
    «
  </button>

  {/* Current Page */}
  <button
    className="px-4 py-2 border border-gray-300 rounded-md 
               bg-blue-600 text-white"
  >
    {currentPage}
  </button>

  {/* Total Pages Display */}
  <button
    className="px-4 py-2 border border-gray-300 rounded-md 
               bg-white text-gray-700 hover:bg-gray-200"
  >
    {totalPages}
  </button>

  {/* Next Button */}
  <button
    onClick={handleNextPage}
    disabled={currentPage === totalPages}
    className="px-3 py-2 border border-gray-300 rounded-md bg-white 
               text-gray-700 hover:bg-gray-200 disabled:opacity-50"
  >
    »
  </button>
</div>

        </div>
        
      </div>

      {/* Footer */}
      <footer className="bg-white p-4 text-center text-black text-sm">
        Copyright SLRC made by Department of ICT
      </footer>
    </div>
  );
};

export default Category;

