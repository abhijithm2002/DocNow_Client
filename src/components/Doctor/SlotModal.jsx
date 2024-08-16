// // import React, { useState, useEffect } from "react";
// // import "react-calendar/dist/Calendar.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useSelector } from "react-redux";
// import { Tooltip } from "react-tooltip";
// // import { fetchSlots, slotUpdate } from "../../services/doctor/apiMethods";
// import Swal from 'sweetalert2';

// function CreateSlots() {
//     const getDate = new Date();
//     getDate.setDate(getDate.getDate() + 1);

//     const [selectedStartDate, setSelectedStartDate] = useState(getDate);
//     const [selectedEndDate, setSelectedEndDate] = useState(getDate);
//     const [selectedDateForView, setSelectedDateForView] = useState(getDate);
//     const [selectedSlots, setSelectedSlots] = useState([]);
//     const [doctorUpdatedSlots, setDoctorUpdatedSlots] = useState([]);
//     const [previouslySavedSlots, setPreviouslySavedSlots] = useState([]);

//     const doctor = useSelector((state) => state.doctor);
//     const slots = ["9am-10am", "11am-12pm", "2pm-3pm", "5pm-6pm", "8pm-9pm"];

//     const handleDateRangeChange = (dates) => {
//         const [start, end] = dates;
//         setSelectedStartDate(start);
//         setSelectedEndDate(end);
//         setSelectedSlots([]);
//         setDoctorUpdatedSlots([]);
//         setPreviouslySavedSlots([]);
//     };

//     const handleSingleDateChange = (date) => {
//         setSelectedDateForView(date);
//         setSelectedStartDate(date);
//         setSelectedEndDate(date);
//     };

//     const toggleSlotSelection = (slot) => {
//         setSelectedSlots((prevSlots) =>
//             prevSlots.includes(slot)
//                 ? prevSlots.filter((s) => s !== slot)
//                 : [...prevSlots, slot]
//         );
//     };

//     const clearAll = () => {
//         setSelectedSlots([]);
//     };

