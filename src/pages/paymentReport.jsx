import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { getAllGeneratedPayments } from '../api/correspondentAPI';

const PaymentReport = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredPayments, setFilteredPayments] = useState([]);

  
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getAllGeneratedPayments();
        console.log("API Response:", data); 

        if (Array.isArray(data)) {
          setPayments(data);
          setFilteredPayments(data);
        } else {
          console.error("Unexpected response format", data);
          setPayments([]);
          setFilteredPayments([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch approved payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);




  const handleStartDateChange = (event) => setStartDate(event.target.value);
  const handleEndDateChange = (event) => setEndDate(event.target.value);

  
  const isDateInRange = (date) => {
    if (!startDate || !endDate) return true;
    const paymentDate = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return paymentDate >= start && paymentDate <= end;
  };

  
  const handleFilter = () => {
    const newFilteredPayments = payments.filter((payment) => {
      const isTelecastDateMatch = payment.newsDetails.some((news) =>
        news.telecastDate && isDateInRange(news.telecastDate)
      );

      
      

      return isTelecastDateMatch;
    });

    setFilteredPayments(newFilteredPayments);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('payment-table').outerHTML;
    const newWindow = window.open('', '', 'height=600,width=800');
    newWindow.document.write('<html><head><title>Payment Report</title>');
    newWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: left; } th { background-color: #f2f2f2; }</style>');
    newWindow.document.write('</head><body>');
    newWindow.document.write(printContent);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
  };

  
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
const currentPayments = filteredPayments.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <div>Loading approved payments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-4 mb-6">
              <FaUser className="text-4xl text-black" />
              <h2 className="text-3xl font-semibold text-black">Payment Report</h2>
            </div>
      
            <div className="border-b-4 border-gray-900 mb-6 "></div>

      
<div className="mb-4 flex items-center space-x-20 grid-cols-3">


<div>
  <label className="block text-sm font-medium text-gray-700">Start Date:</label>
  <input
    type="date"
    value={startDate}
    onChange={handleStartDateChange}
    className="mt-1 block w-64 px-4 py-2 border border-gray-300 rounded-md text-sm"
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700">End Date:</label>
  <input
    type="date"
    value={endDate}
    onChange={handleEndDateChange}
    className="mt-1 block w-64 px-4 py-2 border border-gray-300 rounded-md text-sm"
  />
</div>


<button
  onClick={handleFilter}
  className="mt-4 w-32 px-4 py-2 bg-blue-500 text-white text-sm  rounded-md"
>
  Filter
</button>
</div>

<div className='grid justify-end mb-4 items-center space-x-4 grid-cols-7 '>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
      
      <button
        onClick={handlePrint}
        className="px-5 py-2 text-sm font-medium text-red-700 border-2 border-red-700 bg-white rounded-md hover:bg-red-900 hover:text-white focus:outline-none focus:ring focus:ring-red-300 "
      >
        Print
      </button>

      <button
        onClick={handlePrint}
        className="px-5 py-2 text-sm font-medium text-green-700 border-2 border-green-700 bg-white rounded-md hover:bg-green-900 hover:text-white focus:outline-none focus:ring focus:ring-green-300 "
      >
        Download
      </button>
      </div>

      {filteredPayments.length === 0 ? (
        <p>No approved payments found.</p>
      ) : (
        <table id="payment-table" className="min-w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-900">
            <th className="text-left px-8 py-3 text-gray-300 font-medium text-sm border-gray-100 border">#</th>
              <th className="text-left px-8 py-3 text-gray-300 font-medium text-sm border-gray-100 border">Correspondent</th>
              <th className="text-left px-8 py-3 text-gray-300 font-medium text-sm border-gray-100 border">Correspondent corId</th>
              <th className="text-left px-10 py-3 text-gray-300 font-medium text-sm border-gray-100 border">District</th>
              <th className="text-left px-10 py-3 text-gray-300 font-medium text-sm border-gray-100 border">NIC</th>
              <th className="text-left px-10 py-3 text-gray-300 font-medium text-sm border-gray-100 border">Total Amount</th>
              <th className="text-left px-10 py-3 text-gray-300 font-medium text-sm border-gray-100 border">Month</th>
              <th className="text-left px-10 py-3 text-gray-300 font-medium text-sm border-gray-100 border">Year</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((payment,index) => (
              <tr key={payment._id} className='even:bg-gray-200 odd:bg-white hover:bg-gray-300'>
                 <td className="px-8 py-2 text-gray-800 text-sm border-gray-100 border">
        {(currentPage - 1) * itemsPerPage + index + 1}
      </td>
                <td className="px-8 py-3 text-gray-800 text-sm border-gray-100 border">
                  {payment.correspondentName}
                </td>
                <td className="px-8 py-3 text-gray-800 text-sm border-gray-100 border">
                  {payment.correspondentCorId}
                </td>
                <td className="px-10 py-3 text-gray-800 text-sm border-gray-100 border">
                  {payment.correspondentDistrict}
                </td>
                <td className="px-10 py-3 text-gray-800 text-sm border-gray-100 border">
                  {payment.correspondentNIC}
                </td>
                <td className="px-10 py-3 text-gray-800 text-sm border-gray-100 border">
                  {payment.totalAmount}
                </td>
                <td className="px-10 py-3 text-gray-800 text-sm border-gray-100 border">{payment.month}</td>
                <td className="px-10 py-3 text-gray-800 text-sm border-gray-100 border">{payment.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      
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
    </div>
  );
};

export default PaymentReport;
