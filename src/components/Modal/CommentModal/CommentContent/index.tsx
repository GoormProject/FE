import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Comment from "./Comment";

import { CommentType } from "../../../../types/commentType.ts";

import { CommentContentContainer } from "./CommentContent.styles.ts";

interface CommentContentProps {
  id?: string;
}

const fetchComments = () => axios.get("/comments");

const CommentContent: React.FC<CommentContentProps> = ({ id }) => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["fetch-comments"],
    queryFn: fetchComments,
    select: (data) => {
      return data.data?.postId === Number(id) ? data.data?.comments : [];
    },
  });

  if (isLoading) return <>Loading...</>;
  if (isError) return <>댓글을 불러오지 못했습니다.</>;

  return (
    <CommentContentContainer>
      {data?.map((comment: CommentType) => (
        <Comment key={comment.commentId} comment={comment} />
      ))}
    </CommentContentContainer>
  );
};

export default CommentContent;
