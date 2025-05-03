import { Client } from "../../client";
import { IForgetPasswordParams } from "../../types/auth/forget-password";
import { ILoginParams } from "../../types/auth/login";
import { IRegisterParams } from "../../types/auth/register";
import { IResetPasswordParams } from "../../types/auth/reset-password";
import { ForgetPassword } from "./forget-password/forget-password";
import { Login } from "./login/login";
import { Logout } from "./logout/logout";
import { Register } from "./register/register";
import { ResetPassword } from "./reset-password/reset-password";

export class Auth {
  constructor( readonly client: Client) {}

  async login(params: ILoginParams) {
    return new Login(this).execute(params);
  }
  async logout() {
    return new Logout(this).execute();
  }
  async register(params: IRegisterParams) {
    return new Register(this).execute(params);
  }
  async forget_password(params: IForgetPasswordParams) {
    return new ForgetPassword(this).execute(params);
  }
  async reset_password(params: IResetPasswordParams) {
    return new ResetPassword(this).execute(params);
  }
}