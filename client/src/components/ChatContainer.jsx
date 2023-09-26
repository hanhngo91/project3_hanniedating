import React, { useState } from "react";
import "./ChatContainer.css";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import ChatHeader from "./ChatHeader";

function ChatContainer({ user }) {
  const [clickedUser, setClickedUser] = useState(null);
  return (
    <div className="chat-container">
      <ChatHeader user={user} />
      <div>
        <button className="option" onClick={() => setClickedUser(null)}>
          Matches
        </button>
        {clickedUser && <button className="option">Chat</button>}
      </div>

      {!clickedUser && (
        <MatchesDisplay
          user={user}
          matches={user?.data?.matches}
          setClickedUser={setClickedUser}
        />
      )}

      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
    </div>
  );
}

export default ChatContainer;
