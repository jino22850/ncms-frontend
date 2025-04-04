import React, { useEffect, useState} from 'react';
import { getAllCoveragesRepo,getAllCorrespondents,fetchFilteredCoverages } from '../api/correspondentAPI';
import { MdGridView } from "react-icons/md";



const CoverageReport = () => {
const [coverages, setCoverages] = useState([]);
const [correspondents, setCorrespondents] = useState([]);
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [errorMessage, setErrorMessage] = useState(''); 
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(10);
const [loading, setLoading] = useState(false);

const [searchTerm, setSearchTerm] = useState('');
const [selectedCorrespondent, setSelectedCorrespondent] = useState('');
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const fetchCoverages = async () => {
  setLoading(true);
  try {
    const data = await getAllCoveragesRepo();
    console.log("API Response:", data); 
    setCoverages(Array.isArray(data) ? data : []); 
  } catch (error) {
    console.error("Error fetching coverages:", error);
    setCoverages([]); 
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  fetchCoverages();

  const fetchCorrespondents = async () => {
    try {
      const response = await getAllCorrespondents();
      setCorrespondents(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching correspondents:", error);
    }
  };

  fetchCorrespondents();
}, []);


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

  // Print function
  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    // const printContent = document.getElementById('coverage-report').innerHTML;
  
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
        <h2 className="text-3xl font-semibold text-black">Coverage Report</h2>
      </div>

      <div className="border-b-4 border-gray-900 mb-6"></div>

      
<div className="flex items-center justify-between p-4 bg-gray-100 border border-gray-200 rounded-md shadow-sm">
<div className="flex items-center justify-between p-4 bg-gray-100 border border-gray-200 rounded-md shadow-sm">
<form onSubmit={handleSubmit} className="flex items-center space-x-24">

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
          className="px-8 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Filter
        </button>
      </form>
      </div>
      </div>

      {loading && <p>Loading...</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div className="flex items-center justify-between p-4 bg-gray-100 border border-gray-200 rounded-md shadow-sm">
        <div className="flex items-center space-x-2">
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
        </div>
        
       
        <div className="flex space-x-2">
        
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300"
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

   
      <div id="coverage-report">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="border-gray-100 border-2">
            <tr className="bg-gray-900">
              <th className="text-left px-3 py-3 bg-gray-900 text-gray-300 font-medium text-sm border-gray-100 border">#</th>
              <th className="text-left px-3 py-3 bg-gray-900 text-gray-300 font-medium text-sm border-gray-100 border">Coverage Number</th>
              <th className="text-left px-3 py-3 bg-gray-900 text-gray-300 font-medium text-sm border-gray-100 border">Correspondent Name</th>
              <th className="text-left px-3 py-3 bg-gray-900 text-gray-300 font-medium text-sm border-gray-100 border">Correspondent Id</th>
              <th className="text-left px-3 py-3 bg-gray-900 text-gray-300 font-medium text-sm border-gray-100 border">Receive Date</th>
              <th className="text-left px-3 py-3 bg-gray-900 text-gray-300 font-medium text-sm border-gray-100 border">Telecast Date</th>
              <th className="text-left px-3 py-3 bg-gray-900 text-gray-300 font-medium text-sm border-gray-100 border">Category</th>
              <th className="text-left px-3 py-3 bg-gray-900 text-gray-300 font-medium text-sm border-gray-100 border">Status Type</th>
              <th className="text-left px-3 py-3 bg-gray-900 text-gray-300 font-medium text-sm border-gray-100 border">Channel</th>
       
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
                  <td className="px-3 py-1 text-gray-800 text-sm border-gray-100 border-2">{coverage.receivedDate || 'N/A'}</td>
                  <td className="px-3 py-1 text-gray-800 text-sm border-gray-100 border-2">{coverage.telecastDate || 'N/A'}</td>
                  <td className="p-3 py-1 text-gray-800 text-sm border-gray-100 border-2">{coverage.Category?.name || 'N/A'}</td>
                  <td className="px-3 py-1 text-gray-800 text-sm border-gray-100 border-2">{coverage.telecastType || 'N/A'}</td>
                  <td className="px-3 py-1 text-gray-800 text-sm border-gray-100 border-2">{coverage.channel}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="border px-4 py-2 text-center text-sm">
                  No coverage data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination*/}
       
       <div className="flex items-center justify-center space-x-2 mt-4">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white 
                      text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            «
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border border-gray-300 rounded-md 
                          transition-all ${
                            currentPage === index + 1
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-200"
                          }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white 
                      text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            »
          </button>
        </div>

    </div>
  );
};

export default CoverageReport;

