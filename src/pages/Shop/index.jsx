import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/shop.css';
import { useLanguage } from '../../context/LanguageContext';
import { shopService } from '../../services/shopService';
import Footer from '../../components/common/Footer';
import { ProductsGridSkeleton, HeroSkeleton } from '../../components/skeletons';

const Shop = () => {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await shopService.getActive();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [language]);

  const testimonials = [
    {
      name: t('shopTestimonialMariaName'),
      role: t('shopTestimonialMariaRole'),
      image: '/images/saramit.png',
      testimonial: t('shopTestimonialMariaText'),
    },
    {
      name: t('shopTestimonialDavidName'),
      role: t('shopTestimonialDavidRole'),
      image: '/images/davidch.png',
      testimonial: t('shopTestimonialDavidText'),
    },
  ];

  if (loading) {
    return (
      <div className="w-full bg-white">
        {/* HERO SKELETON */}
        <section className="w-full bg-[linear-gradient(90deg,#f8f6f3_0%,_#ffffff_100%)]">
          <div className="w-full max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
            <HeroSkeleton />
          </div>
        </section>

        {/* PRODUCTS SKELETON */}
        <section className="py-12 lg:py-16">
          <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="animate-pulse bg-gray-200 rounded h-10 w-64 mx-auto mb-4"></div>
              <div className="animate-pulse bg-gray-200 rounded h-6 w-96 mx-auto"></div>
            </div>
            <ProductsGridSkeleton count={8} />
          </div>
        </section>

        {/* TESTIMONIALS SKELETON */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="animate-pulse bg-gray-200 rounded h-10 w-64 mx-auto mb-4"></div>
              <div className="animate-pulse bg-gray-200 rounded h-6 w-96 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 2 }, (_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="animate-pulse bg-gray-200 rounded-full w-12 h-12 mr-4"></div>
                    <div>
                      <div className="animate-pulse bg-gray-200 rounded h-5 w-32 mb-2"></div>
                      <div className="animate-pulse bg-gray-200 rounded h-4 w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="animate-pulse bg-gray-200 rounded h-4 w-full"></div>
                    <div className="animate-pulse bg-gray-200 rounded h-4 w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      {/* HERO */}
      <section className="w-full bg-[linear-gradient(90deg,#f8f6f3_0%,_#ffffff_100%)]">
        <div className="w-full max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="flex flex-col items-center text-center gap-4 sm:gap-5">
            <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-poppins font-bold leading-tight text-[#275a3a]">
              {t('shopHeroTitle')}
            </h1>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-poppins font-normal leading-[26px] sm:leading-[30px] lg:leading-[33px] text-[#6b7280] max-w-[760px]">
              {t('shopHeroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="w-full bg-white py-8 sm:py-10 lg:py-12">
        <div className="w-full max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <ProductsGridSkeleton count={8} />
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#eef0f3] overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.05] hover:shadow-xl flex flex-col h-full"
                >
                  <img
                    src={p.image_url || '/images/shop/img_img_192x280.png'}
                    alt={p[`name_${language}`] || p.name_en}
                    className="w-full h-[190px] object-cover"
                  />
                  <div className="p-5 flex flex-col h-full">
                    <h3 className="text-[16px] lg:text-[18px] font-poppins font-semibold text-[#0f172a] mb-2">
                      {p[`name_${language}`] || p.name_en}
                    </h3>
                    <p className="text-[13px] lg:text-[14px] font-poppins text-[#6b7280] leading-[20px] mb-4 line-clamp-2">
                      {p[`description_${language}`] || p.description_en}
                    </p>
                    <div className="mt-auto">
                      <span className="text-[18px] lg:text-[20px] font-poppins font-bold text-[#0f172a]">
                        {p.currency === 'USD' ? '$' : p.currency === 'EUR' ? '€' : ''}
                        {p.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 font-poppins">
              {t('noProducts') || 'No products available. Add some in the admin panel!'}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Shop;
