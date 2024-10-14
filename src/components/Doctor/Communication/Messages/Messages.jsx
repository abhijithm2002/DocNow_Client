import React from "react";
import Message from "./Message";

function Messages() {
  return (
    <div className="px-4 flex-1 overflow-auto">
      <div className="mb-4">
        {/* Message bubbles would go here */}
        <Message />
      </div>
      <p>Send a message to start a conversation</p>
    </div>
  );
}

export default Messages;
