// Sidebar.tsx
import React from 'react';
import { LayoutDashboard, FileText, Users, Folder, Shield, Menu } from 'lucide-react';
import logo from '../assets/image1.png';
import logo1 from '../assets/image.png';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-10 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Company Logo" className="h-13 w-auto object-contain" />
        </div>
      </div>
      <nav className="mt-8">
        <a href="#" className="flex items-center px-4 py-3 bg-blue-50 text-blue-600">
          <LayoutDashboard className="h-5 w-5 mr-3" />
          Dashboard
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50">
          <FileText className="h-5 w-5 mr-3" />
          Menu 1
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50">
          <Users className="h-5 w-5 mr-3" />
          Menu 2
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50">
          <Folder className="h-5 w-5 mr-3" />
          Menu 3
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50">
          <Shield className="h-5 w-5 mr-3" />
          Admin Panel
        </a>
      </nav>
      <div className="mt-auto p-4">
        <img src={logo1} alt="Bottom Image" className="w-full h-auto object-contain" />
      </div>
    </div>
  );
};

export default Sidebar;
