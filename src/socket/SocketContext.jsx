import { createContext, useState, useEffect, useContext, useCallback } from "react";
import toast from "react-hot-toast";
import { BiPhoneCall, BiPhoneOff } from "react-icons/bi";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import CONSTANTS_COMMON from "../constants/common";
import CallReject from "../components/User/CallReject";


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
    const [newBooking, setNewBooking] = useState(null);

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

    useEffect(() => {
        if (socket) {
            socket.emit("addUser", userId);

            
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            
            socket.on("typing", (typingUser) => {
                console.log('Received typing event', typingUser);
                setTypingUsers((prevTypingUsers) => {
                    // Add the user to the typing list if they are not already there
                    if (!prevTypingUsers.some((user) => user.userId === typingUser.userId)) {
                        return [...prevTypingUsers, typingUser];
                    }
                    return prevTypingUsers;
                });
            });

            
            socket.on("stopTyping", (stoppedTypingUser) => {
                console.log('Received stop typing event', stoppedTypingUser);
                setTypingUsers((prevTypingUsers) =>
                    prevTypingUsers.filter((user) => user.userId !== stoppedTypingUser.userId)
                );
            });

            
            socket.on("getUnreadMessages", (messages) => {
                setUnreadMessages(messages);
            });

            socket.on("incomingCall", ({ Caller, personalLink }) => {
                console.log('entered incoming call and ', Caller, personalLink)
                console.log(Caller.name);
                
                toast(
                  (t) => (
                    <div className="p-4 bg-white rounded-lg shadow-md">
                      <BiPhoneCall className="h-8 w-8 text-green-500" />
                      <p className="mb-2 text-lg font-semibold text-gray-800">
                        Incoming Call from {Caller.name}
                      </p>
                      <div className="flex justify-between">
                        <button className="px-4 py-2 mr-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700">
                          <a href={personalLink}>Join Now</a>
                        </button>
                        <CallReject t={t.id} Caller={Caller} />
                      </div>
                    </div>
                  ),
                  { duration: 20000 }
                );
              });

              socket.on("callRejected", () => {
                toast(
                    (t) => (
                        <div className="p-4 bg-red-50 rounded-lg shadow-md flex items-center space-x-3 max-w-sm mx-auto">
                            <BiPhoneOff className="h-6 w-6 text-red-500" />
                            <p className="text-md font-semibold text-gray-700">
                                Call Declined
                            </p>
                        </div>
                    ),
                    { duration: 4000 }
                );
            });
            socket.on("newBooking", (data) => {
                console.log('coming to new booking notification', data)
                setNewBooking({
                    message: data.message,
                    bookingDetails: data.bookingDetails, 
                });
            });
            
    
            
           
            return () => {
                socket.off("getOnlineUsers");
                socket.off("typing");
                socket.off("stopTyping");
                socket.off("getUnreadMessages");
                socket.off("newBooking");

            };
        }
    }, [socket, userId]);

    
    const sendnewMessage = useCallback(
        (to, from, message) => {

            if (socket) {
                socket.emit("sendnewMessage", { to, from, message });
            }
        },
        [socket]
    );

    
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

    
    const startTyping = useCallback(({ conversationId }) => {
        console.log("Emitted start typing");
        if (socket) {
            socket.emit("typing", {
                userId,
                conversationId
            });
        }
    }, [socket, userId]);


    const stopTyping = useCallback(({ conversationId }) => {
        console.log("Emitted stop typing");
        if (socket) {
            socket.emit("stopTyping", {
                userId,
                conversationId
            });
        }
    }, [socket, userId]);



    const startVideoCall = useCallback(
        (Caller, userId, personalLink) => {
            if (socket) {
                socket.emit("callingUser", {Caller, userId, personalLink });
            }
        },
        [socket]
    );


    const onCallRejected = useCallback(
        (Caller) => {
          if (socket) {
            socket.emit("onRejected", { Caller });
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
                onCallRejected,
                newBooking
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
