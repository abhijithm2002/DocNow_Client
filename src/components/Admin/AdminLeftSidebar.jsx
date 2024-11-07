import { useState } from 'react';
import { LiaUserFriendsSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserDoctor } from "react-icons/fa6";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { BsCalendar2Date } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../ReduxStore/adminSlice';
import AdminHeader from './AdminHeader';

const AdminLeftSidebar = () => {
   const [isExpanded, setIsExpanded] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();

   const toggleSidebar = () => {
      setIsExpanded(!isExpanded);
   };

   const handleLogout = () => {
      dispatch(adminLogout());
      navigate('/admin/login');
   };

   // Function to determine if a tab is active
   const isActive = (path) => location.pathname === path;

   return (
      <>
      {/* <AdminHeader className='mb-5' /> */}
      <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 h-screen bg-gray-50 dark:bg-gray-900 transition-transform ${isExpanded ? 'w-64' : 'w-20'} sm:w-64`} aria-label="Sidebar">
         <div className="h-full px-3 py-4 overflow-y-auto">
            <div className="flex items-center justify-between sm:hidden">
               <button onClick={toggleSidebar} className="text-gray-900 dark:text-white">
                  {isExpanded ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
               </button>
            </div>
            <ul className="space-y-5 font-medium mt-5">
               <li className='m-7'>
                  <Link to='/admin/dashboard' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-900  group">
                     <span className={`ms-3 font-bold text-2xl ${!isExpanded && 'hidden'} sm:block`}>DocNow</span>
                  </Link>
               </li>
               <li>
                  <Link to="/admin/dashboard" className={`flex items-center p-2 rounded-lg group ${isActive('/admin/dashboard') ? 'bg-yellow-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-yellow-500'}`}>
                     <svg className="flex-shrink-0 w-7 h-7 transition duration-75" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                     </svg>
                     <span className={`flex-1 ms-3 whitespace-nowrap ${!isExpanded && 'hidden'} sm:block`}>Dashboard</span>
                  </Link>
               </li>
               <li>
                  <Link to="/admin/users-list" className={`flex items-center p-2 rounded-lg group ${isActive('/admin/users-list') ? 'bg-yellow-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-yellow-500'}`}>
                     <LiaUserFriendsSolid className="w-7 h-7" />
                     <span className={`flex-1 ms-3 whitespace-nowrap ${!isExpanded && 'hidden'} sm:block`}>Users List</span>
                  </Link>
               </li>
               <li>
                  <Link to="/admin/doctors-list" className={`flex items-center p-2 rounded-lg group ${isActive('/admin/doctors-list') ? 'bg-yellow-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-yellow-500'}`}>
                     <FaUserDoctor className="w-7 h-7" />
                     <span className={`flex-1 ms-3 whitespace-nowrap ${!isExpanded && 'hidden'} sm:block`}>Doctors List</span>
                  </Link>
               </li>
               <li>
                  <Link to="/admin/bookingList" className={`flex items-center p-2 rounded-lg group ${isActive('/admin/bookingList') ? 'bg-yellow-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-yellow-500'}`}>
                     <BsCalendar2Date className="w-7 h-7" />
                     <span className={`flex-1 ms-3 whitespace-nowrap ${!isExpanded && 'hidden'} sm:block`}>Booking List</span>
                  </Link>
               </li>
               <li>
                  <Link to="/admin/banner" className={`flex items-center p-2 rounded-lg group ${isActive('/admin/banner') ? 'bg-yellow-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-yellow-500'}`}>
                     <svg className="flex-shrink-0 w-7 h-7 text-gray-500 transition duration-75" aria-hidden="true" fill="currentColor" viewBox="0 0 18 20">
                        <path d="M15 0H3a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3ZM5 2h8a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Zm4 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5-4H4V8h10v6Z" />
                     </svg>
                     <span className={`flex-1 ms-3 whitespace-nowrap ${!isExpanded && 'hidden'} sm:block`}>Banner Management</span>
                  </Link>
               </li>
               <li>
                  <a onClick={handleLogout} className="flex cursor-pointer items-center p-2 rounded-lg group text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                     <CiLogout className="w-7 h-7 text-red-600" />
                     <span className={`flex-1 ms-3 whitespace-nowrap ${!isExpanded && 'hidden'} sm:block`}>Logout</span>
                  </a>
               </li>
            </ul>
         </div>
      </aside>
      </>

   );
};

export default AdminLeftSidebar;
