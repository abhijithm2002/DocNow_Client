import { useEffect } from "react";
import { useConversation } from "../zustand/useConversation";
import { useSocketContext } from "../SocketContext";
import { toast } from "sonner"; 
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      
      
      newMessage.shouldShake = true;
      setMessages([...messages, newMessage]);
      toast.success(`New message from ${newMessage.senderName}: ${newMessage.message}`);
    });
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessages;