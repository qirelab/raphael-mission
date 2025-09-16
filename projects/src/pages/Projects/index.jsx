import React from 'react';
import Header from '../../components/common/Header';
import Button from '../../components/ui/Button';

const Projects = () => {
  const projectsData = [
    {
      id: 1,
      title: "Street Evangelism",
      description: "Sharing the message of hope and faith in public spaces, connecting with people where they are.",
      image: "/images/img_img_192x384.png"
    },
    {
      id: 2,
      title: "Tent Evangelism", 
      description: "Hosting gatherings in temporary tent settings to reach local communities with love and purpose.",
      image: "/images/img_img_1.png"
    },
    {
      id: 3,
      title: "Personal Evangelism",
      description: "One-on-one conversations to share faith and encouragement, building meaningful relationships.",
      image: "/images/img_img_2.png"
    },
    {
      id: 4,
      title: "Social Projects",
      description: "Providing practical aid and support to those in need, demonstrating love through action.",
      image: "/images/img_img_3.png"
    },
    {
      id: 5,
      title: "Art Evangelism",
      description: "Using music, painting, and creative arts to inspire and connect hearts with divine beauty.",
      image: "/images/img_img_4.png"
    },
    {
      id: 6,
      title: "Church Support",
      description: "Assisting churches with resources, training, and encouragement to strengthen their ministries.",
      image: "/images/img_img_5.png"
    },
    {
      id: 7,
      title: "Healing Ministry",
      description: "Offering prayer and spiritual care for physical and emotional healing through divine grace.",
      image: "/images/img_img_6.png"
    }
  ];

  const statsData = [
    { number: "500+", label: "Lives Touched" },
    { number: "25+", label: "Communities Served" },
    { number: "7", label: "Active Projects" }
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-start items-start w-full">
        <div className="flex flex-col justify-start items-center w-full">
          {/* Header */}
          <Header />

          {/* Hero Section */}
          <section className="relative w-full">
            <div className="absolute inset-0 bg-[url('/images/img_img.png')] bg-cover bg-center z-0"></div>
            <div className="absolute inset-0 bg-global-1 z-10"></div>
            <div className="relative z-20 w-full">
              <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-start w-full pt-[56px] sm:pt-[80px] md:pt-[100px] lg:pt-[112px] pb-[56px] sm:pb-[80px] md:pb-[100px] lg:pb-[112px]">
                  <div className="flex flex-col justify-start items-center w-full max-w-[900px] px-[22px] sm:px-[32px] md:px-[44px]">
                    <h1 className="text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-poppins font-bold leading-[45px] sm:leading-[60px] md:leading-[75px] lg:leading-[90px] text-center text-global-5 mb-[10px]">
                      Our Projects
                    </h1>
                    <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-poppins font-normal leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[32px] text-center text-global-4 w-full">
                      Serving communities worldwide through faith, compassion, and action.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Grid Section */}
          <section className="w-full bg-global-6 pt-[32px] sm:pt-[48px] md:pt-[56px] lg:pt-[64px] pb-[32px] sm:pb-[48px] md:pt-[56px] lg:pb-[64px]">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center items-center w-full">
                <div className="w-full px-[16px] sm:px-[24px] md:px-[32px] mb-[40px] sm:mb-[60px] md:mb-[80px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] sm:gap-[24px] md:gap-[32px] w-full">
                    {projectsData?.map((project, index) => (
                      <div 
                        key={project?.id}
                        className={`flex flex-col justify-start items-center w-full bg-global-6 rounded-[12px] shadow-[0px_10px_15px_#00000019] ${
                          index === 6 ? 'sm:col-span-2 lg:col-span-1' : ''
                        }`}
                      >
                        <img 
                          src={project?.image} 
                          alt={project?.title}
                          className="w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-[192px] object-cover rounded-t-[12px]" 
                        />
                        <div className="flex flex-col justify-start items-start w-full pt-[16px] sm:pt-[18px] md:pt-[20px] lg:pt-[22px] pr-[18px] sm:pr-[20px] md:pr-[22px] lg:pr-[24px] pb-[16px] sm:pb-[18px] md:pb-[20px] lg:pb-[22px] pl-[18px] sm:pl-[20px] md:pl-[22px] lg:pl-[24px]">
                          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-poppins font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] text-left text-global-1 mb-[6px]">
                            {project?.title}
                          </h3>
                          <p className="text-[14px] sm:text-[15px] md:text-[15px] lg:text-[16px] font-poppins font-normal leading-[20px] sm:leading-[22px] md:leading-[23px] lg:leading-[24px] text-left text-global-3 w-full mb-[12px] sm:mb-[14px] md:mb-[15px] lg:mb-[16px]">
                            {project?.description}
                          </p>
                          <Button
                            variant="primary"
                            size="small"
                            onClick={() => {}}
                            className="pt-[4px] sm:pt-[5px] md:pt-[5px] lg:pt-[6px] pr-[10px] sm:pr-[12px] md:pr-[13px] lg:pr-[14px] pb-[4px] sm:pb-[5px] md:pb-[5px] lg:pb-[6px] pl-[14px] sm:pl-[16px] md:pl-[18px] lg:pl-[20px] rounded-[8px] text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px] font-medium leading-[18px] sm:leading-[19px] md:leading-[20px] lg:leading-[21px]"
                          >
                            Learn More
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="w-full bg-global-4 pt-[32px] sm:pt-[48px] md:pt-[56px] lg:pt-[64px] pb-[32px] sm:pb-[48px] md:pb-[56px] lg:pb-[64px]">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center items-center w-full">
                <div className="flex flex-col justify-start items-center w-full max-w-[1200px] mb-[8px] sm:mb-[12px] md:mb-[14px] lg:mb-[16px]">
                  <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-poppins font-bold leading-[32px] sm:leading-[36px] md:leading-[38px] lg:leading-[40px] text-center text-global-1 w-full max-w-[800px] mb-[16px] sm:mb-[18px] md:mb-[19px] lg:mb-[20px]">
                    Transforming Lives, Building Communities
                  </h2>
                  <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-poppins font-normal leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] text-center text-global-3 w-full max-w-[900px] mb-[32px] sm:mb-[38px] md:mb-[42px] lg:mb-[46px] px-[68px] sm:px-[100px] md:px-[120px] lg:px-[136px]">
                    Each project serves as a bridge of hope, connecting hearts to faith and communities to lasting change. Through our diverse ministries, we witness transformed lives, strengthened families, and thriving communities that reflect God's love and compassion.
                  </p>
                  
                  {/* Statistics */}
                  <div className="flex flex-col sm:flex-row gap-[16px] sm:gap-[24px] md:gap-[28px] lg:gap-[32px] w-full justify-center items-center mb-[72px] sm:mb-[108px] md:mb-[126px] lg:mb-[144px] ml-[16px] sm:ml-[24px] md:ml-[28px] lg:ml-[32px]">
                    {statsData?.map((stat, index) => (
                      <div key={index} className="flex flex-col justify-start items-center w-full max-w-[384px]">
                        <div className="flex justify-center items-center w-full px-[28px] sm:px-[42px] md:px-[49px] lg:px-[56px]">
                          <span className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-poppins font-bold leading-[36px] sm:leading-[42px] md:leading-[48px] lg:leading-[54px] text-center text-global-2">
                            {stat?.number}
                          </span>
                        </div>
                        <div className="flex justify-center items-center w-full px-[28px] sm:px-[42px] md:px-[49px] lg:px-[56px] -mt-[2px]">
                          <span className="text-[14px] sm:text-[15px] md:text-[15px] lg:text-[16px] font-poppins font-normal leading-[20px] sm:leading-[22px] md:leading-[23px] lg:leading-[24px] text-center text-global-3">
                            {stat?.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="w-full bg-global-3 pt-[32px] sm:pt-[48px] md:pt-[56px] lg:pt-[64px] pb-[32px] sm:pb-[48px] md:pb-[56px] lg:pb-[64px]">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center items-center w-full">
                <div className="flex flex-col gap-[20px] sm:gap-[23px] md:gap-[24px] lg:gap-[26px] justify-start items-center w-full max-w-[1200px] mb-[8px] sm:mb-[12px] md:mb-[14px] lg:mb-[16px]">
                  <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-poppins font-bold leading-[32px] sm:leading-[36px] md:leading-[38px] lg:leading-[40px] text-center text-global-5 w-full max-w-[700px]">
                    Join Us in Making a Difference
                  </h2>
                  <p className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-poppins font-normal leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] text-center text-global-4 w-full max-w-[900px]">
                    Your support and participation can help us reach more communities and transform more lives. Together, we can spread hope and compassion to those who need it most.
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-[12px] sm:gap-[14px] md:gap-[15px] lg:gap-[16px] justify-center items-center w-full px-[28px] sm:px-[42px] md:px-[49px] lg:px-[56px] mb-[72px] sm:mb-[108px] md:mb-[126px] lg:mb-[144px] ml-[16px] sm:ml-[24px] md:ml-[28px] lg:ml-[32px]">
                    <Button
                      variant="outline"
                      onClick={() => {}}
                      className="pt-[8px] sm:pt-[10px] md:pt-[11px] lg:pt-[12px] pr-[20px] sm:pr-[24px] md:pr-[26px] lg:pr-[28px] pb-[8px] sm:pb-[10px] md:pb-[11px] lg:pb-[12px] pl-[24px] sm:pl-[28px] md:pl-[30px] lg:pl-[34px] rounded-[8px] bg-global-6 text-button-1 text-[14px] sm:text-[15px] md:text-[15px] lg:text-[16px] font-semibold leading-[20px] sm:leading-[22px] md:leading-[23px] lg:leading-[24px] w-full sm:w-auto"
                    >
                      Get Involved
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {}}
                      className="pt-[8px] sm:pt-[10px] md:pt-[11px] lg:pt-[12px] pr-[22px] sm:pr-[26px] md:pr-[28px] lg:pr-[30px] pb-[8px] sm:pb-[10px] md:pb-[11px] lg:pb-[12px] pl-[24px] sm:pl-[28px] md:pl-[30px] lg:pl-[34px] rounded-[8px] text-[14px] sm:text-[15px] md:text-[15px] lg:text-[16px] font-semibold leading-[20px] sm:leading-[22px] md:leading-[23px] lg:leading-[24px] w-full sm:w-auto"
                    >
                      Donate Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Projects;
