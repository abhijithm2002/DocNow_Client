import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { verifyDoctor } from '../../services/Admin/adminService';
import { FaUserCircle } from "react-icons/fa";
import { FaExclamationCircle } from 'react-icons/fa';

export default function DoctorVerification() {
    const location = useLocation();
    const { doctorDetails } = location.state || {};
    const [zoomedImage, setZoomedImage] = useState(null);
    const [isVerified, setIsVerified] = useState(doctorDetails?.documents_verified);

    const isVerificationDisabled = !(
        doctorDetails?.currentWorkingHospital &&
        doctorDetails?.expertise &&
        doctorDetails?.mobile &&
        doctorDetails?.medicalLicenseNo &&
        doctorDetails?.experienceYears &&
        doctorDetails?.documents &&
        doctorDetails?.documents.length > 0 
    )


    if (!doctorDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md mx-auto bg-gray-800 text-gray-100 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 text-center">
                        <p className="text-yellow-400">No doctor details available</p>
                    </div>
                </div>
            </div>
        );
    }

    const handleImageClick = (imgUrl) => {
        setZoomedImage(imgUrl);
    };

    const handleCloseZoom = () => {
        setZoomedImage(null);
    };

    const handleVerification = async (doctorId) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        const result = await swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Verify doctor",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                const response = await verifyDoctor(doctorId);

                if (response.status === 200) {
                    setIsVerified(true);
                    swalWithBootstrapButtons.fire({
                        title: "Verified!",
                        text: "The documents have been verified.",
                        icon: "success"
                    });
                } else {
                    throw new Error('Verification failed');
                }
            } catch (error) {
                swalWithBootstrapButtons.fire({
                    title: "Error",
                    text: "Failed to verify the documents.",
                    icon: "error"
                });
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Verification was cancelled.",
                icon: "error"
            });
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md mx-auto bg-gray-800 text-gray-100 rounded-lg shadow-lg overflow-hidden">
                <div className="relative bg-yellow-500 py-16">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-gray-800 overflow-hidden shadow-lg">
                        {
                            doctorDetails.photo ? (
                                <img
                                    src={doctorDetails.photo}
                                    alt="User Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (

                                <FaUserCircle className="w-full h-full object-cover bg-white text-gray-500" />

                            )
                        }

                    </div>
                </div>
                <div className="p-5 font-bold">
                    Documents
                </div>
                <div className="p-6 mt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        {doctorDetails.documents && doctorDetails.documents.length > 0 ? (
                            doctorDetails.documents.map((docUrl, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={docUrl || '/placeholder.svg'}
                                        alt={`Document ${index + 1}`}
                                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-700 cursor-pointer"
                                        onClick={() => handleImageClick(docUrl)}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center col-span-full">
                                <FaExclamationCircle className="text-yellow-400 text-4xl mb-2" />
                                <p className="text-yellow-400 text-center text-2xl font-bold">No documents updated</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="name" className="font-medium text-gray-300">Working Hospital</label>
                            <p className="text-yellow-400">{doctorDetails.currentWorkingHospital}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="email" className="font-medium text-gray-300">Specialization</label>
                            <p className="text-yellow-400">{doctorDetails.expertise}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="phone" className="font-medium text-gray-300">Phone</label>
                            <p className="text-yellow-400">{doctorDetails.mobile}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="address" className="font-medium text-gray-300">Medical Licence No</label>
                            {
                                doctorDetails.medicalLicenseNo ? (
                                    <p className="text-yellow-400">{doctorDetails.medicalLicenseNo}</p>

                                ) : (
                                    <p className="text-yellow-400">Nill</p>
                                )
                            }
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="role" className="font-medium text-gray-300">Year of Experience</label>
                            {
                                doctorDetails.experienceYears ? (
                                    <p className="text-yellow-400">{doctorDetails.experienceYears}</p>

                                ) : (
                                    <p className="text-yellow-400">Nill</p>
                                )
                            }
                        </div>
                    </div>
                </div>
                {!isVerified ? (
                    <div className="bg-gray-700 py-4 px-6">
                        <button
                            onClick={() => handleVerification(doctorDetails._id)}
                            className={`w-full py-2 px-4 rounded-lg shadow text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                                isVerificationDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
                            }`}
                            disabled={isVerificationDisabled}
                        >
                            Verify User
                        </button>
                    </div>
                ) : (
                    <div className="bg-gray-700 py-4 px-6">
                        <p className="w-full py-2 px-4 bg-green-500 text-gray-800 rounded-lg shadow text-center">
                            Documents are verified
                        </p>
                    </div>
                )}

            </div>

            {/* Modal for image zoom */}
            {zoomedImage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70" onClick={handleCloseZoom}>
                    <div className="relative max-w-3xl max-h-full p-4 bg-white rounded-lg" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={handleCloseZoom}
                            className="absolute top-4 right-4 text-gray-800 text-3xl p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                            <FaTimes />
                        </button>
                        <img
                            src={zoomedImage}
                            alt="Zoomed Document"
                            className="max-w-full max-h-[80vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
