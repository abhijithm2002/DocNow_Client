import React, { useState } from "react";
import Modal from "react-modal";
import { format } from "date-fns";

Modal.setAppElement("#root");

function Message() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const formattedTime = format(new Date(), "p");

  return (
    <>
      <div className="flex justify-start mb-4 mt-2">
        <div className="relative max-w-xs px-4 py-2 text-white rounded-lg bg-gray-700">
          <img
            src="image_url"
            alt="Sent image"
            className="max-w-full h-auto rounded-lg cursor-pointer"
            onClick={handleImageClick}
          />
          <div className="text-xs text-black-400 mt-1">{formattedTime}</div>
        </div>
      </div>

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
              src="image_url"
              alt="Image Preview"
              className="object-contain max-w-full max-h-full"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 w-[115px] mb-4">
            Download
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 w-[115px]" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Message;
