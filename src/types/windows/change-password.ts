export type IServerChangePasswordResponse = {
  ok: boolean;
  msg: string;
  data: string;
}


export type IServerChangePasswordParams = {
  account_password: string;
  new_password: string;
}
