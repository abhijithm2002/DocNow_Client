import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingPage from './BookingPage';
import { fetchDoctorDetails } from '../../services/User/userService';
import HashLoader from 'react-spinners/HashLoader';
import toast, {Toaster} from 'react-hot-toast';
const DoctorDetails = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDoctorDetails = async (doctorId) => {
      try {
        const response = await fetchDoctorDetails(doctorId);
        if (response.status === 200) {
          setDoctor(response.data.data);
        } else {
          console.error('Failed to fetch doctor details');
        }
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      } finally {
        setLoading(false); 
      }
    };

    getDoctorDetails(doctorId);
  }, [doctorId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <HashLoader color='lightBlue' />
      </div>
    );
  }

  if(!doctor) {
    toast.error('no doctor found')
  }
  return (
    <section className='py-8'>
      <Toaster  position='top-center'/>
      <div className='max-w-[1170px] px-5 mx-auto'>
        <div className="grid gap-[30px] md:gap-[50px] md:grid-cols-3">
          {/* Left column containing the photo and BookingPage on large screens */}
          <div className='md:col-span-2'>
            <div className='flex flex-col items-center md:flex-row md:items-start gap-5 mb-20 md:mb-10'>
              <figure className='w-full max-w-[150px] max-h-[150px]'>
                <img src={doctor.photo} alt="Doctor" className='w-full h-full object-cover ' />
              </figure>

              <div className='text-center md:text-left'>
                <span className='inline-block bg-[#CCF0F3] mt-12 text-irishBlueColor py-1 px-4 lg:px-6 text-[12px] lg:text-[16px] font-semibold rounded'>
                  {doctor.expertise}
                </span>
                <h3 className='text-headingColor text-[20px] md:text-[22px] mt-3 font-bold'>
                  Dr. {doctor.name}
                </h3>
              </div>
            </div>

            {/* BookingPage moved underneath photo section on small and medium screens */}
            <div className='block md:hidden mt-[10px] md:mt-[10px] w-[90%] mx-auto'>
              <BookingPage bookingfees = {doctor.bookingfees}/>
            </div>

            <div className='mt-5 md:mt-[50px] border-b border-solid border-[#0066ff34]'>
              <button className='py-2 px-4 md:px-5 mr-4 md:mr-5 text-[14px] md:text-[16px] font-semibold text-headingColor'>
                About
              </button>

              <button className='py-2 px-4 md:px-5 mr-4 md:mr-5 text-[14px] md:text-[16px] font-semibold text-headingColor'>
                Feedback
              </button>
            </div>


            <div>
              <h3 className='mt-5 text-[18px] md:text-[20px] font-semibold flex items-center gap-2'>
                About
                <span className='text-irishBlueColor font-bold text-[20px] md:text-[24px]'>
                  Dr. {doctor.name}
                </span>
              </h3>

              <p className='text-[14px] md:text-[16px] mt-2'>
                {doctor.bio}
              </p>
            </div>

            <div className='mt-10 md:mt-12'>
              <h3 className='text-[18px] md:text-[20px] font-semibold'>
                Education
              </h3>

              <ul className='pt-4'>
                <li className='flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-5 mb-[20px] md:mb-[30px]'>
                  <div>
                    <p className='text-[14px] md:text-[16px] font-bold'>
                      {doctor.education}
                    </p>
                  </div>

                  <p className='text-[14px] md:text-[16px] font-bold'>
                    {doctor.currentWorkingHospital}
                  </p>
                </li>
              </ul>
            </div>

            <div className='mt-10 md:mt-12'>
              <h3 className='text-[18px] md:text-[20px] font-semibold'>
                Experience
              </h3>

              <ul className='grid sm:grid-cols-2 gap-4 md:gap-[30px] pt-4'>
                <li className='p-4 rounded bg-[#fff9ea]'>
                  <p className='text-[14px] md:text-[15px] font-medium'>
                    {doctor.experienceYears} years
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Right column containing BookingPage on large screens */}
          <div className='hidden md:block'>
            <BookingPage bookingfees={doctor.bookingfees}/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorDetails;