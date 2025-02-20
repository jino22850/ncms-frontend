import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { getAllCorrespondents } from "../api/correspondentAPI";

const CorrespondentReport = () => {
  const [correspondents, setCorrespondents] = useState([]);
  const [filteredCorrespondents, setFilteredCorrespondents] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  useEffect(() => {
    const fetchCorrespondents = async () => {
      try {
        const response = await getAllCorrespondents();
        console.log(response.data);

        if (Array.isArray(response.data)) {
          setCorrespondents(response.data);
          setFilteredCorrespondents(response.data);

          
          const uniqueDistricts = [...new Set(response.data.map((correspondent) => correspondent.district))];
          setDistricts(uniqueDistricts);
        } else {
          console.error("Unexpected data format:", response.data);
          setError("Invalid data format received from API.");
        }
      } catch (error) {
        console.error("Error fetching correspondents:", error);
        setError("Failed to fetch data from the server.");
      }
    };

    fetchCorrespondents();
  }, []);

  const handleFilterChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);

    if (district === "") {
      setFilteredCorrespondents(correspondents);
    } else {
      const filtered = correspondents.filter((correspondent) => correspondent.district === district);
      setFilteredCorrespondents(filtered);
    }
    setCurrentPage(1); 
  };

 
  const totalPages = Math.ceil(filteredCorrespondents.length / itemsPerPage);
  const currentCorrespondents = filteredCorrespondents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById("printable-table");
    const newWindow = window.open();
    newWindow.document.write(printContent.outerHTML);
    newWindow.document.close();
    newWindow.print();
  };


  return (
    <div>
      <div className="flex items-center space-x-4 mb-6 max-w-screen ml-4 ">
        <FaUser className="text-4xl text-black" />
        <h2 className="text-3xl font-semibold text-black">
          Correspondent Report
        </h2>
      </div>

      <div className="border-b-4 border-red-900 mb-6"></div>
      {error && <p style={{ color: "red" }}>{error}</p>}

     
      <div>
        <label className="ml-4 text-sm text-bold">District: </label>
        <select
          id="district"
          value={selectedDistrict}
          onChange={handleFilterChange}
          className="w-1/3 h-10 ml-4 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm"
        >
          <option value="">All Districts</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      <div className="grid justify-end mb-4 items-center space-x-4 grid-cols-7 ">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <button
          onClick={handlePrint}
          className="px-5 py-2 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-900 focus:outline-none focus:ring focus:ring-blue-300 "
        >
          Download
        </button>
        <button
          onClick={handlePrint}
          style={{ margin: "10px 4" }}
          className="px-5 py-2 text-sm font-medium text-white bg-red-700 rounded-md hover:bg-red-900 focus:outline-none focus:ring focus:ring-blue-300 "
        >
          Print Report
        </button>
      </div>

      
      <div id="printable-table">
        <table className="relative">
          <thead>
            <tr>
            <th className="px-6 py-6 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-2 border-white">#</th>
              <th className="px-6 py-6 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-2 border-white">
                ID
              </th>
              <th className="px-6 py-6 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-2 border-white">
                Name
              </th>
              <th className="px-6 py-6 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-2 border-white">
                District
              </th>
              <th className="px-6 py-2 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-2 border-white">
                NIC
              </th>
              <th className="px-6 py-2 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-ellipsis border-2 border-white">
                Address
              </th>
              <th className="px-6 py-6 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-2 border-white">
                Email
              </th>
              <th className="px-6 py-6 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-2 border-white">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(currentCorrespondents) && currentCorrespondents.length > 0 ? (
    currentCorrespondents.map((correspondent,index) => (
      <tr key={correspondent._id}>
        <td className="px-4 py-2 text-gray-800 text-sm border-white border-2">
        {(currentPage - 1) * itemsPerPage + index + 1}
      </td>
        <td className="px-4 py-2 text-sm text-ellipsis overflow-hidden whitespace-nowrap border-2 border-white ">
          {correspondent.CorId}
        </td>
        <td className="px-4 py-2 text-sm text-ellipsis overflow-hidden whitespace-nowrap border-2 border-white ">
          {correspondent.name}
        </td>
        <td className="px-4 py-2 text-sm text-ellipsis overflow-hidden whitespace-nowrap border-2 border-white ">
          {correspondent.district}
        </td>
        <td className="px-6 py-2 text-sm text-ellipsis overflow-hidden whitespace-nowrap border-2 border-white  ">
          {correspondent.NIC}
        </td>
        <td
          className="px-6 py-2 text-sm text-ellipsis overflow-hidden whitespace-nowrap border-2 border-white "
          style={{ maxWidth: "200px" }}
        >
          {correspondent.address}
        </td>
        <td className="px-6 py-2 text-sm text-ellipsis overflow-hidden whitespace-nowrap border-2 border-white ">
          {correspondent.email}
        </td>
        <td className="px-6 py-2 text-sm text-ellipsis overflow-hidden whitespace-nowrap border-2 border-white ">
          {correspondent.mobileNumber}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="px-6 py-2 text-center text-sm text-gray-500">
        No data available
      </td>
    </tr>
  )}
</tbody>

        </table>


      {/* Pagination*/}
      <div className="flex justify-end mt-4">
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


      </div>
    </div>
  );
};

export default CorrespondentReport;
