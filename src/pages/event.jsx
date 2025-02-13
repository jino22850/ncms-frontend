import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getAllSubCategories,
  updateEvent,
} from '../api/correspondentAPI';

const Event = () => {
  const [Events, setEvents] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    eventName: '',
    subCategory: '',
    date: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  //fetch event
  const fetchEvents = async () => {
    try {
      const response = await getAllEvents();
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  //fetch sub categories
  const fetchSubCategories = async () => {
    try {
      const response = await getAllSubCategories();
      setSubCategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchSubCategories();
  }, []);

  //handle inputchanges
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateEvent(editingId, formData);
        setEditingId(null);
        alert('update successfully')
      } else {
        await addEvent(formData);
        alert('Add successfully')
      }
      setFormData({ eventName: '', subCategory: '', date: '', description: '' });
      fetchEvents();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('error occured')
    }
  };


  //Edit event
  const handleEdit = (event) => {
    const isConfirmed = window.confirm('Are you sure you want to edit this category?');
    if (isConfirmed) {
    setEditingId(event._id);
    setFormData({
      eventName: event.eventName,
      subCategory: event.subCategory?._id || '',
      date: event.date,
      description: event.description,
    });
    }else {
            console.log('Edit canceled');
        }
    };


  //Delete Event
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        fetchEvents();
        alert('successfully delete')
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('error occured')
      }
    }
  };

  //Search 
  const filteredEvents = (Events || []).filter(
    (event) =>
      (event.eventName &&
        event.eventName.toLowerCase().includes(search.toLowerCase())) ||
      (event.description &&
        event.description.toLowerCase().includes(search.toLowerCase()))
  );
  

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  //pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-[#F8F9FC] h-full w-full p-6">
        {/*header*/}
      <div className="flex items-center space-x-4 mb-6">
        <FaUser className="text-4xl text-black" />
        <h2 className="text-3xl font-semibold text-black">Event</h2>
      </div>

      {/* section 02 */}
      <div className="border-b-4 border-red-900 mb-6"></div>
      <div className="grid grid-cols-[1fr_6fr] gap-6">
        <form className="space-y-4" onSubmit={handleSubmit}>


          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Event Name
            </label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              required
              className="py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-900 focus:outline-none text-sm"
            />
          </div>


          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Sub Category
            </label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleInputChange}
              required
              className="py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-900 focus:outline-none text-sm"
            >
              <option value="" disabled>
                Select Sub Category
              </option>
              {subCategories.map((subCategory) => (
                <option key={subCategory._id} value={subCategory._id}>
                  {subCategory.subCategoryName}
                </option>
              ))}
            </select>
          </div>


          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-900 focus:outline-none text-sm"
            />
          </div>


          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-900 focus:outline-none text-sm"
            />
          </div>


          <button
            type="submit"
            className="w-full bg-red-900 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            {editingId ? 'Update Event' : 'Add Event'}
          </button>
          
        </form>

        {/* Section 02 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Show</label>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-3 py-1.5 border border-gray-300 rounded-md"
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
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-md"
            />
          </div>
          <table className="w-full border-collapse border border-gray-200 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">Event Name</th>
                <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">Sub Category</th>
                <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">Date</th>
                <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">Description</th>
                <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents.map((event) => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td className="p-3 text-gray-800 text-xs border-gray-100 border-2">{event.eventName}</td>
                  <td className="p-3 text-gray-800 text-xs border-gray-100 border-2">{event.subCategory?.subCategoryName || ''}</td>
                  <td className="p-3 text-gray-800 text-xs border-gray-100 border-2">{event.date}</td>
                  <td className="p-3 text-gray-800 text-xs border-gray-100 border-2">{event.description}</td>
                  <td className="p-3 flex space-x-2 border-gray-100 border-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md"
                    >
                      <MdModeEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* pagination */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-1 py-1 bg-gray-300 text-gray-700 rounded-md"
            >
              Previous
            </button>
            <span>
               {currentPage}{totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-1 py-1 bg-gray-300 text-gray-700 rounded-md"
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

export default Event;




