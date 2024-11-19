import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import MyBookings from './MyBookings';
import EditProfile from './EditProfile';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../ReduxStore/authSlice';
import UserWalletHistory from './UserWalletHistory';
import Chat from '../../User/Communication/Chat';
import { fetchMyBookings } from '../../../services/User/userService';
import toast, { Toaster } from 'react-hot-toast';

const UserProfile = () => {
  const [tab, setTab] = useState('bookings');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const date = new Date()

  useEffect(() => {
    fetchAppointments()
  }, [date])

  const fetchAppointments = async () => {
    const response = await fetchMyBookings(user._id)
    const selectedDateISO = date.toISOString().split("T")[0];
    if (response.status === 200) {
      const todayappointment = response.data.data.filter((item) => {
        const itemDateString = item.date.split("T")[0];
        return itemDateString === selectedDateISO && item.status === 'Active';
      })
      if (todayappointment.length > 0) {
        todayappointment.forEach((appointment) => {
          toast.success(`Gentle reminder that you have an appointment today at ${appointment.shift}`, { duration: 5000 });
        });
      }
    } else {
      toast.error('Something Went Wrong')
    }
  }
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleChatClick = () => {
    setTab('chat');
    navigate('/chat'); // Navigate to chat route
  };





  return (
    <div className="max-w-[1170px] mx-auto mt-4 px-4 md:px-0">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6 flex flex-col min-h-[500px]">
          <div className="text-center mb-6 flex-shrink-0">
            <figure className="w-[100px] h-[100px] mx-auto rounded-full border-2 border-gray-200 overflow-hidden">
              {user.photo ? (
                <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <FaUser className="text-gray-400 text-[100px]" />
              )}
            </figure>
            <h3 className="text-[18px] mt-4 text-headingColor font-bold">{user.name}</h3>
            <p className="text-textColor text-[15px] mt-2">{user.email}</p>
          </div>
          <nav className="flex-grow">
            <button
              onClick={() => setTab('bookings')}
              className={`w-full text-center p-3 rounded-md  ${tab === 'bookings' ? 'bg-primaryColor text-white' : 'text-headingColor bg-gray-100 font-semibold'
                } mb-2`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setTab('settings')}
              className={`w-full text-center p-3 rounded-md ${tab === 'settings' ? 'bg-primaryColor text-white' : 'text-headingColor bg-gray-100 font-semibold'
                } mb-2`}
            >
              Settings
            </button>
            <button
              onClick={() => setTab('userWalletHistory')}
              className={`w-full text-center p-3 rounded-md ${tab === 'userWalletHistory' ? 'bg-primaryColor text-white' : 'text-headingColor bg-gray-100 font-semibold'
                } mb-2`}
            >
              Wallet History
            </button>
            <button
              onClick={handleChatClick} // Navigating to chat route
              className={`w-full text-center p-3 rounded-md ${tab === 'chat' ? 'bg-primaryColor text-white' : 'text-headingColor bg-gray-100 font-semibold'
                } mb-2`}
            >
              Messages
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-center p-3 rounded-md text-white bg-red-600 mt-8"
            >
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 flex justify-center items-center">
          {tab === 'bookings' && <MyBookings />}
          {tab === 'settings' && <EditProfile />}
          {tab === 'userWalletHistory' && <UserWalletHistory />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
