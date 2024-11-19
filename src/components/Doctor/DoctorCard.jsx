import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { addFavouriteDoctor, getFavouriteDoctors } from '../../services/User/userService';
import toast from 'react-hot-toast';
import { RiStarSFill, RiStarSLine } from "react-icons/ri";

const DoctorCard = ({ doctor }) => {
    const {
        _id,
        name,
        photo,
        expertise,
        currentWorkingHospital,
        rating
    } = doctor;
    

    const [isChecked, setIsChecked] = useState(false);
    const patientId = useSelector((state) => state.auth.user._id);
    

    const checkIfFavourite = async () => {
        const favouriteDoctors = await getFavouriteDoctors(patientId);
        
        const isFavourite = favouriteDoctors.data.some((favDoctor) => favDoctor._id == _id)
        setIsChecked(isFavourite)
    }

    useEffect(() => {
        checkIfFavourite();

    }, [_id])


    const handleCheckboxChange = async () => {
        setIsChecked(!isChecked);
        try {
            await addFavouriteDoctor(patientId, _id, name, expertise);
            if (!isChecked) {
                toast.success('Doctor added to favorites');
            } else {
                toast.success('Doctor removed from favorites');
            }
        } catch (error) {
            toast.error('Failed to update favorite doctor');
        }
    };

    return (
        <div className='p-3  lg:p-5 w-full max-w-[300px]  mx-auto bg-softGray rounded transition-transform transform hover:scale-105 hover:bg-orange-50 duration-300 ease-in-out'>
            <div className='overflow-hidden rounded'>
                <img src={photo} className='w-full h-[200px] object-cover rounded transition-transform transform hover:scale-110 duration-300 ease-in-out' alt="" />
            </div>
            <div className='flex justify-between items-center'>
                <div>
                    <h2 className='text-[16px] leading-[24px] lg:text-[20px] lg:leading-7 text-darkGray font-[700] mt-3 lg:mt-4'>
                        Dr. {name}
                    </h2>
                </div>
                
                <div className='mt-4'>
                    <label className="relative block cursor-pointer select-none">
                        <input
                            type="checkbox"
                            className="absolute opacity-0 h-0 w-0 cursor-pointer peer"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className={`relative h-8 w-8 fill-gray-400 transition-transform duration-300 ease-in-out hover:scale-110 ${isChecked ? 'fill-red-500' : ''}`}
                        >
                            <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                        </svg>
                    </label>
                </div>

            </div>
            <div className="rating mt-2 flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <span key={i} className="text-2xl">
                            {i <= rating ? (
                              <RiStarSFill style={{ color: "#FFD700" }} />
                            ) : (
                              <RiStarSLine
                                style={{
                                  color: "gray",
                                  
                                }}
                              />
                            )}
                          </span>
                        ))}
                      </div>

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
