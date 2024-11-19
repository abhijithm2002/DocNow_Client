import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../ReduxStore/doctorSlice';
import { FaCalendarAlt, FaFileUpload, FaCog, FaWallet, FaUser } from 'react-icons/fa';

const Tabs = ({ tab, setTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/doctor/login');
  };

  const handleTabClick = (selectedTab) => {
    setTab(selectedTab);
    setMenuOpen(false);
  };

  return (
    <div>
      <span className='lg:hidden' onClick={() => setMenuOpen(!menuOpen)}>
        <BiMenu className='w-6 h-6 cursor-pointer' />
      </span>

      <div
        className={`${
          menuOpen ? 'block' : 'hidden'
        } lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md`}
      >
        <button
          onClick={() => handleTabClick('overview')}
          className={`${
            tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor hover:bg-blue-100 hover:text-primaryColor'
          } w-full btn mt-0 rounded-md flex items-center space-x-2`}
        >
          <FaUser className='text-lg' />
          <span>Overview</span>
        </button>
        <button
          onClick={() => handleTabClick('dashboard')}
          className={`${
            tab === 'dashboard' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor hover:bg-blue-100 hover:text-primaryColor'
          } w-full btn mt-0 rounded-md flex items-center space-x-2`}
        >
          <FaUser className='text-lg' />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => handleTabClick('appointments')}
          className={`${
            tab === 'appointments' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor hover:bg-blue-100 hover:text-primaryColor'
          } w-full btn mt-0 rounded-md flex items-center space-x-2`}
        >
          <FaCalendarAlt className='text-lg' />
          <span>Appointments</span>
        </button>

        <button
          onClick={() => handleTabClick('upload-documents')}
          className={`${
            tab === 'upload-documents' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor hover:bg-blue-100 hover:text-primaryColor'
          } w-full btn mt-0 rounded-md flex items-center space-x-2`}
        >
          <FaFileUpload className='text-lg' />
          <span>Upload Documents</span>
        </button>

        <button
          onClick={() => handleTabClick('settings')}
          className={`${
            tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor hover:bg-blue-100 hover:text-primaryColor'
          } w-full btn mt-0 rounded-md flex items-center space-x-2`}
        >
          <FaCog className='text-lg' />
          <span>Profile Settings</span>
        </button>

        <button
          onClick={() => handleTabClick('update-slot')}
          className={`${
            tab === 'update-slot' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor hover:bg-blue-100 hover:text-primaryColor'
          } w-full btn mt-0 rounded-md flex items-center space-x-2`}
        >
          <FaCalendarAlt className='text-lg' />
          <span>Update Slots</span>
        </button>

        <button
          onClick={() => handleTabClick('wallet-history')}
          className={`${
            tab === 'wallet-history' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor hover:bg-blue-100 hover:text-primaryColor'
          } w-full btn mt-0 rounded-md flex items-center space-x-2`}
        >
          <FaWallet className='text-lg' />
          <span>Wallet</span>
        </button>
        <button
          onClick={() => handleTabClick('notifications')}
          className={`${
            tab === 'notifications' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor hover:bg-blue-100 hover:text-primaryColor'
          } w-full btn mt-0 rounded-md flex items-center space-x-2`}
        >
          <FaWallet className='text-lg' />
          <span>Notifications</span>
        </button>

        <div className='w-full mt-4'>
          <button
            onClick={handleLogout}
            className='w-full bg-red-600 hover:bg-red-400 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
