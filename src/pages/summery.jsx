import React, { useState } from 'react';
import { getCoverageCountByCorrespondent } from '../api/correspondentAPI';
import { FaUser } from "react-icons/fa";

const Summery = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [coverageData, setCoverageData] = useState([]);
    const [error, setError] = useState(null);
    const [token] = useState(localStorage.getItem('token')); // Assuming token is saved in localStorage

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === "startDate") {
            setStartDate(value);
        } else if (name === "endDate") {
            setEndDate(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            setError("Please select a valid date range.");
            return;
        }

        try {
            const data = await getCoverageCountByCorrespondent(token, startDate, endDate);
            setCoverageData(data);
            setError(null); // Clear error if data is fetched successfully
        } catch (err) {
            setError("Error fetching coverage data.");
        }
    };


    

  return (
  <div className="bg-gray-50 min-h-screen flex flex-col">
        <div className="flex items-center space-x-4 mb-6">
          <FaUser className="text-4xl text-black" />
          <h2 className="text-3xl font-semibold text-black">Coverage Summery Report</h2>
        </div>
  
        <div className="border-b-4 border-red-900 mb-6"></div>


        <div className="flex items-center justify-between p-4 bg-gray-100 border border-gray-200 rounded-md shadow-sm">
        <form onSubmit={handleSubmit} className="flex items-center space-x-24">
        <div className="flex items-center space-x-6">
  <label className="text-black font-medium text-sm whitespace-nowrap">From Date:</label>
  <input
    type="date" 
    id="startDate" 
    name="startDate" 
    value={startDate}
    onChange={handleDateChange} 
    className="px-2 py-1 border rounded outline-none text-gray-700 text-sm"
    required
  />
</div>


            <div className="flex items-center space-x-6">
              <label className="text-black font-medium text-sm whitespace-nowrap">To Date</label>
              <input
                type="date" 
                id="endDate" 
                name="endDate" 
                value={endDate}
                onChange={handleDateChange} 
                className="w-full px-1 py-2 border rounded outline-none text-gray-700 text-sm"
                required
              />
            </div>

            <div className="mb-1">
           <button type='submit'  className="px-5 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300">Filter</button>
            </div>
            </form>
            </div>

            <div className="flex items-center justify-between space-x-48 p-4 bg-gray-100 border border-gray-200 rounded-md shadow-sm">
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
            className="w-72 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-sm"
          />
        </div>

  </div>

  {error && <p className="error-message">{error}</p>}

            {/* Display the results */}
            {coverageData.length > 0 && (
                <div className="coverage-results">
                    <table>
                        <thead>
                            <tr>
                                {/* <th className="text-left p-2 text-gray-700 font-medium text-sm border-gray-100 border-2">#</th> */}
                                <th className ="text-left p-2 text-gray-700 font-medium text-sm border-gray-100 border-2">Correspondent Name</th>
                                <th className ="text-left p-2 text-gray-700 font-medium text-sm border-gray-100 border-2">Correspondent ID</th>
                                <th className ="text-left p-2 text-gray-700 font-medium text-sm border-gray-100 border-2">District</th>
                                <th className ="text-left p-2 text-gray-700 font-medium text-sm border-gray-100 border-2">Total Coverage</th>
                                <th className ="text-left p-2 text-gray-700 font-medium text-sm border-gray-100 border-2">Voice Telecast</th>
                                <th className ="text-left p-2 text-gray-700 font-medium text-sm border-gray-100 border-2">Without Voice Telecast</th>
                                <th className ="text-left p-2 text-gray-700 font-medium text-sm border-gray-100 border-2">Not Telecast</th>
                                <th className ="text-left p-2 text-gray-700 font-medium text-sm border-gray-100 border-2">Total Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coverageData.map((data) => (
                                <tr key={data.correspondentId}>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{data.correspondentName}</td>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{data.CorId}</td>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{data.District}</td>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{data.totalCoverage}</td>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{data.voiceTelecast}</td>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{data.withoutVoiceTelecast}</td>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{data.notTelecast}</td>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{data.totalPayment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

   </div>
  )
}

export default Summery
