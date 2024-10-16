import { useEffect, useRef } from "react";
import useGetMessage from "../../../../socket/hooks/useGetMessage";
import MessageSkeletons from "../Skeleton/MessageSkeletons";
import Message from "./Message";
import useListenMessages from "../../../../socket/hooks/useListenMessages";
import { useConversation } from "../../../../socket/zustand/useConversation";

function Messages() {
  const { selectedConversation } = useConversation();
  const { messages=[], loading } = useGetMessage(); 
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id}>
            <Message message={message} />
          </div>
        ))
      ) : loading ? (
        [...Array(3)].map((_, idx) => <MessageSkeletons key={idx} />)
      ) : (
        <p>Send a message to start a conversation</p>
      )}
    </div>
  );
  
}

export default Messages;