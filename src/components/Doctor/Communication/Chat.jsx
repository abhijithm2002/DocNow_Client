import React, { useEffect } from 'react'
import Sidebar from './Sidebar/Sidebar'
import MessageContainer from './Messages/MessageContainer'
import { useLocation } from 'react-router-dom'
import { useConversation } from '../../../socket/zustand/useConversation'

const Chat = () => {
  console.log('enterd doctor chat')
  const location = useLocation();
  const { setSelectedConversation } = useConversation();
  console.log('patientid',location.state?.data.patientId)
  useEffect(() => {
    if(location.state?.data) {
      setSelectedConversation(location.state?.data.patientId)
    }
  },[location.state, setSelectedConversation])
  return (
    <div className='flex h-[88vh] bg-gray-200'>
        <Sidebar />
        <MessageContainer bookingId={location.state.data}/>
    </div>
  )
}

export default Chat
