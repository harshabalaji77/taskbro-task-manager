import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500 font-medium select-none">
        &copy; {new Date().getFullYear()} TaskBro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
