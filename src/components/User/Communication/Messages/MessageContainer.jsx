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

function MessageContainer() {
  const navigate = useNavigate();
  const { selectedConversation, setSelectedConversation } = useConversation(); 
  const {onlineUsers, typingUsers, startTyping, stopTyping} = useSocketContext()


  const isOnline = onlineUsers.includes(selectedConversation?._id)

  useEffect(() => {
    return () => setSelectedConversation(null); 
  }, [setSelectedConversation]);

  return (
    <div className="flex-1 flex flex-col h-full">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="flex flex-col h-full">
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
                  {typingUsers.some(
                    (user) => user?.userId == selectedConversation?._id
                  ) ? <TypingAnimation /> : isOnline ? "Online": "Offline"}
                </span>
              </div>
            </div>
          </div>

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>

          {/* Message input area, stays fixed at the bottom */}
          <div className="w-full border-t">
            <MessageInput />
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageContainer;


const NoChatSelected = () => {
  const authUser = useSelector((state) => state.auth.user);
  console.log('userData', authUser)
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-700">
      <div className="px-4 text-center sm:text-xl text-green-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser?.name}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
