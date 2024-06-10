import React from "react";
import { ChatType } from "../../../../types/chattingType.ts";

import {
  ChatContainer,
  ChatImgContainer,
  ChatInfoContainer,
  ChatNameContainer,
  DiaryMemberCount,
} from "./Chat.styles.ts";

import userAvatar from "../../../../assets/images/UserAvatar.png";
import { useNavigate, useParams } from "react-router-dom";

interface ChatProps {
  chat: ChatType;
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
  const { userId, diaryId } = useParams();

  const navigate = useNavigate();
  const handleChatRoomClick = () => {
    if (chat?.userId === Number(userId)) {
      return;
    }
    if (chat?.userId) {
      navigate(`/chat/${chat.userId}?roomName=${chat.chatRoomName}`);
    } else {
      navigate(`/chat/group/${chat.diaryId}?roomName=${chat.chatRoomName}`);
    }
  };

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
    <ChatContainer onClick={handleChatRoomClick}>
      <ChatImgContainer>
        <img
          src={chat.chatRoomProfileImg ? chat.chatRoomProfileImg : userAvatar}
          alt={"chatRoomProfileImg"}
        />
      </ChatImgContainer>
      <ChatInfoContainer $diaryId={chat?.diaryId}>
        {userId || diaryId ? (
          <ChatNameContainer $diaryId={chat?.diaryId}>
            <p>{truncate(chat?.chatRoomName, 12)}</p>
            <DiaryMemberCount />
          </ChatNameContainer>
        ) : (
          <ChatNameContainer $diaryId={chat?.diaryId}>
            <p>{truncate(chat?.chatRoomName, 50)}</p>
            <DiaryMemberCount />
          </ChatNameContainer>
        )}
        {userId || diaryId ? (
          <p>{truncate(chat?.chatMessagePreview, 17)}</p>
        ) : (
          <p>{truncate(chat?.chatMessagePreview, 85)}</p>
        )}
      </ChatInfoContainer>
    </ChatContainer>
  );
};

export default Chat;
