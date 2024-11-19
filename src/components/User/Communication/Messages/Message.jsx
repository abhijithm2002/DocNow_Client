import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useConversation } from "../../../../socket/zustand/useConversation";
import { format } from "date-fns";
import Modal from "react-modal";
import "react-h5-audio-player/lib/styles.css";

Modal.setAppElement("#root");

function Message({ message }) {
  const authUser = useSelector((state) => state.auth.user);
  const { selectedConversation } = useConversation();
  
  // Check if the message is from the authenticated user
  const fromMe = message.senderId.toString() === authUser?._id.toString();
  const chatClassName = fromMe ? "justify-end" : "justify-start";
  const bubbleColor = fromMe ? "bg-blue-500" : "bg-gray-700";

  // Check if selectedConversation and its participants are defined


  const showThisMessage =
    (message.senderId === selectedConversation._id ||
      message.senderId === authUser._id) &&
    (message.recieverId === authUser._id ||
      message.recieverId === selectedConversation._id);






  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!showThisMessage) {
    
  } else {
    
  }
  

  const formattedTime = format(new Date(message.createdAt), "p");
  const isVoiceMessage = message.messageType === "voice";
  const isImageMessage = message.messageType === "image";

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDownload = () => {
    const url = message.message; // Assuming this is the URL for the image
    if (!url) {
      console.error("Invalid URL");
      return;
    }
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `image_${Date.now()}.jpg`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className={`flex ${chatClassName} mb-4 mt-2`}>
        <div className={`relative max-w-xs px-4 py-2 text-white rounded-lg ${bubbleColor}`}>
          {/* Check message type and render accordingly */}
          {isVoiceMessage ? (
            <audio className="h-14 w-64" src={message.message} controls />
          ) : isImageMessage ? (
            <img
              src={message.message}
              alt="Sent image"
              className="max-w-full h-auto rounded-lg cursor-pointer"
              onClick={handleImageClick}
            />
          ) : (
            <p>{message.message}</p> // For text messages
          )}
          <div className="text-xs text-gray-300 mt-1">{formattedTime}</div>
        </div>
      </div>

      {isImageMessage && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Image Preview"
          className="flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 flex flex-col items-center">
            <div className="w-[290px] h-[290px] flex items-center justify-center mb-4">
              <img
                src={message.message}
                alt="Image Preview"
                className="object-contain max-w-full max-h-full"
              />
            </div>
            <button
              onClick={handleDownload}
              className="bg-blue-500 text-white px-4 py-2 w-[115px] mb-4"
            >
              Download
            </button>
            <button
              onClick={handleCloseModal}
              className="bg-gray-500 text-white px-4 py-2 w-[115px]"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Message;
