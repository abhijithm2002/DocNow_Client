import {createContext, useState, useEffect, useContext, useCallback } from "react";
import io from 'socket.io-client'
import { useSelector } from "react-redux";
import CONSTANTS_COMMON from "../constants/common";

const SocketContext = createContext();

export const useSocketContext = () =>{
    return useContext(SocketContext)
}
export const SocketContextProvider = ({children}) => {
    const User = useSelector((state) => state.auth.user);
    const Doctor = useSelector((state) => state.doctor.doctor);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers]= useState([]);
    const [typingUsers, setTypingUsers] = useState([])
    const [unreadMessages, setUnreadMessages] = useState({})


const userId = User?._id || Doctor?._id;

useEffect(() =>{
    if(userId) {
        const newSocket = io(CONSTANTS_COMMON.API_BASE_URL, {query: {userId}});
        setSocket(newSocket);

        newSocket.on('getOnlineUsers',(users) =>{
            setOnlineUsers(users)
        })
    
    }
},[userId])


const sendnewMessage = useCallback((to, from) => {
    if(socket) {
        socket.emit('sendnewMessage', {to, from})
    }
})

return (
    <SocketContext.Provider
        value={{
            sendnewMessage
        }}
    >
        {children}
    </SocketContext.Provider>
)

}