import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const DoctorCard = ({ doctor }) => {

    const {
        name,
        photo,
        expertise,
        currentWorkingHospital
    } = doctor;

    return (
        <div className='p-3 lg:p-5 w-full max-w-[250px] mx-auto bg-blue-50 rounded'>
            <div>
                <img src={photo} className='w-full h-[200px] object-cover rounded' alt="" />
            </div>
            <h2 className='text-[16px] leading-[24px] lg:text-[20px] lg:leading-7 text-headingColor font-[700] mt-3 lg:mt-4'>
                Dr. {name}
            </h2>
            <div className='mt-2 lg:mt-3 flex items-center justify-between'>
                <span className='bg-lightBlue text-purpleColor py-1 px-2 lg:py-2 lg:px-4 text-[10px] leading-4 lg:text-[14px] lg:leading-5 font-semibold rounded'>
                    {expertise}
                </span>
            </div>
            <div className='mt-4 flex items-center justify-between'>
                <div>
                    <p className='text-[12px] leading-5 font-[400] text-textColor'>
                        At {currentWorkingHospital}
                    </p>
                </div>
                <Link
                    to='/doctors'
                    className='w-[36px] h-[36px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group bg-white hover:bg-primaryColor hover:border-none'
                >
                    <BsArrowRight className='group-hover:text-white  w-4 h-4' />
                </Link>
            </div>
        </div>
    );
}

export default DoctorCard;
