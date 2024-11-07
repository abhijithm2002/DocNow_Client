import React from 'react';
import Stats from '../../components/Admin/DashboardComponents/Stats';
import AdminHeader from '../../components/Admin/AdminHeader';

function Dashboard() {
  return (
    <>
      <div >
        <div className="mb-6">
          <AdminHeader />
        </div>
        {/* Add margin-top for spacing between header and stats */}
        <div className="mt-16">
          <Stats />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
