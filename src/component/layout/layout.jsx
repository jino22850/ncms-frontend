import React, { useState }  from 'react';
import Header from '../Header/Header';
import Sidebar from '../sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar}/>

      {/* Sidebar and Content */}
      <div className="flex flex-1 pt-16">
        <div className="w-64 fixed top-16 left-0 h-[calc(100vh-4rem)]">
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 ml-64 p-4">
          <div className="h-full w-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
