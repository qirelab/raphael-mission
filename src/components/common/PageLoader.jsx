import React from 'react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#3c8a7a] rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-[#3c8a7a] font-semibold font-poppins">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;