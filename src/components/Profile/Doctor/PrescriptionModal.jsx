import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { postPrescription } from '../../../services/Doctor/doctorService';
import toast, {Toaster} from 'react-hot-toast';

const PrescriptionModal = ({ isOpen, onClose, appointment }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [currentPrescription, setCurrentPrescription] = useState({
    medicineName: '',
    time: '',
    count: 0,
  });
  const doctor = useSelector((state) => state.doctor.doctor);

  const handleAddPrescription = () => {
    if (currentPrescription.medicineName && currentPrescription.time && currentPrescription.count > 0) {
      setPrescriptions([...prescriptions, currentPrescription]);
      setCurrentPrescription({ medicineName: '', time: '', count: 0 });
    }
  };

  const handleRemovePrescription = (index) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add the last prescription if it hasn't been added yet
    if (currentPrescription.medicineName && currentPrescription.time && currentPrescription.count > 0) {
      setPrescriptions((prev) => [...prev, currentPrescription]);
    }

    // Format the updated prescriptions list
    const formattedPrescriptions = [...prescriptions, currentPrescription].map(
      (p) => `${p.medicineName} - ${p.time} - ${p.count}`
    );

    try {
      let response = await postPrescription({ id: appointment._id, prescriptions: formattedPrescriptions })
      if (response.status == 200) {
        toast.success('Prescription submitted Successfully')
        setPrescriptions([]);
      } else {
        toast.error('Submitting prescription unsuccessfull')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
    
    onClose();
    setCurrentPrescription({ medicineName: '', time: '', count: 0 });

    // Close modal and clear the prescriptions

  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <Toaster position='top-center'/>
      <div className="bg-white rounded-lg w-[90%] sm:w-[400px] md:w-full max-w-lg p-6 shadow-lg overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">New Prescriptions</h3>
          <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="mb-6 bg-blue-50 p-4 rounded-lg shadow-inner">
          <p>
            This prescription is issued by Dr.{doctor.name}, {doctor.expertise} Specialist at {doctor.currentWorkingHospital}.
          </p>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold ">Medicine</label>
              <input
                type="text"
                value={currentPrescription.medicineName}
                onChange={(e) =>
                  setCurrentPrescription({ ...currentPrescription, medicineName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold ">Time (e.g., morning, evening)</label>
              <input
                type="text"
                value={currentPrescription.time}
                onChange={(e) =>
                  setCurrentPrescription({ ...currentPrescription, time: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Count</label>
              <input
                type="number"
                value={currentPrescription.count || ''}
                onChange={(e) =>
                  setCurrentPrescription({
                    ...currentPrescription,
                    count: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleAddPrescription}
              className="w-full py-2 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Add Prescription
            </button>
            {prescriptions.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Added Prescriptions</h4>
                <table className="w-full border border-gray-200 rounded-lg text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b text-left text-gray-500">Medicine</th>
                      <th className="py-2 px-4 border-b text-center text-gray-500">Time</th>
                      <th className="py-2 px-4 border-b text-center text-gray-500">Count</th>
                      <th className="py-2 px-4 border-b text-center text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions.map((prescription, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-2 px-4 border-b text-left">{prescription.medicineName}</td>
                        <td className="py-2 px-4 border-b text-center">{prescription.time}</td>
                        <td className="py-2 px-4 border-b text-center">{prescription.count}</td>
                        <td className="py-2 px-4 border-b text-center">
                          <button
                            onClick={() => handleRemovePrescription(index)}
                            className="text-red-500 hover:text-red-600"
                          >
                            x
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
