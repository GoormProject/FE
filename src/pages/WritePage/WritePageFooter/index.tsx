import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/Button";

import api from "../../../api";
import { usePostInputStore } from "../../../store/postStore/postStore.ts";
import { useModalStore } from "../../../store/modalStore/modalStore.ts";
import { PostType } from "../../../types/postType.ts";
import { useImgsStore } from "../../../store/imgsStore/imgsStore.ts";

import {
  FooterBtnContainer,
  PrivateBtnContainer,
  WritePageFooterContainer,
} from "./WritePageFooter.styles.ts";

interface WritePageFooterProps {
  data: PostType;
}

const WritePageFooter: React.FC<WritePageFooterProps> = ({ data }) => {
  const { post, changeValue } = usePostInputStore((state) => state);
  const { postImgs } = useImgsStore((state) => state.writeImgs);
  const { deleteImgIds, changeImgs } = useImgsStore((state) => state);

  const toggleTitleAlertModal = useModalStore(
    (state) => state.toggleTitleAlertModal,
  );
  const { isPublic } = data || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.postImgs !== null) {
      changeImgs(data?.postImgs);
    }
    if (isPublic === false) {
      changeValue({ isPublic: false });
    }
  }, []);

  const handlePostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (post.postTitle.trim() === "") {
      toggleTitleAlertModal(true);
      setTimeout(() => {
        toggleTitleAlertModal(false);
      }, 3000);
      return;
    }
    if (!data && postImgs?.length && postImgs !== null) {
      const formData = new FormData();
      for (const img of postImgs) {
        formData.append("postImgs", img);
      }
      const diaryJson = JSON.stringify(post);
      const blob = new Blob([diaryJson], { type: "application/json" });
      formData.append("diaryPostCreateRequestDto", blob);
      api
        .post("/api/post/5", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          res.status === 200 && navigate(`../../post/${res.data.data.postId}`);
        })
        .catch((err) => console.log(err));
    } else if (data && postImgs?.length && postImgs !== null) {
      const formData = new FormData();
      for (const img of postImgs) {
        formData.append("postImgs", img);
        const diaryJson = JSON.stringify(post);
        const blob = new Blob([diaryJson], { type: "application/json" });
        formData.append("diaryPostCreateRequestDto", blob);
        const deleteImgsJson = JSON.stringify(deleteImgIds);
        const imgIdsBlob = new Blob([deleteImgsJson], {
          type: "application/json",
        });
        formData.append("deleteImageIds", imgIdsBlob);
        api
          .patch(`/api/post/${data.postId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res);
            res.status === 200 && navigate(`../../post/${data.postId}`);
          });
      }
    }
  };

  const handleIsPublicClick = () => {
    changeValue({ isPublic: !post.isPublic });
  };

  return (
    <WritePageFooterContainer>
      <FooterBtnContainer>
        <PrivateBtnContainer>
          <input
            id={"private_checkbox"}
            type={"checkbox"}
            checked={!post.isPublic}
            onChange={handleIsPublicClick}
          />
          <label htmlFor={"private_checkbox"}>체크하여 비공개로 게시하기</label>
        </PrivateBtnContainer>
        <Button onClick={handlePostClick} className={"post"}>
          {data ? "수정" : "게시"}
        </Button>
      </FooterBtnContainer>
    </WritePageFooterContainer>
  );
};

export default WritePageFooter;
