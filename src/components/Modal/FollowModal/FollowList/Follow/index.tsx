import React, { Dispatch, SetStateAction } from "react";

import { FollowType } from "../../../../../types/feedType.ts";

import {
  FollowButton,
  FollowContainer,
  UserContent,
  UserProfileDesc,
  UserProfileImg,
} from "./Follow.styles.ts";

import userAvatar from "../../../../../assets/images/UserAvatar.png";
import { useFollowMutation } from "../../../../../hooks/useUserFeed.ts";
import { useNavigate, useParams } from "react-router-dom";

interface FollowProps {
  data: FollowType;
  title?: string;
  closeModal: Dispatch<SetStateAction<boolean>>;
}

const Follow: React.FC<FollowProps> = ({ title, data, closeModal }) => {
  const { userId: id } = useParams();
  const { profileImg, userDesc, userName, followStatus, userId } = data;
  const { mutate } = useFollowMutation(userId, id as string, title);
  const navigate = useNavigate();

  const handleFollowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    mutate(followStatus);
  };

  const handleFollowUserClick = () => {
    navigate(`../../../../../userfeed/${data.userId}`);
    closeModal(false);
  };

  const truncate = (str: string | null, n: number) => {
    return str?.length !== undefined && str?.length > n
      ? str?.substring(0, n - 1) + "..."
      : str;
  };

  return (
    <>
      <FollowContainer onClick={handleFollowUserClick}>
        <UserContent>
          <UserProfileImg>
            <img
              src={typeof profileImg === "string" ? profileImg : userAvatar}
              alt={"userProfileImg"}
            />
          </UserProfileImg>
          <UserProfileDesc>
            <p>{userName}</p>
            <p>{truncate(userDesc, 18)}</p>
          </UserProfileDesc>
        </UserContent>
        <FollowButton $status={followStatus} onClick={handleFollowClick}>
          {followStatus === null ? "" : !followStatus ? "팔로우" : "언팔로우"}
        </FollowButton>
      </FollowContainer>
    </>
  );
};

export default Follow;
