import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const Header = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">TaskBro</h1>
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 hover:border-gray-400 transition-all duration-200 focus:outline-none"
            >
              <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg
                className={`w-3.5 h-3.5 text-gray-900 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-50 overflow-hidden">
                <Link
                  to="/change-password"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-800 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <svg className="h-4 w-4 text-gray-900 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Change Password
                </Link>
                <div className="border-t border-gray-100" />
                <button
                  onClick={() => { setOpen(false); onLogout(); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-800 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <svg className="h-4 w-4 text-gray-900 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;