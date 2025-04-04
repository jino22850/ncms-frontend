import React, { useState, useEffect } from 'react';
import { MdGridView } from 'react-icons/md';
import { getAllCoverage } from '../api/correspondentAPI';
import { getAllCorrespondents } from '../api/correspondentAPI'; 

const CoveragePayment = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [correspondentId, setCorrespondentId] = useState('');
    const [coverages, setCoverages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // State for Correspondent Search
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [correspondents, setCorrespondents] = useState([]);
    const [filteredCorrespondents, setFilteredCorrespondents] = useState([]);

    // Fetch Correspondents on Component Mount
    useEffect(() => {
        const fetchCorrespondents = async () => {
            try {
                const response = await getAllCorrespondents();
                setCorrespondents(response.data);
            } catch (error) {
                console.error('Error fetching correspondents:', error);
            }
        };
        fetchCorrespondents();
    }, []);

    // Filter Correspondents Based on Search Term
    useEffect(() => {
        setFilteredCorrespondents(
            correspondents.filter((correspondent) =>
                correspondent.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, correspondents]);

    // Fetch Coverage Data
    const fetchCoverageData = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getAllCoverage(startDate, endDate, correspondentId);
            setCoverages(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch data');
        }
        setLoading(false);
    };

    // Handle Correspondent Selection
    const handleSelect = (correspondent) => {
        setCorrespondentId(correspondent._id);
        setSearchTerm(correspondent.name);
        setIsDropdownOpen(false);
    };

    return (
        <div className="container mx-auto mt-8">
              <div className="flex items-center space-x-4 mb-6">
                <MdGridView className="text-4xl text-black" />
                <h2 className="text-3xl font-semibold text-black">Payments for Coverages</h2>
              </div>
        
              <div className="border-b-4 border-gray-900 mb-6"></div>

              <div className="mb-4 flex flex-col md:flex-row md:items-end gap-24">
    {/* Correspondent Search Input */}
    <div className="relative w-full md:w-1/4">
        <label className="text-black font-medium text-sm">Correspondent</label>
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder="Search Correspondent..."
            className="w-full px-3 py-2 border rounded outline-none text-gray-700 text-sm"
        />
        {isDropdownOpen && (
            <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded shadow-md max-h-64 overflow-y-auto">
                {filteredCorrespondents.length > 0 ? (
                    filteredCorrespondents.map((correspondent) => (
                        <li
                            key={correspondent._id}
                            onClick={() => handleSelect(correspondent)}
                            className="px-3 py-2 hover:bg-gray-200 cursor-pointer text-sm"
                        >
                            {correspondent.name}
                        </li>
                    ))
                ) : (
                    <li className="px-3 py-2 text-gray-500">No results found</li>
                )}
            </ul>
        )}
    </div>

    {/* Date Pickers */}
    <div className="w-full md:w-1/4">
        <label className="text-black font-medium text-sm">From Date</label>
        <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border rounded outline-none text-gray-700 text-sm"
            required
        />
    </div>

    <div className="w-full md:w-1/4">
        <label className="text-black font-medium text-sm">To Date</label>
        <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border rounded outline-none text-gray-700 text-sm"
            required
        />
    </div>

    {/* Fetch Coverage Button */}
    <div className="w-full md:w-auto">
        <button
            onClick={fetchCoverageData}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300"
        >
            Search
        </button>
    </div>
</div>


            {/* Loading & Error Messages */}
            {loading && <div className="flex justify-center items-center h-full">
            <div className=" mt-20 h-24 w-24 border-4 border-indigo-900 border-t-transparent rounded-full animate-spin"></div>
            </div>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Coverage Report Table */}
            {coverages.length > 0 && (
                <table className="w-full bg-white shadow-md rounded mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="text-left px-3 py-3 bg-gray-900 text-gray-300 font-medium text-sm border-gray-100 border">Coverage Number</th>
                            <th className="text-left px-3 py-3 bg-gray-900 text-gray-300 font-medium text-sm border-gray-100 border">Telecast Date</th>
                            <th className="text-left px-3 py-3 bg-gray-900 text-gray-300 font-medium text-sm border-gray-100 border">Telecast Type</th>
                            <th className="text-left px-3 py-3 bg-gray-900 text-gray-300 font-medium text-sm border-gray-100 border">Channel</th>
                            <th className="text-left px-3 py-3 bg-gray-900 text-gray-300 font-medium text-sm border-gray-100 border">Payment Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coverages.map((coverage) => (
                            <tr key={coverage._id} className="border-t even:bg-gray-200 odd:bg-white hover:bg-gray-300">
                                <td className="px-3 py-2 text-gray-800 text-sm border-gray-100 border">{coverage.coverageNumber}</td>
                                <td className="px-3 py-2 text-gray-800 text-sm border-gray-100 border">{coverage.telecastDate?.split('T')[0]}</td>
                                <td className="px-3 py-2 text-gray-800 text-sm border-gray-100 border">{coverage.telecastType}</td>
                                <td className="px-3 py-2 text-gray-800 text-sm border-gray-100 border">{coverage.channel}</td>
                                <td className="px-3 py-2 text-gray-800 text-sm border-gray-100 border">{coverage.paymentAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CoveragePayment;
