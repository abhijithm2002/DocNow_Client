import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, eachDayOfInterval } from 'date-fns';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { fetchSlots, updateSlots, deleteSlots } from '../../services/Doctor/doctorService';

const CreateSlots = () => {
  console.log('enteredd slot create')
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [duration, setDuration] = useState(30);
  const [breakTime, setBreakTime] = useState(10);
  const [selectedDateForView, setSelectedDateForView] = useState(null);
  const [fetchedShifts, setFetchedShifts] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [slotId, setSlotId] = useState(null);

  const { doctor } = useSelector((state) => state.doctor);

  const handleCreateSlots = async () => {
    if (!startDate || !endDate || !startTime || !endTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Combine startDate and startTime into a single DateTime for comparison
    const combinedStartDateTime = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      startTime.getHours(),
      startTime.getMinutes()
    );

    const currentDateTime = new Date();

    // Validate that the start slot date and time are in the future
    if (combinedStartDateTime <= currentDateTime) {
      toast.error('Start date and time must be in the future');
      return;
    }

    // Create dates in local time to avoid shifting to the previous day in UTC
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    // Normalize startTime and endTime to maintain the correct time relative to local date
    const normalizedStartTime = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
      startTime.getHours(),
      startTime.getMinutes()
    );

    const normalizedEndTime = new Date(
      end.getFullYear(),
      end.getMonth(),
      end.getDate(),
      endTime.getHours(),
      endTime.getMinutes()
    );

    // Adjust to keep the day in local time without shifting to previous day in UTC
    const slotsData = eachDayOfInterval({
      start,
      end,
    }).map((day) => ({
      doctorId: doctor._id,
      day: new Date(day.setHours(12, 0, 0, 0)).toISOString(), // Ensure day is centered on noon to avoid UTC shifts
      startTime: normalizedStartTime.toISOString(),
      endTime: normalizedEndTime.toISOString(),
      duration,
      breakTime,
    }));

    

    console.log('slots data///////////', slotsData)
    try {
      const response = await updateSlots(slotsData);
      if (response.status === 201) {
        toast.success('Slots created successfully');
        fetchAndDisplaySlots();
        setStartDate(null);
        setEndDate(null);
        setStartTime(null);
        setEndTime(null);
        setDuration(30);
        setBreakTime(10);
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

    // Convert selectedDateForView to local date string
    const localDate = new Date(selectedDateForView.getTime() - selectedDateForView.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().split('T')[0];

    try {
      const response = await fetchSlots(doctor._id, formattedDate);
      

      const fetchedSlots = response.data.slots;

      if (fetchedSlots && fetchedSlots.length > 0) {
        setSlotId(fetchedSlots[0]._id);
        setFetchedShifts(fetchedSlots[0].shifts || []);
        setSelectedShifts([]);
      } else {
        setSlotId(null);
        setFetchedShifts([]);
        setSelectedShifts([]);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      toast.error('Error fetching slots');
    }
  };



  const handleSelectShift = (shift) => {
    setSelectedShifts((prev) =>
      prev.includes(shift)
        ? prev.filter((item) => item !== shift)
        : [...prev, shift]
    );
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedShifts([]);
    } else {
      setSelectedShifts(fetchedShifts);
    }
    setAllSelected(!allSelected);
  };

  const handleDeleteSlots = async () => {
    if (selectedShifts.length === 0) {
      toast.error('No shifts selected');
      return;
    }

    try {
      const response = await deleteSlots(slotId, selectedShifts);

      if (response.status === 200) {
        toast.success('Selected shifts deleted successfully');
        fetchAndDisplaySlots();
        setSelectedShifts([]);
        setAllSelected(false);
      } else {
        toast.error('Failed to delete selected shifts');
      }
    } catch (error) {
      console.error('Error deleting shifts:', error);
      toast.error('Error deleting shifts');
    }
  };

  useEffect(() => {
    fetchAndDisplaySlots();
  }, [selectedDateForView]);

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto my-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Toaster position='top-center' />
      <motion.h2
        className="text-3xl font-extrabold text-blue-600 mb-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        Create and View Slots
      </motion.h2>

      {/* Slot Creation Form */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-blue-600 font-semibold mb-2">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        <div>
          <label className="block text-blue-600 font-semibold mb-2">Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block text-blue-600 font-semibold mb-2">Break Time (minutes)</label>
          <input
            type="number"
            value={breakTime}
            onChange={(e) => setBreakTime(parseInt(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>
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

      {fetchedShifts.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAll}
              className="mr-2"
            />
            <label className="text-blue-600 font-semibold">Select All</label>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fetchedShifts.map((shift, idx) => (
              <li
                key={idx}
                onClick={() => handleSelectShift(shift)}
                className={`cursor-pointer py-2 px-4 rounded-lg shadow-md transition-shadow duration-300 ${selectedShifts.includes(shift) ? 'bg-red-400 text-white' : 'bg-gradient-to-r from-green-400 to-blue-400 text-white'}`}
              >
                {shift}
              </li>
            ))}
          </ul>

          {selectedShifts.length > 0 && (
            <motion.button
              onClick={handleDeleteSlots}
              className="mt-4 w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            >
              Delete Selected Slots
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default CreateSlots;
