import { Dispatch, FC, SetStateAction, useRef } from "react";

import FollowList from "./FollowList";

import useOnClickOutside from "../../../hooks/useOnClickOutside.ts";
import { useFetchFollowerList } from "../../../hooks/useUserFeed.ts";

import {
  FollowModalContainer,
  FollowModalContent,
  TitleContainer,
} from "./FollowModal.styles.ts";

interface FollowModalProps {
  title: string;
  closeModal: Dispatch<SetStateAction<boolean>>;
  userId?: string;
}

const FollowModal: FC<FollowModalProps> = ({ title, closeModal, userId }) => {
  const modalRef = useRef(null);
  const { isLoading, data, isError, error } = useFetchFollowerList(
    userId as string,
    title,
  );

  useOnClickOutside(modalRef, () => {
    closeModal(false);
  });
  // if (isLoading) return <>로딩중...</>;
  if (isError) return <>{error?.message}</>;

  return (
    <FollowModalContainer ref={modalRef}>
      <FollowModalContent>
        <TitleContainer>
          <p>
            {data?.length} {title}
          </p>
        </TitleContainer>
        {isLoading ? (
          <>{title}데이터를 불러오는 중 입니다....</>
        ) : (
          <FollowList closeModal={closeModal} data={data} title={title} />
        )}
      </FollowModalContent>
    </FollowModalContainer>
  );
};

export default FollowModal;
