import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import logo from '../../../assets/logo/logo2.png';
import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";

export default function PrescriptionModal({ isOpen, onClose, booking }) {
    console.log('booking in odal', booking)
    const patient = useSelector((state) => state.auth.user)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const parsePrescription = (prescriptionArray) => {
        return prescriptionArray.map(item => {
            const [name, time, count] = item.split(" - ");
            return {
                name,
                time,
                count
            };
        });
    };

    const parsedPrescriptions = booking && booking.prescription ? parsePrescription(booking.prescription) : [];

    const downloadPdf = () => {
        const doc = new jsPDF();
    
        // Centered logo at the top
        doc.addImage(logo, "PNG", 80, 10, 50, 25);
    
        // Title
        doc.setFontSize(18);
        doc.text("Prescription Details", 105, 50, { align: "center" });
    
        // Add a horizontal line
        doc.line(10, 55, 200, 55);
    
        // Patient and Consultation Information
        const patientName = patient.name || "Patient Name";
        const doctorName = booking?.doctorId?.name || "Doctor Name";
        const expertise = booking?.doctorId?.expertise || "Expertise";
        const hospital = booking?.doctorId?.currentWorkingHospital || "Current Hospital";
        const shift = booking?.shift || "Shift Time";
        const consultationDate = booking ? formatDate(booking.date) : "Consultation Date";
    
        doc.setFontSize(12);
        const consultationText = `Patient: ${patientName}\n\nThis prescription is issued by Dr. ${doctorName}, who specializes in ${expertise} at ${hospital}. The consultation took place on ${consultationDate} during the ${shift} shift.`;
        doc.text(consultationText, 10, 65, { maxWidth: 190 });
    
        // Add another horizontal line
        doc.line(10, 90, 200, 90);
    
        // Doctor & Appointment Details section
        doc.setFontSize(12);
        doc.text(`Doctor: ${doctorName}`, 10, 110);
        doc.text(`Specialization: ${expertise}`, 10, 120);
        doc.text(`Hospital: ${hospital}`, 10, 130);
        doc.text(`Date: ${consultationDate}`, 10, 140);
        doc.text(`Shift: ${shift}`, 10, 150);
    
        // Add another horizontal line
        doc.line(10, 155, 200, 155);
    
        // Prescription Table Header
        doc.setFontSize(14);
        doc.text("Prescription", 10, 165);
        doc.setFont("helvetica", "bold");
        let yPos = 175;
        doc.text("Medicine Name", 10, yPos);
        doc.text("Time", 90, yPos);
        doc.text("Count", 150, yPos);
        doc.setFont("helvetica", "normal");
    
        // Prescription Table Data with lines
        parsedPrescriptions.forEach((medicine, index) => {
            yPos += 10;
            doc.text(medicine.name, 10, yPos);
            doc.text(medicine.time, 90, yPos);
            doc.text(medicine.count, 150, yPos);
            doc.line(10, yPos + 5, 200, yPos + 5);
        });
    
        // Save the PDF
        doc.save("prescription.pdf");
    };
    return (
        <div className="flex items-center justify-center h-1">
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} scrollBehavior='inside' placement='top' className="w-full max-w-s sm:max-w-sm md:max-w-md lg:max-w-3xl">
                <ModalContent>
                    {() => (
                        <>
                            <div className="flex justify-center">
                                <img src={logo} alt="Logo" className="w-[120px] h-[60px] mb-2" />
                            </div>

                            <ModalHeader className="flex flex-col gap-1">Prescription Details</ModalHeader>
                            <ModalBody>
                                {/* Doctor and Appointment Details */}
                                <div className="mb-4 p-4 rounded-lg bg-gray-50">
                                    <p className="text-lg font-semibold text-gray-800 mb-2">Doctor Details</p>

                                    <div className="text-gray-700 mb-1 flex justify-between">
                                        <span className="font-bold text-indigo-600">Doctor:</span>
                                        <span>{booking ? booking.doctorId.name : "Loading..."}</span>
                                    </div>

                                    <div className="text-gray-700 mb-1 flex justify-between">
                                        <span className="font-bold text-indigo-600">Specialization:</span>
                                        <span>{booking ? booking.doctorId.expertise : "Loading..."}</span>
                                    </div>
                                    <div className="text-gray-700 mb-1 flex justify-between">
                                        <span className="font-bold text-indigo-600">Hospital:</span>
                                        <span>{booking ? booking.doctorId.currentWorkingHospital : "Loading..."}</span>
                                    </div>

                                    <div className="text-gray-700 mb-1 flex justify-between">
                                        <span className="font-bold text-indigo-600">Date:</span>
                                        <span>{booking ? formatDate(booking.date) : "Loading..."}</span>
                                    </div>

                                    <div className="text-gray-700 mb-1 flex justify-between">
                                        <span className="font-bold text-indigo-600">Shift:</span>
                                        <span>{booking ? booking.shift : "Loading..."}</span>
                                    </div>
                                </div>

                                {/* Prescription Table */}
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">Medicine Name</th>
                                            <th className="py-2 px-4 border-b">Time</th>
                                            <th className="py-2 px-4 border-b">Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {parsedPrescriptions.length > 0 ? (
                                            parsedPrescriptions.map((medicine, index) => (
                                                <tr key={index} className="text-center">
                                                    <td className="py-2 px-4 border-b">{medicine.name}</td>
                                                    <td className="py-2 px-4 border-b">{medicine.time}</td>
                                                    <td className="py-2 px-4 border-b">{medicine.count}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="py-2 px-4 border-b text-center">No prescription available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                {/* Download PDF Button */}
                                <div className="flex justify-end mt-4">
                                    <button onClick={downloadPdf} className="px-4 py-2 bg-blue-600 text-white rounded-md">Download PDF</button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
