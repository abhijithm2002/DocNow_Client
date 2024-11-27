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
import { fetchAdmin } from '../../services/User/userService';

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState([])
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

          </>
        )}

      </div>
      <SpecializationsSection />
      <Footer />
    </>
  );
};

export default Home;
