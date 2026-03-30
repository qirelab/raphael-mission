import React from 'react';

const ButtonSkeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-300 rounded-[8px] h-12 w-full"></div>
    </div>
  );
};

export default ButtonSkeleton;




