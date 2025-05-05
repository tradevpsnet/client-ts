export interface IResetPasswordParams {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
}

export interface IResetPasswordResponse {
  msg: string;
  data: null;
}
