import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '../../api/axiosInstance';
import Swal from 'sweetalert2';
import { confirmBooking } from '../../services/User/userService';
import { useSelector } from 'react-redux';

const Payment = () => {
  const location = useLocation();
  const { selectedShift, selectedDate, doctorId, doctor } = location.state || {};
  console.log('payment doctor details', doctor);
  const navigate = useNavigate()

  const userId = useSelector((state) => state.auth.user._id);
  console.log('userid', userId)
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    const amount = doctor.bookingfees;
    const currency = 'INR';

    try {
      // Step 1: Create an order on the backend
      const orderResponse = await Api.post('api/patient/create-payment', { amount, currency });
      const { order } = orderResponse.data;

      // Step 2: Open Razorpay checkout
      const options = {
        key: 'rzp_test_FZSCAodZWexg9U',
        amount: amount * 100,
        currency,
        name: 'DocNow',
        description: 'Booking Confirmation',
        order_id: order.id,
        handler: async function (response) {
          console.log('Razorpay response:', response);

          // Step 3: Verify payment on the backend
          const verifyResponse = await Api.post('api/patient/verify-payment', {
            response,
            order,
          });

          if (verifyResponse.data.status === 'success') {
            Swal.fire({
              icon: 'success',
              title: 'Payment Successful',
              text: 'Your booking has been confirmed.',
              confirmButtonText: 'OK'
            }).then(() => {
              
              // window.location.href = '/confirmation'; 
              handleBooking()
              navigate('/user-profile')
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Payment Failed',
              text: 'Something went wrong. Please try again.',
              confirmButtonText: 'OK'
            });
          }
        },
        prefill: {
          name: 'Abhijith M',
          email: 'abhijithm050@gmail.com',
          contact: '9539524752',
        },
        notes: {
          address: 'vyttila , kochi',
        },
        theme: {
          color: '#0067FF',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during payment:', error);
      Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: 'Unable to process the payment. Please try again later.',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleBooking = async () => {
    try {
      const data = {
        doctorId,
        userId,
        selectedShift,
        selectedDate,
        fee: doctor.bookingfees
      };
  
      const response = await confirmBooking(data);
  
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Booking Confirmed',
          text: 'Your booking has been successfully confirmed.',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/user-profile')
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: 'Something went wrong. Please try again.',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error during booking:', error);
      Swal.fire({
        icon: 'error',
        title: 'Booking Error',
        text: 'Unable to confirm the booking. Please try again later.',
        confirmButtonText: 'OK',
      });
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="bg-white shadow-panelShadow rounded-xl w-full max-w-5xl p-8 transform transition-transform duration-500 hover:shadow-2xl hover:scale-105">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Doctor Details */}
          <div className="flex-1">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <figure className="mb-4 w-32 h-32 rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:scale-110">
                <img
                  src={doctor.photo}
                  alt={`Dr. ${doctor.name}`}
                  className="w-full h-full object-cover"
                />
              </figure>
              <span className="bg-gradient-to-r from-deepBlue to-skyBlue text-white py-1 px-4 lg:px-6 text-sm lg:text-lg font-semibold rounded-full shadow-md transition-transform duration-300 hover:scale-105">
                {doctor.expertise}
              </span>
              <h3 className="text-darkGray text-2xl mt-4 font-bold">{`Dr. ${doctor.name}`}</h3>
              <h3 className="text-darkGray text-xl mt-2">{doctor.education}</h3>
              <p className="text-mediumGray text-lg mt-2">Experience: {doctor.experienceYears} years</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="flex-1 bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-inner animate-fadeInUp">
            <h1 className="text-3xl text-gray-800 font-semibold mb-6 text-center">Booking Details</h1>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-blue-50 p-4 rounded-md shadow-sm transition-all duration-300 hover:bg-blue-200">
                <span className="text-gray-700 font-semibold">Doctor:</span>
                <span className="text-gray-900 font-medium">{doctor.name}</span>
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm transition-all duration-300 hover:bg-gray-200">
                <span className="text-gray-700 font-semibold">Date:</span>
                <span className="text-gray-900 font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center bg-blue-50 p-4 rounded-md shadow-sm transition-all duration-300 hover:bg-blue-200">
                <span className="text-gray-700 font-semibold">Shift:</span>
                <span className="text-gray-900 font-medium">{selectedShift}</span>
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm transition-all duration-300 hover:bg-gray-200">
                <span className="text-gray-700 font-semibold">Booking Fees:</span>
                <span className="text-gray-900 font-medium">₹{doctor.bookingfees}</span>
              </div>
            </div>
            <button
              onClick={handlePayment}
              className="w-full mt-6 py-3 bg-gradient-to-r from-primaryColor to-purpleColor text-white font-bold rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
