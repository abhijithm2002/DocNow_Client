import React, { useState, useEffect } from 'react';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { createBanner } from '../../services/Admin/adminService';
import toast, { Toaster } from 'react-hot-toast';
import { fetchBanner } from '../../services/Admin/adminService';
import { blockAndUnblockBanner } from '../../services/Admin/adminService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AdminHeader from '../../components/Admin/AdminHeader';
const MySwal = withReactContent(Swal);

const BannerManagement = () => {
    const [banner, setBanner] = useState({
        title: '',
        title2: '',
        title3: '',
        description: '',
        imgUrl: '',
    });
    const [banners, setBanners] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {

        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await fetchBanner();
            if (response) {
                setBanners(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch banners:', error);
            toast.error('Failed to fetch banners');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBanner({
            ...banner,
            [name]: value,
        });
    };

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        const data = await uploadImageToCloudinary(file);

        console.log('Cloudinary Response:', data);

        if (data.url) {
            setBanner(prevBanner => ({
                ...prevBanner,
                imgUrl: data.url,
            }));
        } else {
            toast.error('Failed to upload image');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Banner data:', banner);
        try {
            const response = await createBanner(banner);
            if (response) {
                toast.success('Banner created successfully!');
                setIsModalOpen(false);
                fetchBanners();
            }
        } catch (error) {
            toast.error('Failed to create banner');
            console.error(error);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleToggleBlock = async (bannerId, currentStatus) => {
        const confirmation = await MySwal.fire({
            title: `Are you sure you want to ${currentStatus ? 'block' : 'unblock'} this Banner?`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: "#FF6347",  
            confirmButtonColor: "#32CD32", 

            confirmButtonText: `Yes, ${currentStatus ? 'block' : 'unblock'} it!`,
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        });

        if (confirmation.isConfirmed) {
            try {
                const response = await blockAndUnblockBanner(bannerId, !currentStatus);
                if (response.status === 200) {
                    setBanners(banners.map(banner =>
                        banner._id === bannerId ? { ...banner, status: !currentStatus } : banner
                    ));
                    MySwal.fire(
                        'Success!',
                        `Banner has been ${!currentStatus ? 'unblocked' : 'blocked'}.`,
                        'success'
                    );
                } else {
                    console.error('Error toggling block status:', response);
                }
            } catch (error) {
                console.error('Error toggling block status:', error);
                MySwal.fire(
                    'Error!',
                    `An error occurred while ${currentStatus ? 'blocking' : 'unblocking'} the banner.`,
                    'error'
                );
            }
        }
    };


    return (
        <>
        <div>
            <AdminHeader />
        </div>
            <div className="flex flex-col items-center mt-16">
                <Toaster position='top-center' />
                <p className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300 ">
                    Click here to create a banner
                </p>
                <button
                    onClick={toggleModal}
                    className="block font-bold w-full max-w-xs text-gray-800 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-400"
                    type="button"
                >
                    Manage Banner
                </button>
            </div>

            {/* Banner List */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {banners.map((banner, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md dark:bg-gray-800 p-4 flex flex-col justify-between transition-transform duration-300 hover:scale-105">
                        <div>
                            <img src={banner.imgUrl} alt={banner.title} className="w-full h-32 object-cover rounded-t-lg" />
                            <div className="mt-4">
                                <h5 className="text-lg text-gray-900 dark:text-white">
                                    <span className="font-bold text-yellow-500">Title:</span> {banner.title}
                                </h5>
                                <h5 className="text-lg text-gray-900 dark:text-white">
                                    <span className="font-bold text-yellow-500">Title 2:</span> {banner.title2}
                                </h5>
                                <h5 className="text-lg text-gray-900 dark:text-white">
                                    <span className="font-bold text-yellow-500">Title 3:</span> {banner.title3}
                                </h5>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    <span className="font-bold text-yellow-500">Description:</span> {banner.description}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex space-x-4">

                            <button
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleToggleBlock(banner._id, banner.status)}
                            >
                                {banner.status ? 'Block' : 'UnBlock'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>





            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-50"
                    aria-hidden="true"
                >
                    <div className="relative w-full max-w-md p-4">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Manage Banner
                                </h3>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="title"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={banner.title}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Banner title"
                                            required
                                            autoFocus
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="title2"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Title 2
                                        </label>
                                        <input
                                            type="text"
                                            name="title2"
                                            id="title2"
                                            value={banner.title2}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Banner title 2"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="title3"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Title 3
                                        </label>
                                        <input
                                            type="text"
                                            name="title3"
                                            id="title3"
                                            value={banner.title3}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Banner title 3"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="description"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={banner.description}
                                            onChange={handleInputChange}
                                            rows="4"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Banner description"
                                        ></textarea>
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="imgUrl"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Image
                                        </label>
                                        <input
                                            type="file"
                                            name="imgUrl"
                                            id="imgUrl"
                                            onChange={handleFileInputChange}
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        />
                                        {banner.imgUrl && (
                                            <img
                                                src={banner.imgUrl}
                                                alt="Banner"
                                                className="mt-2 rounded-lg max-h-64"
                                            />
                                        )}
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="text-white inline-flex items-center bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                                >
                                    <svg
                                        className="me-1 -ms-1 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    Save Banner
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BannerManagement;
