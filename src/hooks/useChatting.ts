import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../react-query/constants.ts";
import api from "../api";
import { queryClient } from "../react-query/queryClient.ts";

export const useFetchChatList = () =>
  useQuery({
    queryKey: [queryKeys.chatList],
    queryFn: () => api.get(`/api/chat/roomList`),
    select: (data) => data.data.data,
  });

export const useChatListMutation = () => {
  const { mutate } = useMutation({
    mutationFn: () => api.get(`/api/chat/roomList`),
    onSuccess: () => {
      queryClient.invalidateQueries?.({
        queryKey: [queryKeys.chatList],
      });
    },
  });
  return { mutate };
};

export const useFetchChatHistory = (size: number, chatRoomId: number) => {
  const { isLoading, data, isError, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [queryKeys.chatPaginated, size, chatRoomId],
      enabled: !!chatRoomId,
      queryFn: ({ pageParam }) => {
        return api.get(
          `/api/chat/messages?page=${pageParam}&size=${size}&chatRoomId=${chatRoomId}`,
        );
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.data.data.hasNext) {
          return lastPage.data.data.page + 1;
        } else {
          return null;
        }
      },
      select: (r) => {
        return r.pages.flatMap((r) => r.data.data);
      },
    });
  return { data, isLoading, isError, error, hasNextPage, fetchNextPage };
};
