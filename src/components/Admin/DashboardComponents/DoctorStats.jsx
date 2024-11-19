import React, { useEffect, useState } from 'react';
import { fetchDoctors } from '../../../services/Admin/adminService'
import toast from 'react-hot-toast';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';
import { Image, Divider } from "@nextui-org/react";
import { motion, AnimatePresence } from 'framer-motion';

const DoctorStats = ({ Appointments }) => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchDoctor = async () => {
            const response = await fetchDoctors();
            if (response.status === 200) {
                setDoctors(response.data.doctorData);
            } else {
                toast.error('Failed to fetch doctor list');
            }
        };
        setBookings(Appointments);
        fetchDoctor();
    }, [Appointments]);

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setShowDetails(true); // Trigger animation on selection
    };

    const getCompletedBookingsPerMonth = (bookings, doctorId) => {
        const completedBookings = bookings.filter(
            (booking) =>
                booking.status === "Completed" && booking.doctorId._id === doctorId
        );

        const bookingsPerMonth = {};
        completedBookings.forEach((booking) => {
            const month = moment(booking.date).utcOffset("+05:30").format("MMMM YYYY");
            if (!bookingsPerMonth[month]) {
                bookingsPerMonth[month] = 0;
            }
            bookingsPerMonth[month] += 1;
        });

        return bookingsPerMonth;
    };

    const completedBookingsPerMonth = selectedDoctor
        ? getCompletedBookingsPerMonth(bookings, selectedDoctor._id)
        : {};

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Doctors List Section */}
            <div className="bg-primary-600 rounded-lg p-4 shadow-lg">
                <h2 className="text-lg font-semibold text-white mb-4">Doctors List</h2>
                <ul className="space-y-3">
                    {doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <li
                                key={doctor._id}
                                className={`flex items-center p-3 rounded-lg cursor-pointer transition ${selectedDoctor?._id === doctor._id
                                        ? "bg-yellow-300 text-primary-700 "
                                        : "bg-gray-50 text-gray-700"
                                    }`}
                                onClick={() => handleDoctorSelect(doctor)}
                            >
                                {doctor.photo ? (
                                    <Image
                                        src={doctor.photo}
                                        alt={`${doctor.name}'s profile`}
                                        className="w-8 h-8 rounded-full mr-3"
                                        objectFit="cover"
                                    />
                                ) : (
                                    <FaUserCircle className="text-gray-500 w-8 h-8 mr-3" />
                                )}
                                <span className="text-sm font-bold">
                                    Dr. {doctor.name}
                                </span>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">No doctors available.</li>
                    )}
                </ul>
            </div>

            {/* Doctor Bookings Per Month Section */}
            <div className="bg-primary-600 rounded-lg p-4 shadow-lg">
                <h2 className="text-lg font-semibold text-white mb-4">
                    Doctor Completed Bookings Per Month
                </h2>
                {selectedDoctor ? (
                    <AnimatePresence>
                        {showDetails && (
                            <motion.div
                                key={selectedDoctor._id}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.1 }}
                                className="p-4 bg-gray-100 rounded-lg"
                            >
                                <h3 className="text-md font-semibold text-gray-700 mb-4">
                                    Dr. {selectedDoctor.name} - Monthly Booking Stats
                                </h3>
                                <Divider className="mb-4" />
                                <ul className="space-y-2">
                                    {Object.keys(completedBookingsPerMonth).length > 0 ? (
                                        Object.entries(completedBookingsPerMonth).map(
                                            ([month, count]) => (
                                                <li
                                                    key={month}
                                                    className="p-3 border rounded bg-primary-50 text-primary-700 font-medium transition-transform transform hover:scale-105"
                                                >
                                                    {month}: {count} bookings
                                                </li>
                                            )
                                        )
                                    ) : (
                                        <li className="p-3 border rounded bg-gray-200 text-gray-500">
                                            No completed bookings.
                                        </li>
                                    )}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                ) : (
                    <p className="text-gray-300 mt-4">
                        Please select a doctor to view their completed bookings.
                    </p>
                )}
            </div>
        </div>
    );
}

export default DoctorStats;
