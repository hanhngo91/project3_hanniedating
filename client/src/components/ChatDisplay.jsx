import React from "react";
import "./ChatDisplay.css";
import Chat from "./Chat";
import ChatInput from "./ChatInput";

function ChatDisplay({ user, clickedUser }) {
  return (
    <>
      <Chat user={user} clickedUser={clickedUser} />
      <ChatInput />
    </>
  );
}

export default ChatDisplay;
