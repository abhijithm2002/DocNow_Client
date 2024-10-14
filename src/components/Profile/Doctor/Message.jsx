import { useState, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { FaArrowLeft } from "react-icons/fa";

const Message = () => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const scrollRef = useRef(null);
    const [newMessage, setNewMessage] = useState('');

    return (
        <>
            <header className="bg-white p-4 text-gray-700 flex justify-between rounded-lg shadow-gray-300 shadow-lg z-20">
                <div className='flex'>
                    <span className='mr-3 flex items-center md:hidden cursor-pointer'>
                        <FaArrowLeft />
                    </span>

                    <img className='w-10 h-10 rounded-full' src="profile-pic-url" alt="Friend's profile" />
                    <div className='flex flex-col'>
                        <span className="text-2xl font-semibold mx-3 align-middle">Friend's Name</span>
                        <span className='text-xs ml-3'>online</span>
                    </div>
                </div>
                <div className='flex'>
                    <div className='mx-5 cursor-pointer'>
                        <HiOutlineVideoCamera className='md:w-12 md:h-12 w-9 h-9' />
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 md:max-h-[560px] md:min-h-[560px]">
                {/* Messages container */}
                <div ref={scrollRef}>
                    <div className="message-bubble">Message Content</div>
                </div>
            </div>

            <footer className="bg-white border-t border-gray-300 p-4 rounded-lg bottom-0 w-full">
                <div className="flex items-center relative">
                    <button
                        className="focus:outline-none mx-1"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        <span className="text-3xl">😊</span>
                    </button>
                    {showEmojiPicker && (
                        <div className="absolute bottom-16 left-0 z-10">
                            <EmojiPicker />
                        </div>
                    )}
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                    />
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                        Send
                    </button>
                </div>
            </footer>
        </>
    )
}

export default Message;



// import React from "react";

// const Message = () => {
//   return (
//     <>
//       <div className="flex gap-3 items-center">
//         <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
//         <div className="flex flex-col gap-1">
//           <div className="skeleton h-4 w-40"></div>
//           <div className="skeleton h-4 w-40"></div>
//         </div>
//       </div>
//       <div className="flex gap-3 items-center justify-end">
//         <div className="flex flex-col gap-1">
//           <div className="skeleton h-4 w-40"></div>
//         </div>
//         <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
//       </div>
//     </>
//   );
// };

// export default Message;