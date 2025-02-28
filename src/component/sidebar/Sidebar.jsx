import React, { useState } from 'react';
import {FaCaretDown, FaCaretUp} from 'react-icons/fa';


const Sidebar = ({ isSidebarOpen }) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);
  const [isMasterDataOpen, setIsMasterDataOpen] = useState(true);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(true);
  const [isReportOpen, setIsReportOpen] = useState(true);
  

  if (!isSidebarOpen) return null;

  return (
    <div className="w-60 h-screen bg-gray-600 flex flex-col items-center py-4">
      {/* Menu Items */}
      <div className="flex flex-col gap-4 text-gray-700 w-full px-4">


      <div className="flex items-center gap-3 cursor-pointer sm:flex hover:text-bold lg:text-black text-sm font-semibold hover:text-white">
              <a href="/dashboard">Dashboard</a>
            </div>
            <div className="flex items-center gap-3 hover:text-black cursor-pointer sm:flex hover:text-bold lg:text-black text-sm font-semibold">
              <a href="/correspondent">Correspondent</a>
              </div>

        {/* 1: Dashboard & Correspondent */}
        <div className="text-sm font-semibold">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsDashboardOpen(!isDashboardOpen)}
          >
            <span className='flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm'>
            Coverage and Telecast</span>
            {isDashboardOpen ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </div>
        {isDashboardOpen && (
          <>
            
            <div className="flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              <a href="/coverage">Coverage and Telecast</a>
            </div>
            <div className="flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              <a href="/ViewCoverage">View Coverage</a>
            </div>
           
          </>
        )}

        {/*2: Master Data */}
        <div className="text-sm font-semibold">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsMasterDataOpen(!isMasterDataOpen)}
          >
            <span className='flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm'>Master Data</span>
            {isMasterDataOpen ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </div>
        {isMasterDataOpen && (
          <>
            <div className="flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              <a href="/category">Category</a>
            </div>
            <div className="flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              <a href="/subcategory">Sub Category</a>
            </div>
            <div className="flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              <a href="/event">Event</a>
            </div>
          </>
        )}

        {/*3: Payments */}
        <div className="text-sm font-semibold">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsPaymentsOpen(!isPaymentsOpen)}
          >
            
            <span className='flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm'>Payment Management</span>
            {isPaymentsOpen ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </div>
        {isPaymentsOpen && (
          <>
            <div className="flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              <a href="/payment">Payments</a>
            </div>
            <div className="flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              <a href="/ViewPayments">View Payments</a>
            </div>
            <div className="flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              <a href="/coveragepayment">Correspondent Payments</a>
            </div>
          </>
        )}

 {/* 4: Dashboard & Correspondent */}
 <div className="text-sm font-semibold">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsReportOpen(!isReportOpen)}
          >
            <span className='flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm'>
            Report</span>
            {isDashboardOpen ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </div>
        {isReportOpen && (
          <>
            
            <div className="flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              <a href="/correspondentReport">Correpondent Report</a>
            </div>
            <div className="flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              <a href="/coverageReport">Coverage Report</a>
            </div>
            <div className="flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              <a href="/districtCoverage">District wise Coverage Report</a>
            </div>
            <div className="flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              <a href="/paymentReport">Payment Report</a>
            </div>
           
            <div className="flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              <a href="/summery">Summery Report</a>
            </div>
           
          </>
        )}
     
      <div className="text-sm font-semibold">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsDashboardOpen(!isDashboardOpen)}
          >
            <span className='flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm'>
           
            Administartor</span>
            {isDashboardOpen ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </div>
        {isDashboardOpen && (
          <>
            
            {/* <div className="flex items-center gap-3 hover:text-black sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              <a href="/signup">User</a>
            </div> */}
            
           
          </>
        )}
    </div>
    </div>
  );
};

export default Sidebar;
