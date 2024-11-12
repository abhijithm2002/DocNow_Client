import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { Bookings } from "../../services/Admin/adminService";
import toast from "react-hot-toast";
import AdminHeader from "../../components/Admin/AdminHeader";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await Bookings();
        if (response.status === 200) {
          const sortedBookings = response.data.bookings.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setBookings(sortedBookings);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fetchBookings();
  }, []);

  const pages = Math.ceil(bookings.length / rowsPerPage);

  const paginatedItems = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return bookings.slice(start, end);
  }, [bookings, page, rowsPerPage]);

  return (
    <>
    <div>
      <AdminHeader />
    </div>
    <div className="p-6 rounded-lg bg-gray-700 shadow-lg mt-16">
      <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Booking List</h2>
      <Table
        aria-label="Bookings Table"
        isHeaderSticky
        bottomContent={
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        }
        bottomContentPlacement="outside"
        className="bg-white rounded-lg shadow-sm"
      >
        <TableHeader className="bg-gray-700  text-white">
          <TableColumn className="px-4 py-2 font-sans">Doctor Name</TableColumn>
          <TableColumn className="px-4 py-2 font-sans">Patient Name</TableColumn>
          <TableColumn className="px-4 py-2 font-sans">Patient Email</TableColumn>
          <TableColumn className="px-4 py-2 font-sans">Status</TableColumn>
          <TableColumn className="px-4 py-2 font-sans">Shift</TableColumn>
          <TableColumn className="px-4 py-2 font-sans">Date</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No bookings found"} items={paginatedItems}>
          {(item) => (
            <TableRow
              key={item._id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <TableCell className="px-4 py-2 font-sans text-gray-800">{item.doctorId.name}</TableCell>
              <TableCell className="px-4 py-2 font-sans text-gray-800">{item.patientId.name}</TableCell>
              <TableCell className="px-4 py-2 font-sans text-gray-800">{item.patientId.email}</TableCell>
              <TableCell className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    item.status === "Completed"
                      ? "bg-green-400 text-white"
                      : item.status === "Active"
                      ? "bg-blue-400 text-white"
                      : "bg-red-400 text-white"
                  }`}
                >
                  {item.status}
                </span>
              </TableCell>
              <TableCell className="px-4 py-2 font-sans text-gray-800">{item.shift}</TableCell>
              <TableCell className="px-4 py-2 font-sans text-gray-800">
                {new Date(item.date).toLocaleDateString()}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </>

  );
};

export default BookingList;
