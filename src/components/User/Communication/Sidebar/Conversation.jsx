import useGetConversations from "../../../../socket/hooks/useGetConversations";
import { useConversation } from "../../../../socket/zustand/useConversation";
function Conversation({ conversation, lastIdx }) {

  const {selectedConversations, setSelectedConversations} = useConversation()
    return (
      <div className="p-4 border-b">
        <h4 className="font-semibold">{conversation.name}</h4>
        <p className="text-sm text-gray-500">{conversation.lastMessage}</p>
      </div>
    );
  }
  
  export default Conversation;
  