import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useConversation } from '../zustand/useConversation'
import toast from "react-hot-toast";
import axios from "axios";
import CONSTANTS_COMMON from "../../constants/common";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages = [], setMessages, selectedConversation } = useConversation(); 
  const user = useSelector((state) => state?.auth?.user);
  const doctor = useSelector((state) => state?.doctor?.doctor);

  useEffect(() => {
    const getMessages = async () => {
      const senderId = user?._id || doctor?._id;
      if (!senderId) {
        toast.error("No user or doctor data available.");
        return;
      }
      if (!selectedConversation?._id) {
        toast.error("No conversation selected.");
        return;
      }
      setLoading(true);
      try {
        const response = await axios.post(`${CONSTANTS_COMMON.API_BASE_URL}api/message/${selectedConversation._id}/${senderId}`);
        const data = response.data.message || []; 
        const lastMessage = response.data
        console.log('lastmessageeeeeeeeeeeeeeeeee', lastMessage)
        setMessages(data);
      } catch (error) {
        toast.error("Failed to fetch messages. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    getMessages();
    
}, [selectedConversation?._id, user?._id, doctor?._id, setMessages]);

console.log('messages11111111',messages)
  return { messages, loading };
};

export default useGetMessage;