import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDoctorsList } from '../../services/User/userService'
import DoctorCard from './DoctorCard';
import FilterSidebar from './FilterSidebar';
import PaginationComponent from '../Pagination/PaginationComponent';

const DoctorsList = () => {
    const { specialization } = useParams();
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState(specialization || '');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

    const handleFilterChange = ({ specialization, minPrice, maxPrice }) => {
        setSelectedSpecialization(specialization);
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const filteredDoctors = doctors
        .filter(doctor =>
            doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.expertise.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(doctor => selectedSpecialization === '' || doctor.expertise === selectedSpecialization)
        .filter(doctor => {
            const price = doctor.fee || 0;
            return (
                (!minPrice || price >= minPrice) &&
                (!maxPrice || price <= maxPrice)
            );
        });

    const indexOfLastDoctor = currentPage * itemsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - itemsPerPage;
    const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
    const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex flex-col ">
            {/* Search Bar */}
            <div className="flex items-center justify-center flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-softGray px-5">
                <div className="flex items-center space-x-4 w-full max-w-md">
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden flex items-center px-4 py-2 bg-irishBlueColor text-white hover:bg-skyBlue rounded-full w-12 justify-center"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>

                    <div className="relative flex-grow">
                        <label htmlFor="table-search-doctors" className="sr-only">Search</label>
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
            </div>


            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-4 mt-4 px-4 md:px-8 lg:px-16">
                <div className={`md:w-1/4 w-full fixed md:relative z-20 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                    <div className="relative md:static">
                        <div className="md:block">


                            {/* Filter Options */}
                            <div className={`bg-white rounded-lg shadow-lg p-4 md:p-0 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
                                <FilterSidebar onFilterChange={handleFilterChange} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Doctor Cards */}
                <div className="flex-grow">
                    {filteredDoctors.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-4 gap-5">
                            {currentDoctors.map(doctor => (
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
                            No doctors available for the selected specialization.
                        </p>
                        <p className="text-lg md:text-xl text-gray-500 mt-2 text-center">
                            Please try another search or come back later.
                        </p>
                    </div>
                    
                    
                    )}
                </div>
            </div>

            {/* Pagination */}
            {filteredDoctors.length > 0 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
        </div>
    );
}

export default DoctorsList;
