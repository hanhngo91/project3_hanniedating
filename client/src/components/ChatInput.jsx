import React, { useState } from "react";
import "./ChatInput.css";

function ChatInput() {
  const [textArea, setTextArea] = useState(null);
  return (
    <div className="chat-input">
      <input
        className="chat-input-field"
        type="text"
        value={textArea}
        s
        placeholder="Type a message..."
        onChange={(e) => setTextArea(e.target.value)}
      />
      <button className="send-message">SEND </button>
    </div>
  );
}

export default ChatInput;
