import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { FaVideo } from "react-icons/fa";
import { useSelector } from "react-redux";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useSocketContext } from "../../../../socket/SocketContext";
import { useConversation } from "../../../../socket/zustand/useConversation";
import TypingAnimation from "../../../Animation/TypingAnimation";
import { updateBooking } from "../../../../services/Doctor/doctorService";
import toast, {Toaster} from 'react-hot-toast'
import Swal from "sweetalert2";

function MessageContainer({bookingId}) {
  
  
  const navigate = useNavigate();
  const { selectedConversation, setSelectedConversation } = useConversation(); 
  const {onlineUsers, typingUsers, startTyping, stopTyping} = useSocketContext();
  

  const handleConsultationCompleted = async () => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "Once completed, this action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, mark it as completed!",
      });

      if (confirmed.isConfirmed) {
        const response = await updateBooking(bookingId._id)
        if (response.status === 200) {
          toast.success("Consultation marked as completed successfully");
          navigate("/doctor/profile?tab=appointments");
        } else {
          toast.error("Failed to mark consultation as completed");
        }
      }
    } catch (error) {
      console.error("Error marking consultation as completed:", error);
      toast.error("Failed to mark consultation as completed");
    }
  };

  useEffect(() => {
    return () => setSelectedConversation(null); 
  }, [setSelectedConversation]);
  const isOnline = onlineUsers.includes(selectedConversation?._id);

  return (
    <div className="flex-1 flex flex-col">
      <Toaster position="top-center"/>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-blue-300 text-white">
            <div className="flex items-center">
              <img
                src={selectedConversation.photo || "/assets/user.png"}
                alt="User"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{selectedConversation?.name}</h3>
                <span className="text-sm text-white-300">
                  {
                    typingUsers.some(
                      (user) => user?.userId === selectedConversation._id
                    ) ? <TypingAnimation /> : isOnline ? "Online" : "Offline"
                  }
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm text-gray-300">Consulting over?</p>
                <button onClick={handleConsultationCompleted} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200 ease-in-out transform hover:scale-105">
                  Completed
                </button>
              </div>
              <Link
                to={"/doctor/video-call"}
                state={{data: selectedConversation?._id}}
                className="px-4 py-2 bg-blue-500 mt-5 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-1"
              >
                <FaVideo className="text-white" />
                Video Call
              </Link>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Messages component */}
            <Messages />
          </div>
          <div className="w-full border-t">
            {/* MessageInput component */}
            <MessageInput />
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageContainer;

const NoChatSelected = () => {
  const authUser = useSelector((state) => state.doctor.doctorData);
  return (
    <div className="flex items-center justify-center w-full h-full bg-black">
      <div className="px-4 text-center sm:text-xl text-green-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser?.name}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
