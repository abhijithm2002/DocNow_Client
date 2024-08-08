import { Navigate, Outlet } from 'react-router-dom'
import AdminLeftSidebar from './Admin/AdminLeftSidebar'

const AdminPrivateRoutes = () => {
    return (
        <>
            <AdminLeftSidebar />
            <div className='custom-size:px-28 md:pt-6 pt-10 pb-5 bg-gray-200 h-fit min-h-screen md:ml-64 md:pr-8'>
            <div className="md:ml-36">

                <Outlet />
                </div>
            </div>
        </>
    )
}

export default AdminPrivateRoutes
