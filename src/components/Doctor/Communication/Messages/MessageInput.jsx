import React, { useEffect, useState } from "react";
import { BsSend, BsEmojiSmile, BsMic, BsStop, BsImage } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { ReactMediaRecorder } from "react-media-recorder";
import useSendMessage from "../../../../socket/hooks/useSendMessage";
import { useSocketContext } from "../../../../socket/SocketContext";
import {useConversation} from '../../../../socket/zustand/useConversation'

function MessageInput() {

    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const {loading, sendMessage} = useSendMessage();
    const {startTyping, stopTyping} = useSocketContext();
    const {selectedConversation} = useConversation();

    useEffect(() => {
        setMessage('')
    },[selectedConversation._id])
    
    useEffect(() => {
        if (!message) {
            return stopTyping({ conversationId: selectedConversation._id });
        }

        startTyping({ conversationId: selectedConversation._id });
        
        const typingTimeout = setTimeout(() => {
            stopTyping({ conversationId: selectedConversation._id });
        }, 1500);

        return () => clearTimeout(typingTimeout); 
    }, [message, startTyping, stopTyping, selectedConversation._id]);
    

    const handleSubmit = async(e) =>{

        e.preventDefault();
        
        if(!message && !imageFile) return;
        if(message) {
            await sendMessage(message)
        } else if(imageFile) {
            await sendMessage(imageFile)
        }
        setMessage('');
        setImageFile(null);
    }

    const handleToggleRecording = (startRecording, stopRecording) => {
        if (isRecording) {
            stopRecording();
            setIsRecording(false);
        } else {
            startRecording();
            setIsRecording(true);
        }
    };

    return (
        <form className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative bg-white border-t">
                <input
                    type="text"
                    value={message}
                    className="border text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring focus:ring-green-500"
                    placeholder="Send a message"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 end-28 flex items-center pe-3"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    <BsEmojiSmile />
                </button>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                />
                <label
                    htmlFor="image-upload"
                    className="absolute inset-y-0 end-20 flex items-center pe-3 cursor-pointer"
                >
                    <BsImage />
                </label>
                <ReactMediaRecorder
                    audio
                    onStop={(blobUrl) => {
                        setAudioUrl(blobUrl);
                        setIsRecording(false);
                    }}
                    render={({ startRecording, stopRecording }) => (
                        <div className="absolute inset-y-0 end-10 flex items-center pe-3">
                            <button
                                type="button"
                                onClick={() => handleToggleRecording(startRecording, stopRecording)}
                                className="p-2"
                            >
                                {isRecording ? <BsStop /> : <BsMic />}
                            </button>
                        </div>
                    )}
                />
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                    <BsSend />
                </button>
                {showEmojiPicker && (
                    <div className="absolute bottom-10 right-0 z-50">
                        <EmojiPicker />
                    </div>
                )}

                {/* Display recorded audio */}
                {audioUrl && (
                    <audio src={audioUrl} controls className="mt-2 w-full" />
                )}
            </div>
        </form>
    );
}

export default MessageInput;
