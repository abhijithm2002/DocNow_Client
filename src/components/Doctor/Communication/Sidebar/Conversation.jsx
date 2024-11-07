import { FaUserCircle } from "react-icons/fa";
import { useSocketContext } from "../../../../socket/SocketContext";
import { useConversation } from "../../../../socket/zustand/useConversation";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Conversation({ conversation, lastIdx }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const doctor = useSelector((state) => state.doctor.doctor);
  
  const isSelected = selectedConversation?._id === conversation._id;

  useEffect(()=> {
    setSelectedConversation(conversation)
  },[])

  // const handleSelectUser = (conversation) => {
  //   setSelectedConversation(conversation);
  //   // Assuming `markAsRead` is part of the SocketContext (re-enable this if needed)
  //   // markAsRead(doctor?._id, conversation?._id);
  // };
  // console.log('photo///', conversation.photo)
 
  const handleSelectUser = (conversation) => {
    if (selectedConversation?._id !== conversation._id) {
      setSelectedConversation(conversation);
    }
  };
  
  
  return (
    <div key={conversation._id}>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 p-2 py-2 cursor-pointer ${
          isSelected ? "bg-gray-500" : ""
        }`}
        onClick={() => handleSelectUser(conversation)}
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200">
          {conversation?.photo ? (
            <img
              src={conversation.photo}
              alt="user avatar"
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <FaUserCircle className="text-gray-500 w-full h-full " />
          )}
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-semibold">{conversation?.name}</p>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </div>
  );
}

export default Conversation;
