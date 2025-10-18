import React from 'react';

// Base skeleton animation class
const skeletonClass = 'animate-pulse bg-gray-300 rounded';

// Card skeleton for projects, products, training programs
export const CardSkeleton = ({ showImage = true, showButton = false }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    {showImage && <div className={`${skeletonClass} w-full h-48 mb-4`}></div>}
    <div className={`${skeletonClass} h-6 w-3/4 mb-3`}></div>
    <div className={`${skeletonClass} h-4 w-full mb-2`}></div>
    <div className={`${skeletonClass} h-4 w-2/3 mb-4`}></div>
    {showButton && <div className={`${skeletonClass} h-10 w-32`}></div>}
  </div>
);

// Grid of cards skeleton
export const CardsGridSkeleton = ({
  count = 6,
  showImages = true,
  showButtons = false,
  className = '',
}) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
    {Array.from({ length: count }, (_, i) => (
      <CardSkeleton key={i} showImage={showImages} showButton={showButtons} />
    ))}
  </div>
);

// Testimonial card skeleton
export const TestimonialSkeleton = () => (
  <div className="w-full bg-gray-50 rounded-[12px] p-[24px] sm:p-[28px] md:p-[32px] shadow-[0px_10px_15px_rgba(0,0,0,0.1)]">
    <div className="flex items-center mb-[20px] sm:mb-[24px]">
      <div
        className={`${skeletonClass} w-[64px] h-[64px] rounded-[32px] mr-[16px] flex-shrink-0`}
      ></div>
      <div className="flex-1 min-w-0">
        <div className={`${skeletonClass} h-[16px] w-[120px] mb-[2px]`}></div>
        <div className={`${skeletonClass} h-[14px] w-[100px]`}></div>
      </div>
    </div>
    <div className={`${skeletonClass} h-[16px] w-full mb-[8px]`}></div>
    <div className={`${skeletonClass} h-[16px] w-full mb-[8px]`}></div>
    <div className={`${skeletonClass} h-[16px] w-[85%]`}></div>
  </div>
);

// Testimonials grid skeleton
export const TestimonialsGridSkeleton = ({ count = 3 }) => (
  <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] sm:gap-[24px] md:gap-[32px]">
    {Array.from({ length: count }, (_, i) => (
      <TestimonialSkeleton key={i} />
    ))}
  </div>
);

// Product card skeleton (with price)
export const ProductSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
    <div className={`${skeletonClass} w-full h-48`}></div>
    <div className="p-4">
      <div className={`${skeletonClass} h-6 w-3/4 mb-2`}></div>
      <div className={`${skeletonClass} h-4 w-full mb-2`}></div>
      <div className={`${skeletonClass} h-4 w-2/3 mb-4`}></div>
      <div className="flex justify-between items-center">
        <div className={`${skeletonClass} h-6 w-16`}></div>
        <div className={`${skeletonClass} h-8 w-20`}></div>
      </div>
    </div>
  </div>
);

// Products grid skeleton
export const ProductsGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }, (_, i) => (
      <ProductSkeleton key={i} />
    ))}
  </div>
);

// Contact info skeleton (for footer/contact sections)
export const ContactInfoSkeleton = () => (
  <div className="space-y-4">
    <div className={`${skeletonClass} h-5 w-32 mb-2`}></div>
    <div className={`${skeletonClass} h-4 w-48`}></div>
    <div className={`${skeletonClass} h-4 w-40`}></div>
    <div className={`${skeletonClass} h-4 w-36`}></div>
  </div>
);

// Hero section skeleton
export const HeroSkeleton = () => (
  <div className="w-full h-96 bg-gray-100">
    <div className="max-w-6xl mx-auto px-4 h-full flex flex-col justify-center">
      <div className={`${skeletonClass} h-12 w-3/4 mb-4`}></div>
      <div className={`${skeletonClass} h-6 w-1/2 mb-6`}></div>
      <div className={`${skeletonClass} h-10 w-32`}></div>
    </div>
  </div>
);

// List item skeleton (for admin lists)
export const ListItemSkeleton = () => (
  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
    <div className="flex items-center space-x-4">
      <div className={`${skeletonClass} w-12 h-12 rounded`}></div>
      <div>
        <div className={`${skeletonClass} h-5 w-32 mb-2`}></div>
        <div className={`${skeletonClass} h-4 w-24`}></div>
      </div>
    </div>
    <div className="flex space-x-2">
      <div className={`${skeletonClass} h-8 w-16`}></div>
      <div className={`${skeletonClass} h-8 w-16`}></div>
    </div>
  </div>
);

// List skeleton (for admin pages)
export const ListSkeleton = ({ count = 5 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }, (_, i) => (
      <ListItemSkeleton key={i} />
    ))}
  </div>
);

