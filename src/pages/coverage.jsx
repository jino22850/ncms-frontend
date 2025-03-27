import React, { useState, useEffect } from 'react';
import { getAllCorrespondents, getAllSubCategories, getAllEvents, getAllCategories, getCoverageByNumber,addCoverage,updateCoverage } from '../api/correspondentAPI';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

const Coverage = () => {
  const [correspondent, setCorrespondent] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const { coverageNumber } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correspondent: '',
    coverageNumber: '',
    receivedDate: '',
    telecastDate: '',
    Category: '',
    event: '',
    subCategory: '',
    channel: '',
    medium: '',
    telecastType: '',
  });
  const isEdit = Boolean(coverageNumber);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const correspondents = await getAllCorrespondents();
        setCorrespondent(correspondents.data);

        const categoryData = await getAllCategories();
        setCategories(categoryData.data);

        const subCategoriesData = await getAllSubCategories();
        setSubCategories(subCategoriesData.data);

        const eventsData = await getAllEvents();
        setEvents(eventsData.data);

        if (isEdit) {
          const coverageData = await getCoverageByNumber(coverageNumber);
          setFormData({
            ...coverageData.data,
            Category: coverageData.data.Category || '',
            event: coverageData.data.event || '',
            subCategory: coverageData.data.subCategory || '',
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [coverageNumber, isEdit]);

  
  const generateCoverageNumber = () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, ''); 
    const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase(); 
    return `COV-${dateStr}-${randomStr}`;
  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


const getAuthToken = () => localStorage.getItem('authToken');

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const generatedNumber = generateCoverageNumber();
    const token = getAuthToken();
    await addCoverage(
      { ...formData, coverageNumber: generatedNumber },
      token
  );

    navigate('/viewCoverage');

    console.log('Coverage added successfully:');
    alert('Coverage added successfully');

    setFormData({
      correspondent: '',
      coverageNumber: '',
      receivedDate: '',
      telecastDate: '',
      Category: '',
      event: '',
      subCategory: '',
      channel: '',
      medium: '',
      telecastType: '',
    });
  } catch (error) {
    console.error('Error adding coverage:', error);
    alert('Failed to add coverage');
  }
};


const handleUpdate = async (e) => {
  e.preventDefault();

try {
  const token = getAuthToken();

  await updateCoverage(formData.coverageNumber, formData, token);

  alert('Coverage updated successfully');
  navigate('/viewCoverage'); 
} catch (error) {
  console.error('Error updating coverage:', error);
  alert('Failed to update coverage');
}
};
 
  return (
    <div className=" bg-gradient-to-r from-gray-100 to-gray-500 min-h-screen flex flex-col">
      <div className="flex items-center space-x-4 mb-6">
        <FaUser className="text-4xl text-black" />
        <h2 className="text-3xl font-semibold text-black">Coverage and Telecast</h2>
      </div>

      <div className="border-b-4 border-gray-900 mb-6"></div>

      {/* <h2 className="text-3xl font-semibold text-black">
          {isEdit ? 'Edit Coverage' : 'Add Coverage'}
        </h2> */}


      <form className="space-y-2" onSubmit={isEdit ? handleUpdate : handleSubmit}>
        <div className="bg-gradient-to-r from-gray-100 to-gray-500 rounded shadow p-6 w-full">
          <div className="grid grid-cols-3 gap-14">
            {/* Correspondent */}
            <div className="mb-1">
              <label className="text-black font-medium text-sm">Correspondent</label>
              <select
                name="correspondent"
                value={formData.correspondent}
                onChange={handleChange}
                className="w-full px-2 py-2 border rounded outline-none text-gray-700 text-sm"
                required
              >
                <option value="" disabled>Select a Correspondent</option>
                {correspondent.map((correspondent) => (
                  <option key={correspondent._id} value={correspondent._id}>
                    {correspondent.name}
                  </option>
                ))}
              </select>
            </div>

            

            {/* Received Date */}
            <div className="mb-4">
              <label className="text-black font-medium text-sm">Received Date</label>
              <input
                type="date"
                name="receivedDate"
                value={formData.receivedDate || ''}
                onChange={handleChange}
                className="w-full px-2 py-2 border rounded outline-none text-gray-700 text-sm"
                required
              />
            </div>

            {/* Telecast Date */}
            <div className="mb-4">
              <label className="text-black font-medium text-sm">Telecast Date</label>
              <input
                type="date"
                name="telecastDate"
                value={formData.telecastDate || ''}
                onChange={handleChange}
                className="w-full px-2 py-2 border rounded outline-none text-gray-700 text-sm"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="text-black font-medium text-sm">Category</label>
              <select
                name="Category"
                value={formData.Category}
                onChange={handleChange}
                className="w-full px-2 py-2 border rounded outline-none text-gray-700 text-sm"
              >
                <option value="" disabled>Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Event */}
            <div className="mb-4">
              <label className="text-black font-medium text-sm">Event</label>
              <select
                name="event"
                value={formData.event}
                onChange={handleChange}
                className="w-full px-2 py-2 border rounded outline-none text-gray-700 text-sm"
                required
              >
                <option value="" disabled>Select Event</option>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.eventName}
                  </option>
                ))}
              </select>
            </div>

            {/* SubCategory */}
            <div className="mb-4">
              <label className="text-black font-medium text-sm">SubCategory</label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="w-full px-2 py-2 border rounded outline-none text-gray-700 text-sm"
              >
                <option value="" disabled>Select Sub Category</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.subCategoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Channel */}
            <div className="mb-4">
              <label className="text-black font-medium text-sm">Channel</label>
              <select
                name="channel"
                value={formData.channel}
                onChange={handleChange}
                className="w-full px-2 py-2 border rounded outline-none text-gray-700 text-sm"
                required
              >
                <option value="search">Search</option>
                <option value="rupavahini">Rupavahini</option>
                <option value="eye">Eye</option>
              </select>
            </div>

            {/* Medium */}
            <div className="mb-4">
              <label className="text-black font-medium text-sm">Medium</label>
              <select
                name="medium"
                value={formData.medium}
                onChange={handleChange}
                className="w-full px-2 py-2 border rounded outline-none text-gray-700 text-sm"
                required
              >
                <option value="search">Search</option>
                <option value="Sinhala">Sinhala</option>
                <option value="Tamil">Tamil</option>
                <option value="English">English</option>
              </select>
            </div>

            {/* Telecast Type */}
            <div className="mb-4">
              <label className="text-black font-medium text-sm">Telecast Type</label>
              <select
                name="telecastType"
                value={formData.telecastType}
                onChange={handleChange}
                className="w-full px-2 py-2 border rounded outline-none text-gray-700 text-sm"
              >
                <option value="">Select Type</option>
                <option value="With Voice">With Voice</option>
                <option value="Without Voice">Without Voice</option>
                <option value="Not Telecast">Not Telecast</option>
              </select>
            </div>

            {/* Coverage Number */}
            <div className="mb-4">
              <label className="text-black font-medium text-sm">Coverage Number</label>
              <input
                type="text"
                name="coverageNumber"
                value={formData.coverageNumber || ''}
                className="w-full px-2 py-2 bg-gradient-to-r from-gray-100 to-gray-300 border rounded outline-none text-gray-700 text-sm"
                readOnly
              />
            </div>

            <button
              type="submit"
              className="mt-3 mb-1 px-4 py-2 text-sm font-medium text-red-900 border border-red-900 rounded-lg bg-white transition duration-300 hover:bg-red-900 hover:text-white focus:outline-none focus:ring focus:ring-red-300"
            >
             {isEdit ? 'Update Coverage' : 'Add Coverage'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Coverage;
