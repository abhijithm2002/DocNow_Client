import React, { useEffect, useState } from 'react';
import { fetchDoctorsList } from '../../services/Admin/adminService';
import DoctorCard from './DoctorCard';

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        const listDoctors = async () => {
            try {
                const response = await fetchDoctorsList();
                if (response.status === 200) {
                    const { doctorData } = response.data;
                    const filteredDoctors = doctorData.filter(doctor =>
                        doctor.documents_verified === true && doctor.is_blocked === false
                    );
                    setDoctors(filteredDoctors);
                } else {
                    console.error('Failed to fetch doctors list');
                }
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        listDoctors();
    }, []);

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.expertise.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastDoctor = currentPage * itemsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - itemsPerPage;
    const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
    const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="flex items-center justify-center flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-softGray px-5">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-doctors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-4 py-2 text-base text-gray-700 placeholder-gray-500 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-beige focus:border-transparent transition-shadow"
                        placeholder="Search for doctors"
                    />
                </div>
            </div>


            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 lg:gap-[20px] mt-[30px] lg:mt-[55px] px-4 md:px-8 lg:px-16'>
                {currentDoctors.map(doctor => (
                    <DoctorCard key={doctor._id} doctor={doctor} />
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <nav aria-label="Page navigation">
                    <ul className="inline-flex items-center space-x-1">
                        <li>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-deepBlue text-white hover:bg-skyBlue'}`}
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
                            <li key={number}>
                                <button
                                    onClick={() => handlePageChange(number)}
                                    className={`px-3 py-1 rounded-lg ${currentPage === number ? 'bg-deepBlue text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-deepBlue text-white hover:bg-skyBlue'}`}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default DoctorsList;
