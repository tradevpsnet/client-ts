export type ILoginParams = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  user: IUser;
  token: string;
  tokenType: string;
}