import React, { useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import logo from '../../assets/logo/file.png';
import { BiMenu } from 'react-icons/bi';

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

  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');
  
  return (
    <header className='header flex items-center w-full' ref={headerRef}>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <div>
            <img src={logo} alt="DocNow Logo" style={{ width: '100px', height: 'auto' }} />
          </div>

          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink to={link.path} className='text-textColor text-[16px] leading-7 font-[600] hover:text-primaryColor'>
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex items-center gap-4'>
            {isAuthenticated && user ? (
              <div className='flex items-center gap-2'>
                {user.photo && (
                  <figure className='w-[35px] h-[35px] rounded-full'>
                    <img src={user.photo} className='w-full h-full rounded-full' alt="User Avatar" />
                  </figure>
                )}
                {user.name && (
                  <Link to={`/user-profile`}>
                    <span className='text-textColor text-[16px] leading-7 font-[600]'>{user.name}</span>
                  </Link>
                )}
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
                    <span className='text-textColor text-[16px] leading-7 font-[600]'>{doctor.name}</span>
                  </Link>
                )}
              </div>
            ) : (
              <Link to='/login'>
                <button className='bg-primaryColor py-2 px-5 text-white font-[600] h-[34px] flex items-center justify-center rounded-[50px]'>
                  Login
                </button>
              </Link>
            )}
            <span className='md:hidden' onClick={toggleMenu}>
              <BiMenu className='w-6 h-6 cursor-pointer' />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
