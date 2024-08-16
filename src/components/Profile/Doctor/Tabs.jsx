import { useContext } from 'react'
import { BiMenu } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../../ReduxStore/doctorSlice'

const Tabs = ({ tab, setTab }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/doctor/login')
    }
    return (
        <div>
            <span className='lg:hidden '>
                <BiMenu className='w-6 h-6 cursor-pointer' />
            </span>
            <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
                <button
                    onClick={() => setTab('overview')}
                    className={` ${tab == 'overview'
                        ? 'bg-indigo-100 text-primaryColor'
                        : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}>
                    Overview
                </button>

                <button
                    onClick={() => setTab('appointments')}
                    className={` ${tab == 'appointments'
                        ? 'bg-indigo-100 text-primaryColor'
                        : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}>
                    Appointments
                </button>

                <button
                    onClick={() => setTab('upload-documents')}
                    className={` ${tab == 'upload-documents'
                        ? 'bg-indigo-100 text-primaryColor'
                        : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}>
                    Upload the Documents
                </button>

                <button
                    onClick={() => setTab('settings')}
                    className={` ${tab == 'settings'
                        ? 'bg-indigo-100 text-primaryColor'
                        : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}>
                    Profile Settings
                </button>

                <button
                    onClick={() => setTab('update-slot')}
                    className={` ${tab == 'update-slot'
                        ? 'bg-indigo-100 text-primaryColor'
                        : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}>
                    Update the Slots
                </button>

                <div className='mt[100px] w-full mt-4'>
                    <button onClick={handleLogout} className='w-full bg-red-600 hover:bg-red-400 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Tabs
