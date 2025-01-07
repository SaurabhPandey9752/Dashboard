import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Bell,
  ChevronDown,
  Settings,
  HelpCircle,
  LogOut,
  Building2,
  LayoutDashboard,
  FileText,
  Users,
  Folder,
  Shield,
  Menu,
  Calendar,
  SearchIcon,
} from 'lucide-react';
import { LineChart, DonutChart } from './components/Charts';
import { StatsCard } from './components/StatsCard';
import { PaymentsTable } from './components/PaymentsTable';
import { DatePicker } from './components/DatePicker';
import dashboardData from './data.json';
import logo from './assets/image1.png';
import logo1 from './assets/image.png';
function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(dashboardData[0]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dashboardData[0].date);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const availableDates = dashboardData.map((d) => d.date);

  useEffect(() => {
    const dateParam = searchParams.get('date') || dashboardData[0].date;
    const matchingData = dashboardData.find((d) => d.date === dateParam) || dashboardData[0];
    setData(matchingData);
  }, [searchParams]);

  const handleDateChange = (date: string) => {
    setSearchParams({ date });
    setSelectedDate(date);
  };

  const stats = [
    { title: 'Total Sales', value: data.total_sales, change: '+1.42%', bgColor: 'bg-[#D9F2FB]', index: 0 },
    { title: 'Total Expenses', value: data.total_expenses, change: '-0.85%', bgColor: 'bg-[#E2E5EA]', index: 1 },
    { title: 'Net Profit', value: data.net_profit, change: '+0.85%', bgColor: 'bg-[#D9F2FB]', index: 2 },
    { title: 'Due Amount', value: data.due_amount, change: '+6.55%', bgColor: 'bg-[#E2E5EA]', index: 3 },
    { title: 'Payment Received', value: data.payment_received, change: '+10.25%', bgColor: 'bg-[#D9F2FB]', index: 4 },
  ];

  const chartData = {
    labels: data.supplier_records.map((r) => r.month),
    supplierRecords: data.supplier_records.map((r) => r.bags),
    customerRecords: data.customer_records.map((r) => r.bags),
  };

  const donutData = data.top_selling_products.map((product) => ({
    name: product.item,
    value: product.weight,
  }));

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      {/* Sidebar */}
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

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold md:block hidden">Overview</h1>
              <DatePicker
                selectedDate={data.date}
                onDateChange={handleDateChange}
                availableDates={availableDates}
                className="md:flex hidden" // Make DatePicker hidden on mobile
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
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Building2 className="h-4 w-4 mr-2" />
                        Change Firm
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Help/Support
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </a>
                    </div>
                  </div>
                )}
              </div>
              {/* Notification Button */}
              {/* <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              {isNotificationsOpen && (
                <div className="absolute top-12 right-4 bg-white p-4 rounded-lg shadow-lg">
                  <p className="text-sm text-gray-700">No new notifications</p>
                </div>
              )} */}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 md:p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {stats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <LineChart
                data={chartData}
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Top selling items</h3>
              <DonutChart data={donutData} />
            </div>
          </div>

          {/* Tables */}
          <div className="grid gap-6">
            <PaymentsTable
              title="Recent Supplier Payments"
              type="supplier"
              payments={data.supplier_payments}
            />
            <PaymentsTable
              title="Recent Customer Payments"
              type="customer"
              payments={data.customer_payments}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
