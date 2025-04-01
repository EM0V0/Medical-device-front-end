import React from 'react';

// This component doesn't render anything visible
// It just ensures that global CSS classes are used somewhere in the codebase
// This helps with the Tailwind purge process in production

const GlobalStyles: React.FC = () => {
  return (
    <div className="hidden">
      {/* Common background colors */}
      <div className="bg-white bg-gray-50 bg-gray-100 bg-gray-200 bg-blue-50 bg-blue-100 bg-red-50 bg-red-100 bg-green-50 bg-green-100 bg-yellow-50 bg-yellow-100 bg-orange-50 bg-orange-100"></div>
      
      {/* Text colors */}
      <div className="text-gray-500 text-gray-600 text-gray-700 text-gray-800 text-blue-500 text-blue-600 text-blue-700 text-red-500 text-red-600 text-green-500 text-green-600 text-yellow-500 text-yellow-600"></div>
      
      {/* Borders */}
      <div className="border border-gray-200 border-gray-300 border-blue-300 border-red-300 border-green-300 border-yellow-300 border-orange-300"></div>
      
      {/* Common utilities */}
      <div className="rounded-md rounded-lg rounded-full"></div>
      <div className="shadow shadow-md shadow-lg shadow-xl"></div>
      <div className="p-2 p-3 p-4 p-6 p-8 p-10 p-12"></div>
      <div className="m-2 m-3 m-4 m-6 m-8 m-10 m-12"></div>
      <div className="px-2 px-3 px-4 px-6 py-2 py-3 py-4 py-6"></div>
      <div className="flex flex-col items-center justify-center justify-between space-x-2 space-x-4 space-y-2 space-y-4"></div>
      
      {/* Grid utilities */}
      <div className="grid grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-12 gap-2 gap-4 gap-6"></div>
      
      {/* Responsive classes */}
      <div className="sm:flex md:flex lg:flex xl:flex"></div>
      <div className="sm:grid md:grid lg:grid xl:grid"></div>
      <div className="sm:hidden md:hidden lg:hidden xl:hidden"></div>
      
      {/* Status colors */}
      <div className="bg-red-500 bg-orange-400 bg-yellow-500 bg-green-500"></div>
      
      {/* Hover and focus states */}
      <div className="hover:bg-gray-100 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"></div>
    </div>
  );
};

export default GlobalStyles; 