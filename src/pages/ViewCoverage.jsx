import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCoverage,getAllCorrespondents,fetchFilteredCoverages, getAllCoverages } from '../api/correspondentAPI';
import { MdDelete, MdEdit } from 'react-icons/md';
import { MdGridView } from "react-icons/md";

const ViewCoverage = () => {
  const [coverages, setCoverages] = useState([]);
  const [correspondents, setCorrespondents] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [password, setPassword] = useState(""); 
  const [isPasswordPromptVisible, setIsPasswordPromptVisible] = useState(false); 
  const [coverageToDelete, setCoverageToDelete] = useState(null); 
  const navigate = useNavigate();
  


  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCorrespondent, setSelectedCorrespondent] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const adminPassword = "admin123"; 

// Fetch coverages
const fetchCoverages = async () => {
  try {
    setLoading(true);
    const response = await getAllCoverages();
    setCoverages(response.data.reverse()); 
  } catch (error) {
    setErrorMessage(error.message);
  } finally {
    setLoading(false);
  }
};
  
  useEffect(() => {
    fetchCoverages();
    const fetchCorrespondents = async () => {
      const correspondents = await getAllCorrespondents();
      setCorrespondents(correspondents.data);
    };

    fetchCorrespondents();
  }, []);


    
  
  // Handle form submission with authentication
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log({
    correspondent: selectedCorrespondent,
    startDate,
    endDate,
  });

  try {
    const coverages = await fetchFilteredCoverages({
      startDate,
      endDate,
      correspondent: selectedCorrespondent,
    });

    setCoverages(coverages);
  } catch (error) {
    setErrorMessage(error.message);
  }
};
  const filteredCorrespondents = correspondents.filter((correspondent) =>
    correspondent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (correspondent) => {
    setSelectedCorrespondent(correspondent._id);
    setSearchTerm(correspondent.name);
    setIsDropdownOpen(false);
  };

    
  

  const handleEdit = (coverageNumber) => {
    navigate(`/coverage/${coverageNumber}`);
  };

  const handleDelete = (coverageNumber) => {
    setCoverageToDelete(coverageNumber);
    setIsPasswordPromptVisible(true);
  };

  const handlePasswordSubmit = async () => {
    if (password === adminPassword) {
      if (coverageToDelete) {
        try {
          await deleteCoverage(coverageToDelete);
          alert('Coverage deleted successfully');
        } catch (error) {
          console.error('Error deleting coverage:', error);
          alert('Failed to delete coverage');
        }
      }
      
      setIsPasswordPromptVisible(false);
      setPassword(""); 
    } else {
      alert('Incorrect password!');
    }
  };

  const handleCancelPasswordPrompt = () => {
    setIsPasswordPromptVisible(false); 
    setPassword(""); 
  };

  // Pagination logic
  const totalPages = Math.ceil(coverages.length / itemsPerPage);
  const currentCoverages = coverages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  
  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    const allCoverages = coverages.map((coverage, index) => (
      `<tr>
        <td class="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">${index + 1}</td>
        <td class="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">${coverage.coverageNumber}</td>
        <td class="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">${coverage.correspondent?.name || 'N/A'}</td>
        <td class="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">${coverage.correspondent?.CorId || 'N/A'}</td>
        <td class="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">${coverage.receivedDate || 'N/A'}</td>
        <td class="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">${coverage.telecastDate || 'N/A'}</td>
        <td class="p-3 py-1 text-gray-800 text-xs border-gray-100 border-2">${coverage.Category?.name || 'N/A'}</td>
        <td class="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">${coverage.telecastType || 'N/A'}</td>
        <td class="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">${coverage.channel}</td>
      </tr>`
    )).join('');
  
    printWindow.document.write(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border: 1px solid #ddd;
            }
            th {
              background-color: #f4f4f4;
            }
            .print-header {
              text-align: center;
              margin-bottom: 20px;
              font-size: 1.5em;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="print-header">Coverage Report</div>
          <table>
            <thead>
              <tr>
                <th class="text-left p-2 text-gray-700 font-medium text-sm">#</th>
                <th class="text-left p-2 text-gray-700 font-medium text-sm">Coverage Number</th>
                <th class="text-left p-2 text-gray-700 font-medium text-sm">Correspondent Name</th>
                <th class="text-left p-2 text-gray-700 font-medium text-sm">Correspondent Id</th>
                <th class="text-left p-2 text-gray-700 font-medium text-sm">Receive Date</th>
                <th class="text-left p-2 text-gray-700 font-medium text-sm">Telecast Date</th>
                <th class="text-left p-2 text-gray-700 font-medium text-sm">Category</th>
                <th class="text-left p-2 text-gray-700 font-medium text-sm">Status Type</th>
                <th class="text-left p-2 text-gray-700 font-medium text-sm">Channel</th>
              </tr>
            </thead>
            <tbody>
              ${allCoverages}
            </tbody>
          </table>
        </body>
      </html>
    `);
  
    printWindow.document.close();
    printWindow.print();
  };
  

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center space-x-4 mb-6">
        <MdGridView className="text-4xl text-black" />
        <h2 className="text-3xl font-semibold text-black">View Coverage</h2>
      </div>

      <div className="border-b-4 border-gray-900 mb-6"></div>

      {loading ? (
        <p>Loading...</p>
      ) : (

<div className="flex items-center justify-between space-x-16 p-4 bg-gray-100 border border-gray-200 rounded-md shadow-sm">
<div className="flex items-center justify-between p-4 bg-gray-100 border border-gray-200 rounded-md shadow-sm">
<form onSubmit={handleSubmit} className="flex items-center space-x-24">


{/* Correspondent */}
        <div className="mb-4">
          <label className="text-black font-medium text-sm">Correspondent</label>
          <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onFocus={() => setIsDropdownOpen(true)}
    placeholder="Search Correspondent..."
    className="w-full px-2 py-2 border rounded outline-none text-gray-700 text-sm"
  />
  {isDropdownOpen && (
    <ul
      className="absolute z-20 w-1/5 bg-white border border-gray-300 rounded shadow-md max-h-64 overflow-y-auto"
      onBlur={() => setIsDropdownOpen(false)}
    >
      {filteredCorrespondents.length > 0 ? (
        filteredCorrespondents.map((correspondent) => (
          <li
            key={correspondent._id}
            value={correspondent._id}
            onClick={() => handleSelect(correspondent)}
            className="px-2 py-1 hover:bg-gray-200 cursor-pointer text-sm"
          >
            {correspondent.name}
          </li>
        ))
      ) : (
        <li className="px-2 py-1 text-gray-500">No results found</li>
      )}
    </ul>
  )}
        </div>

        {/* Date and Status*/}
        <div className="mb-4">
          <label className="text-black font-medium text-sm">From Date</label>
          <input
            type="date"
            className="w-full px-1 py-2 border rounded outline-none text-gray-700 text-sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="text-black font-medium text-sm">To Date</label>
          <input
            type="date"
            className="w-full px-1 py-2 border rounded outline-none text-gray-700 text-sm"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
        >
          Filter
        </button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      </div>
      </div>
      )}
      
            <div className="flex items-center justify-between space-x-64 p-4 bg-gray-100 border border-gray-200 rounded-md shadow-sm">
        <div className="flex items-center space-x-8">
          <label className="text-sm font-medium text-gray-700">Show</label>
          <select
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span className="text-sm font-medium text-gray-700">Entities</span>

          <button
            onClick={handlePrint}
            className="px-4 py-2 text-sm font-medium text-green-700 border-2 border-green-500 rounded-lg bg-white transition duration-300 hover:bg-green-900 hover:text-white focus:outline-none focus:ring focus:ring-green-300"
          >
          
            Print
          </button>
        </div>

      <div className="flex justify-end items-center mb-1">
          <input
            type="text"
            placeholder="Search..."
            className="w-72 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm"
          />
        </div>
        </div>

       
      {/* Coverage Table */}
      <div id="coverage-report">
      {loading ? (
    <p className="text-center text-blue-600 font-semibold my-4">Loading coverage data...</p>
  ) : errorMessage ? (
    <p className="text-center text-red-600 font-semibold my-4">{errorMessage}</p>
  ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="border-gray-100 border-2">
            <tr className="bg-gray-200">
              <th className="text-left px-3 py-2 bg-gray-900 text-gray-300 font-medium text-md border-gray-500 border">#</th>
              <th className="text-left px-3 py-2 bg-gray-900 text-gray-200 font-medium text-md border-gray-500 border">Coverage Number</th>
              <th className="text-left px-3 py-2 bg-gray-900 text-gray-200 font-medium text-md border-gray-500 border">Correspondent Name</th>
              <th className="text-left px-3 py-2 bg-gray-900 text-gray-200 font-medium text-md border-gray-500 border">Correspondent Id</th>
              <th className="text-left px-3 py-2 bg-gray-900 text-gray-200 font-medium text-md border-gray-500 border">Receive Date</th>
              <th className="text-left px-3 py-2 bg-gray-900 text-gray-200 font-medium text-md border-gray-500 border">Telecast Date</th>
              <th className="text-left px-3 py-2 bg-gray-900 text-gray-200 font-medium text-md border-gray-500 border">Category</th>
              <th className="text-left px-3 py-2 bg-gray-900 text-gray-200 font-medium text-md border-gray-500 border">Status Type</th>
              <th className="text-left px-3 py-2 bg-gray-900 text-gray-200 font-medium text-md border-gray-500 border">Channel</th>
              <th className="text-left px-3 py-2 bg-gray-900 text-gray-200 font-medium text-md border-gray-500 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCoverages.length > 0 ? (
              currentCoverages.map((coverage, index) => (
                <tr key={coverage._id} className=" even:bg-gray-200 odd:bg-white hover:bg-gray-300">
                  <td className="px-3 py-1 text-gray-800 text-sm border-gray-100 border-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-3 py-1 text-gray-800 text-sm border-gray-100 border-2">{coverage.coverageNumber}</td>
                  <td className="px-3 py-1 text-gray-800 text-sm border-gray-100 border-2">{coverage.correspondent?.name || 'N/A'}</td>
                  <td className="px-3 py-1  text-gray-800 text-sm border-gray-100 border-2">{coverage.correspondent?.CorId || 'N/A'}</td>
                  <td className="px-3 py-1 text-gray-800 text-sm border-gray-100 border-2">
                    {coverage.receivedDate ? new Date(coverage.receivedDate).toISOString().split("T")[0] : "N/A"}
                  </td>
                  <td className="px-3 py-1 text-gray-800 text-sm border-gray-100 border-2">
                    {coverage.telecastDate
                      ? new Date(coverage.telecastDate).toISOString().split("T")[0] 
                      : "N/A"}
                  </td>

                  <td className="p-3 py-1 text-gray-800 text-sm border-gray-100 border-2">{coverage.Category?.name || 'N/A'}</td>
                  <td className="px-3 py-1 text-gray-800 text-sm border-gray-100 border-2">{coverage.telecastType || 'N/A'}</td>
                  <td className="px-3 py-1 text-gray-800 text-sm border-gray-100 border-2">{coverage.channel}</td>
                  <td className="px-6 py-2 text-md flex justify-between items-center space-x-2">
                  <button
                      className="cursor-pointer text-blue-600 text-2xl border border-gray-300 rounded p-1 hover:bg-blue-100"
                      onClick={() => handleEdit(coverage.coverageNumber)}
                    >
                      <MdEdit size={18} />
                    </button>
                    <button
                      className="cursor-pointer text-red-600 text-2xl border border-gray-300 rounded p-1 hover:bg-red-100"
                      onClick={() => handleDelete(coverage.coverageNumber)}
                    >
                      <MdDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="border px-4 py-2 text-center">
                  No coverage data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
          )}
      </div>
      

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2 disabled:opacity-50 text-sm"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-xs font-semibold">{currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded-md ml-2 disabled:opacity-50 text-sm"
        >
          Next
        </button>
      </div>

      {/* Password */}
      {isPasswordPromptVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Enter Admin Password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md w-full px-3 py-2 mb-4"
              placeholder="Password"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handlePasswordSubmit}
                className="border-2 border-red-500 text-red-500 bg-white px-4 py-2 rounded-md hover:bg-red-600 hover:text-white"
              >
                OK
              </button>
              <button
                onClick={handleCancelPasswordPrompt}
                className="border-2 border-gray-500 bg-white text-gray-500 px-4 py-2 rounded-md hover:bg-gray-600 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCoverage;
