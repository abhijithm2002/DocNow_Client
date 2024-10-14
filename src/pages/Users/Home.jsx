import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import { fetchBanner } from '../../services/User/userService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
import SpecializationsSection from './SpecializationsSection';
import Loading from '../../components/Loader/Loading';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBanner = async () => {
      try {
        const response = await fetchBanner();
        setBanners(response.data.data.slice(0, 3));
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch banner data", error);
      }
    };

    getBanner();
  }, []);

  const Card = ({ icon, title, description }) => (
    <div className="bg-white rounded-xl p-6 text-center shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
      <div className="flex justify-center items-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <>
      <Header />
      <div className="font-sans bg-gray-50 min-h-screen">
       
        {loading ? (
          <div className="flex items-center justify-center w-full h-screen">
            <Loading /> 
          </div>
        ) : (
          <>
            
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Navigation, Pagination, Autoplay]}
              className="mySwiper"
            >
              {banners.map((banner, index) => (
                <SwiperSlide key={banner._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="grid lg:grid-cols-2 items-center lg:gap-y-6 bg-white shadow-sm"
                  >
                    <div className="max-lg:order-1 max-lg:text-center sm:p-12 p-6">
                      <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="text-blue-400 lg:text-5xl text-3xl font-bold leading-tight"
                      >
                        {banner.title}
                      </motion.h2>
                      <motion.h3
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="text-irishBlueColor lg:text-4xl text-2xl font-bold leading-tight"
                      >
                        {banner.title2}
                      </motion.h3>
                      <motion.h4
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="text-irishBlueColor lg:text-3xl text-xl font-bold leading-tight"
                      >
                        {banner.title3}
                      </motion.h4>
                      <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        className="text-gray-700 font-semibold mt-6 text-lg leading-relaxed"
                      >
                        {banner.description}
                      </motion.p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="flex items-center justify-center lg:h-[480px] p-4 bg-white"
                    >
                      <img
                        src={banner.imgUrl}
                        className="w-full h-full lg:w-[500px] lg:h-[300px] object-cover rounded-lg shadow-xl"
                        alt="Banner Image"
                      />
                    </motion.div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Cards Section */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-4 my-12">
              <Card
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#007bff" className="w-10 h-10 mb-4 inline-block bg-white p-2 rounded-md" viewBox="0 0 32 32">
                    <path d="M28.068 12h-.128a.934.934 0 0 1-.864-.6.924.924 0 0 1 .2-1.01l.091-.091a2.938 2.938 0 0 0 0-4.147l-1.511-1.51a2.935 2.935 0 0 0-4.146 0l-.091.091A.956.956 0 0 1 20 4.061v-.129A2.935 2.935 0 0 0 17.068 1h-2.136A2.935 2.935 0 0 0 12 3.932v.129a.956.956 0 0 1-1.614.668l-.086-.091a2.935 2.935 0 0 0-4.146 0l-1.516 1.51a2.938 2.938 0 0 0 0 4.147l.091.091a.935.935 0 0 1 .185 1.035.924.924 0 0 1-.854.579h-.128A2.935 2.935 0 0 0 1 14.932v2.136A2.935 2.935 0 0 0 3.932 20h.128a.934.934 0 0 1 .864.6.924.924 0 0 1-.2 1.01l-.091.091a2.938 2.938 0 0 0 0 4.147l1.51 1.509a2.934 2.934 0 0 0 4.147 0l.091-.091a.936.936 0 0 1 1.035-.185.922.922 0 0 1 .579.853v.129A2.935 2.935 0 0 0 14.932 31h2.136A2.935 2.935 0 0 0 20 28.068v-.129a.956.956 0 0 1 1.614-.668l.091.091a2.935 2.935 0 0 0 4.146 0l1.511-1.509a2.938 2.938 0 0 0 0-4.147l-.091-.091a.935.935 0 0 1-.185-1.035.924.924 0 0 1 .854-.58h.128A2.935 2.935 0 0 0 31 17.068v-2.136A2.935 2.935 0 0 0 28.068 12ZM29 17.068a.933.933 0 0 1-.932.932h-.128a2.956 2.956 0 0 0-2.083 5.028l.09.091a.934.934 0 0 1 0 1.319l-1.511 1.509a.932.932 0 0 1-1.318 0l-.09-.091A2.957 2.957 0 0 0 18 27.939v.129a.933.933 0 0 1-.932.932h-2.136a.933.933 0 0 1-.932-.932v-.129a2.951 2.951 0 0 0-5.028-2.082l-.091.091a.934.934 0 0 1-1.318 0l-1.51-1.509a.934.934 0 0 1 0-1.319l.091-.091A2.956 2.956 0 0 0 4.06 18h-.128a.933.933 0 0 1-.932-.932v-2.136a.933.933 0 0 1 .932-.932h.128A2.956 2.956 0 0 0 7.178 9.9l-.09-.091a.934.934 0 0 1 0-1.319l1.51-1.509a.932.932 0 0 1 1.318 0l.091.091A2.957 2.957 0 0 0 14 4.061v-.129a.933.933 0 0 1 .932-.932h2.136a.933.933 0 0 1 .932.932v.129a2.951 2.951 0 0 0 5.028 2.082l.091-.091a.934.934 0 0 1 1.318 0l1.511 1.509a.934.934 0 0 1 0 1.319l-.091.091A2.956 2.956 0 0 0 27.939 14h.128a.933.933 0 0 1 .932.932Z" />
                    <path d="M16 9.6a6.4 6.4 0 1 0 6.4 6.4A6.4 6.4 0 0 0 16 9.6Zm0 11.2A4.8 4.8 0 1 1 20.8 16 4.8 4.8 0 0 1 16 20.8Z" />
                  </svg>
                }
                title="Secure and Private"
                description="Your health data is safe with us."
              />
              {/* Add more Card components here */}
            </div>
          </>
        )}

      </div>
      <SpecializationsSection />
      <Footer />
    </>
  );
};

export default Home;