//     const cancelDateSlot = async () => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: "Do you want to cancel all bookings for this date?",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, cancel all!',
//             cancelButtonText: 'No, keep them'
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 const data = {
//                     startDate: selectedDateForView.toISOString(),
//                     endDate: selectedDateForView.toISOString(),
//                     slots: [],
//                     id: doctor._id,
//                 };

//                 try {
//                     // const response = await slotUpdate(data);
//                     if (response.status === 200) {
//                         Swal.fire(
//                             'Cancelled!',
//                             'Bookings for this date have been cancelled.',
//                             'success'
//                         );
//                         setDoctorUpdatedSlots([]);
//                         setPreviouslySavedSlots([]);
//                         setSelectedSlots([]);
//                     } else {
//                         Swal.fire(
//                             'Failed!',
//                             'Failed to cancel bookings.',
//                             'error'
//                         );
//                     }
//                 } catch (error) {
//                     console.error("Error updating slots:", error);
//                     Swal.fire(
//                         'Error!',
//                         'An error occurred while cancelling bookings.',
//                         'error'
//                     );
//                 }
//             }
//         });
//     };

//     const handleSubmit = async () => {
//         const allSlots = [...previouslySavedSlots, ...selectedSlots];
//         const data = {
//             startDate: selectedStartDate.toISOString(),
//             endDate: selectedEndDate.toISOString(),
//             slots: allSlots,
//             id: doctor._id,
//         };

//         try {
//             // const response = await slotUpdate(data);
//             if (response.status === 200) {
//                 Swal.fire({
//                     title: 'Slots Booked!',
//                     text: 'Your slots have been booked successfully.',
//                     icon: 'success',
//                     confirmButtonColor: '#3085d6',
//                     confirmButtonText: 'Great!'
//                 });
//                 setDoctorUpdatedSlots(allSlots);
//                 setPreviouslySavedSlots(allSlots);
//                 setSelectedSlots([]);
//             } else {
//                 Swal.fire(
//                     'Failed!',
//                     'Failed to book slots.',
//                     'error'
//                 );
//             }
//         } catch (error) {
//             console.error("Error updating slots:", error);
//             Swal.fire(
//                 'Error!',
//                 'An error occurred while booking slots.',
//                 'error'
//             );
//         }
//     };

//     const fetchAppointments = async () => {
//         const id = doctor._id;
//         try {
//             // const response = await fetchSlots({ id, date: selectedDateForView.toISOString() });
//             if (response.status === 200) {
//                 const fetchedSlots = response.data.Slots.shifts || [];
//                 setDoctorUpdatedSlots(fetchedSlots);
//                 setPreviouslySavedSlots(fetchedSlots);
//             } else {
//                 console.error("Failed to fetch appointments:", response.statusText);
//             }
//         } catch (error) {
//             console.error("Error fetching appointments:", error);
//         }
//     };

//     useEffect(() => {
//         fetchAppointments();
//     });

//     return (
//         <div className="container mx-auto p-6">
//             <div className="bg-white shadow-md rounded-lg p-6">
//                 <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Manage Slots</h1>
//                 <div className="flex mb-6">
//                     <div className="w-1/2 pr-2">
//                         <h2 className="font-semibold text-xl mb-2">Select Date Range</h2>
//                         <DatePicker
//                             selected={selectedStartDate}
//                             onChange={handleDateRangeChange}
//                             startDate={selectedStartDate}
//                             endDate={selectedEndDate}
//                             selectsRange
//                             minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
//                             maxDate={new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)}
//                             className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
//                         />
//                     </div>
//                     <div className="w-1/2 pl-2">
//                         <h2 className="font-semibold text-xl mb-2">Select Single Date</h2>
//                         <DatePicker
//                             selected={selectedDateForView}
//                             onChange={handleSingleDateChange}
//                             minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
//                             maxDate={new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)}
//                             className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
//                         />
//                     </div>
//                 </div>
//                 {doctorUpdatedSlots.length > 0 && (
//                     <div className="text-center mb-4">
//                         <button
//                             onClick={cancelDateSlot}
//                             className="px-6 py-3 bg-[#f25a5a] text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105"
//                         >
//                             Cancel All Bookings for Selected Date
//                         </button>
//                     </div>
//                 )}
//                 <div className="mb-6">
//                     <h2 className="text-xl font-semibold mb-4">Available Slots</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {slots.map((slot) => (
//                             <div
//                                 key={slot}
//                                 data-tooltip-id={slot}
//                                 data-tooltip-content={
//                                     doctorUpdatedSlots.includes(slot)
//                                         ? "This slot is locked"
//                                         : "This slot is already booked by the patient"
//                                 }
//                             >
//                                 <button
//                                     onClick={() => toggleSlotSelection(slot)}
//                                     disabled={
//                                         doctorUpdatedSlots.includes(slot)
//                                     }
//                                     className={`p-2 w-full rounded-lg border-2 transition duration-200 ease-in-out transform hover:scale-105 ${
//                                         doctorUpdatedSlots.includes(slot)
//                                             ? "bg-green-600 text-white cursor-not-allowed border-green-700"
//                                             : selectedSlots.includes(slot)
//                                             ? "bg-blue-500 text-white border-blue-700"
//                                             : "bg-white text-black border-gray-200 hover:bg-yellow-300"
//                                     }`}
//                                 >
//                                     {slot}
//                                 </button>
//                                 {doctorUpdatedSlots.includes(slot) && <Tooltip id={slot} />}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 {selectedSlots.length > 0 && (
//                     <div className="text-center mb-4">
//                         <button
//                             onClick={handleSubmit}
//                             className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200 ease-in-out transform hover:scale-105"
//                         >
//                             Book Slots for Date Range
//                         </button>
//                         <button
//                             onClick={clearAll}
//                             className="px-6 py-3 bg-[#f25a5a] text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105 ml-4"
//                         >
//                             Clear All
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default CreateSlots;


























