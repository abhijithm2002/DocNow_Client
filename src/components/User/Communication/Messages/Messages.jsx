import { useEffect, useRef } from "react";
import useGetMessage from "../../../../socket/hooks/useGetMessage";
import MessageSkeletons from "../../Skeleton/MessageSkeletons";
import Message from "./Message";
import useListenMessages from "../../../../socket/hooks/useListenMessages";
import { useConversation } from "../../../../socket/zustand/useConversation";
import { useSelector } from "react-redux";

function Messages() {
  const { selectedConversation } = useConversation();
  const { messages = [], loading } = useGetMessage(); 
  useListenMessages();
  const lastMessageRef = useRef();
  const authUser = useSelector((state) => state.auth.user);

  // Filter messages belonging to the selected conversation
  const filteredMessages = messages.filter(
    (message) =>
      (message.senderId === selectedConversation._id ||
        message.senderId === authUser._id) &&
      (message.recieverId === authUser._id ||
        message.recieverId === selectedConversation._id)
  );

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [filteredMessages]);

  return (
    <div className="px-4 flex-1 overflow-y-auto ">
      {!loading && filteredMessages.length > 0 ? (
        filteredMessages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
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

