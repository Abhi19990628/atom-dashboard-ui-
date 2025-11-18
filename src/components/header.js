import React from 'react';
import { Menu, RefreshCw } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Supervisor Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-md hover:bg-gray-100">
            <RefreshCw size={18} />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span className="hidden sm:block text-sm font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;