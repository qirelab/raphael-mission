import React from 'react';

const FlagUS = ({ className = "w-6 h-6" }) => {
  return (
    <svg className={className} viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="18" rx="2" fill="white"/>
      <mask id="mask0_us" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="18">
        <rect width="24" height="18" rx="2" fill="white"/>
      </mask>
      <g mask="url(#mask0_us)">
        {/* Red stripes */}
        <path d="M0 0H24V1.38462H0V0Z" fill="#B22234"/>
        <path d="M0 2.76923H24V4.15385H0V2.76923Z" fill="#B22234"/>
        <path d="M0 5.53846H24V6.92308H0V5.53846Z" fill="#B22234"/>
        <path d="M0 8.30769H24V9.69231H0V8.30769Z" fill="#B22234"/>
        <path d="M0 11.0769H24V12.4615H0V11.0769Z" fill="#B22234"/>
        <path d="M0 13.8462H24V15.2308H0V13.8462Z" fill="#B22234"/>
        <path d="M0 16.6154H24V18H0V16.6154Z" fill="#B22234"/>

        {/* Blue canton */}
        <rect width="10" height="9.69231" fill="#3C3B6E"/>

        {/* Stars (simplified) */}
        <circle cx="1.5" cy="1.5" r="0.5" fill="white"/>
        <circle cx="3.5" cy="1.5" r="0.5" fill="white"/>
        <circle cx="5.5" cy="1.5" r="0.5" fill="white"/>
        <circle cx="7.5" cy="1.5" r="0.5" fill="white"/>
        <circle cx="2.5" cy="3" r="0.5" fill="white"/>
        <circle cx="4.5" cy="3" r="0.5" fill="white"/>
        <circle cx="6.5" cy="3" r="0.5" fill="white"/>
        <circle cx="8.5" cy="3" r="0.5" fill="white"/>
        <circle cx="1.5" cy="4.5" r="0.5" fill="white"/>
        <circle cx="3.5" cy="4.5" r="0.5" fill="white"/>
        <circle cx="5.5" cy="4.5" r="0.5" fill="white"/>
        <circle cx="7.5" cy="4.5" r="0.5" fill="white"/>
        <circle cx="2.5" cy="6" r="0.5" fill="white"/>
        <circle cx="4.5" cy="6" r="0.5" fill="white"/>
        <circle cx="6.5" cy="6" r="0.5" fill="white"/>
        <circle cx="8.5" cy="6" r="0.5" fill="white"/>
        <circle cx="1.5" cy="7.5" r="0.5" fill="white"/>
        <circle cx="3.5" cy="7.5" r="0.5" fill="white"/>
        <circle cx="5.5" cy="7.5" r="0.5" fill="white"/>
        <circle cx="7.5" cy="7.5" r="0.5" fill="white"/>
      </g>
    </svg>
  );
};

export default FlagUS;
