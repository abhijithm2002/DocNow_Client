// import {createContext, useState, useEffect, useContext, useCallback } from "react";
// import io from 'socket.io-client'
// import { useSelector } from "react-redux";
// import CONSTANTS_COMMON from "../constants/common";

// const SocketContext = createContext();

// export const useSocketContext = () =>{
//     return useContext(SocketContext)
// }
// export const SocketContextProvider = ({children}) => {
//     const User = useSelector((state) => state.auth.user);
//     const Doctor = useSelector((state) => state.doctor.doctor);
//     const [socket, setSocket] = useState(null);
//     const [onlineUsers, setOnlineUsers]= useState([]);
//     const [typingUsers, setTypingUsers] = useState([])
//     const [unreadMessages, setUnreadMessages] = useState({})


// const userId = User?._id || Doctor?._id;



// const sendnewMessage = useCallback((to, from) => {
//     if(socket) {
//         socket.emit('sendnewMessage', {to, from})
//     }
// })

// return (
//     <SocketContext.Provider
//         value={{
//             socket,
//             sendnewMessage
//         }}
//     >
//         {children}
//     </SocketContext.Provider>
// )

// }


import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import CONSTANTS_COMMON from "../constants/common";

// Create the context
const SocketContext = createContext();

// Hook to use socket context
export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const User = useSelector((state) => state.auth.user);
    const Doctor = useSelector((state) => state.doctor.doctor);

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [typingUsers, setTypingUsers] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState({});

    const userId = User?._id || Doctor?._id;

    // Initialize socket connection
    useEffect(() => {
        if (userId) {
            const newSocket = io(CONSTANTS_COMMON.API_BASE_URL, {
                withCredentials: true,
                query: { userId }, 
            });

            setSocket(newSocket);

            // Cleanup the socket connection when the component unmounts
            return () => {
                newSocket.disconnect();
            };
        }
    }, [userId]);

    // Handle incoming events like online users, typing notifications, and unread messages
    useEffect(() => {
        if (socket) {
            // Notify server that a new user has connected
            socket.emit("addUser", userId);

            // Listening for online users update
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            // Listening for typing users
            socket.on("userTyping", (typingUser) => {
                setTypingUsers((prevTypingUsers) => {
                    // Check if user is already in the typing list to avoid duplicates
                    if (!prevTypingUsers.some((user) => user._id === typingUser._id)) {
                        return [...prevTypingUsers, typingUser];
                    }
                    return prevTypingUsers;
                });
            });

            // Listening for stop typing event
            socket.on("userStopTyping", (stoppedTypingUser) => {
                setTypingUsers((prevTypingUsers) => 
                    prevTypingUsers.filter((user) => user._id !== stoppedTypingUser._id)
                );
            });

            // Listening for unread messages
            socket.on("getUnreadMessages", (messages) => {
                setUnreadMessages(messages);
            });

            // Cleanup listeners on unmount or socket change
            return () => {
                socket.off("getOnlineUsers");
                socket.off("userTyping");
                socket.off("userStopTyping");
                socket.off("getUnreadMessages");
            };
        }
    }, [socket, userId]);

    // Function to send a new message, using useCallback to memoize
    const sendnewMessage = useCallback(
        (to, from, message) => {
        
            if (socket) {
                socket.emit("sendnewMessage", { to, from, message });
            }
        },
        [socket]
    );

    // Function to mark a message as read
    const markAsRead = useCallback(
        (to, from) => {
            if (socket) {
                socket.emit("markAsRead", { from, to });
                setUnreadMessages((prevUnreadMessages) => {
                    const updatedMessages = { ...prevUnreadMessages };
                    delete updatedMessages[from];
                    return updatedMessages;
                });
            }
        },
        [socket]
    );

    // Function to start typing
    const startTyping = useCallback(() => {
        if (socket) {
            socket.emit("typing");
        }
    }, [socket]);

    // Function to stop typing
    const stopTyping = useCallback(() => {
        if (socket) {
            socket.emit("stopTyping");
        }
    }, [socket]);

    // Function to initiate a video call
    const startVideoCall = useCallback(
        (userId, personalLink) => {
            if (socket) {
                socket.emit("callingUser", { userId, personalLink });
            }
        },
        [socket]
    );

    // Function to handle call rejection
    const rejectCall = useCallback(
        (caller) => {
            if (socket) {
                socket.emit("onRejected", { caller });
            }
        },
        [socket]
    );

    return (
        <SocketContext.Provider
            value={{
                socket,
                onlineUsers,
                typingUsers,
                unreadMessages,
                sendnewMessage,
                markAsRead,
                startTyping,
                stopTyping,
                startVideoCall,
                rejectCall,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
