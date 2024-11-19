import { useState } from "react";
import { useSelector } from "react-redux";
import { useSocketContext } from "../SocketContext";
import { useConversation } from "../zustand/useConversation";
import axios from "axios";
import CONSTANTS_COMMON from "../../constants/common";
import toast from "react-hot-toast";



const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    
    const {messages, setMessages, selectedConversation} = useConversation();
    const user = useSelector((state) => state.auth.user);
    const doctor = useSelector((state) => state.doctor.doctor);
    const { sendnewMessage } = useSocketContext() || {};

    const sendMessage = async(messageContent) => {
        setLoading(true);
        
            
        try {
            let senderId = user ? user._id : doctor ? doctor._id : null;
            
             if (!senderId) throw new Error("User ID not found");
             sendnewMessage(selectedConversation?._id, senderId, messageContent);
          const formData = new FormData();
            if(typeof messageContent == 'string') {
                formData.append('message', messageContent)
            } else if (messageContent instanceof File) {
                formData.append('image', messageContent)
            } else if (messageContent instanceof Blob) {
                formData.append('voiceMessage', messageContent)
            }
            
            const response = await axios.post(`${CONSTANTS_COMMON.API_BASE_URL}api/message/send/${selectedConversation._id}/${senderId}`,
                formData,
                {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    }
                }
            );
            
            const data = response.data.newMessage;
            setMessages([...messages, data])

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }
    return {sendMessage, loading}
}

export default useSendMessage