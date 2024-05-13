export interface User {
  userId: number;
  userName: string;
  userDesc: string;
  profileImg: string;
  authority: string;
  userState: string;
  notificationSetting: boolean;
  postLike: boolean;
  postComment: boolean;
  postCreated: boolean;
  commentTag: boolean;
  newFollower: boolean;
  dm: boolean;
}

export interface UserFeedInfo {
  followerCount: number;
  followingCount: number;
  profileImg: string | null;
  userDesc: string | null;
  userId: number;
  userName: string;
  followStatus: boolean;
}
