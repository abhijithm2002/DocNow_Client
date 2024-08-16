import React, { useEffect, useState } from 'react';
import Tabs from './Tabs';
import { useSelector } from 'react-redux';
import DoctorAbout from './DoctorAbout';
import DoctorEditProfile from './DoctorEditProfile';
import UploadDocuments from './UploadDocuments';
import { FaUserCircle, FaUserMd } from 'react-icons/fa'; // Import a doctor icon from React Icons
import { useDispatch } from 'react-redux';
import CreateSlots from '../../Doctor/CreateSlots';
import { getUploadedDocuments } from '../../../services/Doctor/doctorService';

const DoctorProfile = () => {
  const [tab, setTab] = useState('overview');
  const { doctor } = useSelector((state) => state.doctor);
  const [documentsVerified, setDocumentsVerified] = useState(null)

  useEffect(()=> {
    const fetchDocuments = async() => {
      try {

        const response = await getUploadedDocuments(doctor.email)
        if (response.status === 200) {
          setDocumentsVerified(response.data.data.documents_verified);
        } else {
          console.error('Failed to fetch document status');
        }
      } catch (error) {
        console.error('An error occurred while fetching document status:', error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
          <Tabs tab={tab} setTab={setTab} />

          <div className='lg:col-span-2'>
          {!documentsVerified && (
              <div className='flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg'>
                <svg
                  aria-hidden='true'
                  className='flex-shrink-0 w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='sr-only'>Info</span>
                <div className='ml-3 text-sm font-medium'>
                  To get approval please complete your profile. We'll review manually and approve within a day.
                </div>
              </div>
            )}

            <div className='mt-8'>
              {tab === 'overview' && (
                <div>
                  <div className='flex items-center gap-4 mb-10'>
                    <figure className='max-w-[200px] max-h-[300px]'>
                      {doctor.photo ? (
                        <img src={doctor.photo} alt="" className='w-full' />
                      ) : (
                        <FaUserCircle className='text-gray-400 w-[150px] h-[200px]' />  // Default icon if no photo
                      )}
                    </figure>

                    <div>
                      <span className='bg-[#CCF0f3] text-irishBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold'>
                        {doctor.expertise}
                      </span>
                      <h3 className='text-[22px] leading-9 font-bold text-headingColor mt-3'>Dr. {doctor.name}</h3>
                    </div>
                  </div>
                  <div className='mt-7'>
                    <DoctorAbout name={doctor.name} bio={doctor.bio} education={doctor.education} experience={doctor.experience} currentWorkingHospital= {doctor.currentWorkingHospital} />
                  </div>
                </div>
              )}

              {tab === 'appointments' && <div>'Appointments'</div>}
              {tab === 'settings' && <DoctorEditProfile />}
              {tab === 'upload-documents' && <UploadDocuments />}
              {tab === 'update-slot' && <CreateSlots />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;
