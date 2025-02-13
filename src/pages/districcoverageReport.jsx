import React, { useState } from "react";
import { MdGridView } from "react-icons/md";
import { getCoveragesByDistrictAndDates } from "../api/correspondentAPI";

const DistrictCoverage = () => {
    const [district, setDistrict] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [coverages, setCoverages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch coverages when search button is clicked
    const fetchCoverages = async () => {
        if (!district || !startDate || !endDate) {
            setError("Please provide all the fields");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const data = await getCoveragesByDistrictAndDates(district, startDate, endDate);
            setCoverages(data);
        } catch (err) {
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    // Print function
    const printReport = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>District Wise Coverage Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { padding: 8px; text-align: left; border: 1px solid #ddd; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <h1>District Wise Coverage Report</h1>
                    <p>District: ${district}</p>
                    <p>Start Date: ${startDate}</p>
                    <p>End Date: ${endDate}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Coverage Number</th>
                                <th>Correspondent Name</th>
                                <th>Correspondent Id</th>
                                <th>District</th>
                                <th>Receive Date</th>
                                <th>Telecast Date</th>
                                <th>Category</th>
                                <th>Status Type</th>
                                <th>Channel</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${coverages.length > 0 ? coverages.map((coverage, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${coverage.coverageNumber}</td>
                                    <td>${coverage.correspondent?.name || 'N/A'}</td>
                                    <td>${coverage.correspondent?.CorId || 'N/A'}</td>
                                    <td>${coverage.correspondent?.district}</td>
                                    <td>${coverage.receivedDate || 'N/A'}</td>
                                    <td>${coverage.telecastDate || 'N/A'}</td>
                                    <td>${coverage.Category?.name || 'N/A'}</td>
                                    <td>${coverage.telecastType || 'N/A'}</td>
                                    <td>${coverage.channel}</td>
                                </tr>
                            `).join('') : `<tr><td colspan="10">No coverages found for this district and date range.</td></tr>`}
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
                <h2 className="text-3xl font-semibold text-black">District Wise Coverage Report</h2>
            </div>

            <div className="border-b-4 border-red-900 mb-6"></div>

            {/* Input Fields for District, Start Date, End Date and Search Button */}
            <div className="flex items-center space-x-4 mb-4">
                <label className="text-black font-medium text-sm w-1/8">District:</label>
                <input
                    type="text"
                    placeholder="Enter district name"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="border p-2 w-1/3 rounded-sm text-sm"
                />
                <label className="text-black font-medium text-sm w-1/8">Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2 w-1/3 rounded-sm text-sm"
                />
                <label className="text-black font-medium text-sm w-1/8 ">End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2 w-1/3 rounded-sm text-sm"
                />
                <button
                    onClick={fetchCoverages}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Search
                </button>
            </div>

            {/* Print button */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={printReport}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Print Report
                </button>
            </div>

            {/* Loading and Error Messages */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Coverage List */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left p-4 text-gray-700 font-medium text-sm border-gray-100 border-2">#</th>
                            <th className="text-left p-4 text-gray-700 font-medium text-sm border-gray-100 border-2">Coverage Number</th>
                            <th className="text-left p-4 text-gray-700 font-medium text-sm border-gray-100 border-2">Correspondent Name</th>
                            <th className="text-left p-4 text-gray-700 font-medium text-sm border-gray-100 border-2">Correspondent Id</th>
                            <th className="text-left p-4 text-gray-700 font-medium text-sm border-gray-100 border-2">District</th>
                            <th className="text-left p-4 text-gray-700 font-medium text-sm border-gray-100 border-2">Receive Date</th>
                            <th className="text-left p-4 text-gray-700 font-medium text-sm border-gray-100 border-2">Telecast Date</th>
                            <th className="text-left p-4 text-gray-700 font-medium text-sm border-gray-100 border-2">Category</th>
                            <th className="text-left p-4 text-gray-700 font-medium text-sm border-gray-100 border-2">Status Type</th>
                            <th className="text-left p-4 text-gray-700 font-medium text-sm border-gray-100 border-2">Channel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coverages.length > 0 ? (
                            coverages.map((coverage, index) => (
                                <tr key={coverage._id} className="hover:bg-gray-50">
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{index + 1}</td>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{coverage.coverageNumber}</td>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{coverage.correspondent?.name || 'N/A'}</td>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{coverage.correspondent?.CorId || 'N/A'}</td>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{coverage.correspondent?.district}</td>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{coverage.receivedDate || 'N/A'}</td>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{coverage.telecastDate || 'N/A'}</td>
                                    <td className="p-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{coverage.Category?.name || 'N/A'}</td>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{coverage.telecastType || 'N/A'}</td>
                                    <td className="px-3 py-1 text-gray-800 text-xs border-gray-100 border-2">{coverage.channel}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="px-4 py-2 border border-gray-300 text-center">No coverages found for this district and date range.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DistrictCoverage;
