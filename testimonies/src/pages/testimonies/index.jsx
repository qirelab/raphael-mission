import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Button from '../../components/ui/Button';

const TestimoniesPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Maria Santos",
      location: "São Paulo, Brazil",
      image: "/images/img_img_64x64.png",
      quote: "The mission\'s food program saved my family during our darkest hour. Their compassion gave us hope when we had none left."
    },
    {
      id: 2,
      name: "James Wilson",
      location: "Chicago, USA",
      image: "/images/img_img_7.png",
      quote: "Through their mentorship program, I found direction and purpose. Today I am helping others the same way they helped me."
    },
    {
      id: 3,
      name: "Amara Okafor",
      location: "Lagos, Nigeria",
      image: "/images/img_img_8.png",
      quote: "The educational support changed my daughter's life. She is now studying medicine and wants to serve others."
    },
    {
      id: 4,
      name: "Carlos Rodriguez",
      location: "Mexico City, Mexico",
      image: "/images/img_img_9.png",
      quote: "Their disaster relief team was there when the earthquake hit. They did not just rebuild our homes, they rebuilt our community."
    },
    {
      id: 5,
      name: "Sarah Kim",
      location: "Seoul, South Korea",
      image: "/images/img_img_10.png",
      quote: "The mission's healthcare initiative brought medical care to our remote village. My grandmother received life-saving treatment."
    },
    {
      id: 6,
      name: "David Thompson",
      location: "London, UK",
      image: "/images/img_img_11.png",
      quote: "Volunteering with Raphael Mission opened my eyes to the power of faith in action. It transformed my entire worldview."
    }
  ];

  const featuredTestimonial = {
    name: "Elena Vasquez",
    location: "Guatemala City, Guatemala",
    image: "/images/img_img_468x362.png",
    quote: "When Hurricane Maria destroyed everything we had, I thought our family would never recover. The Raphael Mission team arrived within days, bringing not just supplies but hope. They helped us rebuild our home, but more importantly, they helped rebuild our faith. Today, three years later, I work alongside them helping other families in crisis. What started as receiving help became a calling to serve others."
  };

  return (
    <div className="w-full bg-global-7">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#dcfce7] to-[#f0fdf4] relative">
        <div 
          className="absolute inset-0 bg-[url('/images/img_img_600x1440.png')] bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/images/img_img_600x1440.png')" }}
        />
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-[100px] sm:py-[150px] md:py-[194px] text-center">
            <div className="mx-auto lg:max-w-none">
              <h1 className="text-[30px] sm:text-[45px] md:text-[60px] font-bold leading-tight mb-4 sm:mb-6">
                <span className="text-global-2">Stories of Faith and</span>
                <span className="text-global-3"> Transformation</span>
              </h1>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-[28px] sm:leading-[30px] md:leading-[33px] text-global-5 max-w-3xl mx-auto">
                Real experiences from people whose lives have been touched and changed through the mission's work.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Grid */}
      <section className="w-full bg-global-7 py-[32px] sm:py-[48px] md:py-[64px]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] sm:gap-[24px] md:gap-[32px]">
            {testimonials?.map((testimonial) => (
              <div 
                key={testimonial?.id}
                className="bg-global-7 rounded-[12px] p-[24px] sm:p-[28px] md:p-[32px] shadow-[0px_10px_15px_rgba(0,0,0,0.1)] hover:shadow-[0px_15px_25px_rgba(0,0,0,0.15)] transition-shadow duration-300"
              >
                {/* Profile Section */}
                <div className="flex items-center mb-[20px] sm:mb-[24px]">
                  <img 
                    src={testimonial?.image} 
                    alt={testimonial?.name}
                    className="w-[64px] h-[64px] rounded-[32px] object-cover"
                  />
                  <div className="ml-[16px]">
                    <h3 className="text-[16px] font-semibold leading-[24px] text-global-2 mb-[2px]">
                      {testimonial?.name}
                    </h3>
                    <p className="text-[14px] font-normal leading-[21px] text-global-5">
                      {testimonial?.location}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-[16px] font-normal leading-[24px] text-global-4">
                  "{testimonial?.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Testimonial */}
      <section className="w-full bg-global-6 py-[32px] sm:py-[48px] md:py-[64px] mt-[16px]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-global-7 rounded-[16px] shadow-[0px_20px_25px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="w-full lg:w-[28%]">
                <img 
                  src={featuredTestimonial?.image} 
                  alt={featuredTestimonial?.name}
                  className="w-full h-[250px] sm:h-[300px] lg:h-[468px] object-cover"
                />
              </div>

              {/* Content */}
              <div className="w-full lg:w-[72%] p-[24px] sm:p-[36px] md:p-[46px]">
                <div className="mb-[24px]">
                  <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[30px] sm:leading-[33px] md:leading-[36px] text-global-2 mb-[8px]">
                    {featuredTestimonial?.name}
                  </h2>
                  <p className="text-[16px] font-normal leading-[24px] text-global-5">
                    {featuredTestimonial?.location}
                  </p>
                </div>

                <blockquote className="text-[16px] sm:text-[17px] md:text-[18px] font-normal leading-[26px] sm:leading-[28px] md:leading-[30px] text-global-4 mb-[24px]">
                  "{featuredTestimonial?.quote}"
                </blockquote>

                <Button 
                  variant="primary"
                  onClick={() => {}}
                  className="bg-global-3 text-global-9 px-[24px] sm:px-[28px] md:px-[32px] py-[10px] sm:py-[11px] md:py-[12px] rounded-[8px] text-[16px] font-normal leading-[24px] hover:bg-opacity-90 transition-all duration-200"
                >
                  Read Full Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Share Your Story Section */}
      <section className="w-full bg-global-3 py-[32px] sm:py-[48px] md:py-[64px] mt-[16px]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-bold leading-[32px] sm:leading-[36px] md:leading-[40px] text-global-9 mb-[16px] sm:mb-[20px] md:mb-[24px]">
              Share Your Story
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-[26px] sm:leading-[29px] md:leading-[33px] text-global-8 mb-[20px] sm:mb-[22px] md:py-[24px] max-w-4xl mx-auto">
              Has the Raphael Mission touched your life? We would love to hear your testimony and share it with others who need hope.
            </p>
            <Button 
              variant="secondary"
              onClick={() => {}}
              className="bg-global-7 text-button-1 px-[24px] sm:px-[28px] md:px-[34px] py-[12px] sm:py-[14px] md:py-[16px] rounded-[8px] text-[16px] font-semibold leading-[24px] hover:bg-opacity-90 transition-all duration-200"
            >
              Share Your Story
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full bg-global-4 py-[32px] sm:py-[36px] md:py-[42px] px-[32px] sm:px-[48px] md:px-[64px]">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="mb-[32px] sm:mb-[40px] md:py-[48px]">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-[32px] lg:gap-[48px]">
              {/* Brand Section */}
              <div className="w-full lg:w-[22%]">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[30px] sm:leading-[33px] md:leading-[36px] text-global-9 mb-[12px] sm:mb-[14px]">
                  Raphael Mission
                </h3>
                <p className="text-[16px] font-normal leading-[24px] text-global-6 mb-[32px] sm:mb-[40px] md:mb-[48px]">
                  Spreading God's love through evangelism, healing, and church support.
                </p>
                <div className="flex items-center gap-[12px]">
                  <img src="/images/img_frame.svg" alt="Facebook" className="w-[16px] h-[16px]" />
                  <img src="/images/img_frame_blue_gray_100.svg" alt="Twitter" className="w-[16px] h-[16px]" />
                  <img src="/images/img_frame_blue_gray_100_16x18.svg" alt="Instagram" className="w-[18px] h-[16px]" />
                </div>
              </div>

              {/* Navigation Section */}
              <div className="w-full lg:w-[18%]">
                <h4 className="text-[16px] font-semibold leading-[24px] text-global-9 mb-[12px] sm:mb-[14px]">
                  Navigation
                </h4>
                <nav className="space-y-[4px] sm:space-y-[6px]">
                  <div className="flex items-center">
                    <a href="#" className="text-[16px] font-normal leading-[24px] text-global-6 hover:text-global-9 transition-colors">
                      About
                    </a>
                    <img src="/images/img_arrow_down_white_a700.svg" alt="" className="w-[10px] h-[6px] ml-[8px]" />
                  </div>
                  <div className="flex items-center">
                    <a href="#" className="text-[16px] font-normal leading-[24px] text-global-6 hover:text-global-9 transition-colors">
                      Projects
                    </a>
                    <img src="/images/img_arrow_down_white_a700.svg" alt="" className="w-[10px] h-[6px] ml-[8px]" />
                  </div>
                  <a href="#" className="block text-[16px] font-normal leading-[24px] text-global-6 hover:text-global-9 transition-colors">
                    Fund
                  </a>
                  <a href="#" className="block text-[16px] font-normal leading-[24px] text-global-6 hover:text-global-9 transition-colors">
                    Testimonies
                  </a>
                  <a href="#" className="block text-[16px] font-normal leading-[24px] text-global-6 hover:text-global-9 transition-colors">
                    Training
                  </a>
                  <a href="#" className="block text-[16px] font-normal leading-[24px] text-global-6 hover:text-global-9 transition-colors">
                    Story
                  </a>
                  <a href="#" className="block text-[16px] font-normal leading-[24px] text-global-6 hover:text-global-9 transition-colors">
                    Shop
                  </a>
                  <a href="#" className="block text-[16px] font-normal leading-[24px] text-global-6 hover:text-global-9 transition-colors">
                    Contact
                  </a>
                  <a href="#" className="block text-[16px] font-normal leading-[24px] text-global-6 hover:text-global-9 transition-colors">
                    Donate
                  </a>
                </nav>
              </div>

              {/* Contact Section */}
              <div className="w-full lg:w-[48%]">
                <h4 className="text-[16px] font-semibold leading-[24px] text-global-9 mb-[12px] sm:mb-[14px]">
                  Contact
                </h4>
                <div className="space-y-[4px] sm:space-y-[6px]">
                  <p className="text-[16px] font-normal leading-[24px] text-global-6">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-[16px] font-normal leading-[24px] text-global-6">
                    info@raphaelmission.org
                  </p>
                  <div>
                    <p className="text-[16px] font-normal leading-[24px] text-global-6">
                      123 Mission Street
                    </p>
                    <p className="text-[16px] font-normal leading-[24px] text-global-6">
                      Faith City, FC 12345
                    </p>
                  </div>
                </div>
              </div>

              {/* Legal Section */}
              <div className="w-full lg:w-[42%]">
                <h4 className="text-[16px] font-semibold leading-[24px] text-global-9 mb-[12px] sm:mb-[14px]">
                  Legal
                </h4>
                <div className="space-y-[4px]">
                  <a href="#" className="block text-[16px] font-normal leading-[24px] text-global-6 hover:text-global-9 transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="block text-[16px] font-normal leading-[24px] text-global-6 hover:text-global-9 transition-colors">
                    Terms of Service
                  </a>
                  <a href="#" className="block text-[16px] font-normal leading-[24px] text-global-6 hover:text-global-9 transition-colors">
                    Cookie Policy
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-[20px] sm:pt-[24px] md:pt-[26px] border-t border-global-6 border-opacity-20">
            <p className="text-[16px] font-normal leading-[24px] text-global-6">
              © Raphael Mission 2025. All rights
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TestimoniesPage;