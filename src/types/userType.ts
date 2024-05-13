export interface User {
  userName: string;
  userDesc: string;
  userProfileImg: string;
  alarmPostLike: boolean;
  alarmComment: boolean;
  alarmCreated: boolean;
  alarmTag: boolean;
  alarmNewFollower: boolean;
  alarmDM: boolean;
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

export interface SearchUser {
  isInvited: boolean;
  profileImg: string | null;
  userId: number;
  userName: string;
}
