import React, { useState } from 'react';
import { fetchSlots, fetchBookings } from '../../services/User/userService';
import { useParams, Link } from 'react-router-dom';
import { Button } from "flowbite-react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';

const BookingPage = ({ doctor }) => {
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const { doctorId } = useParams();
  const [fetchedShifts, setFetchedShifts] = useState([]);
  const [bookedShifts, setBookedShifts] = useState([]);
  const [canceledShifts, setCanceledShifts] = useState([]);
  const [selectedDateForView, setSelectedDateForView] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedShift, setSelectedShift] = useState(null);

  const fetchAndDisplaySlotsAndBookings = async (date) => {
    if (!date) return;

    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().split('T')[0];
    const dayOfWeek = format(date, 'EEEE');
    setSelectedDay(dayOfWeek);

    try {
      const fetchedSlotsResponse = await fetchSlots(doctorId, formattedDate);
      const fetchedSlots = fetchedSlotsResponse.data.slots;

      const fetchedBookingsResponse = await fetchBookings(doctorId, formattedDate);
      const fetchedBookedSlots = fetchedBookingsResponse.data.bookedSlots;

      const booked = fetchedBookedSlots
        .filter(booking => booking.status === 'Active')
        .map(booking => booking.shift);

      const canceled = fetchedBookedSlots
        .filter(booking => booking.status === 'Canceled')
        .map(booking => booking.shift);

      setBookedShifts(booked);
      setCanceledShifts(canceled);

      if (fetchedSlots && fetchedSlots.length > 0) {
        setFetchedShifts(fetchedSlots[0].shifts || []);
      } else {
        setFetchedShifts([]);
      }
    } catch (error) {
      console.error('Error fetching slots or bookings:', error);
      toast.error('Error fetching slots or bookings');
    }
  };

  const handleDateChange = (date) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    setSelectedDateForView(localDate);
    fetchAndDisplaySlotsAndBookings(localDate);
  };

  const handleShiftSelection = (shift) => {
    if (bookedShifts.includes(shift)) return;
    setSelectedShift(shift);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    if (selectedDateForView) {
      fetchAndDisplaySlotsAndBookings(selectedDateForView);
    }
  };

  return (
    <>
      <div className='p-5 lg:p-10 rounded-lg bg-white shadow-md'>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-lg lg:text-xl font-semibold text-gray-700'>Consultation fees</p>
          <span className='text-[18px] leading-7 lg:text-[24px] lg:leading-8 text-irishBlueColor font-bold'>
            ₹{doctor.bookingfees}
          </span>
        </div>
        <Button onClick={handleOpenModal} className='w-full py-3 lg:py-2 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-md hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-[16px] lg:text-[18px] transition duration-300 ease-in-out'>
          Click here to book
        </Button>
      </div>

      {modalIsOpen && (
        <div id="default-modal" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50">
          <div className="relative w-full max-w-2xl p-4 md:p-5 max-h-full">
            <div className="relative bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-black">
                  Select a Date to View Available Slots
                </h3>
                <button onClick={() => setIsModalOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4 overflow-y-auto max-h-96">
                <DatePicker
                  selected={selectedDateForView}
                  onChange={handleDateChange}
                  className="w-full p-2 border rounded-md"
                  placeholderText="Select a date"
                  minDate={new Date()}
                />
                {selectedDay && (
                  <p className="text-lg font-semibold text-blue-600 mt-2">
                    {selectedDay}
                  </p>
                )}
                {fetchedShifts.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
                    {fetchedShifts.map((shift, index) => (
                      <li
                        key={index}
                        onClick={() => handleShiftSelection(shift)}
                        className={`p-3 border rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer ${
                          bookedShifts.includes(shift)
                            ? 'bg-red-500 text-white cursor-not-allowed'
                            : selectedShift === shift
                            ? 'bg-blue-500 text-white' 
                            : canceledShifts.includes(shift)
                            ? 'bg-gray-400 text-white'
                            : 'bg-green-500 text-white'
                        }`}
                      >
                        {shift} - {bookedShifts.includes(shift) ? 'Not Available' : 'Available'}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base leading-relaxed text-gray-500">
                    No slots available for this date.
                  </p>
                )}
              </div>

              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                {selectedShift && selectedDateForView && !bookedShifts.includes(selectedShift) ? (
                  <Link
                    to="/payment"
                    state={{
                      selectedShift,
                      selectedDate: selectedDateForView.toISOString().split('T')[0],
                      doctorId,
                      doctor
                    }}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out"
                  >
                    Book the Slot
                  </Link>
                ) : (
                  <button disabled className="text-white bg-gray-400 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Select a Shift and Date
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default BookingPage;
