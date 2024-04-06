import { FC } from "react";
import {
  FeedIntroductionContainer,
  FeedIntroductionContent,
  FeedIntroductionImg,
  UserDescContainer,
  UserDetailStateContainer,
  UserNicknameContainer,
  UserStateContainer,
} from "./FeedIntroduction.styles.ts";
import profileImg from "../../../assets/testImage/Image.png";
import Button from "../../../components/Button/Button.tsx";

const FeedIntroduction: FC = () => {
  return (
    <FeedIntroductionContainer>
      <FeedIntroductionContent>
        <FeedIntroductionImg>
          <img src={profileImg} alt={"profile_img"} />
        </FeedIntroductionImg>
        <UserStateContainer>
          <UserNicknameContainer>
            <p>terrylucas</p>
            <div>
              <Button className={"follow"}>팔로우</Button>
              <Button className={"send_message"}>메세지 보내기</Button>
            </div>
          </UserNicknameContainer>
          <UserDetailStateContainer>
            <p>{"1,258"}게시물</p>
            <p> {"4M"}팔로워</p>
            <p>{"1,250"}팔로우</p>
          </UserDetailStateContainer>
          <UserDescContainer>
            <p>Terry Lucas 입니다 안녕하세요</p>
          </UserDescContainer>
        </UserStateContainer>
      </FeedIntroductionContent>
    </FeedIntroductionContainer>
  );
};

export default FeedIntroduction;
