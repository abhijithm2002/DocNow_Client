import React, { useEffect, useState } from 'react';
import { fetchUserList, BlockAndUnblockUser } from '../../services/Admin/adminService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const itemsPerPage = 7;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersData = await fetchUserList();
            if (usersData && Array.isArray(usersData.data.data)) {
                setUsers(usersData.data.data);
            } else {
                throw new Error('Users data is not an array');
            }
        } catch (error) {
            setError(error.message);
            console.error('Error fetching users:', error);
        }
    };

    const handleToggleBlock = async (userId, currentStatus) => {
        const confirmation = await MySwal.fire({
            title: `Are you sure you want to ${currentStatus ? 'unblock' : 'block'} this user?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Yes, ${currentStatus ? 'unblock' : 'block'} it!`,
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        });

        if (confirmation.isConfirmed) {
            try {
                const response = await BlockAndUnblockUser(userId, !currentStatus);
                if (response.status === 200) {
                    setUsers(users.map(user => 
                        user._id === userId ? { ...user, is_blocked: !currentStatus } : user
                    ));
                    MySwal.fire(
                        'Success!',
                        `User has been ${currentStatus ? 'unblocked' : 'blocked'}.`,
                        'success'
                    );
                } else {
                    console.error('Error toggling block status:', response);
                }
            } catch (error) {
                console.error('Error toggling block status:', error);
                MySwal.fire(
                    'Error!',
                    `An error occurred while ${currentStatus ? 'unblocking' : 'blocking'} the user.`,
                    'error'
                );
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-gray-900 dark:bg-primaryColor-900 px-5">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block pt-2 pl-10 text-sm text-black-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for users"
                    />
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {error ? (
                        <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-red-500">
                                {error}
                            </td>
                        </tr>
                    ) : currentUsers.length > 0 ? (
                        currentUsers.map(user => (
                            <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={user.photo} alt="User" />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{user.name}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4 text-gray-900 dark:text-white">{user.email}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        {user.is_blocked ? (
                                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                        ) : (
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                        )}
                                        {user.is_blocked ? 'Blocked' : 'Active'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        className="text-black bg-yellow-300 border border-yellow-500 hover:bg-yellow-400 hover:border-yellow-500 px-4 py-2 rounded"
                                        onClick={() => handleToggleBlock(user._id, user.is_blocked)}
                                    >
                                        {user.is_blocked ? 'Unblock' : 'Block'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-gray-900 dark:text-white">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {totalPages > 1 && (
                <nav className="flex items-center justify-between p-4" aria-label="Table navigation">
                    <ul className="inline-flex items-center -space-x-px">
                        <li>
                            <button
                                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-yellow-400 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-yellow-400 dark:hover:text-black"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <li key={index}>
                                <button
                                    className={`px-3 py-2 leading-tight border ${
                                        currentPage === index + 1
                                            ? 'text-black bg-yellow-400 border-yellow-500 hover:bg-yellow-500 hover:text-black dark:border-yellow-500 dark:bg-yellow-400 dark:text-black'
                                            : 'text-gray-500 bg-white border-gray-300 hover:bg-yellow-400 hover:text-black dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-yellow-400 dark:hover:text-black'
                                    }`}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-yellow-400 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-yellow-400 dark:hover:text-black"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default UsersList;
