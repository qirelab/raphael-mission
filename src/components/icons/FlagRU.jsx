import React from 'react';

const FlagRU = ({ className = "w-6 h-6" }) => {
  return (
    <svg className={className} viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="18" rx="2" fill="white"/>
      <mask id="mask0_ru" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="18">
        <rect width="24" height="18" rx="2" fill="white"/>
      </mask>
      <g mask="url(#mask0_ru)">
        {/* White stripe */}
        <rect width="24" height="6" fill="white"/>
        {/* Blue stripe */}
        <rect y="6" width="24" height="6" fill="#0039A6"/>
        {/* Red stripe */}
        <rect y="12" width="24" height="6" fill="#D52B1E"/>
      </g>
    </svg>
  );
};

export default FlagRU;
