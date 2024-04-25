import { useState } from "react";

import PostPageEditModal from "./PostPageEditModal";

import {
  DiaryButton,
  EditButton,
  EditButtonContainer,
  HeaderButtonContainer,
  PostMenuButton,
  PostPageHeaderContainer,
  UserProfileContainer,
} from "./PostPageHeader.styles.ts";

import userImg from "../../../assets/testImage/FakeUser-2.png";

const PostPageHeader = () => {
  const [toggleEditModal, setToggleEditModal] = useState(false);

  const handleEditClick = () => {
    setToggleEditModal(true);
  };

  return (
    <PostPageHeaderContainer>
      <UserProfileContainer>
        <img src={userImg} alt={"feed_user_img"} />
        <p>terrylucas</p>
      </UserProfileContainer>
      <HeaderButtonContainer>
        <PostMenuButton>
          <DiaryButton />
        </PostMenuButton>
        <EditButtonContainer>
          <EditButton onClick={handleEditClick} />
          {toggleEditModal && (
            <PostPageEditModal setToggleEditModal={setToggleEditModal} />
          )}
        </EditButtonContainer>
      </HeaderButtonContainer>
    </PostPageHeaderContainer>
  );
};

export default PostPageHeader;
