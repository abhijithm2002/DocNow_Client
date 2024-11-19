import React, { useEffect, useState } from 'react'
import { fetchAppointments } from '../../../services/Doctor/doctorService'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import LineChart from './LineChart';
import { Chart } from 'react-google-charts';
import { motion } from 'framer-motion';
import { Chip } from '@nextui-org/react';
import { FaUserCircle } from 'react-icons/fa';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState({});
  const Doctor = useSelector((state) => state.doctor.doctor)
  const date = new Date();
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetchAppointments(Doctor._id)
        console.log("response from fetchappointments", response)
        if (response.status === 200) {
          const appointmentData = response.data.data;
          setAppointments(appointmentData);
          const uniquePatients = getUniquePatients(appointmentData)
          setPatients(uniquePatients);
          calculateTotalIncome(appointmentData);
          calculateMonthlyIncome(appointmentData);
        } else {
          toast.error('Error in fetching Data')
        }
      } catch (error) {
        toast.error('Error in fetching Appointments');
      }

    }
    fetchAppointment()
  }, [])


  const getUniquePatients = (bookings) => {
    const patientsMap = {};
    bookings.forEach((booking) => {
      if (!patientsMap[booking.patientId.email]) {
        patientsMap[booking.patientId.email] = booking.patientId;
      }
    });
    return Object.values(patientsMap);
  };

  const calculateTotalIncome = (bookings) => {
    const totalIncomeAmount = bookings.reduce((total, booking) => {
      if (booking.status === 'Completed') {
        return total + booking.fee;
      }
      return total;
    }, 0);
    setTotalIncome(totalIncomeAmount);
  };

  const calculateMonthlyIncome = (bookings) => {
    const monthlyIncomeMap = {};

    bookings.forEach((booking) => {
      if (booking.status === 'Completed') {
        const bookingDate = new Date(booking.date);
        const monthYear = `${bookingDate.getMonth() + 1}-${bookingDate.getFullYear()}`;

        if (!monthlyIncomeMap[monthYear]) {
          monthlyIncomeMap[monthYear] = 0;
        }

        monthlyIncomeMap[monthYear] += booking.fee;
      }
    });

    setMonthlyIncome(monthlyIncomeMap);
  };

  const completedBookingsCount = appointments.filter(appointment => appointment.status === 'Completed').length;
  const cancelledBookingsCount = appointments.filter(appointment => appointment.status === 'Canceled').length;
  const pendingBookingsCount = appointments.filter(appointment => appointment.status === 'Active').length;

  const sortedAppointments = [...appointments]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  const updatedData = [
    ['Booking Type', 'Count'],
    ['Completed', completedBookingsCount],
    ['Canceled', cancelledBookingsCount],
    ['Pending', pendingBookingsCount]
  ];

  const options = {
    title: 'Booking Statistics',
    pieHole: 0.4,
    colors: ['#4CAF50', '#F44336', '#2196F3'],
    pieSliceText: 'label',
    legend: { position: 'top', textStyle: { color: 'white' } },
    backgroundColor: 'white',
    chartArea: {
      width: '80%',
      height: '80%',
      backgroundColor: 'white',
    },
    titleTextStyle: {
      color: 'dark',
    },
  };

  return (
    <div className="container mx-auto py-6 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr,1fr] gap-9">
        <div className="bg-white p-4 border border-gray-60 rounded-lg">
          <LineChart appointments={appointments} />
        </div>

        <div className="md:justify-center justify-self-end">
          <Chart
            chartType="PieChart"
            data={updatedData}
            options={options}
            width={"100%"}
            height={"250px"}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-14 mt-8">
        <motion.div
          className="bg-white p-6 border border-gray-200 shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Chip color="primary" size='lg' variant="shadow" className='mb-4'>Consulted Patients</Chip>
          <ul
            className="text-gray-700 overflow-y-auto space-y-3"
            style={{ maxHeight: '300px' }}
          >
            {patients.map((patient) => (
              <motion.li
                key={patient._id}
                className="flex items-center p-2 rounded-lg bg-gray-50 shadow-sm hover:bg-gray-100 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {
                  patient.photo ? (
                    <img
                  src={patient.photo || '../../../assets/user.png'}
                  alt={`${patient.name}'s profile`}
                  className="w-10 h-10 rounded-full border border-gray-300 mr-3"
                />
                  ) : (
                    <FaUserCircle className='w-10 h-10 rounded-full'/>
                  )
                }
                
                <span className="text-base font-medium text-gray-900">
                  {patient.name}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <div className="bg-white p-4 border border-gray-60 rounded-lg flex flex-col items-center ">
          <Chip color="primary" size='lg' variant="shadow" className='mb-4 mt-4'>Total Income</Chip>
          <div className="text-green-400 text-2xl font-bold mt-4">{totalIncome} INR</div>
          <br />
          <h2 className="text-lg font-semibold text-gray-400">Monthly Income</h2>
          <div className="text-green-500 text-2xl mt-4">
            {Object.entries(monthlyIncome).map(([monthYear, amount]) => (
              <div key={monthYear}>
                {monthYear}: {amount} INR
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

}

export default Dashboard
