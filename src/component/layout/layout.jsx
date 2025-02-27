import React, { useState }  from 'react';
import Header from '../Header/Header';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../footer/footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header toggleSidebar={toggleSidebar}/>

      {/* Sidebar and Content */}
      <div className="flex flex-1 pt-16">
        <div className="w-64 fixed top-16 left-0 min-h-[calc(100vh-4rem)]">
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 ml-56 p-4 pt-2 ">
          <div className="flex-1 w-full pl-4 min-h-[calc(100vh-4rem)] p-4  bg-gradient-to-r from-gray-50 to-gray-500">
            <Outlet />
          </div>
        </div>
      </div>


      {/* Footer */}
  <Footer/>


    </div>
  );
};

export default Layout;
