import React from 'react';

const Footer = () => {
  const navigationLinks = [
    'About', 'Projects', 'Fund', 'Testimonies', 
    'Training', 'Story', 'Shop', 'Contact', 'Donate'
  ];

  const legalLinks = [
    'Privacy Policy', 'Terms of Service', 'Cookie Policy'
  ];

  return (
    <footer className="w-full bg-gray-800 text-white pt-[48px] sm:pt-[56px] md:pt-[64px] lg:pt-[72px] pb-[24px] sm:pb-[28px] md:pb-[32px] lg:pb-[36px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[32px] sm:gap-[40px] md:gap-[48px] lg:gap-[56px] mb-[32px] sm:mb-[40px] md:mb-[48px] lg:mb-[56px]">

          {/* Column 1: Logo and Description */}
          <div className="flex flex-col justify-start items-start">
            <div className="mb-[16px] sm:mb-[20px] md:mb-[24px]">
              <img 
                src="/images/img_logo_3.png" 
                alt="Raphael Mission" 
                className="h-[40px] sm:h-[48px] md:h-[56px] w-auto"
              />
            </div>
            <p className="text-[14px] sm:text-[15px] md:text-[16px] font-poppins font-normal leading-[20px] sm:leading-[22px] md:leading-[24px] text-gray-300 mb-[20px] sm:mb-[24px] md:mb-[28px]">
              Spreading hope and faith through compassionate action, transforming lives and building stronger communities worldwide.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-[12px] sm:gap-[16px] md:gap-[20px]">
              <a href="#" className="w-[32px] h-[32px] bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200">
                <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-[32px] h-[32px] bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200">
                <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="w-[32px] h-[32px] bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200">
                <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="w-[32px] h-[32px] bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200">
                <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                  <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.956.575-.105.79-.251.79-.546v-1.916c-3.199.696-3.867-1.546-3.867-1.546-.522-1.327-1.275-1.681-1.275-1.681-1.043-.713.079-.698.079-.698 1.153.081 1.76 1.184 1.76 1.184 1.025 1.755 2.688 1.248 3.344.954.104-.741.401-1.248.73-1.535-2.555-.291-5.24-1.278-5.24-5.689 0-1.257.45-2.285 1.188-3.09-.119-.292-.515-1.469.112-3.065 0 0 .963-.309 3.158 1.179.916-.255 1.899-.382 2.875-.387.975.005 1.958.132 2.875.387 2.192-1.488 3.155-1.179 3.155-1.179.628 1.596.232 2.773.114 3.065.739.805 1.185 1.833 1.185 3.09 0 4.423-2.688 5.394-5.247 5.68.412.354.78 1.052.78 2.121v3.148c0 .299.216.645.795.535C20.709 21.637 24 17.34 24 12.25 24 5.896 18.854.75 12.5.75z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col justify-start items-start">
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-poppins font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-white mb-[16px] sm:mb-[20px] md:mb-[24px]">
              Navigation
            </h3>
            <ul className="space-y-[8px] sm:space-y-[10px] md:space-y-[12px]">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-[14px] sm:text-[15px] md:text-[16px] font-poppins font-normal leading-[20px] sm:leading-[22px] md:leading-[24px] text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col justify-start items-start">
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-poppins font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-white mb-[16px] sm:mb-[20px] md:mb-[24px]">
              Contact
            </h3>
            <div className="space-y-[12px] sm:space-y-[16px] md:space-y-[20px]">
              <div className="flex items-start gap-[8px] sm:gap-[10px] md:gap-[12px]">
                <svg className="w-[16px] h-[16px] mt-[2px] fill-current text-gray-300" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="text-[14px] sm:text-[15px] md:text-[16px] font-poppins font-normal leading-[20px] sm:leading-[22px] md:leading-[24px] text-gray-300">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-start gap-[8px] sm:gap-[10px] md:gap-[12px]">
                <svg className="w-[16px] h-[16px] mt-[2px] fill-current text-gray-300" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a 
                  href="mailto:info@raphaelmission.org"
                  className="text-[14px] sm:text-[15px] md:text-[16px] font-poppins font-normal leading-[20px] sm:leading-[22px] md:leading-[24px] text-gray-300 hover:text-white transition-colors duration-200"
                >
                  info@raphaelmission.org
                </a>
              </div>
              <div className="flex items-start gap-[8px] sm:gap-[10px] md:gap-[12px]">
                <svg className="w-[16px] h-[16px] mt-[2px] fill-current text-gray-300" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="text-[14px] sm:text-[15px] md:text-[16px] font-poppins font-normal leading-[20px] sm:leading-[22px] md:leading-[24px] text-gray-300">
                  123 Mission Street<br />
                  Hope City, HC 12345<br />
                  United States
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Legal */}
          <div className="flex flex-col justify-start items-start">
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-poppins font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-white mb-[16px] sm:mb-[20px] md:mb-[24px]">
              Legal
            </h3>
            <ul className="space-y-[8px] sm:space-y-[10px] md:space-y-[12px]">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-[14px] sm:text-[15px] md:text-[16px] font-poppins font-normal leading-[20px] sm:leading-[22px] md:leading-[24px] text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white border-opacity-20 pt-[20px] sm:pt-[24px] md:pt-[28px]">
          <div className="flex flex-col sm:flex-row justify-center items-center">
            <p className="text-[14px] sm:text-[15px] md:text-[16px] font-poppins font-normal leading-[20px] sm:leading-[22px] md:leading-[24px] text-gray-300 text-center">
              © Raphael Mission 2025. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
