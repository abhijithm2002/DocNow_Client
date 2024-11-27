import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchMyBookings, cancelBooking } from "../../../services/User/userService";
import PaginationComponent from "../../Pagination/PaginationComponent";
import PrescriptionModal from "./PrescriptionModal";
import RatingModal from "./RatingModal";
import { Button } from '@nextui-org/react'
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const patientId = useSelector((state) => state.auth.user._id);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPrescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedBookingForRating, setSelectedBookingForRating] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const itemsPerPage = 7;

  const IndexOfLastBooking = currentPage * itemsPerPage;
  const IndexOfFirstBooking = IndexOfLastBooking - itemsPerPage;
  const currentBookings = bookings.slice(IndexOfFirstBooking, IndexOfLastBooking);
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMyBookings(patientId);
        setBookings(response.data.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchData();
    }
  }, [patientId]);

  const handleCancelBooking = async (bookingId) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    });

    if (confirmResult.isConfirmed) {
      try {
        await cancelBooking(bookingId);
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId ? { ...booking, status: "Canceled" } : booking
          )
        );
        Swal.fire("Canceled!", "Your booking has been canceled.", "success");
      } catch (error) {
        console.error("Error canceling booking:", error);
        Swal.fire("Error", "There was an error canceling your booking. Please try again later.", "error");
      }
    }
  };

  const handleOpenPrescriptionModal = (booking) => {
    setSelectedBooking(booking);
    setPrescriptionModalOpen(true);
  };

  const handleClosePrescriptionModal = () => {
    setPrescriptionModalOpen(false);
  };

  const handleOpenRatingModal = (booking) => {
    setSelectedBookingForRating(booking);
  };

  const handleCloseRatingModal = () => {
    setSelectedBookingForRating(null);
  };

  const handleViewClick = (booking) => {
    navigate(`/booking-details` , {state: booking});
  };
  

  const statusStyles = {
    Pending: "text-white bg-yellow-500 p-1 rounded transition-colors duration-300",
    Confirmed: "text-white bg-blue-500 p-1 rounded transition-colors duration-300",
    Completed: "text-green-600 bg-green-200 p-1 rounded transition-colors duration-300",
    Canceled: "text-red-600 bg-red-200 p-1 rounded transition-colors duration-300",
  };

  return (
    <>
      <div className="relative w-full min-h-screen overflow-x-auto bg-white p-4">
        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700 table-auto lg:table-fixed">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
              <tr>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Name</th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Specialization</th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Amount</th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Date</th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Shift</th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Status / Actions</th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Rating</th>
                <th scope="col" className="px-4 py-3 md:px-6 md:py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.length > 0 ? (
                currentBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="bg-white border-b text-gray-500 transition-colors duration-300 ease-in-out hover:bg-gray-200 hover:shadow-md"
                  >
                    <td className="px-4 py-2 md:px-6 md:py-4 font-semibold">{booking.doctorId.name}</td>
                    <td className="px-4 py-2 md:px-6 md:py-4 font-semibold">{booking.doctorId.expertise}</td>
                    <td className="px-4 py-2 md:px-6 md:py-4 font-semibold">{booking.fee}</td>
                    <td className="px-4 py-2 md:px-6 md:py-4 font-semibold">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 md:px-6 md:py-4 font-semibold">{booking.shift}</td>
                    <td className="px-4 py-2 md:px-6 md:py-4 font-semibold">
                      {booking.status === "Canceled" ? (
                        <span className={statusStyles[booking.status]}>{booking.status}</span>
                      ) : booking.status === "Completed" ? (
                        <button
                          className="text-white bg-green-500 p-1 rounded transition-colors duration-300 hover:bg-green-700"
                          onClick={() => handleOpenPrescriptionModal(booking)}
                        >
                          Prescription
                        </button>
                      ) : (
                        <button
                          className="text-white bg-red-500 p-1 rounded transition-colors duration-300 hover:bg-red-700"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-2 md:px-6 md:py-4 font-semibold">
                      {booking.status === "Completed" && (
                        <Button color='primary' variant='bordered' size="sm" onClick={() => handleOpenRatingModal(booking)}>
                          Review
                        </Button>
                      )}
                    </td>
                    <td className="px-4 py-2 md:px-6 md:py-4 font-semibold">
                      <Button
                        color="warning"
                        size="sm"
                        variant="bordered"
                        onClick={() => handleViewClick(booking)}
                      >
                        View
                      </Button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center px-4 py-2 md:px-6 md:py-4">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block lg:hidden space-y-4">
          {currentBookings.length > 0 ? (
            currentBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 mb-5 transform transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-bold text-gray-800 text-lg">{booking.doctorId.name}</h2>
                  <span className="text-sm text-gray-600">
                    {new Date(booking.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Specialization:</strong> {booking.doctorId.expertise}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Amount:</strong> {booking.fee}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Shift:</strong> {booking.shift}
                </p>
                <div className="flex justify-between items-center space-x-4">
                  <span className={`text-xs font-bold py-1 px-2 rounded ${statusStyles[booking.status]}`}>
                    {booking.status}
                  </span>
                  {booking.status === "Completed" ? (
                    <Button
                      color="success"
                      variant='bordered'
                      size="sm"
                      onClick={() => handleOpenPrescriptionModal(booking)}
                    >
                      Prescription
                    </Button>
                  ) : booking.status !== "Canceled" && (
                    <Button
                      color="danger"
                      variant="bordered"
                      size="sm"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
                <div className="mt-3 flex justify-between">
                  {booking.status === "Completed" && (
                    <Button
                      color="primary"
                      variant="bordered"
                      size="sm"
                      onClick={() => handleOpenRatingModal(booking)}
                    >
                      Review
                    </Button>
                  )}
                  <Button
                    color="warning"
                    size="sm"
                    variant="bordered"
                    onClick={() => handleViewClick(booking)}
                  >
                    View
                  </Button>

                </div>


              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No bookings found.</p>
          )}
        </div>

        <PrescriptionModal
          isOpen={isPrescriptionModalOpen}
          onClose={handleClosePrescriptionModal}
          booking={selectedBooking}
        />
        <RatingModal
          booking={selectedBookingForRating}
          onClose={handleCloseRatingModal}
          isOpen={!!selectedBookingForRating}
        />

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export default MyBookings;




