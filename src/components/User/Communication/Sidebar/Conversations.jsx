import useGetConversations from "../../../../socket/hooks/useGetConversations";
import Conversation from "./Conversation";
import { useConversation } from "../../../../socket/zustand/useConversation";
function Conversations() {

    const {loading, conversations } = useGetConversations();
    const {selectedConversation} = useConversation()

    const recordedConversations = selectedConversation
     ? [
          selectedConversation, ...conversations.filter((c) => c._id !== selectedConversation._id),
       ]
    :  conversations;
    
    
  const dummyConversations = [
    { _id: 1, userName: "John Doe", lastMessage: "Hey, how's it going?" },
    { _id: 2, userName: "Jane Smith", lastMessage: "Let's catch up later!" },
    { _id: 3, userName: "Emily Johnson", lastMessage: "See you soon!" },
  ];

  return (
    <div>
      {/* {dummyConversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === dummyConversations.length - 1}
        />
      ))} */}

      {recordedConversations.map((conversation, idx) => {
        <Conversation
          key={conversation?._id}
          conversation={conversation}
          lastIdx = {idx === recordedConversations.length - 1}
        />
      })}
      {
        loading ? (
          <span className="loading loading-spinner mx-auto">Loading..</span>
        ) : null
      }
      
    </div>
  );
}

export default Conversations;

