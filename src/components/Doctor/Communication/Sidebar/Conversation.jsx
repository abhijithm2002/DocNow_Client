import useGetConversations from "../../../../socket/hooks/useGetConversations";
import { useConversation } from "../../../../socket/zustand/useConversation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Conversation({ conversation, lastIdx }) {

  const {selectedConversations, setSelectedConversations} = useConversation();
  const doctor = useSelector((state) => state.doctor.doctor);
  const isSelected = selectedConversations._id = conversation._id;
  const handleSelectUser = () =>{
    setSelectedConversations(conversation);
  }

    return (
      <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 p-2 py-2 cursor-pointer ${
          isSelected ? "bg-gray-500" : ""
        }`}
        onClick={handleSelectUser}
      >
        {/* <div className={`avatar ${isOnline ? "online" : ""}`}> */}
          <div className={`w-12 rounded-full`}>
            <img
              // src={conversation?.photo || "/assets/user.png"}
              alt="user avatar"
            />
          </div>
        {/* </div> */}
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-semibold">{conversation?.name}</p>
            {/* {isOnline ? (
              <span className="text-green-500 font-bold text-sm">Online</span>
            ) : (
              <span className="text-gray-500 font-bold text-sm">Offline</span>
            )} */}
            {/* {hasUnreadMessages && (
              <span className="text-green-500 font-bold text-sm">
                Messages {unreadCount}
              </span>
            )} */}
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
    );
  }
  
  export default Conversation;
  