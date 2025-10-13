import React from 'react';
import { Link } from 'react-router-dom';

const AdminListWrapper = ({ title, description, addButtonText, addButtonLink, children }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-poppins">{title}</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 font-poppins">
            {description}
          </p>
        </div>
        {addButtonLink && addButtonText && (
          <Link
            to={addButtonLink}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 bg-[#2F7D6D] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#266b5a] transition-colors duration-200 font-poppins shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            {addButtonText}
          </Link>
        )}
      </div>

      {children}
    </div>
  );
};

export default AdminListWrapper;
