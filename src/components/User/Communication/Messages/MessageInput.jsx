import React, { useState } from "react";
import { BsSend, BsEmojiSmile, BsMic, BsStop, BsImage } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { ReactMediaRecorder } from "react-media-recorder";

function MessageInput() {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);

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
        <form className="px-4 my-3">
            <div className="w-full relative bg-white border-t">
                <input
                    type="text"
                    className="border text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring focus:ring-green-500"
                    placeholder="Send a message"
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
