import React, { useState } from 'react';
import { fetchSlots } from '../../services/User/userService';
import { useParams } from 'react-router-dom';
import { Button } from "flowbite-react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';

const BookingPage = ({ bookingfees }) => {
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const { doctorId } = useParams();
  const [fetchedShifts, setFetchedShifts] = useState([]);
  const [selectedDateForView, setSelectedDateForView] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');

  const fetchAndDisplaySlots = async (date) => {
    setIsModalOpen(true);

    if (!date) return;

    const formattedDate = date.toISOString().split('T')[0];
    const dayOfWeek = format(date, 'EEEE');
    setSelectedDay(dayOfWeek);

    try {
      const fetchedSlotsResponse = await fetchSlots(doctorId, formattedDate);
      const fetchedSlots = fetchedSlotsResponse.data.slots;

      if (fetchedSlots && fetchedSlots.length > 0) {
        setFetchedShifts(fetchedSlots[0].shifts || []);
      } else {
        setFetchedShifts([]);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      toast.error('Error fetching slots');
    }
  };

  const handleDateChange = (date) => {
    setSelectedDateForView(date);
    fetchAndDisplaySlots(date);
  };

  return (
    <>
      <div className='p-5 lg:p-10 rounded-lg bg-white'>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-lg lg:text-xl font-semibold text-gray-700'>Consultation fees</p>
          <span className='text-[18px] leading-7 lg:text-[24px] lg:leading-8 text-irishBlueColor font-bold'>
            ₹{bookingfees}
          </span>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className='w-full py-3 lg:py-2 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-md hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-[16px] lg:text-[18px]'>
          Click here to book 
        </Button>
      </div>

      {/* Main Modal */}
      {modalIsOpen && (
        <div id="default-modal" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50">
          <div className="relative w-full max-w-2xl p-4 md:p-5 max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-white-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-black">
                <h3 className="text-xl font-semibold text-black dark:text-black">
                  Select a Date to View Available Slots
                </h3>
                <button onClick={() => setIsModalOpen(false)} type="button" className="text-white-400 bg-transparent hover:bg-white-200 hover:text-white-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-white-600 dark:hover:text-white">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4 overflow-y-auto max-h-96">
                <DatePicker 
                  selected={selectedDateForView} 
                  onChange={handleDateChange} 
                  className="w-full p-2 border rounded-md"
                  placeholderText="Select a date"
                />
                {selectedDay && (
                  <p className="text-lg font-semibold text-blue-600 mt-2">
                    {selectedDay}
                  </p>
                )}
                {fetchedShifts.length > 0 ? (
                  <ul>
                    {fetchedShifts.map((shift, index) => (
                      <li key={index} className="p-2 border rounded-md mb-2 bg-green-100 text-green-800">
                        {shift} - Available
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base leading-relaxed text-black-500 dark:text-black-400">
                    No slots available for this date.
                  </p>
                )}
              </div>
              {/* Modal footer */}
              <div className="flex items-center p-4 md:p-5 border-t border-white-200 rounded-b dark:border-white-600">
                <button onClick={() => setIsModalOpen(false)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Book the Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-right" />
    </>
  );
};

export default BookingPage;
