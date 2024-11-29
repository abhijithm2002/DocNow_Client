import React, { useEffect } from 'react'
import Sidebar from './Sidebar/Sidebar'
import MessageContainer from './Messages/MessageContainer'
import { useLocation } from 'react-router-dom'
import { useConversation } from '../../../socket/zustand/useConversation'

const Chat = () => {
  
  const location = useLocation();
  const { setSelectedConversation } = useConversation();
  
  useEffect(() => {
    if (location.state?.data?.patientId) {
      setSelectedConversation(location.state.data.patientId);
    }
  }, [location.state, setSelectedConversation]);
  
  
  return (
    <div className='flex h-[88vh] bg-gray-200'>
        <Sidebar />
        <MessageContainer bookingId={location.state.data}/>
    </div>
  )
}

export default Chat


// import React, { useEffect, useState } from 'react'
// import Sidebar from './Sidebar/Sidebar'
// import MessageContainer from './Messages/MessageContainer'
// import { useLocation } from 'react-router-dom'
// import { useConversation } from '../../../socket/zustand/useConversation'
// import { Button } from '@nextui-org/react'
// import { Menu } from "lucide-react"

// const Chat = () => {
//   const location = useLocation();
//   const { setSelectedConversation } = useConversation();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
  
//   useEffect(() => {
//     if (location.state?.data?.patientId) {
//       setSelectedConversation(location.state.data.patientId);
//     }
//   }, [location.state, setSelectedConversation]);
  
//   return (
//     <div className='flex flex-col md:flex-row h-[88vh] bg-gray-200 relative'>
//       <Button 
//         variant="outline" 
//         size="icon" 
//         className="absolute top-2 left-2 md:hidden z-10"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         <Menu className="h-4 w-4" />
//       </Button>
//       <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block md:w-1/4 h-full`}>
//         <Sidebar />
//       </div>
//       <div className="flex-1 h-full">
//         <MessageContainer bookingId={location.state.data}/>
//       </div>
//     </div>
//   )
// }

// export default Chat
