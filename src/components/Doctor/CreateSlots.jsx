import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, eachDayOfInterval } from 'date-fns';
import { motion } from 'framer-motion';
import toast,{Toaster} from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { fetchSlots, updateSlots } from '../../services/Doctor/doctorService';

const CreateSlots = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState(30);
  const [breakTime, setBreakTime] = useState(10);
  const [selectedDateForView, setSelectedDateForView] = useState(null);
  const [fetchedShifts, setFetchedShifts] = useState([]);

  const { doctor } = useSelector((state) => state.doctor);

  const handleCreateSlots = async () => {
    if (!startDate || !endDate || !startTime || !endTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    const slotsData = eachDayOfInterval({
      start: startDate,
      end: endDate,
    }).map((day) => ({
      doctorId: doctor._id,
      day,
      startTime,
      endTime,
      duration,
      breakTime,
     
    }));

    try {
      const response = await updateSlots(slotsData);
      if (response.status === 201) {
        toast.success('Slots created successfully');
        fetchAndDisplaySlots();
      } else {
        toast.error('Failed to create slots');
      }
    } catch (error) {
      console.error('Error creating slots:', error);
      toast.error('Error creating slots');
    }
  };

  const fetchAndDisplaySlots = async () => {
    if (!selectedDateForView) return;

    const formattedDate = selectedDateForView.toISOString().split('T')[0];
    console.log('Doctor ID:', doctor._id);
    console.log('Selected Date:', formattedDate);

    try {
      const fetchedSlotsResponse = await fetchSlots(doctor._id, formattedDate);
      const fetchedSlots = fetchedSlotsResponse.data.slots; 

      if (fetchedSlots && fetchedSlots.length > 0) {
        setFetchedShifts(fetchedSlots[0].shifts || []);
        console.log('Fetched Shifts:', fetchedSlots[0].shifts);
      } else {
        setFetchedShifts([]);
        console.log('No shifts found for this date.');
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      toast.error('Error fetching slots');
    }
  };

  useEffect(() => {
    console.log('Selected Date for View:', selectedDateForView);
    console.log('Fetched Shifts:', fetchedShifts);
    fetchAndDisplaySlots();
  }, [selectedDateForView]);

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto my-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Toaster position='top-center'/>
      <motion.h2
        className="text-3xl font-extrabold text-blue-600 mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        Create and View Slots
      </motion.h2>

      {/* Slot Creation Form */}
      <motion.div className="mb-4">
        <label className="block text-blue-600 font-semibold mb-2">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
        />
      </motion.div>

      <motion.div className="mb-4">
        <label className="block text-blue-600 font-semibold mb-2">End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
        />
      </motion.div>

      <motion.div className="mb-4">
        <label className="block text-blue-600 font-semibold mb-2">Start Time</label>
        <DatePicker
          selected={startTime}
          onChange={(date) => setStartTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
        />
      </motion.div>

      <motion.div className="mb-4">
        <label className="block text-blue-600 font-semibold mb-2">End Time</label>
        <DatePicker
          selected={endTime}
          onChange={(date) => setEndTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
        />
      </motion.div>

      <motion.div className="mb-4">
        <label className="block text-blue-600 font-semibold mb-2">Duration (minutes)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
        />
      </motion.div>

      <motion.div className="mb-4">
        <label className="block text-blue-600 font-semibold mb-2">Break Time (minutes)</label>
        <input
          type="number"
          value={breakTime}
          onChange={(e) => setBreakTime(parseInt(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
        />
      </motion.div>

     

      <motion.button
        onClick={handleCreateSlots}
        className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
      >
        Create Slots
      </motion.button>

      {/* Slot Viewing */}
      <motion.div className="mt-8">
        <label className="block text-blue-600 font-semibold mb-2">View Slots for Date</label>
        <DatePicker
          selected={selectedDateForView}
          onChange={(date) => setSelectedDateForView(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
        />
      </motion.div>

      {fetchedShifts.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Available Shifts:</h3>
          <ul className="grid grid-cols-2 gap-4">
            {fetchedShifts.map((shift, idx) => (
              <li
                key={idx}
                className="bg-gradient-to-r from-green-400 to-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {shift}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        selectedDateForView && (
          <p className="text-gray-500 mt-4">No shifts available for this date.</p>
        )
      )}

    </motion.div>
  );
};

export default CreateSlots;
