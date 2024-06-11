import { create } from "zustand";
import { MessageListType } from "../../types/chattingType.ts";
import { Client } from "@stomp/stompjs";

interface ChattingStoreProps {
  messages: MessageListType[] | [];
  stompClient: Client | null;
  chatRoomId: number | null;
  setMessages: (message: MessageListType) => void;
  fetchMessages: (messages: MessageListType[]) => void;
  setStompClient: (client: Client) => void;
  setChatRoomId: (id: number) => void;
  initialLoadComplete: boolean;
  setInitialLoadComplete: (isLoading: boolean) => void;
}

export const useChattingStore = create<ChattingStoreProps>((set) => ({
  messages: [],
  stompClient: null,
  chatRoomId: null,
  initialLoadComplete: false,
  setMessages: (message) =>
    set((prev) => ({
      messages: [...prev.messages, message],
    })),
  fetchMessages: (messages) =>
    set(() => ({
      messages: [...messages],
    })),
  setStompClient: (client) =>
    set(() => ({
      stompClient: client,
    })),
  setChatRoomId: (id) =>
    set(() => ({
      chatRoomId: id,
    })),
  setInitialLoadComplete: (isLoading) =>
    set(() => ({
      initialLoadComplete: isLoading,
    })),
}));
