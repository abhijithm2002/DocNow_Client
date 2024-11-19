import React, { useEffect, useState } from 'react';
import { getFavouriteDoctors } from '../../services/User/userService';
import DoctorCard from '../../components/Doctor/DoctorCard';
import { useSelector } from 'react-redux';

const FavouriteDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const patientId = useSelector((state) => state.auth.user._id)

    useEffect(() => {
        const listDoctors = async () => {
            try {
                const favouriteDoctors = await getFavouriteDoctors(patientId);
                setDoctors(favouriteDoctors.data);  
                
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        listDoctors();
    }, [patientId]);  

    return (
        <div className="flex flex-col">
             <div className="flex flex-col md:flex-row gap-4 mt-4 px-4 md:px-8 lg:px-16">
            <div className="flex-grow">
                {doctors.length > 0 ? (
                    <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {doctors.map(doctor => (
                            <DoctorCard key={doctor._id} doctor={doctor} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center py-10 transform transition duration-500 hover:scale-105">
                        <svg
                            className="w-16 h-16 mb-6 text-red-500 animate-pulse"
                            fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
                        </svg>
                        <p className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
                            No Favourite Doctors
                        </p>
                        <p className="text-lg md:text-xl text-gray-500 mt-2 text-center">
                            Please add doctors to favourites from doctorlist page
                        </p>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}

export default FavouriteDoctors;
