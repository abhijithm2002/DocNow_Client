import React from 'react';

const AdminHeader = () => {
   return (
      <header className="fixed top-0 left-0 right-0 z-50 dark:bg-gray-900 text-white flex justify-between items-center p-4 shadow-md">
         <div className='flex gap-5'>
         <h1 className="text-2xl px-5 justify-center text-yellow-500 font-bold">DocNow</h1>
         <h1 className='text-3xl justify-center items-center font-sans text-white'>ADMIN DASHBOARD</h1>
         </div>

      </header>
   );
};

export default AdminHeader;

