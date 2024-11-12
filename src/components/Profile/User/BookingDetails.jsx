import React from 'react'
import { useLocation } from 'react-router-dom'

const BookingDetails = () => {
    const location = useLocation()
    const booking = location.state
    console.log("booking details data .........",booking)
  return (
    <div className="min-h-screen flex  justify-center bg-white p-6">
      <div className="bg-white shadow-panelShadow rounded-xl w-full max-w-5xl p-8 transform transition-transform duration-500 hover:shadow-2xl hover:scale-105">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Doctor Details */}
          <div className="flex-1">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <figure className="mb-4 w-32 h-32 rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:scale-110">
                <img
                  src={booking.doctorId.photo}
                  alt={`Dr. ${booking.doctorId.name}`}
                  className="w-full h-full object-cover"
                />
              </figure>
              <span className="bg-gradient-to-r from-deepBlue to-skyBlue text-white py-1 px-4 lg:px-6 text-sm lg:text-lg font-semibold rounded-full shadow-md transition-transform duration-300 hover:scale-105">
                {booking.doctorId.expertise}
              </span>
              <h3 className="text-darkGray text-2xl mt-4 font-bold">{`Dr. ${booking.doctorId.name}`}</h3>
               <h3 className="text-darkGray text-xl mt-2">{booking.doctorId.education}</h3> 
              <p className="text-mediumGray text-lg mt-2">Experience: {booking.doctorId.experienceYears} years</p> 
            </div>
          </div>

          {/* Booking Details */}
          <div className="flex-1 bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-inner animate-fadeInUp">
            <h1 className="text-3xl text-gray-800 font-semibold mb-6 text-center">Booking Details</h1>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-blue-50 p-4 rounded-md shadow-sm transition-all duration-300 hover:bg-blue-200">
                <span className="text-gray-700 font-semibold">Doctor:</span>
                <span className="text-gray-900 font-medium">{booking.doctorId.name}</span>
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm transition-all duration-300 hover:bg-gray-200">
                <span className="text-gray-700 font-semibold">Date:</span>
                <span className="text-gray-900 font-medium">{new Date(booking.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center bg-blue-50 p-4 rounded-md shadow-sm transition-all duration-300 hover:bg-blue-200">
                <span className="text-gray-700 font-semibold">Shift:</span>
                <span className="text-gray-900 font-medium">{booking.shift}</span>
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm transition-all duration-300 hover:bg-gray-200">
                <span className="text-gray-700 font-semibold">Booking Fees:</span>
                <span className="text-gray-900 font-medium">₹{booking.doctorId.bookingfees}</span>
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm transition-all duration-300 hover:bg-gray-200">
                <span className="text-gray-700 font-semibold">Payment:</span>
                <span className="text-gray-900 font-medium">{booking.payment}</span>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingDetails
