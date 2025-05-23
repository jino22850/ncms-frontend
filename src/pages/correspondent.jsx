import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { getAllCorrespondents, addCorrespondent, updateCorrespondent, deleteCorrespondent } from '../api/correspondentAPI'; 


const Correspondent = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    initials: '',
    CorId: '',
    district: '',
    email: '',
    NIC: '',
    address: '',
    mobileNumber: '',
  });
  const [searchResult, setSearchResults] = useState([]); 
  const [editing, setEditing] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  

  // Display all correspondents
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCorrespondents();
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const filteredResults = searchResult.filter((correspondent) =>
    Object.values(correspondent)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add new correspondent and Edit correspondent
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (editing) {
        await updateCorrespondent(formData.CorId, formData);
        alert('Correspondent updated successfully');
        onClose(); 
      window.location.reload();
      } else {
        const newCorrespondent = await addCorrespondent(formData);
        alert('Correspondent added successfully');
        setFormData({ ...formData, CorId: newCorrespondent.CorId });
      }onClose(); 
      window.location.reload();


     
      const generatedCode = response.data.CorId; 
      setFormData({
        ...formData,
        CorId: generatedCode,
      });

      setFormData({
        name: '',
        initials: '',
        CorId: '',
        district: '',
        email: '',
        NIC: '',
        address: '',
        mobileNumber: '',
      });
      setEditing(false);
    } catch (error) {
      console.error('Error submitting data: ', error);
      // alert('Failed to submit data');
    }
  };

  // Delete Correspondent
  const handleDelete = async (CorId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this correspondent?');
    if (isConfirmed) {
      try {
        const success = await deleteCorrespondent(CorId);
        if (success) {
          setSearchResults(searchResult.filter((correspondent) => correspondent.CorId !== CorId));
          alert('Correspondent deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting correspondent:', error);
        alert('Failed to delete correspondent');
      }
    }
  };
  
  // Edit Correspondent
  const handleEdit = (correspondent) => {
    setFormData({
      name: correspondent.name,
      initials: correspondent.initials,
      CorId: correspondent.CorId,
      district: correspondent.district,
      email: correspondent.email,
      NIC: correspondent.NIC,
      address: correspondent.address,
      mobileNumber: correspondent.mobileNumber,
    });
    setEditing(true);
    setShowModal(true);
  };

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredResults.slice(indexOfFirstResult, indexOfLastResult);


  const handleNext = () => {
    if (currentPage < Math.ceil(filteredResults.length / resultsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-500 grid grid-cols-[5fr] w-full min-w-screen-lg">
      <div className="flex items-center space-x-4 mb-6 max-w-screen">
        <FaUser className="text-4xl text-black" />
        <h2 className="text-3xl font-semibold text-black">Correspondent</h2>
      </div>

      <div className="border-b-4 border-gray-900 mb-6"></div>

      <div className="bg-gray-100 px-10 py-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between p-4 bg-gray-100 border border-gray-200 rounded-md shadow-sm">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Show</label>
            <select className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span className="text-sm font-medium text-gray-700">Entities</span>
          </div>

         

          <div className="flex justify-end items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-72 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm"
          />
        </div>
        </div>

        <div className="flex justify-end items-center mb-4">
        <button
  onClick={() => setShowModal(true)}
  className="mt-3 mb-1 px-4 py-2 text-sm font-medium text-red-900 border border-red-900 rounded-lg bg-white transition duration-300 hover:bg-red-900 hover:text-white focus:outline-none focus:ring focus:ring-red-300"
>
  Add New Correspondent
</button>

        </div>

        <table className="w-full border-collapse border divide-y">
          <thead className="border-gray-200 border-2 ">
            <tr className="text-left text-sm font-semibold">
              <th className="px-4 py-3 bg-gray-900 text-left text-md font-medium text-gray-300 uppercase tracking-wider border border-gray-100">#</th>
              <th className="px-4 py-2 bg-gray-900 text-left text-md font-medium text-gray-300 uppercase tracking-wider border border-gray-100">ID</th>
              <th className="px-4 py-2 bg-gray-900 text-left text-md font-medium text-gray-300 uppercase tracking-wider border border-gray-100">Name with initials</th>
              <th className="px-4 py-2 bg-gray-900 text-left text-md font-medium text-gray-300 uppercase tracking-wider border border-gray-100">District</th>
              <th className="px-4 py-2 bg-gray-900 text-left text-md font-medium text-gray-300 uppercase tracking-wider border border-gray-100">Email</th>
              {/* <th className="px-3 py-2 bg-gray-200 text-left text-md font-medium text-gray-500 uppercase tracking-wider text-ellipsis">Address</th> */}
              <th className="px-4 py-2 bg-gray-900 text-left text-md font-medium text-gray-300 uppercase tracking-wider border border-gray-100">Mobile Number</th>
              <th className="px-4 py-2 bg-gray-900 text-left text-md font-medium text-gray-300 uppercase tracking-wider border border-gray-100">NIC</th>
              <th className="px-4 py-2 bg-gray-900 text-left text-md font-medium text-gray-300 uppercase tracking-wider border border-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {currentResults.map((correspondent, index) => (
              <tr key={correspondent.CorId}  className=" even:bg-gray-200 odd:bg-white hover:bg-gray-300">
                <td className="px-4 py-2">
                  {currentResults.length - index + (currentPage - 1) * resultsPerPage}
                </td>
                <td className="px-3 py-2 text-md border-gray-100 border-2">{correspondent.CorId}</td>
                <td className="px-4 py-2 text-md text-ellipsis overflow-hidden whitespace-nowrap" style={{ maxWidth: '150px' }}>
                  {correspondent.name}
                </td>
                <td className="px-4 py-2 text-md">{correspondent.district}</td>
                <td className="px-4 py-2 text-md">{correspondent.email}</td>
                {/* <td className="px-4 py-2 text-md text-ellipsis overflow-hidden" style={{ maxWidth: '150px' }}>
                  {correspondent.address}
                </td> */}
                <td className="px-4 py-2 text-md">{correspondent.mobileNumber}</td>
                <td className="px-4 py-2 text-md">{correspondent.NIC}</td>
                <td className="px-6 py-2 text-md flex justify-between items-center space-x-2">
  <MdModeEdit
    className="cursor-pointer text-blue-600 text-2xl border border-blue-400 rounded p-1 hover:bg-blue-100"
    onClick={() => handleEdit(correspondent)}
  />
  <MdDelete
    className="cursor-pointer text-red-600 text-2xl border border-red-400 rounded p-1 hover:bg-red-100"
    onClick={() => handleDelete(correspondent.CorId)}
  />
</td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
              <div className="flex items-center justify-center space-x-2 mt-4">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded-md bg-white 
                    text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          «
        </button>

        {/* Current Page */}
        <span className="px-3 py-1 border border-gray-300 rounded-md 
                        bg-blue-600 text-white font-bold">
          {currentPage}
        </span>

        {/* Total Pages Display */}
        <span className="px-3 py-1 border border-gray-300 rounded-md 
                        bg-gray-100 text-gray-700">
          {Math.ceil(filteredResults.length / resultsPerPage)}
        </span>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === Math.ceil(filteredResults.length / resultsPerPage)}
          className="px-3 py-1 border border-gray-300 rounded-md bg-white 
                    text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          »
        </button>
      </div>

      </div>

     
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-200 p-8 rounded-lg shadow-xl w-1/2 mt-10 ">
            <h2 className="text-xl font-semibold mb-6">{editing ? 'Edit Correspondent' : 'Add New Correspondent'}</h2>

            <div className="border-b-4 border-red-900 mb-6"></div>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 w-full">
              <div>
                <label htmlFor="name" className="block text-sm font-medium ">
                  Calling Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label htmlFor="initials" className="block text-sm font-medium ">
                  Name with Initials
                </label>
                <input
                  type="text"
                  id="initials"
                  name="initials"
                  value={formData.initials}
                  onChange={handleChange}
                  className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>

            <div>
              <label className="block text-sm font-medium">District :</label>
              <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  className="w-full h-10 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm"
              >
                <option value="">Select a district</option>
                <option value="Ampara">Ampara</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Badulla">Badulla</option>
                <option value="Batticaloa">Batticaloa</option>
                <option value="Colombo">Colombo</option>
                <option value="Galle">Galle</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Hambantota">Hambantota</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Kandy">Kandy</option>
                <option value="Kegalle">Kegalle</option>
                <option value="Kilinochchi">Kilinochchi</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Mannar">Mannar</option>
                <option value="Matale">Matale</option>
                <option value="Matara">Matara</option>
                <option value="Monaragala">Monaragala</option>
                <option value="Mullaitivu">Mullaitivu</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>
                <option value="Polonnaruwa">Polonnaruwa</option>
                <option value="Puttalam">Puttalam</option>
                <option value="Rathnapura">Rathnapura</option>
                <option value="Trincomalee">Trincomalee</option>
                <option value="Vavuniya">Vavuniya</option>
              
              </select>
            </div>


            
            

            <div>
              <label className="block text-sm font-medium">Email :</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-10 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">NIC Number :</label>
              <input
                type="text"
                name="NIC"
                value={formData.NIC}
                onChange={handleChange}
                className="w-full h-10 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Mobile Number :</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className="w-full h-10 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Address :</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full h-10 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Correspondent Number :</label>
              <input
                type="text"
                name="CorId"
                value={formData.CorId}
                onChange={handleChange}
                required
                className="w-full h-10 px-4 py-2 bg-gray-200 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm"
                disabled 
              />
            </div>
            

         <div></div>

            <div className="flex justify-start gap-16 w-full">
  <button
    type="button"
    onClick={() => setShowModal(false)}
    className="mt-3 mb-1 px-4 py-2 text-sm font-medium text-red-700 border border-red-300 rounded-lg bg-white transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none focus:ring focus:ring-red-300"
  >
    Cancel
  </button>

  <button
    type="submit"
    className="mt-3 mb-1 px-4 py-2 text-sm font-medium text-blue-900 border border-blue-900 rounded-lg bg-white transition duration-300 hover:bg-blue-900 hover:text-white focus:outline-none focus:ring focus:ring-blue-300"
  >
    {editing ? 'Save Changes' : 'Add Correspondent'}
  </button>
</div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Correspondent;