import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchAppointments } from '../../../services/Doctor/doctorService';
import PaginationComponent from '../../Pagination/PaginationComponent';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarX } from 'lucide-react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const doctorId = useSelector((state) => state.doctor.doctor?._id);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const indexOfLastAppointment = currentPage * itemsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - itemsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await fetchAppointments(doctorId);
        console.log('fetched appointments', response)
        const fetchedAppointments = response.data.data;
        const upcomingAppointments = fetchedAppointments.map(appointment => ({
          ...appointment,
          status: appointment.status === 'Completed' ? 'Completed' : 'Upcoming'
        }));
        setAppointments(upcomingAppointments);
      } catch (error) {
        console.log('Error fetching appointments', error);
      }
    };

    if (doctorId) {
      getAppointments();
    }
  }, [doctorId]);

  const statusStyles = {
    Upcoming: 'text-white font-normal text-xs px-2 bg-blue-400 p-1 rounded-full transition-colors duration-300',
    Completed: 'text-green-600 bg-green-200 p-1 rounded transition-colors duration-300'
  };

  return (
    <>
      {currentAppointments && currentAppointments.length > 0 ? (
        <div className="relative overflow-x-auto font-sans px-2 sm:px-4 md:px-6 lg:px-8">
          <table className="min-w-full text-xs sm:text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
              <tr>
                <th scope="col" className="px-2 py-2 md:px-4 md:py-3">Patient Name</th>
                <th scope="col" className="px-2 py-2 md:px-4 md:py-3">Date</th>
                <th scope="col" className="px-2 py-2 md:px-4 md:py-3">Time</th>
                <th scope="col" className="px-2 py-2 md:px-4 md:py-3">Status</th>
                <th scope="col" className="px-2 py-2 md:px-4 md:py-3">Fee</th>
                <th scope="col" className="px-2 py-2 md:px-4 md:py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="bg-white border-b text-gray-500 transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:shadow-md"
                >
                  <td className="px-2 py-2 md:px-4 md:py-4 font-semibold">{appointment.patientId.name}</td>
                  <td className="px-2 py-2 md:px-4 md:py-4 font-semibold">{new Date(appointment.date).toLocaleDateString()}</td>
                  <td className="px-2 py-2 md:px-4 md:py-4 font-semibold">{appointment.shift}</td>
                  <td className="px-2 py-2 md:px-4 md:py-4 font-semibold">
                    <span className={statusStyles[appointment.status]}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-4 font-semibold">{appointment.fee}</td>
                  <td className="px-2 py-2 md:px-4 md:py-4 font-semibold">
                    <Link
                      to={{
                        pathname: "/doctor/chat",
                      }}
                      state={{data :appointment}}
                      className="text-white bg-green-400 p-1 rounded transition-colors duration-300 "
                    >
                      Intake
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {appointments.length > 0 && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-white px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <CalendarX className="w-12 sm:w-16 h-12 sm:h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-2 font-sans">No appointments found</h2>
            <p className="text-gray-500 font-sans">It looks like your schedule is clear for now.</p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Appointments;
