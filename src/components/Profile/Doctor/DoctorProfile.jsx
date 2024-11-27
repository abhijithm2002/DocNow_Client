import React, { useEffect, useState } from 'react';
import Tabs from './Tabs';
import { useSelector } from 'react-redux';
import DoctorAbout from './DoctorAbout';
import DoctorEditProfile from './DoctorEditProfile';
import UploadDocuments from './UploadDocuments';
import { FaUserCircle } from 'react-icons/fa';
import CreateSlots from '../../Doctor/CreateSlots';
import { getUploadedDocuments } from '../../../services/Doctor/doctorService';
import Appointments from './Appointments';
import WalletHistory from './WalletHistory';
import Chat from '../../Doctor/Communication/Chat';
import Loading from '../../Loader/Loading';
import toast, { Toaster } from 'react-hot-toast';
import Dashboard from '../../Doctor/Dashboard/Dashboard';
import NotificationPage from './NotificationPage';

const DoctorProfile = () => {
  const [tab, setTab] = useState('overview');
  const { doctor } = useSelector((state) => state.doctor);
  const [documentsVerified, setDocumentsVerified] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const date = new Date();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getUploadedDocuments(doctor.email);
        if (response.status === 200) {
          setDocumentsVerified(response.data.data.documents_verified);
          setisLoading(false);
        } else {
          console.error('Failed to fetch document status');
        }
      } catch (error) {
        console.error('An error occurred while fetching document status:', error);
      }
    };

    fetchDocuments();
  }, [doctor.email]);

  

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          <div className='max-w-[1170px] px-5 mx-auto'>
            <Toaster position='top-center' />
            <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
              <Tabs tab={tab} setTab={setTab} />

              <div className='lg:col-span-2'>
                {!documentsVerified && (
                  <div className='flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg'>
                    <div className='ml-3 text-sm font-medium'>
                      To get approval, please complete your profile. We'll review and approve within a day.
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
                            <FaUserCircle className='text-gray-400 w-[150px] h-[200px]' />
                          )}
                        </figure>
                        <div>
                          {doctor.expertise && (
                            <span className='bg-[#CCF0f3] text-irishBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold'>
                              {doctor.expertise}
                            </span>
                          )}
                          <h3 className='text-[22px] leading-9 font-bold text-headingColor mt-3'>Dr. {doctor.name}</h3>
                        </div>
                      </div>
                      <div className='mt-7'>
                        <DoctorAbout name={doctor.name} bio={doctor.bio} education={doctor.education} experience={doctor.experienceYears} currentWorkingHospital={doctor.currentWorkingHospital} />
                      </div>
                    </div>
                  )}

                  {tab === 'appointments' && <Appointments />}
                  {tab === 'settings' && <DoctorEditProfile />}
                  {tab === 'upload-documents' && <UploadDocuments />}
                  {tab === 'update-slot' && <CreateSlots />}
                  {tab === 'wallet-history' && <WalletHistory />}
                  {tab === 'chat' && <Chat />}
                  {tab === 'dashboard' && <Dashboard />}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default DoctorProfile;
