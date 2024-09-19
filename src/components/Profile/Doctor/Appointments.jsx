import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchAppointments } from '../../../services/Doctor/doctorService';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]); 
  const doctorId = useSelector((state) => state.doctor.doctor?._id);
  console.log("doctorId", doctorId);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await fetchAppointments(doctorId);
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
    Upcoming: 'text-white bg-blue-500 p-1 rounded transition-colors duration-300',
    Completed: 'text-green-600 bg-green-200 p-1 rounded transition-colors duration-300'
  };

  return (
    <div className="relative overflow-x-auto font-sans">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="text-xs uppercase bg-gray-100 text-gray-600">
          <tr>
            <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Patient Name</th>
            <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Date</th>
            <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Time</th>
            <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Status</th>
            <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Fee</th>
          </tr>
        </thead>
        <tbody>
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr
                key={appointment._id}
                className="bg-white border-b text-gray-500 transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:shadow-md"
              >
                <td className="px-4 py-2 md:px-6 md:py-4 font-semibold">{appointment.patientId.name}</td>
                <td className="px-4 py-2 md:px-6 md:py-4 font-semibold">{new Date(appointment.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 md:px-6 md:py-4 font-semibold">{appointment.shift}</td>
                <td className="px-4 py-2 md:px-6 md:py-4 font-semibold">
                  <span className={statusStyles[appointment.status]}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-4 py-2 md:px-6 md:py-4 font-semibold">{appointment.fee}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center px-4 py-2 md:px-6 md:py-4">
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
