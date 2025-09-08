import { useEffect, useMemo, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeftOnRectangleIcon as LogoutIcon, Bars3Icon as MenuAlt2Icon, XMarkIcon as XIcon } from '@heroicons/react/24/outline';

type NavItem = { name: string; to: string };

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const navItems: NavItem[] = useMemo(() => {
    if (user?.role === 'superadmin') {
      return [
        { name: 'Overview', to: '/dashboard/super' },
        { name: 'Financials', to: '/dashboard/super/financials' },
        { name: 'Manage Admins', to: '/dashboard/super/admins' },
        { name: 'Reports', to: '/dashboard/super/reports' },
      ];
    }
    return [
      { name: 'Overview', to: '/dashboard/admin' },
      { name: 'Patients', to: '/dashboard/admin/patients' },
      { name: 'Visits', to: '/dashboard/admin/visits' },
      { name: 'Pharmacy', to: '/dashboard/admin/pharmacy' },
      { name: 'Reports', to: '/dashboard/admin/reports' },
    ];
  }, [user?.role]);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="fixed inset-0 flex z-40">
          <div className="fixed inset-0">
            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 px-2 space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={`${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div>
                  <div className="text-base font-medium text-gray-800">
                    {user?.email}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                  </div>
                </div>
                <div className="ml-auto">
                  <button
                    onClick={logout}
                    className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <LogoutIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img src="/IMAGES/Logo.png" alt="Citimed" className="h-24 w-auto object-contain" />
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={`${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div>
                  <div className="text-base font-medium text-gray-800">
                    {user?.email}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                  </div>
                </div>
                <div className="ml-auto">
                  <button
                    onClick={logout}
                    className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <LogoutIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
