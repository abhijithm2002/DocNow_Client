import { useEffect } from "react";
import { useConversation } from "../zustand/useConversation";
import { useSocketContext } from "../SocketContext";
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log('message dfkjskdjflksdfljsljdfls',newMessage);
      
      newMessage.shouldShake = true;
      setMessages([...messages, newMessage]);
    });
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessages;