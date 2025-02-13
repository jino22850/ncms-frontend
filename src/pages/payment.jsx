import React, { useState } from 'react';
 import { FaUser} from "react-icons/fa";
import {generatePayments } from '../api/correspondentAPI';

const GeneratePayments = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
//const [error, setError] = useState([]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!month || !year) {
      setStatus("Please provide both month and year.");
      return;
    }

    setLoading(true);
    setStatus("");
    setResults([]);

    try {
      const response = await generatePayments(month, year);
      console.log("API Response:", response); 

      setLoading(false);
      if (response?.results && response.results.length > 0) {
        setResults(response.results);
      } else {
        setStatus("No results found.");
      }
    } catch (error) {
      console.error("Error generating payments:", error);
      setLoading(false);
      setStatus("Error generating payments. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col p-6">
      <div className="flex items-center space-x-4 mb-6">
        <FaUser className="text-4xl text-black" />
        <h2 className="text-3xl font-semibold text-black">Payments</h2>
      </div>

      <div className="border-b-4 border-red-900 mb-6"></div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#eeeded] rounded shadow p-6 w-full">
          <div className="grid grid-cols-4 gap-16">
            <div className="flex flex-col">
              <label htmlFor="month" className="block text-sm font-medium text-gray-700">
                Month
              </label>
              <input
                type="number"
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Month (1-12)"
                min="1"
                max="12"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="number"
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Year"
                min="2000"
              />
            </div>

            <button
              type="submit"
              className="col-span-2 bg-red-900 text-white py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Payments'}
            </button>
          </div>
        </div>
      </form>

      {status && <p className="text-red-500 text-center mt-4">{status}</p>}

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Generation Results</h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead className='bg-gray-100'>
                <tr>
                
                  <th className="p-3 text-sm font-medium text-gray-700 border-2">Correspondent Name</th>
                  <th className="p-3 text-sm font-medium text-gray-700 border-2">Correspondent ID</th>
                  <th className="p-3 text-sm font-medium text-gray-700 border-2">District</th>
                  <th className="p-3 text-sm font-medium text-gray-700 border-2">Total Amount</th>
                
                </tr>
              </thead>
              <tbody>
  {results.map((result) => {
    console.log('Result item:', result); 
    return (
      <tr key={result.paymentId}>
        <td className="p-4 text-sm border-2">{result.correspondentName}</td>
        <td className="p-4 text-sm border-2">{result.CorId}</td>
        <td className="p-4 text-sm border-2">{result.district}</td>
        <td className="p-4 text-sm border-2">{result.totalAmount}</td>
       
      </tr>
    );
  })}
</tbody>

            </table>
          </div>
        </div>
      )}


    </div>
  );
};

export default GeneratePayments;





