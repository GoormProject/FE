import {
  ChatMessageContainer,
  ChatMessageImgBox,
  ChatUserInfoContainer,
  MessageContainer,
} from "./ChatMessage.styles.ts";
import { MessageType } from "../../../../types/chattingType.ts";
import React from "react";

import userAvatar from "../../../../assets/images/UserAvatar.png";
import useLoginUser from "../../../../hooks/useLoginUser.ts";

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { isLoginUser } = useLoginUser(message.userId);

  if (isLoginUser) {
    return (
      <ChatMessageContainer>
        <ChatMessageImgBox $isLoginUser={isLoginUser}>
          <img src={userAvatar} />
        </ChatMessageImgBox>
        <ChatUserInfoContainer>
          <p>{message.userName}</p>
          <MessageContainer>
            <p>{message.chatMessage}</p>
          </MessageContainer>
        </ChatUserInfoContainer>
      </ChatMessageContainer>
    );
  } else {
    return (
      <ChatMessageContainer>
        <ChatMessageImgBox>
          <img src={userAvatar} />
        </ChatMessageImgBox>
        <ChatUserInfoContainer>
          <p>{message.userName}</p>
          <MessageContainer>
            <p>{message.chatMessage}</p>
          </MessageContainer>
        </ChatUserInfoContainer>
      </ChatMessageContainer>
    );
  }
};

export default ChatMessage;