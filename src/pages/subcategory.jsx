import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import {
  createSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
} from '../api/correspondentAPI';
import { getAllCategories } from '../api/correspondentAPI'; 

const Subcategory = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [formData, setFormData] = useState({
    subCategoryName: '',
    category: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  const fetchSubCategories = async () => {
    try {
      const response = await getAllSubCategories();
      setSubCategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateSubCategory(editingId, formData);
        setEditingId(null);
      } else {
        await createSubCategory(formData);
        alert('category updated successfully');
      }
      setFormData({ subCategoryName: '',
                    category: '', 
                    description: '' 
                  });
      fetchSubCategories();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add/updated data');
    }
  };

  const handleEdit = (subCategory) => {
    const isConfirmed = window.confirm('Are you sure you want to edit this category?');
    if (isConfirmed) {
    setEditingId(subCategory._id);
    setFormData({
      subCategoryName: subCategory.subCategoryName,
      category: subCategory.category?._id || '',
      description: subCategory.description,
    });
  }else {
      console.log('Edit canceled');
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this category?');
    if (isConfirmed) {
    try {
      await deleteSubCategory(id);
      fetchSubCategories();
      alert('category deleted successfully');
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      alert('An error occurred while deleting the category. Please try again.');
    }
  } else {
    console.log('Deletion canceled');
  }
  };

  useEffect(() => {
    fetchSubCategories();
    fetchCategories(); 
  }, []);

   // Filter categories 
   const filteredSubCategories = subCategories.filter(
    (subCategory) =>
      (subCategory.subCategoryName &&
        subCategory.subCategoryName.toLowerCase().includes(search.toLowerCase())) ||
      (subCategory.description &&
        subCategory.description.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredSubCategories.length / itemsPerPage);
  const currentSubCategories = filteredSubCategories.slice(
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
        <h2 className="text-3xl font-semibold text-black">Sub Category</h2>
      </div>

      <div className="border-b-4 border-red-900 mb-6"></div>

      <div className="grid grid-cols-[1fr_5fr] gap-6">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Sub Category Name
            </label>
            <input
              type="text"
              name="subCategoryName"
              value={formData.subCategoryName}
              onChange={handleInputChange}
              className="py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-900 focus:outline-none text-sm"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-900 focus:outline-none text-sm"
              required
            >
              <option value="" disabled>
                Select a Category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
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
            className="w-full bg-red-900 text-white py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
          >
            {editingId ? 'Update' : 'Add'}
          </button>
        </form>

        {/* Table Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center bg-white">
   
   <div className="flex items-center space-x-2">
    <label className="text-sm font-medium text-gray-700">Show</label>
     <select
      className="px-3 py-1.5 border border-gray-100 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
      onChange={(e) => setItemsPerPage(Number(e.target.value))}
             value={itemsPerPage}
    >
      <option>10</option>
      <option>25</option>
      <option>50</option>
      <option>100</option>
    </select>
    <span className="text-sm font-medium text-gray-700">Entities</span>
  </div>

  {/* Buttons Section */}
  <div className="flex space-x-2">
    <button className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-900 focus:outline-none focus:ring focus:ring-green-300">
      Excel
    </button>
    <button className="px-5 py-2 text-sm font-medium text-white bg-red-700 rounded-md hover:bg-red-900 focus:outline-none focus:ring focus:ring-blue-300">
      Pdf
    </button>
    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300">
      Print
    </button>
  </div>


  <div className="flex justify-end items-center mb-4">
           <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm bg-gray-100"
          />
        </div>
        
        </div>
        <div className="border-b-2 border-gray-600 mb-6"></div>

         <div className='w-full'> 
          <table className="w-full border-collapse border border-gray-200 divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-200">
              <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">
                #
                </th>
                <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">
                  Sub Category Name
                </th>
                <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">
                  Category Name
                </th>
                <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">
                  Description
                </th>
                <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2" >Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentSubCategories.map((subCategory) => (
                <tr key={subCategory._id} className="hover:bg-gray-50">
                  
                  <td className="p-3 text-gray-800 text-xs border-gray-100 border-2"></td>
                  <td className="p-3 text-gray-800 text-xs border-gray-100 border-2">{subCategory.subCategoryName}</td>
                  <td className="p-3 text-gray-800 text-xs border-gray-100 border-2">{subCategory.category?.name || 'N/A'}</td>
                  <td className="p-3 text-gray-800 text-xs border-gray-100 border-2">{subCategory.description}</td>
                  <td className="p-3 flex space-x-2 border-gray-100 border-2">
                    <button
                      onClick={() => handleEdit(subCategory)}
                      className="bg-blue-500 text-white py-1 px-1 text-sm rounded-md hover:bg-blue-400 transition-colors"
                    >
                      <MdModeEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(subCategory._id)}
                      className="bg-red-500 text-white py-1 px-1 text-sm rounded-md hover:bg-red-400 transition-colors"
                    >
                      <MdDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
           </div> 

          {/* Pagination Section */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-gray-200 px-4 py-2 rounded-md cursor-pointer"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-200 px-4 py-2 rounded-md cursor-pointer"
            >
              Next
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

export default Subcategory;
