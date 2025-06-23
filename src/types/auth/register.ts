export type IRegisterParams = {
  name: string,
  email: string;
  password: string;
};

export type IRegisterResponse = {
  user: IUser;
  token: string;
  tokenType: string;
}