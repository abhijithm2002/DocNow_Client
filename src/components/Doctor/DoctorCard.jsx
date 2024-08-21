import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const DoctorCard = ({ doctor }) => {
    const {
        _id,
        name,
        photo,
        expertise,
        currentWorkingHospital
    } = doctor;
    console.log('doctor id', _id)
    return (
        <div className='p-3 lg:p-5 w-full max-w-[250px] mx-auto bg-softGray rounded transition-transform transform hover:scale-105 hover:bg-orange-50 duration-300 ease-in-out'>
            <div className='overflow-hidden rounded'>
                <img src={photo} className='w-full h-[200px] object-cover rounded transition-transform transform hover:scale-110 duration-300 ease-in-out' alt="" />
            </div>
            <h2 className='text-[16px] leading-[24px] lg:text-[20px] lg:leading-7 text-darkGray font-[700] mt-3 lg:mt-4'>
                Dr. {name}
            </h2>
            <div className='mt-2 lg:mt-3 flex items-center justify-between'>
                <span className='bg-irishBlueColor text-white py-1 px-2 lg:py-2 lg:px-4 text-[10px] leading-4 lg:text-[14px] lg:leading-5 font-semibold rounded transition-colors duration-300 ease-in-out hover:bg-primaryColor'>
                    {expertise}
                </span>
            </div>
            <div className='mt-4 flex items-center justify-between'>
                <div>
                    <p className='text-[12px] leading-5 font-[400] text-mediumGray'>
                        At {currentWorkingHospital}
                    </p>
                </div>
                <Link
                    to={`/doctor-details/${_id}`}
                    className='w-[36px] h-[36px] rounded-full border border-solid border-deepBlue flex items-center justify-center group bg-softGray hover:bg-skyBlue hover:border-none transition-colors duration-300 ease-in-out'
                >
                    <BsArrowRight className='group-hover:text-white w-4 h-4 transition-transform transform group-hover:rotate-360 duration-300 ease-in-out' />
                </Link>
            </div>
        </div>
    );
    
    
}

export default DoctorCard;
