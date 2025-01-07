// Header.tsx
import React, { useState } from 'react';
import { SearchIcon, ChevronDown } from 'lucide-react';
import {DatePicker} from './DatePicker';

interface HeaderProps {
  selectedDate: string;
  handleDateChange: (date: string) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedDate, handleDateChange }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold md:block hidden">Overview</h1>
          <DatePicker
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            availableDates={['2025-01-01', '2025-02-01']} // Add real date data
            className="md:flex hidden"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <SearchIcon className="h-5 w-5 text-gray-600" />
          </button>
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-2 py-1"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm font-medium hidden sm:inline">Evan Yates</span>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                <div className="py-1">
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Notifications
                  </a>
                  {/* Add other menu items */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
