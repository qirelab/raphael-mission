import React from 'react';

const FlagPL = ({ className = "w-6 h-6" }) => {
  return (
    <svg className={className} viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="18" rx="2" fill="white"/>
      <mask id="mask0_pl" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="18">
        <rect width="24" height="18" rx="2" fill="white"/>
      </mask>
      <g mask="url(#mask0_pl)">
        {/* White stripe */}
        <rect width="24" height="9" fill="white"/>
        {/* Red stripe */}
        <rect y="9" width="24" height="9" fill="#DC143C"/>
      </g>
    </svg>
  );
};

export default FlagPL;
