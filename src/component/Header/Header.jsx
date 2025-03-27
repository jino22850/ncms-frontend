import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../../Assests/rupavahini.jpg";
import { MdOutlineMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext"; 

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

  
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); 

  const getUserDisplay = () => {
    if (user) {
      return user.role || "User";
    }
    return "Guest";
  };

  return (
    <div className="flex items-center justify-between bg-gray-900 shadow px-6 h-16 fixed top-0 left-0 right-0 z-10 w-full">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="SLRC Logo" className="w-14 h-auto" />
        <h1 className="font-bold text-lg text-gray-100">SLRC</h1>
        <button
          onClick={toggleSidebar}
          className="ml-4 text-gray-100 hover:bg-gray-700 p-2 rounded transition-colors"
          aria-label="Toggle Sidebar"
        >
          <MdOutlineMenu size={24} />
        </button>
      </div>

      <h1 className="text-lg font-bold text-gray-100">
        News Correspondent Management System
      </h1>

      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-4 cursor-pointer hover:bg-gray-800 p-2 rounded transition-colors"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          <FaUserCircle size={24} className="text-gray-100 text-sm" />
          <span className="text-gray-100 text-sm">Hello, {getUserDisplay()}</span>
        </div>

        {isDropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg"
            role="menu"
          >
            <ul>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm border border-2 border-gray-300"
                onClick={handleLogout}
                role="menuitem"
              >
                Logout
              </li>
              <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm border border-2 border-gray-300">
                About</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
