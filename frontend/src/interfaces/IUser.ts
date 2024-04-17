export interface IUserData {
  username: string;
  password: string;
};

export interface IUserName extends Pick<IUserData, "username"> { };

export interface IUser extends IUserName {
  token: string | null;
};