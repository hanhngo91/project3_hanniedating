import React, { useState } from "react";
import "./Chat.css";

function Chat({ user, clickedUser }) {
  console.log(user?.data?.url[0]);
  console.log(clickedUser?.data?.url[0]);
  return (
    <div className="chat">
      <div className="clicked-user">
        <img
          className="image-user"
          src={`${clickedUser?.url[0]}`}
          alt={clickedUser.first_name}
        />
        <span className="clickedUserName">{clickedUser?.first_name}</span>
      </div>
      <div className="chat-content">
        <div className="from-user">
          <img
            className="image-user"
            src={`${clickedUser?.url[0]}`}
            alt={clickedUser.first_name}
          />
          <span>
            Hey there! Have we met? You look so familiar! Or maybe just my
            thought. Haha... If it's not true, dont mind me. Okay? Nice to meet
            you, Taylor!
          </span>
        </div>
        <div className="to-user">
          <span>
            Hi! Nice to meet you, Tom! I think we've never met before! Or maybe
            you saw me on TV. Haha...
          </span>
          <img
            className="image-user"
            src={`${user?.data?.url[0]}`}
            alt={user?.data?.first_name}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