// Text block skeleton
export const TextSkeleton = ({ lines = 3 }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }, (_, i) => (
      <div key={i} className={`${skeletonClass} h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}></div>
    ))}
  </div>
);

// Full page skeleton wrapper
export const PageSkeleton = ({ children }) => (
  <div className="min-h-screen bg-gray-50">{children}</div>
);

// Training program skeleton
export const TrainingSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <div className={`${skeletonClass} w-full h-48 mb-4`}></div>
    <div className={`${skeletonClass} h-6 w-3/4 mb-3`}></div>
    <div className={`${skeletonClass} h-4 w-full mb-2`}></div>
    <div className={`${skeletonClass} h-4 w-2/3 mb-4`}></div>
    <div className="flex justify-between items-center">
      <div className={`${skeletonClass} h-5 w-20`}></div>
      <div className={`${skeletonClass} h-8 w-24`}></div>
    </div>
  </div>
);

// Training programs grid skeleton
export const TrainingGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }, (_, i) => (
      <TrainingSkeleton key={i} />
    ))}
  </div>
);

// Project detail skeleton
export const ProjectDetailSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className={`${skeletonClass} h-12 w-3/4 mb-6`}></div>
    <div className={`${skeletonClass} w-full h-64 mb-8`}></div>
    <div className="space-y-4">
      <div className={`${skeletonClass} h-6 w-full`}></div>
      <div className={`${skeletonClass} h-4 w-full`}></div>
      <div className={`${skeletonClass} h-4 w-3/4`}></div>
      <div className={`${skeletonClass} h-4 w-full`}></div>
      <div className={`${skeletonClass} h-4 w-2/3`}></div>
    </div>
  </div>
);

// About page skeleton
export const AboutSkeleton = () => (
  <div className="max-w-6xl mx-auto px-4 py-8">
    <div className="text-center mb-12">
      <div className={`${skeletonClass} h-16 w-3/4 mx-auto mb-6`}></div>
      <div className={`${skeletonClass} h-6 w-1/2 mx-auto`}></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="text-center">
          <div className={`${skeletonClass} w-16 h-16 mx-auto mb-4`}></div>
          <div className={`${skeletonClass} h-6 w-32 mx-auto mb-2`}></div>
          <div className={`${skeletonClass} h-4 w-full`}></div>
        </div>
      ))}
    </div>
    <div className="space-y-4">
      <div className={`${skeletonClass} h-6 w-full`}></div>
      <div className={`${skeletonClass} h-4 w-full`}></div>
      <div className={`${skeletonClass} h-4 w-3/4`}></div>
    </div>
  </div>
);

// Story page skeleton
export const StorySkeleton = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="text-center mb-12">
      <div className={`${skeletonClass} h-16 w-2/3 mx-auto mb-6`}></div>
      <div className={`${skeletonClass} h-6 w-1/2 mx-auto`}></div>
    </div>
    <div className="space-y-8">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="space-y-4">
          <div className={`${skeletonClass} h-8 w-1/2`}></div>
          <div className={`${skeletonClass} h-4 w-full`}></div>
          <div className={`${skeletonClass} h-4 w-full`}></div>
          <div className={`${skeletonClass} h-4 w-3/4`}></div>
        </div>
      ))}
    </div>
  </div>
);

// Donation page skeleton
export const DonationSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="text-center mb-12">
      <div className={`${skeletonClass} h-16 w-3/4 mx-auto mb-6`}></div>
      <div className={`${skeletonClass} h-6 w-1/2 mx-auto`}></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className={`${skeletonClass} h-8 w-1/2`}></div>
        <div className={`${skeletonClass} h-4 w-full`}></div>
        <div className={`${skeletonClass} h-4 w-3/4`}></div>
      </div>
      <div className="space-y-4">
        <div className={`${skeletonClass} h-8 w-1/2`}></div>
        <div className={`${skeletonClass} h-10 w-full`}></div>
        <div className={`${skeletonClass} h-10 w-full`}></div>
        <div className={`${skeletonClass} h-12 w-32`}></div>
      </div>
    </div>
  </div>
);

// Contact page skeleton
export const ContactSkeleton = () => (
  <div className="max-w-6xl mx-auto px-4 py-8">
    <div className="text-center mb-12">
      <div className={`${skeletonClass} h-16 w-3/4 mx-auto mb-6`}></div>
      <div className={`${skeletonClass} h-6 w-1/2 mx-auto`}></div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className={`${skeletonClass} h-8 w-1/2`}></div>
        <div className="space-y-4">
          <div className={`${skeletonClass} h-4 w-full`}></div>
          <div className={`${skeletonClass} h-4 w-3/4`}></div>
          <div className={`${skeletonClass} h-4 w-full`}></div>
        </div>
      </div>
      <div className="space-y-6">
        <div className={`${skeletonClass} h-8 w-1/2`}></div>
        <div className="space-y-4">
          <div className={`${skeletonClass} h-10 w-full`}></div>
          <div className={`${skeletonClass} h-10 w-full`}></div>
          <div className={`${skeletonClass} h-24 w-full`}></div>
          <div className={`${skeletonClass} h-12 w-32`}></div>
        </div>
      </div>
    </div>
  </div>
);
