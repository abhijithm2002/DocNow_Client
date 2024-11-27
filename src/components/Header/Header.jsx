import React, { useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BiMenu } from 'react-icons/bi';
import logo from '../../assets/logo/logo2.png';
import { Tooltip } from '@nextui-org/react';
import { IoIosNotifications } from "react-icons/io";
import { Badge } from '@nextui-org/react';
import { useNotifications } from '../../socket/hooks/useNotifications';
import { FaFacebookMessenger } from "react-icons/fa";

const navLinks = [
  { path: '/', display: 'Home' },
  { path: '/doctors', display: 'Doctors' },
  { path: '/services', display: 'Services' },
  { path: '/contact', display: 'Contact' },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { doctor, isDoctorAuthenticated } = useSelector((state) => state.doctor);
  const { unreadCount } = useNotifications(doctor?._id || user?._id);

  const handleStickyHeader = () => {
    const scrollHandler = () => {
      if (headerRef.current) {
        if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
          headerRef.current.classList.add('sticky__header');
        } else {
          headerRef.current.classList.remove('sticky__header');
        }
      }
    };

    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  };

  useEffect(() => {
    handleStickyHeader();
  }, []);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('show__menu');
    }
  };

  return (
    <header ref={headerRef}>
      <nav className="bg-beige border-taupe px-4 lg:px-6 py-6">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="DocNow Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800">
              DocNow
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {isAuthenticated && user ? (
              <div className='flex items-center gap-2'>
                {user.photo && (
                  <figure className='w-[35px] h-[35px] rounded-full'>
                    <img src={user.photo} className='w-full h-full rounded-full' alt="User Avatar" />
                  </figure>
                )}
                {user.name && (
                  <Link to={`/user-profile`}>
                    <span className='text-gray-800 text-[16px] leading-7 font-[600]'>{user.name}</span>
                  </Link>
                )}
                <Link to={'/favourite-doctors'}>
                  <Tooltip content="Favourite Doctors" rounded color='primary' offset={7}>
                    <div className='pr-2 pl-2'>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="relative h-8 w-8 fill-red-500 transition-transform duration-300 ease-in-out hover:scale-110"
                      >
                        <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                      </svg>
                    </div>
                  </Tooltip>
                </Link>
                <Link to={`/notifications`} className="flex items-center pr-6">
                  <Badge content={unreadCount} shape="circle" color="danger" size='sm'>
                    <IoIosNotifications size={30} color='gray' />
                  </Badge>
                </Link>
                <Link to={`/chat`} className='flex items-center pr-6'>
                  <Badge content={0} shape="circle" color="danger" size='sm' >
                    <FaFacebookMessenger size={25} color='gray' />
                  </Badge>

                </Link>

              </div>
            ) : isDoctorAuthenticated && doctor ? (
              <div className='flex items-center gap-2'>
                {doctor.photo && (
                  <figure className='w-[35px] h-[35px] rounded-full'>
                    <img src={doctor.photo} className='w-full h-full rounded-full' alt="Doctor Avatar" />
                  </figure>
                )}
                {doctor.name && (
                  <Link to={`/doctor/profile`}>
                    <span className='text-gray-800 text-[16px] leading-7 font-[600] pr-5'>{doctor.name}</span>
                  </Link>
                )}
                <Link to={`/doctor/notifications`} className="flex items-center pr-6">
                  <Badge content={unreadCount} shape="circle" color="danger" >
                    <IoIosNotifications size={30} color='black' />
                  </Badge>
                </Link>
              </div>
            ) : (
              <Link to='/login'>
                <button className='bg-taupe py-2 px-5 text-white font-[600] h-[34px] flex items-center justify-center rounded-[50px]'>
                  Login
                </button>
              </Link>
            )}
            <span className='lg:hidden absolute right-2' onClick={toggleMenu}>
              <BiMenu className='w-6 h-6 cursor-pointer text-soft-gray' />
            </span>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            ref={menuRef}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 text-gray-700 hover:bg-beige lg:hover:bg-transparent lg:p-0 ${isActive ? 'underline decoration-black ' : ''}`
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
