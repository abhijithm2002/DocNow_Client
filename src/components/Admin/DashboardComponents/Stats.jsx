import React, { useEffect, useState } from 'react'
import { Bookings } from '../../../services/Admin/adminService'
import LineChart from './LineChart'
import BarChart from './BarChart'
import DoctorStats from './DoctorStats'
import { Card, CardBody, CardHeader, Divider, Image, ScrollShadow } from "@nextui-org/react";
import { FaUserCircle } from 'react-icons/fa';

const Stats = () => {
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalPossibleIncome, setTotalPossibleIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState({});


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await Bookings();
        if (response.status === 200) {
          setAppointments(response.data.bookings)
          const uniquePatients = getUniquePatients(response.data.bookings);
          setPatients(uniquePatients);
          calculateTotalIncome(response.data.bookings)
          calculateMonthlyIncome(response.data.bookings)
          calculateTotalPossibleIncome(response.data.bookings)

        }

      } catch (error) {

      }
    }

    fetchAppointments();
  }, [])


  const getUniquePatients = (bookings) => {
    const patientsMap = {};
    bookings.forEach((booking) => {
      if (!patientsMap[booking.patientId.email]) {
        patientsMap[booking.patientId.email] = booking.patientId;
      }
    });
    return Object.values(patientsMap);
  }

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

  const calculateTotalPossibleIncome = (bookings) => {
    const possibleIncome = bookings.length * 500;
    setTotalPossibleIncome(possibleIncome);
  };

  const percentageOfTotalIncome =
    totalPossibleIncome !== 0
      ? ((totalIncome / totalPossibleIncome) * 100).toFixed(2)
      : 0;

  const sortedAppointments = [...appointments]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);


  return (
    <div className="container mx-auto py-6 px-6">
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card variant="flat" className="bg-blue-900 text-white shadow-lg">
          <CardHeader className="text-lg font-semibold">Appointments Trend</CardHeader>
          <CardBody>
            <LineChart appointments={appointments} />
          </CardBody>
        </Card>
        <Card variant="flat" className="bg-blue-900 text-white shadow-lg">
          <CardHeader className="text-lg font-semibold">Weekly Report</CardHeader>
          <CardBody>
            <BarChart appointments={appointments} />
          </CardBody>
        </Card>
      </div>

      {/* Doctor Stats */}
      <DoctorStats Appointments={appointments} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {/* Consulted Patients */}
      <Card variant="flat" className="bg-gray-700 text-gray-200 shadow-lg">
        <CardHeader className="text-lg font-semibold text-gray-200">Consulted Patients</CardHeader>
        <Divider />
        <ScrollShadow size={10} className="max-h-52 overflow-y-auto">
          <CardBody>
            <ul>
              {patients.map((patient) => (
                <li key={patient._id} className="flex items-center mt-2">
                  <Image
                    src={patient.photo || <FaUserCircle />}
                    alt={`${patient.name}'s profile`}
                    width={40}
                    height={40}
                    className="rounded-full mr-3 border-2 border-gray-500"
                  />
                  <span className="text-gray-300">{patient.name}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </ScrollShadow>
      </Card>

      {/* Latest Appointments */}
      <Card variant="flat" className="bg-gray-700 text-gray-200 shadow-lg w-[340px] ">
        <CardHeader className="text-lg font-semibold text-gray-200">Latest Appointments</CardHeader>
        <Divider />
        <ScrollShadow size={10} className="max-h-52 overflow-y-auto">
          <CardBody>
            <ul>
              {sortedAppointments.map((appointment) => (
                <li key={appointment._id} className="border-b border-gray-600 py-1 text-sm flex items-center">
                  <span className="mr-2 text-gray-400">
                    {new Date(appointment.date).toLocaleDateString()} -
                  </span>
                  <span className="text-gray-300">{appointment.patientId.name} with Dr.</span>
                  <span className="text-gray-300 ml-1">{appointment.doctorId.name}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </ScrollShadow>
      </Card>

      {/* Income Details */}
      <Card variant="flat" className="bg-gray-700 text-gray-200 shadow-lg flex flex-col items-center justify-center">
        <CardHeader className="text-lg font-semibold text-gray-200">Income Summary</CardHeader>
        <Divider />
        <CardBody className="text-center">
          <div className="text-gray-400 text-xl mb-4">
            {Object.entries(monthlyIncome).map(([monthYear, amount]) => (
              <div key={monthYear}>
                {monthYear}: <span className="text-gray-300">{amount} INR</span>
              </div>
            ))}
          </div>
          <Divider />
          <div className="text-green-500 text-2xl mt-4 font-semibold">{totalIncome} INR</div>
          <div className="text-gray-400 text-sm mt-2">
            Percentage of Total: <span className="text-gray-300">{percentageOfTotalIncome}%</span>
          </div>
        </CardBody>
      </Card>
    </div>



    </div>

  )
}

export default Stats
