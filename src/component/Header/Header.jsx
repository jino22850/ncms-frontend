import React, { useState, useEffect } from "react";
import { FaUserCircle } from 'react-icons/fa';
import Logo from '../../Assests/rupavahini.jpg'; 
import { MdOutlineMenu } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setLoggedInUser(JSON.parse(userData)); 
    }
  }, []);

  const handlelogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user'); 
    navigate('/login');
  }

  return (
    <div className="flex items-center justify-between bg-white shadow px-6 h-16 fixed top-0 left-0 right-0 z-10 w-full">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="SLRC Logo" className="w-14 h-auto" />
        <h1 className="font-bold text-lg">SLRC</h1>

        <button onClick={toggleSidebar} className="ml-4">
          <MdOutlineMenu size={24} />
        </button>
      </div>

      {/* Title */}
      <h1 className="text-lg font-bold text-gray-700">News Correspondent Management System</h1>

      {/* User Dropdown */}
      <div className="relative">
        {/* User Icon */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
        >
          <FaUserCircle size={24} className="text-gray-600" />
          <span className="text-gray-600">
            Hello, {loggedInUser ? loggedInUser.username : "Admin"} 
          </span>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
            <ul>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handlelogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
