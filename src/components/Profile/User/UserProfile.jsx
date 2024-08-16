import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import MyBookings from './MyBookings';
import EditProfile from './EditProfile';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../ReduxStore/authSlice';

const UserProfile = () => {
  const [tab, setTab] = useState('bookings');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className='max-w-[1170px] px-5 mx-auto mt-4'>
      <div className='grid md:grid-cols-3 gap-10'>
        <div className='pb-[50px] px-[30px] rounded-md'>
          <div className='flex items-center justify-center'>
            <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
              {user.photo ? (
                <img src={user.photo} alt="Profile" className='w-full h-full rounded-full' />
              ) : (
                <FaUser className='text-headingColor text-[100px]' />
              )}
            </figure>
          </div>
          <div className='text-center mt-4'>
            <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>{user.name}</h3>
            <p className='text-textColor text-[15px] leading-6 font-medium'>{user.email}</p>
          </div>
          <div className='mt-[50px] md:mt[100px]'>
            <button onClick={handleLogout} className='w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white'>
              Logout
            </button>
          </div>
        </div>
        <div className='md:col-span-2 md:px-[30px]'>
          <div>
            <button 
              onClick={() => setTab('bookings')} 
              className={` ${tab === 'bookings' && 'bg-primaryColor text-white font-normal'} 
                p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
            >
              My Bookings
            </button>
            <button 
              onClick={() => setTab('settings')} 
              className={` ${tab === 'settings' && 'bg-primaryColor text-white font-normal'} 
                py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
            >
              Settings
            </button>
          </div>
          {tab === 'bookings' && <MyBookings />}
          {tab === 'settings' && <EditProfile />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
