import React, { useEffect, useState } from 'react';
import { FaEye, FaPrint } from 'react-icons/fa';
import { MdGridView } from "react-icons/md";
import { getAllGeneratedPayments } from '../api/correspondentAPI';

const ViewApprovedPayments = () => {
  const [approvedPayments, setApprovedPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);


  

  useEffect(() => {
    const fetchApprovedPayments = async () => {
      try {
        const data = await getAllGeneratedPayments();
        setApprovedPayments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedPayments();
  }, []);
  

  const handlePrint = (payment) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Payment Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 30px;
            }
            h1,h2 {
              text-align : center
            }  
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              padding: 10px;
              border: 1px solid #ddd;
              text-align: left;
            }
            th {
              background-color: #f4f4f4;
            }
            .signature {
              margin-top: 30px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .signature div {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h1>Sri Lanka Rupavahini Coparation</h1>
          <h2>News Correspondent Payment Report</h2>
          <p><strong>Correspondent Name:</strong> ${payment.correspondentName}</p>
          <p><strong>Correspondent Id:</strong> ${payment.correspondentCorId}</p>
          <p><strong>Correspondent District:</strong> ${payment.correspondentDistrict}</p>
          <p><strong>Correspondent District:</strong> ${payment.correspondentNIC}</p>
          <p><strong>Month:</strong> ${payment.month}</p>
          <p><strong>Year:</strong> ${payment.year}</p>
          <p><strong>Total Amount:</strong> Rs. ${payment.totalAmount}.00</p>

          <h2>Details</h2>
           <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Coverage ID</th>
              <th>Receive Date</th>
              <th>Telecast Date</th>
              <th>File Number</th>
              <th>Telecast Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${payment.newsDetails
              .map(
                (detail, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${detail.coverageNumber}</td>
                  <td>${detail.receivedDate}</td>
                  <td>${detail.telecastDate}</td>
                  <td>${detail.fileNumber}</td>
                  <td>${detail.telecastType}</td>
                  <td>Rs. ${detail.amount}</td>
                </tr>`
              )
              .join('')}
            <tr>
              <td colspan="6" style="font-weight: bold; text-align: right;">Total Amount</td>
              <td style="font-weight: bold;">Rs. ${payment.totalAmount}.00</td>
            </tr>
          </tbody>
        </table>

          <div class="signature">
            <div>
            <p>Submit for Checking. Mentioned on Page Number........ of the Cost Ledger.</p>
              
              <p>_________________________</p>
              <p>Subject Clerk Signature</p>
            </div>
            <div>
             <p>The above details are correct as per the News Reporting Document.</p>
              <p>_________________________</p>
              <p>Administrative Officer Signature</p>
            </div>
            <div>
             <p>I Recommended the above Payment.</p>
              <p>_________________________</p>
              <p>D.D (Provincial News) Signature</p>
            </div>
            
          </div>
          <div class="signature">
            
            <div>
             <p>Chief Accountant </p>
             <p>According to the recommendation payment of Rs........... Approved.</p>
              <p>_________________________</p>
              <p>Director(News) Signature</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleView = (payment) => {
    setSelectedPayment(payment); 
  };

  const closeModal = () => {
    setSelectedPayment(null); 
  };


    // Pagination logic
    const totalPages = Math.ceil(approvedPayments.length / itemsPerPage);
const currentApprovedPayments = approvedPayments.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages) {
    setCurrentPage(page);
  }
};


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-4 mb-6 max-w-screen ">
              <MdGridView className="text-4xl text-black" />
      <h1 className="text-2xl font-bold mb-4">Payments</h1>
      </div>

      <div className="border-b-4 border-gray-900 mb-6"></div>

      <div className="flex items-center justify-between p-4 bg-gray-100 border border-gray-200 rounded-md shadow-sm">
      <div className="mb-1">
              <label className="text-black font-medium text-sm">Correspondent</label>
              <select
                name="correspondent"
                className="w-full px-2 py-2 border rounded outline-none text-gray-700 text-sm"
                required
              >
                <option >Select a Correspondent</option>
               
              </select>
            </div>

            <div className="mb-1">
              <label className="text-black font-medium text-sm">From Date</label>
              <input
                type="date"
                name="fromDate"
                className="w-full px-1 py-2 border rounded outline-none text-gray-700 text-sm"
                required
              />
            </div>

            <div className="mb-1">
              <label className="text-black font-medium text-sm">To Date</label>
              <input
                type="date"
                name="ToDate"
                className="w-full px-1 py-2 border rounded outline-none text-gray-700 text-sm"
                required
              />
            </div>

            <div className="mb-1">
           <button type='submit'  className="px-5 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300">Filter</button>
            </div>
            </div>


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

  {/* Buttons Section */}
  <div className="flex space-x-2">
    {/* <button className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-900 focus:outline-none focus:ring focus:ring-green-300">
      Excel
    </button> */}
    {/* <button className="px-5 py-2 text-sm font-medium text-white bg-red-700 rounded-md hover:bg-red-900 focus:outline-none focus:ring focus:ring-blue-300">
      Pdf
    </button> */}
    <button className="px-4 py-2 text-sm font-medium text-green-700 border-2 border-green-500 rounded-lg bg-white transition duration-300 hover:bg-green-900 hover:text-white focus:outline-none focus:ring focus:ring-green-300">
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
      {approvedPayments.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
          <thead className="border-gray-100 border-2">
            <tr className="bg-gray-200">
              <th className="text-left px-4 py-4 bg-gray-900 text-gray-100 font-medium text-sm border-gray-100 border">#</th>
              <th className="text-left px-4 py-4 bg-gray-900 text-gray-100 font-medium text-sm border-gray-100 border">Correspondent Code</th>
              <th className="text-left px-4 py-4 bg-gray-900 text-gray-100 font-medium text-sm border-gray-100 border">Correspondent Name</th>
              <th className="text-left px-4 py-4 bg-gray-900 text-gray-100 font-medium text-sm border-gray-100 border">Correspondent District</th>
              <th className="text-left px-4 py-4 bg-gray-900 text-gray-100 font-medium text-sm border-gray-100 border">Correspondent NIC</th>
              <th className="text-left px-4 py-4 bg-gray-900 text-gray-100 font-medium text-sm border-gray-100 border">Month</th>
              <th className="text-left px-3 py-4 bg-gray-900 text-gray-100 font-medium text-sm border-gray-100 border">Year</th>
              <th className="text-left px-3 py-4 bg-gray-900 text-gray-100 font-medium text-sm border-gray-100 border">Total Amount</th>
              <th className="text-left px-3 py-4 bg-gray-900 text-gray-100 font-medium text-sm border-gray-100 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentApprovedPayments.map((payment, index) => (
              <tr key={payment._id} className=" even:bg-gray-200 odd:bg-white hover:bg-gray-300">
                <td className="px-4 py-2 text-gray-800 text-xs border-gray-100 border-2">
        {(currentPage - 1) * itemsPerPage + index + 1}
      </td>
                <td className="px-4 py-2 text-gray-800 text-sm border-gray-100 border-2">{payment.correspondentCorId}</td>
                <td className="px-4 py-2 text-gray-800 text-sm border-gray-100 border-2">{payment.correspondentName}</td>
                <td className="px-4 py-2 text-gray-800 text-sm border-gray-100 border-2">{payment.correspondentDistrict}</td>
                <td className="px-4 py-2 text-gray-800 text-sm border-gray-100 border-2">{payment.correspondentNIC}</td>
                <td className="px-4 py-2 text-gray-800 text-sm border-gray-100 border-2">{payment.month}</td>
                <td className="px-4 py-2 text-gray-800 text-sm border-gray-100 border-2">{payment.year}</td>
                <td className="px-4 py-2 text-gray-800 text-sm border-gray-100 border-2">Rs. {payment.totalAmount}.00</td>
                <td className="px-4 py-2 text-gray-800 text-sm border-gray-100 border-2">
  <div className="inline-flex">
    <button
      className="bg-white text-blue-500 px-1 py-1 text-md border border-blue-500 rounded p-1 hover:bg-blue-600 hover:text-white mr-2"
      onClick={() => handleView(payment)}
    >
      <FaEye /> 
    </button>
    <button
      className="bg-white text-green-500 px-1 py-1 text-md border border-green-500 rounded p-1 hover:bg-green-600 hover:text-white mr-2"
      onClick={() => handlePrint(payment)}
    >
      <FaPrint /> 
    </button>
  </div>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No approved payments found.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
         className="px-4 py-2 bg-gray-100 text-black ml-2 disabled:opacity-50 text-sm"
        >
          Previous
        </button>
        <span>
        <button className="bg-gray-500 px-4 py-2 border-white border">{currentPage}
        </button>
            </span>
            <span>
            <button className="bg-gray-200 px-4 py-2 border-white border"> {totalPages}
              </button>
            </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-100 text-black disabled:opacity-50 text-sm"
        >
          Next
        </button>
      </div>
      
      
      
      {selectedPayment && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-3/4">
      <h2 className="text-xl font-bold mb-4">Payment Details</h2>
      <p className='text-sm'><strong className='text-sm text-bold'>Correspondent Name :  </strong> {selectedPayment.correspondentName}</p>
      <p className='text-sm'><strong className='text-sm text-bold'>Correspondent Id :  </strong> {selectedPayment.correspondentCorId}</p>
      <p className='text-sm'><strong className='text-sm text-bold'>Correspondent District   :  </strong> {selectedPayment.correspondentDistrict}</p>
      <p className='text-sm'><strong className='text-sm text-bold'>Correspondent NIC   :  </strong> {selectedPayment.correspondentNIC}</p>
      <p className='text-sm'><strong className='text-sm text-bold'>Month  :  </strong> {selectedPayment.month}</p>
      <p className='text-sm'><strong className='text-sm text-bold'>Year   :  </strong> {selectedPayment.year}</p>
      <p className='text-sm'><strong className='text-sm text-bold'>Total Amount  :  </strong> Rs. {selectedPayment.totalAmount}.00</p>
      <h3 className="mt-4 font-bold align-center">Details:</h3>
      <table className="table-auto w-full border-collapse border border-gray-200 mt-2">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">#</th>
            <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">Coverage ID</th>
            <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">Receive Date</th>
            <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">Telecast Date</th>
            <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">File Number</th>
            <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">Telecast Type</th>
            <th className="text-left p-3 text-gray-700 font-medium text-sm border-gray-100 border-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {selectedPayment.newsDetails.map((detail, index) => (
            <tr key={index}>
              <td className="p-3 text-gray-800 text-xs border-gray-100 border-2">{index + 1}</td>
              <td className="p-3 text-gray-800 text-xs border-gray-100 border-2">{detail.coverageNumber}</td>
              <td className="p-3 text-gray-800 text-xs border-gray-100 border-2">{detail.receivedDate}</td>
              <td className="p-3 text-gray-800 text-xs border-gray-100 border-2">{detail.telecastDate}</td>
              <td className="p-3 text-gray-800 text-xs border-gray-100 border-2">{detail.fileNumber}</td>
              <td className="p-3 text-gray-800 text-xs border-gray-100 border-2">{detail.telecastType}</td>
              <td className="p-3 text-gray-800 text-xs border-gray-100 border-2">Rs. {detail.amount}.00</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6" className="border border-gray-300 px-4 py-2 font-bold text-right">
              Total Amount
            </td>
            <td className="border border-gray-300 px-4 py-2 font-bold">
              Rs. {selectedPayment.newsDetails.reduce((sum, detail) => sum + detail.amount, 0)}.00
            </td>
          </tr>
        </tfoot>
      </table>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={closeModal}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default ViewApprovedPayments;
