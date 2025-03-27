import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useAuth } from "../context/authContext";

const Sidebar = ({ isSidebarOpen }) => {
  const { user } = useAuth();
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);
  const [isMasterDataOpen, setIsMasterDataOpen] = useState(true);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(true);
  const [isReportOpen, setIsReportOpen] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(true);

  if (!isSidebarOpen) return null;

  
  const canAccessRoute = (allowedRoles) => {
    return user && allowedRoles.includes(user.role);
  };

  return (
    <div className="w-60 h-screen bg-gray-600 flex flex-col items-center py-4">
      <div className="flex flex-col gap-4 text-gray-700 w-full px-4">
      
        <div className="flex items-center gap-3 cursor-pointer sm:flex hover:text-bold lg:text-black text-sm font-semibold hover:text-white">
          <a href="/dashboard">Dashboard</a>
        </div>

       
        {canAccessRoute(["SuperAdmin", "Admin"]) && (
          <div className="flex items-center gap-3 cursor-pointer sm:flex hover:text-bold lg:text-black text-sm font-semibold hover:text-white">
            <a href="/correspondent">Correspondent</a>
          </div>
        )}

   
        <div className="text-sm font-semibold">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsDashboardOpen(!isDashboardOpen)}
          >
            <span className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              Coverage and Telecast
            </span>
            {isDashboardOpen ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </div>
        {isDashboardOpen && (
          <>
            {canAccessRoute(["SuperAdmin", "Admin"]) && (
              <>
                <div className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
                  <a href="/coverage">Coverage and Telecast</a>
                </div>
                <div className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
                  <a href="/ViewCoverage">View Coverage</a>
                </div>
              </>
            )}
          </>
        )}

        {/* Master Data Section */}
        <div className="text-sm font-semibold">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsMasterDataOpen(!isMasterDataOpen)}
          >
            <span className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              Master Data
            </span>
            {isMasterDataOpen ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </div>
        {isMasterDataOpen && (
          <>
            {canAccessRoute(["SuperAdmin"]) && (
              <>
                <div className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
                  <a href="/category">Category</a>
                </div>
                <div className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
                  <a href="/subcategory">Sub Category</a>
                </div>
                <div className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
                  <a href="/event">Event</a>
                </div>
              </>
            )}
          </>
        )}

        {/* Payments Section */}
        <div className="text-sm font-semibold">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsPaymentsOpen(!isPaymentsOpen)}
          >
            <span className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              Payment Management
            </span>
            {isPaymentsOpen ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </div>
        {isPaymentsOpen && (
          <>
            {canAccessRoute(["SuperAdmin", "Admin"]) && (
              <>
                <div className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
                  <a href="/payment">Payments</a>
                </div>
                <div className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
                  <a href="/ViewPayments">View Payments</a>
                </div>
                <div className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
                  <a href="/coveragepayment">Correspondent Payments</a>
                </div>
              </>
            )}
          </>
        )}

        {/* Reports Section */}
        <div className="text-sm font-semibold">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsReportOpen(!isReportOpen)}
          >
            <span className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              Report
            </span>
            {isReportOpen ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </div>
        {isReportOpen && (
          <>
            {canAccessRoute(["SuperAdmin", "Admin"]) && (
              <>
                <div className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
                  <a href="/correspondentReport">Correspondent Report</a>
                </div>
                <div className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
                  <a href="/coverageReport">Coverage Report</a>
                </div>
                <div className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
                  <a href="/districtCoverage">District wise Coverage Report</a>
                </div>
                <div className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
                  <a href="/paymentReport">Payment Report</a>
                </div>
                {/* <div className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
                  <a href="/summery">Summary Report</a>
                </div> */}
              </>
            )}
          </>
        )}

        {/* Administrator Section - Only for SuperAdmin */}
        <div className="text-sm font-semibold">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsAdminOpen(!isAdminOpen)}
          >
            <span className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
              Administrator
            </span>
            {isAdminOpen ? <FaCaretUp /> : <FaCaretDown />}
          </div>
        </div>
        {isAdminOpen && (
          <>
            {canAccessRoute(["SuperAdmin"]) && (
              <div className="flex items-center gap-3 hover:text-white sm:flex hover:text-bold lg:text-black cursor-pointer text-sm">
                <a href="/signup">User Management</a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
