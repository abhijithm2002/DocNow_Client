import React, { useEffect, useRef } from "react";
import useGetMessage from "../../../../socket/hooks/useGetMessage";
import MessageSkeletons from "../Skeleton/MessageSkeletons";
import Message from "./Message";
import useListenMessages from "../../../../socket/hooks/useListenMessages";
import { useConversation } from "../../../../socket/zustand/useConversation";

function Messages() {
  const { selectedConversation } = useConversation();
  const { messages = [], loading } = useGetMessage();
  useListenMessages();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4">
      {!loading && messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
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
