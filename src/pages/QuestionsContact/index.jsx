import React, { useState } from 'react';
import Header from '../../components/common/Header';
import EditText from '../../components/ui/EditText';
import Button from '../../components/ui/Button';

const QuestionsContact = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value) => setSearchValue(value);
  const handleStartChat = () => console.log('Starting chat...');

  return (
    <div className="w-full bg-[#F6F7F9]">
      {/* HEADER как на макете */}
      <Header />

      <main className="pt-6 lg:pt-8">
        {/* HERO: Заголовок + Поиск */}
        <section className="w-full bg-[#F6F7F9]">
          <div className="max-w-[1292px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center py-12 sm:py-16 md:py-20 lg:py-24">
              <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-[Poppins] font-normal leading-tight text-[#0f172a] text-center">
                QUESTIONS
              </h1>

              <p className="mt-3 text-[16px] sm:text-[18px] lg:text-[20px] font-[Poppins] text-[#6B7280] text-center">
                Find answers to frequently asked questions
              </p>

              <div className="w-full max-w-2xl mt-6 sm:mt-8">
                <EditText
                  placeholder="Search for answers"
                  value={searchValue}
                  onChange={handleSearchChange}
                  leftImage={{ src: '/images/img_div.svg', width: 18, height: 22 }}
                  className="py-4 px-14 text-[16px] sm:text-[18px] font-[Poppins] bg-white border-2 border-[#CFE3FF] rounded-[14px] shadow-[0_1px_2px_#0000000c]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* THREE WAYS TO CONNECT */}
        <section className="w-full bg-[#F6F7F9] pb-10 sm:pb-14 md:pb-16">
          <div className="max-w-[1292px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[30px] font-[Poppins] font-normal text-center text-[#1F7A5B]">
              Three ways to connect with Raphael Mission
            </h2>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Call Us */}
              <div className="rounded-2xl bg-[#EEF6FF] border border-[#E6F0FF] p-8 text-center">
                <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-[#DFEAFF] flex items-center justify-center">
                  <img src="/images/img_div_white_a700.svg" alt="Phone icon" className="w-7 h-7" />
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-[Poppins] text-[#0f172a]">Call Us</h3>
                <p className="mt-2 text-[16px] sm:text-[18px] font-[Poppins] text-[#334155]">(555) 123-4567</p>
                <p className="mt-1 text-[14px] sm:text-[16px] font-[Poppins] text-[#64748b]">8:30 AM – 5:00 PM EST</p>
              </div>

              {/* Chat with Us */}
              <div className="rounded-2xl bg-[#EEF6FF] border border-[#E6F0FF] p-8 text-center">
                <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-[#DFEAFF] flex items-center justify-center">
                  <img src="/images/img_div_white_a700_64x64.svg" alt="Chat icon" className="w-7 h-7" />
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-[Poppins] text-[#0f172a]">Chat with Us</h3>
                <p className="mt-2 text-[14px] sm:text-[16px] font-[Poppins] text-[#64748b]">
                  Chat with us during office
                </p>
                <div className="mt-3 flex justify-center">
                  <Button
                    variant="primary"
                    size="small"
                    onClick={handleStartChat}
                    className="bg-[#1F7A5B] text-white px-5 py-1.5 rounded-md text-[14px] leading-[20px]"
                  >
                    Start
                  </Button>
                </div>
              </div>

              {/* Email Us */}
              <div className="rounded-2xl bg-[#EEF6FF] border border-[#E6F0FF] p-8 text-center">
                <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-[#DFEAFF] flex items-center justify-center">
                  <img src="/images/img_i.svg" alt="Email icon" className="w-7 h-7" />
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-[Poppins] text-[#0f172a]">Email Us</h3>
                <p className="mt-2 text-[14px] sm:text-[16px] font-[Poppins] text-[#334155]">
                  info@raphaelmission.org
                </p>
                <p className="mt-1 text-[12px] sm:text-[14px] font-[Poppins] text-[#64748b]">
                  We respond as soon as possible
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT US — зелёный блок */}
        <section className="w-full bg-[#2F7154]">
          <div className="max-w-[1292px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h3 className="text-center text-white text-[20px] sm:text-[22px] mb-10">Contact Us</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-4">
                  <img src="/images/img_div_64x64.svg" alt="Location icon" className="w-6 h-6" />
                </div>
                <p className="text-white/90 text-sm">Address</p>
                <p className="text-white mt-1 text-sm">
                  123 Mission Street <br /> Hope City, HC 12345
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-4">
                  <img src="/images/img_div_white_a700.svg" alt="Phone icon" className="w-6 h-6" />
                </div>
                <p className="text-white/90 text-sm">Phone</p>
                <p className="text-white mt-1 text-sm">+1 (555) 123-4567</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-4">
                  <img src="/images/img_i.svg" alt="Email icon" className="w-6 h-6" />
                </div>
                <p className="text-white/90 text-sm">Email</p>
                <p className="text-white mt-1 text-sm">info@raphaelmission.org</p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER (общий тёмный, как на скрине) */}
        <footer className="w-full bg-[#333333] py-8 lg:py-10">
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
              {/* Brand */}
              <div className="w-full lg:w-[22%]">
                <h3 className="text-[20px] lg:text-[24px] font-bold leading-[30px] lg:leading-[36px] text-white font-['Poppins'] mb-4">
                  Raphael Mission
                </h3>
                <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins'] mb-6 max-w-[94%]">
                  Spreading God&apos;s love through evangelism, healing, and church support.
                </p>
                <div className="flex items-center gap-3">
                  <img src="/images/img_frame_blue_gray_100.svg" alt="Facebook" className="w-[10px] h-[16px]" />
                  <img src="/images/img_frame_blue_gray_100_16x14.svg" alt="Twitter" className="w-[14px] h-[16px]" />
                  <img src="/images/img_frame_blue_gray_100_16x18.svg" alt="Instagram" className="w-[18px] h-[16px]" />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full lg:w-auto">
                {/* Navigation */}
                <div className="w-full lg:w-[18%]">
                  <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins'] mb-4">
                    Navigation
                  </h4>
                  <div className="space-y-2">
                    {['About','Projects','Fund','Testimonies','Training','Story','Shop','Contact','Donate'].map((item) => (
                      <p
                        key={item}
                        className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="w-full lg:w-[48%]">
                  <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins'] mb-4">
                    Contact
                  </h4>
                  <div className="space-y-2 max-w-[84%]">
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                      +1 (555) 123-4567
                    </p>
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                      info@raphaelmission.org
                    </p>
                    <div>
                      <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                        123 Mission Street
                      </p>
                      <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                        Faith City, FC 12345
                      </p>
                    </div>
                  </div>
                </div>

                {/* Legal */}
                <div className="w-full lg:w-[42%]">
                  <h4 className="text-[14px] lg:text-[16px] font-semibold leading-[20px] lg:leading-[24px] text-white font-['Poppins'] mb-4">
                    Legal
                  </h4>
                  <div className="space-y-2">
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                      Privacy Policy
                    </p>
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                      Terms of Service
                    </p>
                    <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                      Cookie Policy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-gray-600">
              <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-[#d1d5db] font-['Poppins']">
                © Raphael Mission 2025. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default QuestionsContact;
